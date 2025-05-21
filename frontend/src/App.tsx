import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { Fragment } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";

import StartView from "./pages/StartView";
import Loginview from "./pages/LoginView";
import MainContainer from "./components/MainContainer";
import SideNav from "./components/SideNav";
import useModal from "./hooks/useModal";
import { useLocation } from "react-router-dom";
import ProfileView from "./pages/ProfileView";
import ReviewsView from "./pages/ReviewsView";
import PlaceDetail from "./pages/PlaceDetail";
import FavouritesView from "./pages/FavouritesView";
import ReviewsDetail from "./pages/ReviewsDetail";
import AddReview from "./pages/AddReview";
import { UserProvider } from "./UserContext";
import SearchView from "./pages/SearchView";
import SearchDetails from "./pages/SearchDetails";
import CategoriesDetail from "./pages/CategoriesDetail";
import ExploreView from "./pages/ExploreView";

const Icon = styled.i`
    font-size: 4rem;
    font-weight: 800;
    cursor: pointer;
`;
const IconWrapper = styled.div`
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
`;

function App() {
    const { isOpen, toggle } = useModal();
    const location = useLocation();
    const hideComponent = location.pathname === "/";

    return (
        <Fragment>
            <UserProvider>
                <IconWrapper
                    style={{ display: hideComponent ? "none" : "block" }}
                >
                    <Icon
                        onClick={toggle}
                        className="hgi hgi-stroke hgi-location-01"
                    />
                </IconWrapper>
                <SideNav isOpen={isOpen} toggle={toggle} />
                <Routes>
                    <Route path="/" element={<Loginview />} />
                    <Route path="places" element={<StartView />} />
                    <Route path="places/:id" element={<PlaceDetail />} />
                    <Route path="profile" element={<ProfileView />} />
                    <Route
                        path="profile/:id/favourites"
                        element={<FavouritesView />}
                    />
                    <Route path="reviews" element={<ReviewsView />} />
                    <Route path="reviews/:id" element={<ReviewsDetail />} />
                    <Route
                        path="places/:id/reviews/add"
                        element={<AddReview />}
                    />
					<Route path="/search" element={<SearchView />} />
					<Route path="/search/details" element={<SearchDetails />} />
					<Route path="/categories" element={<CategoriesDetail />} />
					<Route path="/explore" element={<ExploreView />} />
                </Routes>
                <MainContainer />
                <GlobalStyle />
            </UserProvider>
        </Fragment>
    );
}

export default App;
