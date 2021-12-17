import React from 'react';



const List = ({pokemonName, handlelistItemClick}) => {


    return (
        <div className="pokemon-list-items">
                {pokemonName.map(p =>(<div key={p} onClick={handlelistItemClick} className="list-item">{p}</div>))}
                
            </div>
    )
}

export default List
