/* https://github.com/react-map/react-map?tab=readme-ov-file#usage 
https://stackoverflow.com/questions/37512497/remove-whitespace-from-an-argument-into-a-js-function*/
import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import Japan from "@react-map/japan";

const ExploreContainer = styled.div`
    width: 100vw;
    height: 70vh;
    position: fixed;
    bottom: 0;
`;
const Header = styled.h2`
    font-size: 2rem;
    margin: 0 1.4rem 3rem;
`;
const MapContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
`;

const regions = [
    "Hokkaido",
    "Tohoku",
    "Kanto",
    "Chubu",
    "Kansai",
    "Chugoku",
    "Shikoku",
    "Kyushu",
    "Okinawa",
];

function ExploreView() {
    const navigate = useNavigate();
    const handleSelect = (r: string | null) => {
        if (r === null) return
		
		const queryValue = r
            .trim()
            .split(" ")[0]
            .replace(/[^\x20-\x7E]/g, "");

        if (regions.includes(queryValue)) {
            fetch(`api/places?region=${queryValue}`, {
                method: "GET",
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.STATUS_CODES === 404) {
                        console.log("not found");
                    } else {
                        const fetchedRegion = data[0].region;
                        navigate(`/search?region=${fetchedRegion}`); // Redirect to new page
                    }
                });
        } else {
            fetch(`api/places?city=${queryValue}`, {
                method: "GET",
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.STATUS_CODES === 404) {
                        console.log("not found");
                    } else {
                        const fetchedCity = data[0].city;
                        navigate(`/search?city=${fetchedCity}`); // Redirect to new page
                    }
                });
        }
    };

    return (
        <Fragment>
            <ExploreContainer>
                <Header>Explore</Header>
                <MapContainer>
                    <Japan
                        size={350}
                        hoverColor="var(--color-secondary)"
                        type="select-single"
                        hints={true}
                        hintTextColor="var(--color-neutral-dark)"
                        hintBackgroundColor="var(--color-neutral-light)"
                        onSelect={handleSelect}
                    />
                </MapContainer>
            </ExploreContainer>
        </Fragment>
    );
}

export default ExploreView;
