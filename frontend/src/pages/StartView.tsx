/* https://stackoverflow.com/questions/59288849/styling-a-router-link-with-styled-components
 */
import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 100vh;
`;
const MainWrapper = styled.div`
    height: 80vh;
`;
const SearchWrapper = styled.div`
    position: relative;
`;
const InputSearch = styled.input`
    width: 21rem;
    height: 4rem;
    border-radius: 50px;
    background: var(--color-neutral-light);
    border: none;
    font-family: Poppins;
    font-size: 1.2rem;
    padding-left: 1rem;
`;
const IconSearch = styled.i`
    position: absolute;
    right: 2rem;
    top: 1rem;
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-secondary);
`;
const FilterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem auto;
`;
const Filter = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 6rem;
    height: 2.3rem;
    border-radius: 50px;
    background: var(--color-neutral-light);
    font-size: 0.9rem;
`;
const PlacesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
	column-gap: 1rem;
    @media (min-width: 890px) {
    }
`;
const PlacesLink = styled(Link)`
    display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	text-decoration: none;
	color: inherit;
    @media (min-width: 890px) {
    }
`;
const PlacesCard = styled.div`
    display: flex;
	width: 10rem;
    height: 4.4rem;
    border-radius: 50px;
    background: var(--color-neutral-light);
    margin: 1rem auto;
    @media (min-width: 890px) {
    }
`;
const PlaceImg = styled.img`
    width: 3.1rem;
    height: 3.1rem;
    border-radius: 50px;
    @media (min-width: 890px) {
        width: 7.5rem;
        height: 9.5rem;
    }
`;
const DescriptionWrapper = styled.div`
	width: 5rem;
    @media (min-width: 890px) {
    }
`;
const PlaceName = styled.p`
    font-size: 0.7rem;
	margin: 0;
    @media (min-width: 890px) {
    }
`;
const PlaceRating = styled.span`
    font-size: 0.7rem;
    @media (min-width: 890px) {
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
    lat: number;
    lon: number;
}

function Startview() {
    const [places, setPlaces] = useState<PlaceType[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/jj/places")
            .then((response) => response.json())
            .then((result) => {
                console.log(result, "fetched places");
                setPlaces(result.slice(0, 10));
            });
    }, []);

    return (
        <Fragment>
            <MainContainer>
                <MainWrapper>
                    <SearchWrapper>
                        <label htmlFor=""></label>
                        <InputSearch
                            type="text"
                            placeholder="Search city or place"
                        />
                        <IconSearch className="hgi hgi-stroke hgi-sharp hgi-search-01" />
                    </SearchWrapper>
                    <FilterWrapper>
                        <Filter>Regions</Filter>
                        <Filter>Cities</Filter>
                        <Filter>Categories</Filter>
                    </FilterWrapper>
                    <PlacesContainer>
                        {places.map((place) => (
                            <PlacesCard key={place.places_id}>
                                <PlacesLink to={`/books/${place.places_id}`}>
                                    <PlaceImg
                                        src={place.image_url}
                                        alt="Place image"
                                    />
                                    <DescriptionWrapper>
                                        <PlaceName>{place.name}</PlaceName>
                                        <PlaceRating>OOOOO</PlaceRating>
                                    </DescriptionWrapper>
                                </PlacesLink>
                            </PlacesCard>
                        ))}
                    </PlacesContainer>
                </MainWrapper>
            </MainContainer>
        </Fragment>
    );
}

export default Startview;
