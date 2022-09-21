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
        name1:newName,
        number1:newNumber
      }

      let notify = {
        name:'sucess',
        message:''
      }

      const person = persons.filter((person) => person.name === newPerson.name1)

      if(person.length === 1){

        if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
          const newPerson = {
            id: person[0]['id'],
            name:person[0]['name'],
            number:newNumber
          }
    
          PhoneBook.update(person[0]['id'],{number1: newNumber}).then((response) => {
              
              if('error' in response){
                setNotify({name:'error',message:response.error})
              }
              else{
               setPersons(persons.map((current) => (current.number !== person[0]['number']) 
                                                  ? current 
                                                  : { name:person[0]['name'],number:newNumber,id: person[0]['id']}))
               notify.message =`update ${newPerson.name}`
               setNotify(notify)

              }
              
          }).catch(error => {

            setNotify({name:'error',message:`the information of ${newPerson.name}, has already been removed from server`})
            setPersons(persons.filter(item =>  item.id !== person[0]['id']));
          })
        }
        
        
      }else{

        PhoneBook.create(newPerson).then((response) =>  {
          if('id' in response){
            setPersons(persons.concat(response))
            setNotify({
              name:'sucess',
              message:`added ${response.name}`
            })
          }else{
            setNotify({name:'error',message:response.error})
          }
        })
        setNewName('');
        setNewNumber('');
       }
    }

  const viewPerson = (event) => {
      let fila = event.target.parentNode.parentNode;
      setName(fila.parentNode.children[0].innerHTML)
      setNumber(fila.parentNode.children[1].innerHTML)
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
      <header>
        <h2>Phonebook</h2>
      </header>
      <Notification notification={notify} />
      
      <div className='container'>
        <section className='column'>
          <h2>Registration Number</h2>
          <PersonForm AddPerson={AddPerson}  newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
        </section>
        <section className='column'>
          <h2>Numbers</h2>
          <div className='container'>
            <FilterPhone filter={filter}  handleFilterChange={handleFilterChange}/>
            <Detail name={name} number={number}/>
          </div>
          <ListPhone phoneToShow={phoneToShow} viewPerson={viewPerson} removePerson={removePerson}/>
        </section>
      </div>
    </div>
  )
}

export default App