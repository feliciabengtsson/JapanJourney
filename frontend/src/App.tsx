import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { Fragment } from 'react/jsx-runtime';

import { Routes, Route } from 'react-router-dom';

import StartView from './pages/StartView'
import Loginview from './pages/LoginView';
import MainContainer from './components/MainContainer';

const Div = styled.div`
    width: 300px;
    margin: auto;
`;

function App() {
    return (
        <Fragment>
            <Div>
				<Routes>
                    <Route path="/" element={<Loginview />} />
					<Route path="start" element={<StartView />} />
                </Routes>
            </Div>
			<MainContainer />
            <GlobalStyle />
        </Fragment>
    );
}

export default App;

