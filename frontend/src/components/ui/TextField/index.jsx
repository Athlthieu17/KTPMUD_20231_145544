import React from 'react'
import "./textField.css"

function TextField({title, value, onChange, disable=false, flexRow=false, ...other}) {
  return (
    <div className={`text-field ${flexRow ? 'flex-row' : ''}`}>
        <label className="text-field__label block">{title}</label>
        <input 
        style={{
          backgroundColor: 'rgba(217, 217, 217, 0.41)',
          border: '1px solid'
        }} 
        className="text-field__input"
        type={other.type || 'text'}
         disabled={disable} value={value} onChange={onChange} {...other}/>
    </div>
  )
}

export default TextField