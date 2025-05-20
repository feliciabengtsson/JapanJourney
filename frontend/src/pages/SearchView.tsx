import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

import eventsImg from "../assets/images/reviews-placeholder.jpg";

const SearchContainer = styled.div`
    width: 100vw;
    height: 90vh;
    position: fixed;
    bottom: 0;
`;
const Header = styled.h2`
    font-size: 2rem;
    margin: 0 1.4rem 0;
`;
const SearchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
	height: 85vh;
	overflow-y: auto;
`;
const ContentCard = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 79vw;
    height: 14vh;
    border-radius: 3rem;
    background: var(--color-neutral-light);
    background-size: cover;
    margin: 2rem auto;
`;
const TextWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 1rem;
`;
const Arrow = styled.i`
    font-size: 1.5rem;
    color: var(--color-secondary);
`;
const ImgWrapper = styled.div`
    height: inherit;
`;

function SearchView() {
    const [searchParams] = useSearchParams();
    const region = searchParams.get("region");
    const city = searchParams.get("city");
    const category = searchParams.get("category");
    console.log(city, "city");

    return (
        <Fragment>
            <SearchContainer>
                <Header>
                    {region}
                    {city}
                    {category}
                </Header>
				<SearchWrapper>
                    <Link to={`/reviews`}>
                        <ContentCard>
                            <TextWrapper>
                                <p>Anime</p>
                                <Arrow className="hgi hgi-stroke hgi-arrow-right-01" />
                            </TextWrapper>
                            <ImgWrapper>
                                <img
                                    src={eventsImg}
                                    style={{
                                        height: "inherit",
                                        borderRadius: "0 3rem 3rem 0",
                                    }}
                                    alt="Events placeholder image"
                                />
                            </ImgWrapper>
                        </ContentCard>
                        <ContentCard>
                            <TextWrapper>
                                <p>Culture</p>
                                <Arrow className="hgi hgi-stroke hgi-arrow-right-01" />
                            </TextWrapper>
                            <ImgWrapper>
                                <img
                                    src={eventsImg}
                                    style={{
                                        height: "inherit",
                                        borderRadius: "0 3rem 3rem 0",
                                    }}
                                    alt="Events placeholder image"
                                />
                            </ImgWrapper>
                        </ContentCard>
                        <ContentCard>
                            <TextWrapper>
                                <p>Events</p>
                                <Arrow className="hgi hgi-stroke hgi-arrow-right-01" />
                            </TextWrapper>
                            <ImgWrapper>
                                <img
                                    src={eventsImg}
                                    style={{
                                        height: "inherit",
                                        borderRadius: "0 3rem 3rem 0",
                                    }}
                                    alt="Events placeholder image"
                                />
                            </ImgWrapper>
                        </ContentCard>
                        <ContentCard>
                            <TextWrapper>
                                <p>Food</p>
                                <Arrow className="hgi hgi-stroke hgi-arrow-right-01" />
                            </TextWrapper>
                            <ImgWrapper>
                                <img
                                    src={eventsImg}
                                    style={{
                                        height: "inherit",
                                        borderRadius: "0 3rem 3rem 0",
                                    }}
                                    alt="Events placeholder image"
                                />
                            </ImgWrapper>
                        </ContentCard>
                        <ContentCard>
                            <TextWrapper>
                                <p>History</p>
                                <Arrow className="hgi hgi-stroke hgi-arrow-right-01" />
                            </TextWrapper>
                            <ImgWrapper>
                                <img
                                    src={eventsImg}
                                    style={{
                                        height: "inherit",
                                        borderRadius: "0 3rem 3rem 0",
                                    }}
                                    alt="Events placeholder image"
                                />
                            </ImgWrapper>
                        </ContentCard>
                        <ContentCard>
                            <TextWrapper>
                                <p>Nature</p>
                                <Arrow className="hgi hgi-stroke hgi-arrow-right-01" />
                            </TextWrapper>
                            <ImgWrapper>
                                <img
                                    src={eventsImg}
                                    style={{
                                        height: "inherit",
                                        borderRadius: "0 3rem 3rem 0",
                                    }}
                                    alt="Events placeholder image"
                                />
                            </ImgWrapper>
                        </ContentCard>
                        <ContentCard>
                            <TextWrapper>
                                <p>Relaxation</p>
                                <Arrow className="hgi hgi-stroke hgi-arrow-right-01" />
                            </TextWrapper>
                            <ImgWrapper>
                                <img
                                    src={eventsImg}
                                    style={{
                                        height: "inherit",
                                        borderRadius: "0 3rem 3rem 0",
                                    }}
                                    alt="Events placeholder image"
                                />
                            </ImgWrapper>
                        </ContentCard>
                        <ContentCard>
                            <TextWrapper>
                                <p>Shopping</p>
                                <Arrow className="hgi hgi-stroke hgi-arrow-right-01" />
                            </TextWrapper>
                            <ImgWrapper>
                                <img
                                    src={eventsImg}
                                    style={{
                                        height: "inherit",
                                        borderRadius: "0 3rem 3rem 0",
                                    }}
                                    alt="Events placeholder image"
                                />
                            </ImgWrapper>
                        </ContentCard>
                    </Link>
                </SearchWrapper>
            </SearchContainer>
        </Fragment>
    );
}

export default SearchView;
