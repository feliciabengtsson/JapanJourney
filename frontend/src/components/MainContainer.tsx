/* https://medium.com/@PikoCanFly/react-js-conditionally-hide-components-according-the-current-relative-url-6012a187794a
 https://v5.reactrouter.com/web/api/matchPath*/
import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { useLocation, matchPath } from "react-router-dom";

const MainDiv = styled.div`
    position: fixed;
    bottom: 0;
    width: 100vw;
	height: 85vh;
    border-radius: 2rem 2rem 0px 0px;
    background: rgba(255, 196, 178, 0.61);
    z-index: -1;
`;

function MainContainer() {
    const location = useLocation();
    const hideComponent = location.pathname === "/";
    const small = matchPath("/places/:id", location.pathname)

    return (
        <Fragment>
            <MainDiv
                style={{
                    display: hideComponent ? "none" : "block",
                    height: small ? "65vh" : "85vh",
                }}
            ></MainDiv>
        </Fragment>
    );
}

export default MainContainer;
