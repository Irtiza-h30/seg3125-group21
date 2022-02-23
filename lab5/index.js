$(document).ready(() => {
  const phoneNumber = $("#inputPhone");
  const creditCard = $("#inputCcNumber");
  const creditCardCvv = $("#inputCcCvv");
  const email = $("#inputEmail");
  const firstName = $("#inputFirst");
  const lastName = $("#inputLast");
  const service = $("#cuttingStyle");
  const hairdresser = $("#inputHairdresser");
  const date = $("#inputDate");
  const time = $("#inputTime");
  const coloring = $("#inputColoring");
  const treatment = $("#inputTreatment");
  const ccExpirationMonth = $("#creditCardExpirationMonth");
  const ccExpirationYear = $("#creditCardExpirationYear");
  const submit = $("#submit");
  const confirmation = $("#confirmation");

  firstName.on("change", () => {
    onValidateInput(validateName(firstName.val()), "inputFirst");
  });

  lastName.on("change", () => {
    onValidateInput(validateName(lastName.val()), "inputLast");
  });

  phoneNumber.on("change", () => {
    onValidateInput(validatePhone(phoneNumber.val()), "inputPhone");
  });

  creditCard.on("change", () => {
    onValidateInput(valdateCreditCard(creditCard.val()), "inputCcNumber");
  });

  email.on("change", () => {
    onValidateInput(validateEmail(email.val()), "inputEmail");
  });

  creditCardCvv.on("change", () => {
    onValidateInput(validateCreditCardCvv(creditCardCvv.val()), "inputCcCvv");
  });

  updateTimePicker(time);

  hairdresser.on("change", () => {
    updateDatePicker(date, hairdresser);
  });

  submit.click(() => {
    const fieldNames = {
      emailIsValid: "inputEmail",
      phoneIsValid: "inputPhone",
      creditIsValid: "inputCcNumber",
      firstNameValid: "inputFirst",
      lastNameValid: "inputLast",
      creditCardCvvValid: "inputCcCvv",
      isServiceValid: "cuttingStyle",
      isHairdresserValid: "inputHairdresser",
      isColoringValid: "inputColoring",
      isTreatmentValid: "inputTreatment",
      isDateValid: "inputDate",
      isTimeValid: "inputTime",
      isCcExpirationMonthValid: "creditCardExpirationMonth",
      isCcExpirationYearValid: "creditCardExpirationYear",
    };

    const isServiceValid = validateSelect(service);
    const isHairdresserValid = validateSelect(hairdresser);
    const isColoringValid = validateSelect(coloring);
    const isTreatmentValid = validateSelect(treatment);
    const isCcExpirationMonthValid = validateSelect(ccExpirationMonth);
    const isCcExpirationYearValid = validateSelect(ccExpirationYear);
    const isDateValid = validateSelect(date);
    const isTimeValid = validateSelect(time);
    const emailIsValid = validateEmail(email.val());
    const phoneIsValid = validatePhone(phoneNumber.val());
    const creditIsValid = valdateCreditCard(creditCard.val());
    const firstNameValid = validateName(firstName.val());
    const lastNameValid = validateName(lastName.val());
    const creditCardCvvValid = validateCreditCardCvv(creditCardCvv.val());

    const obj = {
      phoneIsValid,
      emailIsValid,
      creditIsValid,
      firstNameValid,
      lastNameValid,
      isTimeValid,
      creditCardCvvValid,
      isServiceValid,
      isHairdresserValid,
      isColoringValid,
      isTreatmentValid,
      isDateValid,
      isCcExpirationMonthValid,
      isCcExpirationYearValid,
    };

    const invalidFields = Object.keys(obj).filter((i) => !obj[i]);

    if (invalidFields.length === 0) {
      confirmation.html(`
      <div class="container-lg">
          <h3 class="my-4"> Your appointment has been booked!</h3>
          <p>${getHairdresser(
            hairdresser.val()
          )} will see you for an appointment on ${date.val()} at ${time.val()} .</p>
      <p>A confirmation email will be sent shortly. Thank you! </p>
      </div>`);
      confirmation.removeAttr("hidden");
    } else {
      invalidFields.forEach((i) => {
        onValidateInput(false, fieldNames[i]);
      });
      $("#form-invalidfeedback").html(
        `Missing or invalid fields. Please review the form details to complete booking.`
      );
      $("#form-invalidfeedback").show();
      setTimeout(() => {
        $("#form-invalidfeedback").hide();
      }, 5000);
    }
  });
});
