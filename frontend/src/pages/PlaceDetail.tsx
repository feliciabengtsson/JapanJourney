import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detailswrapper = styled.div`
    width: 100vw;
    height: 65vh;
	position: absolute;
	bottom: 0;
`;
const Header = styled.h2``;
const PlaceImg = styled.img`
    width: 100vw;
    border-radius: 2rem 2rem 5rem 5rem;
`;
const TextWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
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

    useEffect(() => {
        if (placeId !== undefined) {
            fetch(`http://localhost:8080/jj/places/${placeId}`)
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
                <Header>Details</Header>
                <Detailswrapper>
                    {place.image_url && (
                        <PlaceImg
                            src={place.image_url}
                            alt="Place cover image"
                        />
                    )}

                    <TextWrapper>
                        <div>
                            <h2>{place.name}</h2>
                            <p>Region: {place.region}</p>
                            <p>{place.description}</p>
                        </div>
                        <span>{place.avg_rating}</span>
                    </TextWrapper>
                </Detailswrapper>
        </Fragment>
    );
}

export default PlaceDetail;
