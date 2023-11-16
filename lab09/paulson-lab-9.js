"use strict"
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.edu$/;
const datePattern = /^((0[13578]|1[02])\/31\/(18|19|20)[0-9]{2})|((01|0[3-9]|1[0-2])\/(29|30)\/(18|19|20)[0-9]{2})|((0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-8])\/(18|19|20)[0-9]{2})|((02)\/29\/(((18|19|20)(04|08|[2468][048]|[13579][26]))|2000))$/;
const phonePattern = /^\(\d{3}\)\d{3}.\d{4}$/;
const zipPattern = /^\d{5}(-\d{4})$/;

$(document).ready(() => {
    // setting values equal to elements on the form based on id
    const txtName = $('#name');
    const txtEmail = $('#email-address');
    const txtPhone = $('#phone');
    const txtDateOfBirth = $('#date-of-birth');
    const txtZip = $('#zip-code');
    const txtCity = $('#city');
    const txtState = $('#state');

    //setting a boolean to track validity of entries
    let isValid;

    //creating validation and invalidation methods
    const makeInvalid = (textbox, message) => {
        //add validation message as the element after textbox
        textbox.next().text(message);
        //adding is-invalid class and outlining in red
        textbox.addClass('is-invalid');
        //set isValid boolean to false & prevent form submission
        isValid = false;
    }
    const makeValid = (textbox) => {
        //clear error message
        textbox.next().text('');
        //remove the is-invalid class
        textbox.removeClass('is-invalid');
    }
    //focus on top textbox
    txtName.focus();

    //handle click event to validate information
    $('#validate').on('click', (evt) => {
       //set isValid boolean to true
       isValid = true;

       //setting values and contents of elements equal
       const name = txtName.val() ? txtName.val().trim() : ''
       const emailAddress = txtEmail.val() ? txtEmail.val().trim() : ''
       const phone = txtPhone.val() ? txtPhone.val().trim() : ''
       const dateOfBirth =  txtDateOfBirth.val() ? txtDateOfBirth.val().trim : ''
       const zip = txtZip.val() ? txtZip.val().trim() : ''
       const city = txtCity.val() ? txtCity.val().trim() : ''
       const state = txtState.val() ? txtState.val().trim() : ''

       //validating formats of all input
        (!name || name ==='' || name.length < 2) ?
           makeInvalid(txtName, 'Please enter First and Last name\n' +
           'No numbers or special characters except hyphen (-)') :
           makeValid(txtName);

       !emailPattern.test(emailAddress) ?
           makeInvalid(txtEmail, 'Please enter an email ending in .edu') :
           makeValid(txtEmail);

       !phonePattern.test(phone) ?
           makeInvalid(txtPhone, 'Please enter a valid phone number. ex (999)999.9999') :
           makeValid(txtPhone);

        !/^[A-Za-z]$/.test(city) ?
            makeInvalid(txtCity, 'Please enter a city.') :
            makeValid(txtCity);

        !/^[A-Z]$/.test(state) ?
            makeInvalid(txtState, 'Please enter a state abbreviation.') :
            makeValid(txtState);

       !zipPattern.test(zip) ?
           makeInvalid(txtZip,'Please enter the zip code in the format 99999-9999.') :
           makeValid(txtZip);

       if(!datePattern.test(dateOfBirth)) {
           makeInvalid(txtDateOfBirth, 'Please enter a date in the format MM/DD/YYYY.');
       } else if (Date.parse(dateOfBirth) > Date.now()) {
           makeInvalid(txtDateOfBirth, 'Date must be a past date.');
       } else {
           makeValid(txtDateOfBirth);
       }
        $('#results').text(isValid ? 'All fields contain valid entries.' : '');

       txtName.select().focus();
    });
});