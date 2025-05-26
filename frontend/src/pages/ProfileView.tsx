import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import favouriteImg from "../assets/images/favourite-placeholder.jpg";
import reviewsImg from "../assets/images/reviews-placeholder.jpg";

const ProfileContainer = styled.div`
    width: 100vw;
    height: 70vh;
    position: fixed;
    bottom: 0;
`;
const Header = styled.h2`
    font-size: 2rem;
    margin: 0 1.4rem 0;
`;
const Profilewrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;
const ContentCard = styled.div<{ $bgImg: string }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: baseline;
    width: 75vw;
    height: 20vh;
    border-radius: 1rem;
    background: url(${(props) => props.$bgImg});
    background-size: cover;
    margin: 2rem auto;
`;
const ProfileWhite = styled.div`
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
const ProfileText = styled.h3`
    margin-left: 1.8rem;
    font-weight: 400;
`;
const ProfileRed = styled.div`
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

interface User {
    users_id: number;
    username: string;
    email: string;
}

function ProfileView() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        fetch("http://localhost:8080/jj/profile", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((result) => {
                setUser(result);
            });
    }, []);

    return (
        <Fragment>
            {user && (
                <ProfileContainer>
                    <Header>{user.username}</Header>
                    <Profilewrapper>
                        <Link to={`/profile/${user.users_id}/favourites`}>
                            <ContentCard $bgImg={favouriteImg}>
                                <ProfileWhite>
                                    <ProfileText>Favourites</ProfileText>
                                </ProfileWhite>
                                <ProfileRed>
                                    <IconArrow className="hgi hgi-stroke hgi-arrow-right-02" />
                                </ProfileRed>
                            </ContentCard>
                        </Link>
                        <Link to={`/reviews`}>
                            <ContentCard $bgImg={reviewsImg}>
                                <ProfileWhite>
                                    <ProfileText>Reviews</ProfileText>
                                </ProfileWhite>
                                <ProfileRed>
                                    <IconArrow className="hgi hgi-stroke hgi-arrow-right-02" />
                                </ProfileRed>
                            </ContentCard>
                        </Link>
                        ;
                    </Profilewrapper>
                </ProfileContainer>
            )}
        </Fragment>
    );
}

export default ProfileView;
