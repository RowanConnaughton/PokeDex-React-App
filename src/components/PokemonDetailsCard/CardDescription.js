import React from "react";

const CardDescription = ({ pokemonDescriptionOne, pokemonDescriptionTwo }) => {
  return (
    <div className="pokemon-card__description">
      <h2 className="pokemon-card__title">Description</h2>
      <p className="pokemon-desc-one">{pokemonDescriptionOne}</p>
      <p className="pokemon-desc-two">{pokemonDescriptionTwo}</p>
    </div>
  );
};

export default CardDescription;
