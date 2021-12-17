import React from 'react'

const CardImage = ({pokeFrontImage}) => {
    return (
        <div >
        <img src={pokeFrontImage} alt="pokemon" className="pokemon-card__image" />
        </div>
    )
}

export default CardImage
