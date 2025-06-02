/* https://stackoverflow.com/questions/59288849/styling-a-router-link-with-styled-components
 */
/* https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams */
/* https://medium.com/@bobjunior542/how-to-use-usesearchparams-in-react-router-6-for-url-search-parameters-c35b5d1ac01c */
/* https://stackoverflow.com/questions/62265072/how-can-i-fill-review-icons-depending-on-average-rating
https://dev.to/annaqharder/how-to-make-star-rating-in-react-2e6f 
https://www.npmjs.com/package/react-rating-stars-component
https://stackoverflow.com/questions/74138879/how-to-render-elements-based-on-a-given-value-in-react-js
https://stackoverflow.com/questions/71023164/how-to-show-stars-based-on-user-rating
https://blog.petefowler.dev/how-to-make-a-star-rating-display-in-react-thats-better-than-the-one-on-yelpcom
https://www.typescriptlang.org/docs/handbook/jsx.html*/

import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 100vh;
`;
const MainWrapper = styled.div`
    height: 80vh;
`;
const SearchWrapper = styled.div`
    position: relative;
    max-width: fit-content;
    margin: auto;
`;
const InputSearch = styled.input`
    width: 21rem;
    height: 4rem;
    border-radius: 50px;
    background: var(--color-neutral-light);
    border: none;
    font-family: Poppins;
    font-size: 1.2rem;
    padding-left: 1rem;
    @media (min-width: 890px) {
        width: 31rem;
        height: 3rem;
        font-size: 1rem;
    }
`;
const IconSearch = styled.i`
    position: absolute;
    right: 2rem;
    top: 1rem;
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-secondary);
    cursor: pointer;
    @media (min-width: 890px) {
        top: 0.7rem;
    }
