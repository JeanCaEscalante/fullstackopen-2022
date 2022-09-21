import React from 'react'


const Form = (props) => {

  const {AddPerson,newName,handleNameChange,newNumber,handleNumberChange} = props
  return (
    <>
      <form className='form' onSubmit={AddPerson}>
        <div  className="group">
            <input placeholder="Name" className="input" value={newName} onChange={handleNameChange}/> 
        </div>
        <div className="group">
            <input placeholder="Numbers" className="input" value={newNumber} onChange={handleNumberChange}/> 
        </div>
        <div>
          <button type="submit" className="learn-more">
            <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
            </span>
            <span className="button-text">Add</span>
          </button>
        </div>
      </form>
    </>
  )
}

export default Form