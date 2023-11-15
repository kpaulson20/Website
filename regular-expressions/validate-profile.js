"use strict";
const datePattern = /^((0[13578]|1[02])\/31\/(18|19|20)[0-9]{2})|((01|0[3-9]|1[0-2])\/(29|30)\/(18|19|20)[0-9]{2})|((0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-8])\/(18|19|20)[0-9]{2})|((02)\/29\/(((18|19|20)(04|08|[2468][048]|[13579][26]))|2000))$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.com$/;

$(document).ready(() => {
    ///set values equal to elements on the form based on id attributes
    const txtEmail = $('#email');
    const txtPhone = $('#phone-number');
    const txtZip = $('#zip-code');
    const txtDateOfBirth = $('#date-of-birth');
    const txtCreditCard = $('#credit-card');
    const txtExpirationDate = $('#expiration-date');

    //declare boolean to track valid form entries
    let isValid;

    const makeInvalid = (textbox, message) => {
        //add validation message to the next element after textbox
        textbox.next().text(message);
        //add is-invalid class to the textbox to outline in red
        textbox.addClass('is-invalid');
        //set boolean to false to prevent form submission
        isValid = false;
    }
    const makeValid = (textbox) => {
        //clear validation message from the next element acter the textbox
        textbox.next().text('');
        //remove the is-invalid class from textbox
        textbox.removeClass('is-invalid');
    }
    //send focus to top textbox
    txtEmail.focus();

    //handle click event of validate button
    $('#validate-info').on('click',(evt) => {
        //set isValid boolean to true
        isValid = true;

        //set values equal to the contents of the input elements
        const emailAddress = txtEmail.val().trim();
        const phoneNumber = txtPhone.val().trim();
        const zipCode = txtZip.val().trim();
        const dateOfBirth = txtDateOfBirth.val().trim();
        const creditCard = txtCreditCard.val().trim();
        const expirationDate = txtExpirationDate.val().trim();

        //validate email format for .com address
        !emailPattern.test(emailAddress) ?
            makeInvalid(txtEmail, 'Please enter an email address that ends in .com.') : makeValid(txtEmail);

        //validate phone number matches (999) 999-9999 format
        !/^\(\d{3}\)\d{3}-\d{4}$/.test(phoneNumber) ?
            makeInvalid(txtPhone, 'Please enter a phone number in the format (999)999-9999.') :
            makeValid(txtPhone);

        //validate zip code matches 99999 or 99999-9999 format
        !/^\d{5}(-\d{4})?$/.test(zipCode) ?
            makeInvalid(txtZip, 'Please enter a zip code in the format 99999 or 99999-9999.') :
            makeValid(txtZip);

        //validate date of birth matches MM/DD/YYYY
        if (!datePattern.test(dateOfBirth)) {
            makeInvalid(txtDateOfBirth, 'Please enter a valid date in the MM/DD/YYYY format.');
        } else if (Date.parse(dateOfBirth) > Date.now()) {
            makeInvalid(txtDateOfBirth, 'Please enter a date in the past.');
        } else {
            makeValid(txtDateOfBirth);
        }

        //validate credit card number in the format 9999-9999-9999-9999
        !/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(creditCard) ?
            makeInvalid(txtCreditCard, 'Please enter a credit card number in the format 9999-9999-9999-9999.') :
            makeValid(txtCreditCard);

        //validate expiration date as a month between 01 and 12 and a year between 21 and 29
        !/^(0[1-9]|10|11|12)\/2[1-9]$/.test(expirationDate) ?
            makeInvalid(txtExpirationDate, 'Please enter an expiration date in the format MM/YY') :
            makeValid(txtExpirationDate);

        //display message if isValid is true, clear message if it is false
        $('#results').text(isValid ? 'All fields contain valid entries.' : '');
        txtEmail.select().focus();
    })
});
