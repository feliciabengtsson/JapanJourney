/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map 
https://barker.codes/blog/unique-array-values-in-javascript/*/
import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchContainer = styled.div`
    width: 100vw;
    height: 90vh;
    position: fixed;
    bottom: 0;
`;
const Header = styled.h2`
    font-size: 2rem;
    margin: 0 1.4rem 0;
`;
const SearchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 85vh;
    overflow-y: auto;
`;
const ContentCard = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 79vw;
    max-width: 40rem;
    height: 14vh;
    border-radius: 3rem;
    background: var(--color-neutral-light);
    background-size: cover;
    margin: 0.7rem auto;
`;
const TextWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 1rem;
`;
const Arrow = styled.i`
    font-size: 1.5rem;
    color: var(--color-secondary);
`;
const ImgWrapper = styled.div`
    height: inherit;
`;
const Image = styled.img`
    width: 9rem;
    height: inherit;
    border-radius: 0 3rem 3rem 0;
    object-fit: cover;
    @media (min-width: 600px) {
        width: 16rem;
    }
    @media (min-width: 980px) {
        width: 21rem;
    }
`;

interface PlaceType {
    places_id: number;
    name: string;
    region: string;
    city: string;
    category: string;
    description: string;
    image_url: string;
    avg_rating: number;
}

function SearchView() {
    const [searchParams] = useSearchParams();
    const region = searchParams.get("region");
    const city = searchParams.get("city");
    const params = new URLSearchParams();
    const [cities, setCities] = useState<PlaceType[]>([]);

    if (region) {
        params.append("region", region);
    } else if (city) {
        params.append("city", city);
    }

    useEffect(() => {
        fetch(`/api/places?${params}`, {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((result) => {
                if (city) {
                    const filteredCities = Array.from(
                        new Set(
                            result.map((r: { category: string }) => r.category)
                        )
                    ).map((category) => {
                        return result.find(
                            (r: { category: string }) => r.category === category
                        );
                    });
                    console.log(filteredCities, "filter");
                    setCities(filteredCities);
                    return;
                } else if (region) {
                    const filteredRegion = Array.from(
                        new Set(
							result.map((r: { city: string }) => r.city)
						)
                    ).map((city) => {
                        return result.find(
                            (r: { city: string }) => r.city === city
                        );
                    });
                    console.log(filteredRegion, "filter");
                    setCities(filteredRegion);
                    return;
                } else {
                    setCities(result);
                    return;
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <SearchContainer>
                <Header>
                    {region}
                    {city}
                </Header>
                {region ? (
                    <SearchWrapper>
                        {cities.map((city) => (
                            <Link
                                to={`details?city=${city.city}`}
                                key={city.places_id}
                            >
                                <ContentCard>
                                    <TextWrapper>
                                        <p>{city.city}</p>
                                        <Arrow className="hgi hgi-stroke hgi-arrow-right-01" />
                                    </TextWrapper>
                                    <ImgWrapper>
                                        <Image
                                            src={city.image_url}
                                            alt="Placeholder image"
                                        />
                                    </ImgWrapper>
                                </ContentCard>
                            </Link>
                        ))}
                    </SearchWrapper>
                ) : (
                    <SearchWrapper>
                        {cities.map((city) => (
                            <Link
                                to={`/categories?${params}&category=${city.category}`}
                                key={city.places_id}
                            >
                                <ContentCard>
                                    <TextWrapper>
                                        <p>{city.category}</p>
                                        <Arrow className="hgi hgi-stroke hgi-arrow-right-01" />
                                    </TextWrapper>
                                    <ImgWrapper>
                                        <Image
                                            src={city.image_url}
                                            alt="Placeholder image"
                                        />
                                    </ImgWrapper>
                                </ContentCard>
                            </Link>
                        ))}
                    </SearchWrapper>
                )}
            </SearchContainer>
        </Fragment>
    );
}

export default SearchView;
