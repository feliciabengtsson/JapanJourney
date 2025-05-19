/* https://dev.to/annaqharder/how-to-make-star-rating-in-react-2e6f 
https://github.com/smastrom/react-rating*/
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
const circleShape = (
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/>
);
const myStyles = {
    itemShapes: circleShape,
    itemStrokeWidth: 30,
    activeFillColor: "var(--color-secondary)",
    activeStrokeColor: "var(--color-secondary)",
    inactiveFillColor: "none",
    inactiveStrokeColor: "var(--color-secondary)",
};

function RatingComponent() {
    const [rating, setRating] = useState(0); // Initial value

    return (
        <Fragment>
            <Rating
                style={{ maxWidth: 250 }}
                value={rating}
                onChange={setRating}
				itemStyles={myStyles}
            />
        </Fragment>
    );
}

export default RatingComponent;
