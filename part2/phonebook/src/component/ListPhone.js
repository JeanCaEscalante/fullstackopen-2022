import React from 'react'


const Item = ({person,viewPerson,removePerson}) =>  <tr>
                                <td>{person.name}</td> 
                                <td>{person.number}</td>
                                <td><button onClick={viewPerson}>detail</button></td>
                                <td><button onClick={removePerson(person)}>delete</button></td>
                                    </tr>

const ListPhone = ({phoneToShow,viewPerson,removePerson}) => <table><tbody>{phoneToShow.map((person) => <Item key={person.id} person={person} viewPerson={viewPerson} removePerson={removePerson}  /> )}</tbody></table>

export default ListPhone