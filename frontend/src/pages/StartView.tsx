import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const MainContainer = styled.div`
    width: 300px;
    margin: auto;
`;
const IconSearch = styled.i`
    width: 300px;
    margin: auto;
`;
const PlacesContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: auto;
    @media (min-width: 890px) {

    }
`;
const PlacesCard = styled.div`

    @media (min-width: 890px) {

    }
`;
const PlaceImg = styled.img`
    width: 5.5rem;
    height: 7rem;
    background-color: #f5f1e7c3;
    margin: 10px;
    @media (min-width: 890px) {
        width: 7.5rem;
        height: 9.5rem;
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
                setPlaces(result.slice(0, 8));
            });
    }, []);

    return (
        <Fragment>
            <MainContainer>
                <div>
                    <label htmlFor=""></label>
                    <input type="text" />
                    <IconSearch className="hgi hgi-stroke hgi-sharp hgi-search-01" />
                </div>
                <div id="filter">
                    <span>Regions</span>
                    <span>Cities</span>
                    <span>Categories</span>
                </div>
                <PlacesContainer>
                    {places.map((place) => (
                        <PlacesCard key={place.places_id}>
                            <Link to={`/books/${place.places_id}`}>
                                <PlaceImg
                                    src={place.image_url}
                                    alt="Place image"
                                />
                            </Link>
                        </PlacesCard>
                    ))}
                </PlacesContainer>
            </MainContainer>
        </Fragment>
    );
}

export default Startview;
