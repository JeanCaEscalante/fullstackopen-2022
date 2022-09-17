import React from 'react'


const Form = (props) => {

  const {AddPerson,newName,handleNameChange,newNumber,handleNumberChange} = props
  return (
    <>
      <form onSubmit={AddPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          Numbers: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default Form