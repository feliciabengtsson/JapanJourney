import styled from 'styled-components';
import GlobalStyle from './GlobalStyles';
import { Fragment } from 'react/jsx-runtime';

import { Routes, Route } from 'react-router-dom';

import StartView from './pages/StartView'

const Div = styled.div`
    width: 300px;
    margin: auto;
`;

function App() {
    return (
        <Fragment>
            <Div>
                <Routes>
                    <Route path="/" element={<StartView />} />
                </Routes>
            </Div>
            <GlobalStyle />
        </Fragment>
    );
}

export default App;

