import React from 'react';

const InputBox = ({label, type, validate, errorMsg, name, focus, onUpdate}) => {
   return (
        <div className='inputContainer'>
            <label>{label}</label>
            <input type={type} className='form-control'
            onBlur={validate} name={name} onFocus={focus} onKeyDown={onUpdate}/>
            <span className="text-danger">{errorMsg}</span>
        </div>
    )
};
export default InputBox;
