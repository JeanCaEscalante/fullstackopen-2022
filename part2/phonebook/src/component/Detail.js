import React from 'react'

const Detail = (props) => {

  return (
    <div>
      <h2>View Detail</h2>
      <p>Nombre:  {props.name}</p>
      <p>Number: {props.number}</p>
    </div>
  )
}

export default Detail