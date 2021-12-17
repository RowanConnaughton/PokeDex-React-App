import React from 'react'

const ListButtons = ({gotoNextPage, gotoPrevPage}) => {
    return (
        <div className="pokemon-list__buttons">
         {gotoPrevPage && <button onClick={gotoPrevPage} className="btn">Previous</button> } 
           {gotoNextPage && <button onClick={gotoNextPage} className="btn">Next</button>} 
            </div>
    )
}

export default ListButtons
