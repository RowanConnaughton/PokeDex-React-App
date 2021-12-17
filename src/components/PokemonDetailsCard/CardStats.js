import React from 'react'

const CardStats = ({pokemonAttack, pokemonDefense, pokemonHp} ) => {
    return (
        <div>
                    <h3 className="pokemon-card__title">Stats</h3>

                    <ul className="pokemon-card__stats">
                        <li>
                            <p className="pokemon-hp">{pokemonHp}</p>
                            <p >HP</p>
                        </li>
                        <li>
                            <p className="pokemon-attack">{pokemonAttack}</p>
                            <p >Attack</p>
                        </li>
                        <li>
                            <p className="pokemon-defense">{pokemonDefense}</p>
                            <p>Defense</p>
                        </li>
                    </ul>

        </div>
    )
}

export default CardStats
