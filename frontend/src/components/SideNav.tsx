import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { useContext } from "react";

const NavWrapper = styled.div`
    width: 85%;
    height: 100vh;
    max-width: 30rem;
    position: fixed;
    top: 0;
    left: 0;
    background: var(--color-primary-medium);
    padding: 1rem;
    border-radius: 0 1rem 1rem 0;
    z-index: 2;
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
    z-index: 1;
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
const NavLinks = styled(Link)`
    font-size: 2rem;
    text-decoration: none;
    margin-top: 1rem;
    z-index: 10000;
    color: var(--color-neutral-dark);
    &:hover {
        color: var(--color-secondary);
    }
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
    &:hover {
        color: var(--color-accent-light);
    }
`;

interface Nav {
    isOpen: boolean;
    toggle: () => void;
}

function SideNav(props: Nav) {
    const navigate = useNavigate();
    const { logout } = useContext(UserContext);
    const handleLogout = async () => {
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response, "response logout");
            if (response.ok) {
                console.log("lyckad utloggning");
                navigate("/"); /// Redirect to new page
            }
        } catch (error) {
            console.error("error", error);
        }
    };

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
                        <NavLinks to="places" onClick={props.toggle}>
                            Home
                        </NavLinks>
                        <NavLinks to="profile" onClick={props.toggle}>
                            Profile
                        </NavLinks>
                        <NavLinks to="explore" onClick={props.toggle}>
                            Explore
                        </NavLinks>
                        <LogoutWrapper>
                            <NavLinks
                                to="/"
                                onClick={() => {
                                    props.toggle();
                                    logout();
                                    handleLogout();
                                }}
                            >
                                Logout
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
