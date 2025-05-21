import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

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
    lat: number;
    lon: number;
}

function SearchDetails() {
    const [searchParams] = useSearchParams();
    const city = searchParams.get("city");
    const params = new URLSearchParams();

    if (city) {
        params.append("city", city);
    }

    const [cities, setCities] = useState<PlaceType[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8080/jj/places?${params}`, {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result, "fetched places");
                setCities(result);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <SearchContainer>
                <Header>{city}</Header>
                <SearchWrapper>
                    {cities.map((city) => (
                        <Link to={`/categories?${params}&category=${city.category}`}>
                            <ContentCard key={city.places_id}>
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
            </SearchContainer>
        </Fragment>
    );
}

export default SearchDetails;
