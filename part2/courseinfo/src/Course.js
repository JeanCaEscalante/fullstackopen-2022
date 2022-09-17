import React from 'react';

const Header = ({title}) => <><h1>{title}</h1></>

const Part = ({part}) => <><p>{part.name} {part.exercises}</p></>

const Content = ({parts}) => parts.map((part) => <Part key={part.id} part={part} />)
    
const Total = ({parts}) => parts.reduce((sum, value) => sum + value.exercises,0)

const Course = ({ courses }) => 
  <>
      {courses.map((course) => 
        <div key={course.id}>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <strong>total of <Total parts={course.parts} /> exercises</strong>
        </div>
      
      )}

  </>


export default Course