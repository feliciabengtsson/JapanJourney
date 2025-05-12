import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { Fragment } from "react/jsx-runtime";

import { Routes, Route } from "react-router-dom";

import StartView from "./pages/StartView";
import Loginview from "./pages/LoginView";
import MainContainer from "./components/MainContainer";
import SideNav from "./components/SideNav";
import useNav from "../src/hooks/useNav";
import { useLocation } from "react-router-dom";

const AppWrapper = styled.div``;
const Icon = styled.i`
    font-size: 4rem;
    font-weight: 800;
`;
const IconWrapper = styled.div`
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
`;

function App() {
    const { isOpen, toggle } = useNav();
    const location = useLocation();
    const hideComponent = location.pathname === "/";

    return (
        <Fragment>
            <IconWrapper style={{ display: hideComponent ? "none" : "block" }}>
                <Icon
                    onClick={toggle}
                    className="hgi hgi-stroke hgi-location-01"
                />
            </IconWrapper>
            <SideNav isOpen={isOpen} toggle={toggle} />
            <AppWrapper>
                <Routes>
                    <Route path="/" element={<Loginview />} />
                    <Route path="start" element={<StartView />} />
                </Routes>
            </AppWrapper>
            <MainContainer />
            <GlobalStyle />
        </Fragment>
    );
}

export default App;
