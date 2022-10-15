import React from 'react'

const Players = ({firstPlayer, secondPlayer, isFPTurn}) => {

  return (
    <div className='player-container'>
        <span>First Player: {firstPlayer}</span>
        <span>Second Player: {secondPlayer}</span>
        <span style={{color: `${isFPTurn ? 'red' : 'blue'}`, margin: 'auto', marginTop: '10px', fontSize: '20px'}}>{isFPTurn ? firstPlayer : secondPlayer}'s turn</span>
    </div>
  )
}

export default Players