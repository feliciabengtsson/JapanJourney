import styled from 'styled-components';
import GlobalStyle from './globalStyles';
import { Fragment } from 'react/jsx-runtime';

import { Routes, Route } from 'react-router-dom';

import React from 'react';

const Div = styled.div`
    width: 300px;
    margin: auto;
`;

function App() {
    return (
        <Fragment>
            <NavigationTop />

            <Div>
                <Routes>
                    <Route path="/" element={<Startview />} />
                    <Route path="books" element={<BooksView />} />
                    <Route path="books/:id" element={<BookDetails />} />
                    <Route path="bookcircles" element={<BookCirclesView />} />
                    <Route path="bookcircles/:id" element={<BookCirclesGroup />} />
                    <Route path="bookcircles/add" element={<CreateCircle />} />
                    <Route path="profile" element={<ProfileView />} />
                </Routes>
            </Div>

            <NavigationBottom />
            <GlobalStyle />
        </Fragment>
    );
}

export default App;

