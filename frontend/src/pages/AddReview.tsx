/* https://www.shecodes.io/athena/53051-how-to-submit-a-form-and-redirect-to-another-page-in-react
 https://js.devexpress.com/React/Documentation/20_2/Guide/UI_Components/TextArea/Handle_the_Value_Change_Event/
 https://www.dhiwise.com/post/how-to-handle-multi-line-text-input-with-react-textarea
*/
import styled from "styled-components";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CoverImg from "../assets/images/reviews-placeholder.jpg";
import RatingComponent from "../components/RatingComponent";

const Detailswrapper = styled.div`
    width: 100vw;
    height: 79vh;
    position: absolute;
    bottom: 0;
`;
const Header = styled.h2`
    font-size: 2.4rem;
    margin: 0 1.4rem 0;
`;
const PlaceImg = styled.img`
    width: 100vw;
    max-height: 27vh;
    object-fit: cover;
    border-radius: 2rem 2rem 5rem 5rem;
`;
const ContentContainer = styled.div`
    width: 75vw;
    margin: auto;
`;
const RatingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const RatingDescription = styled.span`
    margin: auto;
`;
const TextArea = styled.textarea`
    background-color: var(--color-neutral-light);
    width: 19rem;
    height: 6rem;
    border: none;
    border-radius: 2.5rem;
    padding: 0.5rem;
    @media (min-width: 890px) {
    }
`;
const BtnWrapper = styled.div`
    display: flex;
    margin: 1rem;
    @media (min-width: 890px) {
    }
`;
const CreateBtn = styled.input`
    width: 7rem;
    height: 2.5rem;
    background-color: var(--color-secondary);
    color: var(--color-neutral-light);
    border: none;
    border-radius: 3rem;
    padding: 0.5rem;
    margin: auto;
    cursor: pointer;
    font-size: 1rem;
    @media (min-width: 890px) {
    }
`;

interface FormType {
    rating: number;
    comment: string;
}

function AddReview() {
    const [inputValue, setInputValue] = useState<FormType>({
        rating: 0,
        comment: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;

        setInputValue({
            ...inputValue, // Keep existing form data
            [name]: value, // Update form data for the input field that changed
        });
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents default form submission behavior

        try {
            const response = await fetch("http://localhost:3000/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputValue),
            });

            console.log(response, "sent to backend");
            navigate("/places"); // Redirect to new page
        } catch (error) {
            console.error("error", error);
        }
    };

    return (
        <Fragment>
            <Detailswrapper>
                <Header>Add Review</Header>
                <PlaceImg src={CoverImg} alt="Place cover image" />
                <ContentContainer>
                    <form onSubmit={handleSubmit} method="post">
                        <RatingWrapper>
                            <p>How would you rate your experience?</p>
                            <RatingDescription>
                                <RatingComponent />
                            </RatingDescription>
                        </RatingWrapper>
                        <RatingWrapper>
                            <p>Please describe your experience:</p>
                            <label htmlFor="description"></label>
                            <TextArea
                                onChange={handleInputChange}
                                name="description"
                                placeholder="Write your comment here..."
                            />
                        </RatingWrapper>
                        <BtnWrapper>
                            <CreateBtn type="submit" value="Add Review" />
                        </BtnWrapper>
                    </form>
                </ContentContainer>
            </Detailswrapper>
        </Fragment>
    );
}

export default AddReview;
