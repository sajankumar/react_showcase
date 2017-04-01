import React, { Component } from 'react';
import InputBox from './inputboxPresentation.component';
import BankAccount from './bankAccountPresentation.component';
var _ = require('lodash');

/*
 * This is main FormContainer class, This is handling form validations.
 * author sajankumar vijayan
 */
class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.validate = this.validate.bind(this);
        this.isSpecialCharacter = this.isSpecialCharacter.bind(this);
        this.isNumbers = this.isNumbers.bind(this);
        this.isValidEmailAddress = this.isValidEmailAddress.bind(this);
        this.resetErrors = this.resetErrors.bind(this);
        this.focus = this.focus.bind(this);
        this.addBank = this.addBank.bind(this);
        this.submit = this.submit.bind(this);
        this.removeBankAccount = this.removeBankAccount.bind(this);
    
        this.value = {
            'First name': '',
            'Last name': '',
            'Email': ''
        };

        this.inputErrors = {
            'First name': '',
            'Last name': '',
            'Email': '',
            'IBAN': '',
            'Bank name': ''
          },

        this.bank = {
          isAdded: true,
          accounts: []
        }
        this.state = {
          error: this.inputErrors,
          bank: this.bank
        };
        this.bankAccountCount = -1;
    };
    /* This function check special characters, return false if special character is found. 
        @param {String} 'str' must required
    */
    isSpecialCharacter(str) {
        var specialChars = '!@#$%^&*()+=-[]\\\';,./{}|\":<>?';
        for(var i=0; i<str.length; i++) {
            if(specialChars.indexOf(str.charAt(i)) !== -1) {
                return false;
            }
        }
        return true;
    };
    /*This function check numbers, if found will return true
     @param {String} 'str' must required.
    */
    isNumbers(str) {
        if( str.match(/[0-9]+/g) ) {
          return true;
        }
        return false;
    };
    /*
      This function check is email address is valid or not
      @param {String} 'str' must required
    */
    isValidEmailAddress(str) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(str);
    };

    /*
     Event handler for input fields this will invoke when user focusing on input field.
    */
    focus(evt) {
        this.resetErrors();
    };

    resetErrors() {
        this.setState({
         error: { 
            'First name': '',
            'Last name': '',
            'Email': '',
            'IBAN': '',
            'Bank name': ''     
        }});
    }
    /*
     Event handker for input fields this will invoke when user out from focus on input field.
    */
    validate(evt) {
        let currentTargetName = evt.target.name;
        let userInput = evt.target.value;
        if(currentTargetName !== 'IBAN' && currentTargetName !== 'Bank name') {
            this.value[currentTargetName] = userInput; // this hold users input.
        }
        let msg = '';
        if( userInput === '' ) {
            msg = currentTargetName + ' should not be empty';
        }else{
            msg = '';
        }
        if(currentTargetName === 'IBAN') {
            let currentIbanElem = document.getElementsByClassName(evt.target.id)[0];
            let iban = require('iban');
            if(!iban.isValid(userInput)) {
                msg = currentTargetName + ' is not valid';
                currentIbanElem.innerHTML = msg;
            }else {
                msg = '';
                currentIbanElem.innerHTML = msg;
            }    
            return;
        }

        if(currentTargetName === 'Bank name') {
            let currentbankNameElem = document.getElementsByClassName('banknamestatus'+evt.target.id)[0];
            currentbankNameElem.innerHTML = msg;
            return;
        }
        switch(evt.target.type) {
            case 'text':
                if(!this.isSpecialCharacter(userInput)) {
                    msg = currentTargetName + ' should not contains specialCharacter.';
                }
                if(this.isNumbers(userInput)) {
                    msg = currentTargetName + ' should not contains numbers.';
                }
                break;
            case 'email':
                if(!this.isValidEmailAddress(userInput)) {
                    msg = currentTargetName + ' address must be a valid one.';
                }
                break;
            default:
        }
        this.inputErrors[currentTargetName] = msg;
        this.setState({error: this.inputErrors});
    };
    /*
     This function for adding bank accounts
    */
    addBank() {
        this.bankAccountCount++;
        this.bank.accounts.push(this.bankAccountCount);
        this.bank.isAdded = true;
        this.setState({bank: this.bank});
    };
    /*
     This function for removing a bank accounts.
    */
    removeBankAccount(evt) {
        let currentId = evt.target.id;
        let index = this.bank.accounts.indexOf(parseInt(currentId));
        if(index > -1) {
            this.bank.accounts.splice(index, 1);
            this.setState({bank: this.bank});
        }
        if(this.bank.accounts.length === 0) {
            this.bankAccountCount = -1;
        }
    };
    /*
     This funtion for when user submitting the form. 
    */
    submit() {
        let msg = '';
        if(this.value['First name'] !== '') {
          if(!this.isSpecialCharacter(this.value['First name'])) {
            msg = 'First name should not contains specialCharacter.';
            this.inputErrors['First name'] = msg;
          }
          if(this.isNumbers(this.value['First name'])) {
            msg = 'First name should not contains numbers.';
            this.inputErrors['First name'] = msg;
          }  
        }else {
          msg = 'First name should not be empty';
          this.inputErrors['First name'] = msg;
        }

        if(this.value['Last name'] !== '') {
          if(!this.isSpecialCharacter(this.value['Last name'])) {
            msg = 'Last name should not contains specialCharacter.';
            this.inputErrors['Last name'] = msg;
          }
          if(this.isNumbers(this.value['Last name'])) {
            msg = 'Last name should not contains numbers.';
            this.inputErrors['Last name'] = msg;
          }
        }else {
          msg = 'Last name should not be empty';
          this.inputErrors['Last name'] = msg;
        }
        if(!this.isValidEmailAddress(this.value['Email'])) {
          msg = 'Email address must be a valid one.';
          this.inputErrors['Email'] = msg;
        }

     
        if(this.bank.accounts.length > 0) {
          this.value.bankAccounts = [];
          let ibanValid = require('iban');
          _.each(this.bank.accounts, (val, key) => {
                let iban = document.getElementsByClassName('ibanval'+val)[0];
                let bankName = document.getElementsByClassName('bankname'+val)[0];
                if(!ibanValid.isValid(iban.value)) {
                    msg = 'IBAN is not valid';
                    document.getElementsByClassName(val)[0].innerHTML = msg;   
                }
                if(bankName.value === '') {
                    msg = 'Bank name should not be empty';
                    document.getElementsByClassName('banknamestatus'+val)[0].innerHTML = msg;
                }
                this.value.bankAccounts.push({'iban': iban.value, 'bankName': bankName.value});
            });
            if(msg !== '') {
                this.setState({error: this.inputErrors});
                return;
            }

            let formData = {
                'Form data': this.value,
            };
            alert(JSON.stringify(formData));
        }else {
            this.bank.isAdded = false;
            this.setState({bank: this.bank});
        }
    };
    /*
     This is from parent class 'Component'. 
    */
    render() {
        return (
            <section className="form">
                <header>
                    <h1 className="header">Register account</h1>
                </header>
                <InputBox label='First name' type='text'
                    validate={this.validate} errorMsg={this.state.error['First name']} 
                    name="First name" focus={this.focus}  />
                <InputBox label='Last name' type='text'
                    validate={this.validate} errorMsg={this.state.error['Last name']}
                    name="Last name" focus={this.focus}  />
                <InputBox label='Email' type='email' 
                    validate={this.validate} focus={this.focus}  errorMsg={this.state.error['Email']} 
                    name="Email"  />
                <h1>Bank accounts</h1>
                <span className='text-danger bankAccountRequired'>{(!this.state.bank.isAdded) ? 'You should provide atleast one bank account' : ''}</span>
                {
                    this.state.bank.accounts.map((item) => (
                        <section className='banks' key={item}>
                            <BankAccount remove={this.removeBankAccount} id={item}
                                validate={this.validate} focus={this.focus}  />
                        </section>
                    ))
                }
                <div className='buttonContainer'>
                    <button className='btn btn-default bankAccount' onClick={this.addBank}>
                        <icon className='glyphicon glyphicon-plus' /> Add bank account </button>
                    <button className='btn btn-warning submit' onClick={this.submit}> Submit! </button>
                </div>
            </section>
        );
    }
};

export default FormContainer;