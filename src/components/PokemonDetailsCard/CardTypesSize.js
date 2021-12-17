import React from 'react'

const CardTypesSize = ({pokemonWeight, pokemonHeight, pokemonTypeOne, pokemonTypeTwo}) => {
    return (
        <div className="pokemon-card__types-size">

                    <div className="pokemon-card__types">
                        <p className="pokemon-type-one">{pokemonTypeOne}</p>
                        <p className={`pokemon-type-two ${pokemonTypeTwo ? "show" : "hide" }`}>{pokemonTypeTwo}</p>
                    </div>

                    <div className="pokemon-card__size">
                        <p >Weight: <span className="pokemon-weight">{pokemonWeight}</span>kg</p>
                        <p >Height: <span className="pokemon-hieght">{pokemonHeight}</span>m</p>
                    </div>

                </div>
    )
}

export default CardTypesSize
