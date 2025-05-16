import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detailswrapper = styled.div`
    width: 100vw;
    height: 72vh;
    position: absolute;
    bottom: 0;
`;
const Header = styled.h2`
    font-size: 2.4rem;
    margin: 0 1.4rem 0;
`;
const PlaceImg = styled.img`
    width: 100vw;
    max-height: 35vh;
    object-fit: cover;
    border-radius: 2rem 2rem 5rem 5rem;
`;
const ContentContainer = styled.div`
    width: 80vw;
    margin: auto;
`;
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const PlaceName = styled.h3`
    font-size: 1.3rem;
    font-weight: 400;
    margin: 1rem 0 0.3rem;
`;
const PlaceDescription = styled.span`
    margin: 0.2rem 0;
`;
const PlaceRating = styled.span`
    margin: 0.5rem;
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

function PlaceDetail() {
    const { id } = useParams();
    const placeId = id ? parseInt(id) : undefined;
    const [place, setPlace] = useState<PlaceType>({
        places_id: 0,
        name: "",
        region: "",
        city: "",
        category: "",
        description: "",
        image_url: "",
        avg_rating: 0,
        lat: 0,
        lon: 0,
    });

    const renderCircles = (rating: number) => {
        const circles = [];
        const fullCircle = Math.floor(rating); //gets rating number rounded down
        const halfCircle = rating % 1 >= 0.5; //calculate if there is half a number/rating left, true or false

        for (let i = 0; i < fullCircle; i++) {
            circles.push(
                <i
                    style={{
                        fontSize: "1rem",
                        margin: "0 .1em",
                        color: "var(--color-secondary)",
                    }}
                    key={`full${i}`}
                    className="fa-solid fa-circle"
                ></i>
            );
        }
        if (halfCircle) {
            circles.push(
                <i
                    style={{
                        fontSize: "1rem",
                        margin: "0 .1em",
                        color: "var(--color-secondary)",
                    }}
                    key="half"
                    className="fa-solid fa-circle-half-stroke"
                ></i>
            );
        }

        console.log(circles, "circles");
        //make sure there is empty circles filled up if the rating is low
        while (circles.length < 5) {
            circles.push(
                <i
                    style={{
                        fontSize: "1rem",
                        margin: "0 .1em",
                        color: "var(--color-secondary)",
                    }}
                    className="fa-regular fa-circle"
                ></i>
            );
        }
        return circles;
    };

    useEffect(() => {
        if (placeId !== undefined) {
            fetch(`http://localhost:8080/jj/places/${placeId}`, {
                method: "GET",
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    setPlace(data);
                    console.log(data, "chosen place");
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <Detailswrapper>
                <Header>Details</Header>
                {place.image_url && (
                    <PlaceImg src={place.image_url} alt="Place cover image" />
                )}
                <ContentContainer>
                    <ContentWrapper>
                        <PlaceName>{place.name}</PlaceName>
                        <PlaceDescription>
                            {renderCircles(place.avg_rating)}
                            <PlaceRating>{place.avg_rating}</PlaceRating>
                        </PlaceDescription>
                        <PlaceDescription>City: {place.city}</PlaceDescription>
                        <PlaceDescription>
                            Region: {place.region}
                        </PlaceDescription>
                        <p>{place.description}</p>
                    </ContentWrapper>
                </ContentContainer>
            </Detailswrapper>
        </Fragment>
    );
}

export default PlaceDetail;
