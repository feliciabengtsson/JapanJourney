import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";

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
`;
const IconArrow = styled.i`
    font-size: 3.5rem;
    font-weight: 800;
    color: var(--color-neutral-light);
`;

function Loginview() {
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
            <Link to="start">
                <LoginWrapper>
                    <LoginPink>
                        <LoginText>Login</LoginText>
                    </LoginPink>
                    <LoginRed>
                        <IconArrow className="hgi hgi-stroke hgi-arrow-right-02" />
                    </LoginRed>
                </LoginWrapper>
            </Link>
        </Fragment>
    );
}

export default Loginview;