`;
const FilterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem auto;
    @media (min-width: 890px) {
        justify-content: center;
        gap: 1rem;
    }
`;
const Filter = styled.select`
    text-align: center;
    width: 6rem;
    height: 2.3rem;
    border-radius: 50px;
    background: var(--color-neutral-light);
    color: var(--color-neutral-dark);
    border: none;
    font-size: 0.9rem;
    cursor: pointer;
    z-index: 1;
`;
const FilterChoice = styled.option`
    background: var(--color-primary-light);
    color: var(--color-neutral-dark);
    &:hover {
        background: var(--color-primary-medium);
    }
`;
const PlacesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    column-gap: 1rem;
    margin-top: 2rem;
    @media (min-width: 890px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;
const PlacesLink = styled(Link)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    text-decoration: none;
    color: inherit;
`;
const PlacesCard = styled.div`
    display: flex;
    width: 10rem;
    height: 4.4rem;
    border-radius: 50px;
    background: var(--color-neutral-light);
    margin: 1rem auto;
    @media (min-width: 890px) {
        width: 14rem;
        height: 7rem;
        border-radius: 60px;
    }
`;
const PlaceImg = styled.img`
    width: 3.1rem;
    height: 3.1rem;
    border-radius: 50%;
    @media (min-width: 890px) {
        width: 6rem;
        height: 6rem;
    }
`;
const DescriptionWrapper = styled.div`
    width: 5rem;
    @media (min-width: 890px) {
        width: 6.5rem;
    }
`;
const PlaceName = styled.p`
    font-size: 0.7rem;
    margin: 0;
    @media (min-width: 890px) {
        font-size: 0.9rem;
    }
`;
const PlaceRating = styled.span`
    margin: 0 auto;
`;

interface PlaceType {
    places_id: number;
    name: string;
    region: string;
    city: string;
    category: string;
    description: string;
    image_url: string;
    avg_rating: number;
}

function Startview() {
    const [places, setPlaces] = useState<PlaceType[]>([]);
    const [search, setSearch] = useState("");
    const [displayedPlaces, setDisplayedPlaces] = useState(places);
    const [filteredPlaces, setFilteredPlaces] = useState(places);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/places", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((result) => {
                setPlaces(result);
                setDisplayedPlaces(result.slice(0, 10));
            });
    }, []);

    const renderCircles = (rating: number) => {
        const circles: JSX.Element[] = [];
        const fullCircle = Math.floor(rating); //gets rating number rounded down
        const halfCircle = rating % 1 >= 0.5; //calculate if there is half a number/rating left, true or false

        for (let i = 0; i < fullCircle; i++) {
            circles.push(
                <i
                    style={{
                        fontSize: ".5rem",
                        margin: "0 .1em",
                        color: "var(--color-secondary)",
                    }}
                    key={`full${i}`}
                    className="fa-solid fa-circle"
                ></i>
            );
        }
        if (halfCircle) {
            circles.push(
                <i
                    style={{
                        fontSize: ".5rem",
                        margin: "0 .1em",
                        color: "var(--color-secondary)",
                    }}
                    key="half"
                    className="fa-solid fa-circle-half-stroke"
                ></i>
            );
        }
        //make sure there is empty circles filled up if the rating is low
        while (circles.length < 5) {
            const key = `empty${circles.length}`
			circles.push(
                <i
                    style={{
                        fontSize: ".5rem",
                        margin: "0 .1em",
                        color: "var(--color-secondary)",
                    }}
					key={key}
                    className="fa-regular fa-circle"
                ></i>
            );
        }
        return circles;
    };

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        const searchInput = event.target.value;
        setSearch(searchInput);

        const filteredSearch = places.filter((place) =>	//filter array based on search input
            place.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredPlaces(filteredSearch);
    };

    const handleFilter: React.ChangeEventHandler<HTMLSelectElement> = (
        event
    ) => {
        const { name, value } = event.target;
        const queryParams = new URLSearchParams();

        if (name === "selectedRegion") {
            setSelectedRegion(value);
            queryParams.append("region", value); //add to query
            navigate(`/search?${queryParams}`); // Redirect to new page
        }
        if (name === "selectedCity") {
            setSelectedCity(value);
            queryParams.append("city", value); //add to query
            navigate(`/search?${queryParams}`); // Redirect to new page
        }
        if (name === "selectedCategory") {
            setSelectedCategory(value);
            queryParams.append("category", value); //add to query
            navigate(`/categories?${queryParams}`); // Redirect to new page
        }
    };

    return (
        <Fragment>
            <MainContainer>
                <MainWrapper>
                    <SearchWrapper>
                        <label htmlFor="search"></label>
                        <InputSearch
                            value={search}
                            onChange={onChangeHandler}
                            type="text"
                            name="search"
                            placeholder="Search city or place"
                        />
                        <IconSearch className="hgi hgi-stroke hgi-sharp hgi-search-01" />
                    </SearchWrapper>
                    <FilterWrapper>
                        <label htmlFor="selectedRegion" />
                        <Filter
                            onChange={handleFilter}
                            name="selectedRegion"
                            value={selectedRegion}
                        >
                            <FilterChoice value="Regions">Regions</FilterChoice>
                            <FilterChoice value="Chubu">Chubu</FilterChoice>
                            <FilterChoice value="Chugoku">Chugoku</FilterChoice>
                            <FilterChoice value="Hokkaido">
                                Hokkaido
                            </FilterChoice>
                            <FilterChoice value="Kansai">Kansai</FilterChoice>
                            <FilterChoice value="Kanto">Kanto</FilterChoice>
                            <FilterChoice value="Kyushu">Kyushu</FilterChoice>
                        </Filter>
                        <label htmlFor="selectedCity" />
                        <Filter
                            onChange={handleFilter}
                            name="selectedCity"
                            value={selectedCity}
                        >
                            <FilterChoice value="Cities">Cities</FilterChoice>
                            <FilterChoice value="Beppu">Beppu</FilterChoice>
                            <FilterChoice value="Fujinomiya">
                                Fujinomiya
                            </FilterChoice>
                            <FilterChoice value="Fukuoka">Fukuoka</FilterChoice>
                            <FilterChoice value="Hakone">Hakone</FilterChoice>
                            <FilterChoice value="Hatsukaichi">
                                Hatsukaichi
                            </FilterChoice>
                            <FilterChoice value="Himeji">Himeji</FilterChoice>
                            <FilterChoice value="Kyoto">Kyoto</FilterChoice>
                            <FilterChoice value="Mitaka">Mitaka</FilterChoice>
                            <FilterChoice value="Nikko">Nikko</FilterChoice>
                            <FilterChoice value="Osaka">Osaka</FilterChoice>
                            <FilterChoice value="Sapporo">Sapporo</FilterChoice>
                            <FilterChoice value="Tokyo">Tokyo</FilterChoice>
                        </Filter>
                        <label htmlFor="selectedCategory" />
                        <Filter
                            onChange={handleFilter}
                            name="selectedCategory"
                            value={selectedCategory}
                        >
                            <FilterChoice value="Categories">
                                Categories
                            </FilterChoice>
                            <FilterChoice value="Anime">Anime</FilterChoice>
                            <FilterChoice value="Culture">Culture</FilterChoice>
                            <FilterChoice value="Events">Events</FilterChoice>
                            <FilterChoice value="Food">Food</FilterChoice>
                            <FilterChoice value="History">History</FilterChoice>
                            <FilterChoice value="Nature">Nature</FilterChoice>
                            <FilterChoice value="Relaxation">
                                Relaxation
                            </FilterChoice>
                            <FilterChoice value="Shopping">
                                Shopping
                            </FilterChoice>
                        </Filter>
                    </FilterWrapper>
                    {filteredPlaces.length > 0 ? (
                        <PlacesContainer>
                            {filteredPlaces.map((place) => (
                                <PlacesCard key={place.places_id}>
                                    <PlacesLink
                                        to={`/places/${place.places_id}`}
                                    >
                                        <PlaceImg
                                            src={place.image_url}
                                            alt="Place image"
                                        />
                                        <DescriptionWrapper>
                                            <PlaceName>{place.name}</PlaceName>
                                            <PlaceRating>
                                                {renderCircles(
                                                    place.avg_rating
                                                )}
                                            </PlaceRating>
                                        </DescriptionWrapper>
                                    </PlacesLink>
                                </PlacesCard>
                            ))}
                        </PlacesContainer>
                    ) : (
                        <PlacesContainer>
                            {displayedPlaces.map((place) => (
                                <PlacesCard key={place.places_id}>
                                    <PlacesLink
                                        to={`/places/${place.places_id}`}
                                    >
                                        <PlaceImg
                                            src={place.image_url}
                                            alt="Place image"
                                        />
                                        <DescriptionWrapper>
                                            <PlaceName>{place.name}</PlaceName>
                                            <PlaceRating>
                                                {renderCircles(
                                                    place.avg_rating
                                                )}
                                            </PlaceRating>
                                        </DescriptionWrapper>
                                    </PlacesLink>
                                </PlacesCard>
                            ))}
                        </PlacesContainer>
                    )}
                </MainWrapper>
            </MainContainer>
        </Fragment>
    );
}

export default Startview;
