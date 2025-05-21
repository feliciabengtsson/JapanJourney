/* https://github.com/react-map/react-map?tab=readme-ov-file#usage */
import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import Japan from "@react-map/japan";

const ProfileContainer = styled.div`
    width: 100vw;
    height: 77vh;
    position: fixed;
    bottom: 0;
`;
const Header = styled.h2`
    font-size: 2rem;
    margin: 0 1.4rem 0;
`;

function ExploreView() {
    return (
        <Fragment>
            <Header>Explore</Header>
            <Japan size={300} hoverColor="orange" type="select-single" />
        </Fragment>
    );
}

export default ExploreView;
