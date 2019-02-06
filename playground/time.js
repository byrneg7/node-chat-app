const moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());

// months = [
//     'Jan', 'Feb', "March", "April", "May", "June",
//     "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

// let month = () => {
//     console.log(months[(new Date).getMonth()]);
// }
// month();

var someTimestamp = moment().valueOf();
console.log(someTimestamp)
//10:35 am
//padded mins 07 , dont pad hours