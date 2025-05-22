/* https://medium.com/@PikoCanFly/react-js-conditionally-hide-components-according-the-current-relative-url-6012a187794a
 https://v5.reactrouter.com/web/api/matchPath*/
import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { useLocation, matchPath, type Location } from "react-router-dom";

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
    const location: Location<string> = useLocation();
    const mediumPaths: string[] = [
        "/places/:id",
        "/reviews/:id",
        "/places/:id/reviews/add",
		"/explore"
    ];
    const hideComponent = location.pathname === "/";
    const small = matchPath("/profile", location.pathname);
    const medium = mediumPaths.find((path) =>
        matchPath(path, location.pathname)
    );

    return (
        <Fragment>
            {small ? (
                <MainDiv
                    style={{
                        display: hideComponent ? "none" : "block",
                        height: small ? "65vh" : "85vh",
                    }}
                ></MainDiv>
            ) : (
                <MainDiv
                    style={{
                        display: hideComponent ? "none" : "block",
                        height: medium ? "72vh" : "85vh",
                    }}
                ></MainDiv>
            )}
        </Fragment>
    );
}

export default MainContainer;
