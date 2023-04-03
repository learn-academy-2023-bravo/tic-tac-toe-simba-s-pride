import React from 'react'

const Square = ({square, index, handleGamePlay}) => {
  const handleClick = () => {
    handleGamePlay(index)
  }
  return (
    <div className="squares" onClick={handleClick}>{square}</div>
  )
}
export default Square
