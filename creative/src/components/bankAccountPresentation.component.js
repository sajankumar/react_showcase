import React from 'react';


const BankAccount = ({errorMsg, remove, id, validate, focus, onUpdate}) => {
  return (
        <div className='inputContainer'>
            <div className='ibanWrapper'>
                <label>IBAN</label>
                <div className='group'>
                    <input type='text' className={'form-control ibanval'+id} name='IBAN' id={id}
                    onBlur={validate} onFocus={focus} onKeyDown={onUpdate} />
                    <span onClick={remove} ><icon id={id} className='glyphicon glyphicon-trash' /></span>
                </div>
                <span className={'text-danger '+ id}>{errorMsg}</span>
            </div>
            <div className='bankNameWrapper'>
                <label>Bank name</label>
                <input type='text' className={'form-control bankname'+id } name='Bank name' id={id}
                onBlur={validate} onFocus={focus} onKeyDown={onUpdate} />
                <span className={'text-danger banknamestatus'+id} >{errorMsg}</span>
            </div>
        </div>
    );
};

export default BankAccount;