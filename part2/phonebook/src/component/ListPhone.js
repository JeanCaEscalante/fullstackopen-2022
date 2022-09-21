import React from 'react'


const Item = ({person,viewPerson,removePerson}) =>  <tr>
                                                        <td>{person.name}</td> 
                                                        <td>{person.number}</td>
                                                        <td>
                                                            <button className='action info' onClick={viewPerson}><span className="material-symbols-outlined">visibility</span></button>
                                                            <button className='action danger' onClick={removePerson(person)}><span className="material-symbols-outlined">delete</span></button>
                                                        </td>
                                                    </tr>

const ListPhone = ({phoneToShow,viewPerson,removePerson}) => <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <th>Name</th>
                                                                        <th>Number</th>
                                                                        <th>...</th>
                                                                    </tr>
                                                                    {phoneToShow.map((person) => <Item key={person.id} person={person} viewPerson={viewPerson} removePerson={removePerson}  /> )}
                                                                </tbody>
                                                            </table>

export default ListPhone