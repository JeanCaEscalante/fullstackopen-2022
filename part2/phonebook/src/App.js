import React, { useState, useEffect  } from 'react'


import ListPhone from './component/ListPhone';
import FilterPhone from './component/FilterPhone';
import PersonForm from './component/PersonForm';
import Detail from './component/Detail';

import Notification from './component/Notification';

import PhoneBook from './service/PhoneBook';

import './App.css';

const App = () => {


  const [ persons, setPersons ] = useState([]) 

  const [filter,setFilter] = useState('')
  const [ newName, setNewName ] = useState('')
  const [newNumber,setNewNumber] =useState('')
  const [name,setName] =useState('')
  const [number,setNumber] =useState('')
  const [notify,setNotify] =useState({})

  useEffect(() => {
    PhoneBook.getAll().then(response => setPersons(response))
  }, [])

  setTimeout(() => {
    
    setNotify({name:null})

  }, 10000)

  const AddPerson = (event) => {
      event.preventDefault();
      
      const newPerson = {
        name:newName,
        number:newNumber
      }

      let notify = {
        name:'sucess',
        message:''
      }

      const person = persons.filter((person) => person.name === newPerson.name)

      if(person.length === 1){

        if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
          
          PhoneBook.update(person[0]['id'],newPerson).then((response) => {
               setPersons(persons.map((current) => (current.id !== person[0]['id']) ? current : response))
               notify.message =`update ${newPerson.name}`
               setNotify(notify)
              
          }).catch(error => {

            setNotify({name:'error',message:`the information of ${newPerson.name}, has already been removed from server`})
            setPersons(persons.filter(item =>  item.id !== person[0]['id']));
          })
        }
        
        
      }else{
        
      

        PhoneBook.create(newPerson).then((response) =>  {
          
            setPersons(persons.concat(response))
            notify.message = `added ${response.name}`
            setNotify(notify)
            
      })
       
        setNewName('');
        setNewNumber('');
      }
      
  }

  const viewPerson = (event) => {
      let fila = event.target.parentNode.parentNode;
      setName(fila.children[0].innerHTML)
      setNumber(fila.children[1].innerHTML)
  }

  const removePerson = (person) => () => {
    
    let notify = {
      name:'error',
      message:''
    }

    if (window.confirm(`Deleted ${person.name}?`)) {
      PhoneBook.remove(person.id).then(() => {
       notify.message = `Delete ${person.name}`
       setPersons(persons.filter(item =>  item.id !== person.id));
       setNotify(notify)
      
    }).catch(error => {
            
            setNotify({name:'error',message:`the information of ${person.name}, has already been removed from server`})
            setPersons(persons.filter(item =>  item.id !== person.id));
    })
    }

  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const phoneToShow = filter.length === 0
    ? persons
    : persons.filter(person => person.name.match(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notify} />
        <FilterPhone filter={filter}  handleFilterChange={handleFilterChange}/>

      <PersonForm AddPerson={AddPerson}  newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ListPhone phoneToShow={phoneToShow} viewPerson={viewPerson} removePerson={removePerson}/>

      <Detail name={name} number={number}/>
    </div>
  )
}

export default App