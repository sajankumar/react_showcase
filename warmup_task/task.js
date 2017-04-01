'use strict';
var usersList = [
    {id: 2, active: false, registrationDate: new Date(2016, 11, 1), requestedAmount: 10000},
    {id: 1, active: false, registrationDate: new Date(2016, 10, 15), requestedAmount: 5000},
    {id: 3, active: true,  registrationDate: new Date(2016, 10, 14), requestedAmount: 5000},
    {id: 5, active: true,  registrationDate: new Date(2017, 0, 2), requestedAmount: 5000},
    {id: 4, active: true,  registrationDate: new Date(2016, 10, 14), requestedAmount: 5500},
];

function usersComparator(userA, userB) {
    if(userA.active !== userB.active) {
        return userA.active - userB.active;
    }
    return userA.id - userB.id;
};

function sortUsers(users) {
    return users.sort(usersComparator);
};

console.log(sortUsers(usersList)); //this print the userList array in the following order 1,2,3,4,5


//task 2

var collapsibleToggle = document.getElementById('collapsibleToggle');
var collapsibleContent = document.querySelector('.collapsible__content');
var isCollapsible = false; 

collapsibleToggle.addEventListener('click', function(evt) {
    isCollapsible = !isCollapsible;
    if(isCollapsible) {
       collapsibleContent.classList.add('opened');
       collapsibleContent.classList.remove('closed');
    }else {
       collapsibleContent.classList.remove('opened');
       collapsibleContent.classList.add('closed');
    } 
});

