import React from 'react';
import {useDispatch} from 'react-redux';
import {filterChange} from '../reducers/filterReducer';
const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const fil = event.target.value;
    dispatch(filterChange(fil));
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter