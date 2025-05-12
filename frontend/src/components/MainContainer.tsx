/* https://medium.com/@PikoCanFly/react-js-conditionally-hide-components-according-the-current-relative-url-6012a187794a
 */
import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { useLocation } from 'react-router-dom';

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
    const location = useLocation();
	const hideComponent = location.pathname === '/';
	
	return (
        <Fragment>
            <MainDiv style={{ display: hideComponent ? 'none' : 'block' }}></MainDiv>
        </Fragment>
    );
}

export default MainContainer;
