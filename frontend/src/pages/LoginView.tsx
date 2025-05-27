import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import LoginModal from "../components/LoginModal";
import useModal from "../hooks/useModal";
import CreateAccountModal from "../components/CreateAccountModal";

const DivHeader = styled.div`
    position: absolute;
    left: 3rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 3rem;
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
const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LoginPink = styled.div`
    position: absolute;
    bottom: 5.3rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 16rem;
    height: 5rem;
    border-radius: 3rem;
    background: rgba(255, 144, 124, 0.68);
    margin: auto;
    cursor: pointer;
`;
const LoginText = styled.h2`
    margin-left: 2rem;
    font-weight: 500;
`;
const LoginRed = styled.div`
    position: absolute;
    bottom: 7.3rem;
    right: 6rem;
    width: 5.1rem;
    height: 4rem;
    border-radius: 3rem;
    background: var(--color-secondary);
    text-align: center;
    cursor: pointer;
    @media (min-width: 480px) {
        right: 9rem;
    }
    @media (min-width: 600px) {
        right: 13rem;
    }
    @media (min-width: 770px) {
        right: 18rem;
    }
    @media (min-width: 980px) {
        right: 26rem;
    }
`;
const IconArrow = styled.i`
    font-size: 3.5rem;
    font-weight: 800;
    color: var(--color-neutral-light);
`;
const CreateAccount = styled.p`
    position: absolute;
    bottom: 2rem;
    color: var(--color-neutral-light);
`;
const CreateLink = styled.span`
    color: var(--color-accent-light);
    cursor: pointer;
`;

function Loginview() {
    const { isOpenLogin, toggleLogin } = useModal();
    const { isOpenSignup, toggleSignup } = useModal();
    return (
        <Fragment>
            <DivHeader>
                <IconWrapper>
                    <Icon className="hgi hgi-stroke hgi-location-01" />
                </IconWrapper>
                <TitleWrapper>
                    <h1>Japan Journey</h1>
                </TitleWrapper>
            </DivHeader>

            <LoginWrapper>
                <LoginPink onClick={toggleLogin}>
                    <LoginText>Login</LoginText>
                </LoginPink>
                <LoginRed onClick={toggleLogin}>
                    <IconArrow className="hgi hgi-stroke hgi-arrow-right-02" />
                </LoginRed>
                <CreateAccount>
                    Don't have an account? Create new{" "}
                    <CreateLink onClick={toggleSignup}>here</CreateLink>
                </CreateAccount>
            </LoginWrapper>

            <LoginModal isOpenLogin={isOpenLogin} toggleLogin={toggleLogin} />
            <CreateAccountModal
                isOpenSignup={isOpenSignup}
                toggleSignup={toggleSignup}
            />
        </Fragment>
    );
}

export default Loginview;
