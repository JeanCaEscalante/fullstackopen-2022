import React from 'react'

const Detail = (props) => {

  return (
    <div className='column detail card'>
      <h3>View Detail</h3>
      <p>Nombre:  {props.name}</p>
      <p>Number: {props.number}</p>
    </div>
  )
}

export default Detail