import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const FavouriteContainer = styled.div`
    width: 100vw;
    height: 90vh;
    position: fixed;
    bottom: 0;
`;
const Header = styled.h2`
    font-size: 2rem;
    margin: 0 1.4rem 0;
`;
const Favouritewrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;
const ContentCard = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: baseline;
    width: 75vw;
    height: 20vh;
    border-radius: 1rem;
    background: lightblue;
    background-size: cover;
    margin: 2rem auto;
`;
const FavouriteWhite = styled.div`
    position: absolute;
    bottom: -1.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 12rem;
    height: 3.5rem;
    border-radius: 3rem;
    background: var(--color-neutral-light);
    cursor: pointer;
`;
const FavouriteText = styled.h3`
    margin-left: 1.8rem;
    font-weight: 400;
`;
const FavouriteRed = styled.div`
    position: absolute;
    bottom: 0;
    right: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.5rem;
    height: 2.8rem;
    border-radius: 3rem;
    background: var(--color-secondary);
    text-align: center;
    cursor: pointer;
`;
const IconArrow = styled.i`
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--color-neutral-light);
`;

interface Places {
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

function FavouritesView() {
    const { id } = useParams();
    const [favourites, setFavourites] = useState<Places[]>([]);

    useEffect(() => {
        if (id !== undefined) {
            fetch(`api/favourites/${id}`, {
                method: "GET",
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    setFavourites(data);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <FavouriteContainer>
                <Header>Favourites</Header>
                <Favouritewrapper>
                    {favourites.map((place) => (
                        <Link to={`/places/${place.places_id}`}>
                            <ContentCard
                                key={place.places_id}
                                style={{
                                    backgroundImage: `url(${place.image_url})`,
                                }}
                            >
                                <FavouriteWhite>
                                    <FavouriteText>{place.name}</FavouriteText>
                                </FavouriteWhite>
                                <FavouriteRed>
                                    <IconArrow className="hgi hgi-stroke hgi-arrow-right-02" />
                                </FavouriteRed>
                            </ContentCard>
                        </Link>
                    ))}
                </Favouritewrapper>
            </FavouriteContainer>
        </Fragment>
    );
}

export default FavouritesView;
