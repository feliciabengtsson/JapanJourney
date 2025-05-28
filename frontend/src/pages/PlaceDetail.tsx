/* https://stackoverflow.com/questions/67691606/how-to-change-color-button-onclick-react-js
https://stackabuse.com/how-to-style-hover-in-react/*/
import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SakuraSVGIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={40}
        height={40}
        color={"var(--color-neutral-light)"}
        fill={"none"}
        {...props}
    >
        <path
            d="M14 12.5C14 13.6046 13.1046 14.5 12 14.5C10.8954 14.5 10 13.6046 10 12.5C10 11.3954 10.8954 10.5 12 10.5C13.1046 10.5 14 11.3954 14 12.5Z"
            stroke="var(--color-neutral-light)"
            strokeWidth="1.5"
            strokeLinejoin="round"
        ></path>
        <path
            d="M12 18.0876C11.8851 18.2748 11.7593 18.4624 11.6225 18.6497C10.309 20.4472 8.49591 21.5041 7 21.5L6.69824 19.4251L4.62034 19.781C4.15412 18.3677 4.64876 16.267 5.96228 14.4694C3.93504 13.7655 2.44173 12.3965 2 11.0004L3.85945 10.0686L2.89359 8.20296C4.08097 7.32031 6.42003 7.2136 8.50944 7.90417C8.50944 5.5 9.33594 3.36961 10.5399 2.5L12 4L13.4601 2.5C14.6641 3.36961 15.502 5.5 15.4906 7.90417C17.58 7.2136 19.919 7.32031 21.1064 8.20296L20.1406 10.0686L22 11.0004C21.5583 12.3965 20.065 13.7655 18.0377 14.4694C19.3512 16.267 19.8459 18.3677 19.3797 19.781L17.3018 19.4251L17 21.5C15.5041 21.5041 13.691 20.4472 12.3775 18.6497C12.2407 18.4624 12.1149 18.2748 12 18.0876Z"
            stroke="var(--color-neutral-light)"
            strokeWidth="1.5"
            strokeLinejoin="round"
        ></path>
    </svg>
);

const Detailswrapper = styled.div`
    width: 100vw;
    height: 79vh;
    position: fixed;
    bottom: 0;
`;
const Header = styled.h2`
    font-size: 2.4rem;
    margin: 0 1.4rem 0;
`;
const ImageWrapper = styled.div`
    position: relative;
`;
const PlaceImg = styled.img`
    width: 100vw;
    max-height: 35vh;
    object-fit: cover;
    border-radius: 2rem 2rem 5rem 5rem;
`;
const StyledSakuraIcon = styled(SakuraSVGIcon)`
    position: absolute;
    right: 1rem;
    top: 1rem;
    color: var(--color-neutral-light);
    cursor: pointer;
`;
const ContentContainer = styled.div`
    width: 80vw;
    margin: auto;
`;
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const IconWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const Icon = styled.i`
    font-size: 1rem;
    font-weight: 800;
    margin-right: 0.3rem;
`;
const ReviewLink = styled(Link)`
    font-size: 0.8rem;
    text-decoration: none;
    color: var(--color-secondary);
    &:hover {
        color: var(--color-neutral-light);
    }
    @media (min-width: 890px) {
    }
`;
const PlaceName = styled.h3`
    display: inline;
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
    const [isFavourite, setIsFavourite] = useState(false);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        if (placeId !== undefined) {
            fetch(`api/places/${placeId}`, {
                method: "GET",
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    setPlace(data);
                });
        }

        fetch(`api/favourites/${placeId}`, {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data, "favorite");
                if (data.length > 0) {
                    setIsFavourite(data);
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    key={circles.length++}
                ></i>
            );
        }
        return circles;
    };
    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };
    const handleFavourite = async () => {
        if (!isFavourite) {
            setIsFavourite(true);
            console.log("add favourite");
            const favouriteForm = {
                place_id: id,
            };

            await fetch("api/favourites", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(favouriteForm),
            });
        } else {
            setIsFavourite(false);
            console.log("remove favourite");

            try {
                const response = await fetch(
                    `api/favourites/${id}`,
                    {
                        method: "DELETE",
                    }
                );
                if (response.ok) {
                    console.log("DELETE");
                } else {
                    console.error("failed delete");
                }
            } catch (error) {
                console.error("error", error);
            }
        }
    };

    return (
        <Fragment>
            <Detailswrapper>
                <Header>Details</Header>
                {place.image_url && (
                    <ImageWrapper>
                        <PlaceImg
                            src={place.image_url}
                            alt="Place cover image"
                        />
                        <StyledSakuraIcon
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleFavourite}
                            style={{
                                fill:
                                    isFavourite || isHover
                                        ? "var(--color-primary-medium)"
                                        : "none",
                            }}
                        />
                    </ImageWrapper>
                )}
                <ContentContainer>
                    <ContentWrapper>
                        <IconWrapper>
                            <Icon className="hgi hgi-stroke hgi-bubble-chat-edit" />
                            <ReviewLink to="reviews/add">Add Review</ReviewLink>
                        </IconWrapper>
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
