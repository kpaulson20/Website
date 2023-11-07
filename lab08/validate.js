"use strict";
const datePattern = /^(?:(?:(?:0[1-9]|1[0-2])\/(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])\/(?:29|30)|(?:0[13578]|1[02])\/31)\/(?:18|19|20)\d\d|02\/29\/(?:(?:18|19|20)(?:04|08|[2468][048]|[13579][26])|2000))$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

$(document).ready ( () => {
   //set values equal to elements on the form based on ID values
   const txtArrivalDate = $('#arrival-date');
   const txtNights = $('#nights');
   //const txtAdults = $('#adults');
   //const txtChildren = $('#children');
   const txtName = $('#name');
   const txtEmail = $('#email');
   const txtPhone = $('#phone');

   //boolean to track validity of entries
   let isValid;
   const makeInvalid = (textbox, message) => {
       //add validation message to the next element after the textbox
       textbox.next().text(message);
       //add is-invalid class to textbox to outline in red
       textbox.addClass('is-invalid');
       //set Boolean to false and prevent form submission
       isValid = false;
   }
   const makeValid = (textbox) => {
       //clear validation message from next element after the textbox
       textbox.next().text('');
       //remove is-invalid class from textbox
       textbox.removeClass('is-invalid');
   }
   //handle click event of the Complete Reservation button
   $('#complete-reservation').on('click', (evt) => {
       //set inValid variable to true
       isValid = true;
       //set values equal to the contents of the input elements
       const arrivalDate = txtArrivalDate.val().trim();
       const nights = txtNights.val().trim();
       const name = txtName.val().trim();
       const email = txtEmail.val().trim();
       const phone = txtPhone.val().trim();

       //validate arrival date for a future date and in the correct format
       if (arrivalDate === '') {
           makeInvalid(txtArrivalDate, 'Arrival Date is required.');
       } else if (Date.parse($('#arrival-date').val().trim()) <= Date.now()) {
           makeInvalid(txtArrivalDate, 'Invalid date. Must be future date.');
       } else if (datePattern.text(arrivalDate) === false) {
           makeInvalid(txtArrivalDate, 'Must be in the format mm/dd/yyyy.');
       } else {
           makeValid(txtArrivalDate);
       }

       //validate number of nights
       if (nights === '') {
           makeInvalid(txtNights, 'Number of nights is required.');
       } else if (0 < nights <= 30) {
           makeInvalid(txtNights, 'The number of nights must be between 0 and 30.');
       } else if (nights === '[A-Za-z]') {
           makeInvalid(txtNights, 'Nights must be numeric.');
       } else {
           makeValid(txtNights);
       }

       //validate that name is not empty
       name === '' ? makeInvalid(txtName, 'Name is required.') : makeValid(txtName);

       //validate that email is not empty and follows the format
       if (email === '') {
           makeInvalid(txtEmail, 'Email address is required.');
       } else if (emailPattern.test(email) === false) {
           makeInvalid(txtEmail, 'Email address is not in the correct format.');
       } else {
           makeValid(txtEmail);
       }

       //validate that the phone number is not blank and is in the right format
       if (phone === '') {
           makeInvalid(txtPhone, 'Phone number is required');
       } else if (phonePattern.test(phone) === false) {
           makeInvalid(txtPhone, 'Phone number is not in the correct format');
       } else {
           makeValid(txtPhone);
       }

       //validate that one of the contact methods is selected
       let selectedOption = $(':radio:checked');
       if (selectedOption.length === 0) {
           $(':radio').addClass('is-invalid');
           $('#radio-message').text('Please select one option');
           isValid = false;
       } else {
           $(':radio').removeClass('is-invalid');
           $('#radio-message').text('');
       }

       //prevent default action of submission if any entries are left blank
       if (isValid === false) {
           evt.preventDefault();
           txtName.select().focus();
       }
   });
   //code for reset form
   $('#reset-form').on('click', () => {
       //clear all textboxes
       $('#input[type="text"]').val('');
       //deselect contact method
       $('#input[type="radio"]').prop('checked', false);
       //remove is-invalid class from all elements
       $('input').removeClass('is-invalid');
       //remove all validation messages
       $('small').text('');
       //send focus to the top textbox
       txtArrivalDate.focus();
   })

});