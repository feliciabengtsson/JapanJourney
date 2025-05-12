import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";

const NavWrapper = styled.div`
    width: 85%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: var(--color-primary-medium);
    padding: 1rem;
    border-radius: 0 1rem 1rem 0;
    z-index: 1;
`;
const CloseWrapper = styled.div`
    display: flex;
    justify-content: end;
`;
const CloseIcon = styled.span`
    color: var(--color-secondary);
    cursor: pointer;
    font-size: 3.5rem;
`;
const LogoHeader = styled.div`
    margin-left: 1rem;
`;
const IconWrapper = styled.div`
    margin-left: -1.8rem;
    margin-bottom: -0.7rem;
`;
const Icon = styled.i`
    font-size: 4rem;
    font-weight: 800;
`;
const TitleWrapper = styled.div`
    width: 6rem;
`;
const LinksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin: 6rem auto;
`;
const LinksText = styled.span`
    font-size: 2rem;
`;
const NavLinks = styled(Link)`
	text-decoration: none;
	margin-top: 1rem;
    @media (min-width: 890px) {
    }
`;
const LogoutWrapper = styled.div`
    display: flex;
    align-items: center;
`;
const Logout = styled.i`
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--color-secondary);
    margin-left: 0.6rem;
`;

interface Nav {
    isOpen: boolean;
    toggle: () => void;
}

function SideNav(props: Nav) {
    return (
        <Fragment>
            {props.isOpen && (
                <NavWrapper>
                    <CloseWrapper>
                        <CloseIcon
                            onClick={props.toggle}
                            className="material-symbols-outlined"
                        >
                            close
                        </CloseIcon>
                    </CloseWrapper>
                    <LogoHeader>
                        <IconWrapper>
                            <Icon className="hgi hgi-stroke hgi-location-01" />
                        </IconWrapper>
                        <TitleWrapper>
                            <h1>Japan Journey</h1>
                        </TitleWrapper>
                    </LogoHeader>
                    <LinksWrapper>
                        <NavLinks to="start">
                            <LinksText>Profile</LinksText>
                        </NavLinks>
                        <NavLinks to="start">
                            <LinksText>Reviews</LinksText>
                        </NavLinks>
                        <LogoutWrapper>
                            <NavLinks to="start">
                                <LinksText>Logout</LinksText>
                                <Logout className="hgi hgi-stroke hgi-logout-01" />
                            </NavLinks>
                        </LogoutWrapper>
                    </LinksWrapper>
                </NavWrapper>
            )}
        </Fragment>
    );
}

export default SideNav;
