"use strict";

const $ = selector => document.querySelector(selector)

window.onload = () => {
    $('#temp-entered').focus()
    $('#to-celsius').addEventListener('click', fahrenheitToCelsius);
    $('#to-fahrenheit').addEventListener('click', celsiusToFahrenheit);
    $('#convert').addEventListener('click', convertTemp);
    $('#clear-entries').addEventListener('click', resetForm);
}
const toggleLabelText = (topLabelText, bottomLabelText) => {
    // update the text of the labels based on which radio button is selected
    // textContent only sends text and is more efficient than innerHTML
    $('#temp-top-label').textContent = topLabelText;
    $('#temp-bottom-label').textContent = bottomLabelText;
}
const celsiusToFahrenheit = () => {
    toggleLabelText('Enter Temperature in Celsius:', 'Temperature converted to Fahrenheit:');
    resetForm();
}
const fahrenheitToCelsius = () => {
    toggleLabelText('Enter Temperature in Fahrenheit:', 'Temperature converted to Celsius');
    resetForm();
}

const convertToCelsius = tempEntered => (tempEntered - 32) * 5/9;
const convertToFahrenheit = tempEntered => tempEntered * 5/9 +32;
const convertTemp = () => {
    // convert user temperature
    let tempEntered = parseFloat($('#temp-entered').value);

    if (isNaN(tempEntered)) {
        $('#validation-message').textContent = "Please enter a number";
        $('#temp-entered').classList.add('is-invalid');
        $('#converted-temp').value = '';
    }
    else {
        $('#validation-message').textContent = '';
        $('#temp-entered').classList.remove('is-invalid');
        // determine which radio button is selected to call the appropriate distance conversion
        if ($('#to-celsius').checked) {
            $('#converted-temp').value = convertToCelsius(tempEntered).toFixed(1) + ' C';
        }
        else {
            $('#converted-temp').value = convertToFahrenheit(tempEntered).toFixed(1) + ' F'
        }
    }
    $('#temp-entered').select();
}

const resetForm = () => {
    $('#validation-message').textContent = '';
    $('#temp-entered').classList.remove('is-invalid');
    // clear any existing output
    $('#converted-temp').value = '';

    // clear any existing text in the text-box to enter temperature
    $('#temp-entered').value = '';
    $('#temp-entered').focus();
}