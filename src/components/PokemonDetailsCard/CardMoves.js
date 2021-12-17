import React from "react";

const CardMoves = ({ pokemonMoveOne, pokemonMoveTwo, pokemonMoveThree }) => {
  return (
    <div>
      <h3 className="pokemon-card__title">Moves</h3>

      <ul className="pokemon-card__moves">
        <li>
          <p className="pokemon-move-one">{pokemonMoveOne}</p>
        </li>
        <li>
          <p className="pokemon-move-two">{pokemonMoveTwo}</p>
        </li>
        <li>
          <p className="pokemon-move-three">{pokemonMoveThree}</p>
        </li>
      </ul>
    </div>
  );
};

export default CardMoves;
