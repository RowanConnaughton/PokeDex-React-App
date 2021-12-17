import React from 'react'

const CardHeader = ({pokemonName, pokemonId}) => {
    return (
        <div className="pokemon-card__header">
                    <h1 className="pokemon-name">{pokemonName}</h1>
                    <p className="pokemon-id">#{pokemonId}</p>
        </div>
    )
}

export default CardHeader
