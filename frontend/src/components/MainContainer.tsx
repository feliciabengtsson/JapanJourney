import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";

const MainDiv = styled.div`
    position: absolute;
	bottom: 0;
	width: 100vw;
    height: 85vh;
	border-radius: 2rem 2rem 0px 0px;
	background: rgba(255, 196, 178, 0.61);
	z-index: -1;
`;

function MainContainer() {
    return (
        <Fragment>
            <MainDiv></MainDiv>
        </Fragment>
    );
}

export default MainContainer;
