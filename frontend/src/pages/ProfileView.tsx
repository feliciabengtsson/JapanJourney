import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";

const ProfileContainer = styled.div`
    width: 100vw;
    height: 64vh;
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
const ContentCard = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: baseline;
    width: 75vw;
    height: 20vh;
    border-radius: 1rem;
    background-color: aliceblue;
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

function ProfileView() {
    return (
        <Fragment>
            <ProfileContainer>
                <Header>Profile</Header>
                <Profilewrapper>
                    <ContentCard>
                        <ProfileWhite>
                            <ProfileText>Favourites</ProfileText>
                        </ProfileWhite>
                        <ProfileRed>
                            <IconArrow className="hgi hgi-stroke hgi-arrow-right-02" />
                        </ProfileRed>
                    </ContentCard>
                    <ContentCard>
                        <ProfileWhite>
                            <ProfileText>Reviews</ProfileText>
                        </ProfileWhite>
                        <ProfileRed>
                            <IconArrow className="hgi hgi-stroke hgi-arrow-right-02" />
                        </ProfileRed>
                    </ContentCard>
                </Profilewrapper>
            </ProfileContainer>
        </Fragment>
    );
}

export default ProfileView;
