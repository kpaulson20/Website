"use strict";
const $ = selector => document.querySelector(selector)

window.onload = () => {
    $('#distance-entered').focus()
    $('#to-miles').addEventListener('click', kilometersToMiles);
    $('#to-kilometers').addEventListener('click', milesToKilometers);
    $('#convert').addEventListener('click', convertDistance);
    $('#clear-entries').addEventListener('click', resetForm);
}

const toggleLabelText = (topLabelText, bottomLabelText) => {
    // update the text of the labels based on which radio button is selected
    // textContent only sends text and is more efficient than innerHTML
    $('#distance-top-label').textContent = topLabelText;
    $('#distance-bottom-label').textContent = bottomLabelText;
}
const kilometersToMiles = () => {
    toggleLabelText('Enter Distance in kilometers:', 'Distance converted to miles:');
    resetForm();
}
const milesToKilometers = () => {
    toggleLabelText('Enter Distance in miles:', 'Distance converted to kilometers');
    resetForm();
}
const convertToMiles = distanceEntered => distanceEntered / 1.609;
const convertToKilometers = distanceEntered => distanceEntered * 1.069;
const convertDistance = () => {
    // get distance entered by user
    let distanceEntered = parseFloat($('#distance-entered').value);

    if (isNaN(distanceEntered)) {
        $('#validation-message').textContent = "Please enter a number";
        $('#distance-entered').classList.add('is-invalid');
        $('#converted-distance').value = '';
    }
    else {
        $('#validation-message').textContent = '';
        $('#distance-entered').classList.remove('is-invalid');
        //determine which radio button is selected to call the appropriate distance conversion
        if ($('#to-miles').checked) {
            $('#converted-distance').value = convertToMiles(distanceEntered).toFixed(1) + ' mi';
        }
        else {
            $('#converted-distance').value = convertToKilometers(distanceEntered).toFixed(1) + ' km'
        }
    }
    $('#distance-entered').select();
}
const resetForm = () => {
    $('#validation-message').textContent = '';
    $('#distance-entered').classList.remove('is-invalid');
    // clear any existing output
    $('#converted-distance').value = '';

    // clear any existing text in the text-box to enter distance
    $('#distance-entered').value = '';
    $('#distance-entered').focus();
}