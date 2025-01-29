import React, { useState } from "react";
import { Star } from "./Star";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

export const StarRaiting = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  defaultRating = 0,
  masssages = [],
  setUserStarRating,
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color: color,
    fontSize: `${size / 1.5}px`,
  };
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span key={i - 1}>
            <Star
              key={i}
              color={color}
              size={size}
              onRate={() => {
                setRating(i + 1);
                setUserStarRating(i + 1);
              }}
              full={hoverRating !== 0 ? hoverRating >= i + 1 : rating >= i + 1}
              onHoverIn={() => setHoverRating(i + 1)}
              onHoverLeave={() => setHoverRating(0)}
            />
          </span>
        ))}
      </div>
      <p style={textStyle}>
        {masssages.length === maxRating
          ? masssages[hoverRating !== 0 ? hoverRating - 1 : rating - 1]
          : hoverRating !== 0
          ? hoverRating
          : rating || ""}
      </p>
    </div>
  );
};

StarRaiting.prototype = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  defaultRating: PropTypes.number,
  masssages: PropTypes.array,
};
