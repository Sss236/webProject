import React from "react";

import "./card.css";

export default function ProfileCard({ imageSource, title, text }) {
  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <img src={imageSource} alt="Logo" className="card-img-top" />
      </div>
      <div className="card-body text-light">
        <h4 className="card-title">{title}</h4>
        <p className="card-text text-secondary">
          {text
            ? text
            : "This user does not have an introduction"}
        </p>
      </div>
    </div>
  );
}
