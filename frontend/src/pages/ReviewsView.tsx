import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ReviewsContainer = styled.div`
    width: 100vw;
    height: 90vh;
    position: fixed;
    bottom: 0;
`;
const Header = styled.h2`
    font-size: 2rem;
    margin: 0 1.4rem 0;
`;
const ReviewsWrapper = styled.div`
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
    max-width: 25rem;
    height: 20vh;
    border-radius: 1rem;
    background: lightblue;
    background-size: cover;
    margin: 2rem auto;
`;
const ReviewsWhite = styled.div`
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
const ReviewsText = styled.h3`
    margin: auto;
    font-weight: 400;
`;
const ReviewsRed = styled.div`
    position: absolute;
    bottom: 0.8rem;
    right: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.2rem;
    height: 2.5rem;
    border-radius: 3rem;
    background: var(--color-secondary);
    text-align: center;
    cursor: pointer;
    @media (min-width: 600px) {
        right: 7rem;
    }
`;
const IconArrow = styled.i`
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--color-neutral-light);
`;

interface Reviews {
    reviews_id: number;
    name: string;
    image_url: string;
}

function ReviewsView() {
    const [reviews, setReviews] = useState<Reviews[]>([]);

    useEffect(() => {
        fetch("/api/profile/reviews", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((result) => {
                setReviews(result);
            });
    }, []);

    return (
        <Fragment>
            <ReviewsContainer>
                <Header>Reviews</Header>
                <ReviewsWrapper>
                    {reviews.map((review) => (
                        <Link
                            to={`/reviews/${review.reviews_id}`}
                            key={review.reviews_id}
                        >
                            <ContentCard
                                style={{
                                    backgroundImage: `url(${review.image_url})`,
                                }}
                            >
                                <ReviewsWhite>
                                    <ReviewsText>{review.name}</ReviewsText>
                                </ReviewsWhite>
                                <ReviewsRed>
                                    <IconArrow className="hgi hgi-stroke hgi-arrow-right-02" />
                                </ReviewsRed>
                            </ContentCard>
                        </Link>
                    ))}
                </ReviewsWrapper>
            </ReviewsContainer>
        </Fragment>
    );
}

export default ReviewsView;
