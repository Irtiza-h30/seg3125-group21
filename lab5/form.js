// https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
const validatePhone = (number) =>
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(number);

const valdateCreditCard = (number) =>
  /^([0-9]{4})-([0-9]{4})-([0-9]{4})-([0-9]{4})$/.test(number);

// https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateCreditCardCvv = (cvv) => /^\d{3}$/.test(cvv);

const validateName = (name) => !/\d/.test(name) && /[0-9a-zA-Z]{2,}/.test(name);

const validateSelect = (element) => element.val() !== "";

// https://stackoverflow.com/questions/14810602/how-to-set-mindate-to-current-date-in-jquery-ui-datepicker

const updateDatePicker = (datePicker, hairdresser) => {
  const discliamer = $("#disclaimer");
  discliamer.hide();

  const dateInput = $("#inputDate");
  const timeInput = $("#inputTime");

  dateInput.removeAttr("readonly");
  timeInput.removeAttr("readonly");

  const hairdresserId = hairdresser.children("option:selected").val();
  datePicker.datepicker("setDate", null);
  datePicker.datepicker("destroy");
  datePicker.datepicker({
    dateFormat: "yy-mm-dd",
    maxDate: "+4m",
    minDate: 1,
    beforeShowDay: getHairdresserSchedule(hairdresserId),
  });
};

const getHairdresserSchedule = (hairdresserId) => {
  if (hairdresserId === "1") {
    return employeeOneSchedule;
  } else if (hairdresserId === "2") {
    return employeeTwoSchedule;
  }
  return employeeThreeSchedule;
};

const employeeOneSchedule = (date) => {
  const options = [0, 1, 4];
  let day = date.getDay();

  return [options.indexOf(day) === -1];
};

const employeeTwoSchedule = (date) => {
  const options = [0, 2, 3];
  let day = date.getDay();

  return [options.indexOf(day) === -1];
};

const employeeThreeSchedule = (date) => {
  const options = [0, 3, 5];
  let day = date.getDay();

  return [options.indexOf(day) === -1];
};

// https://stackoverflow.com/questions/47407639/jquery-timepicker-and-time-rounding-issue
const updateTimePicker = (timepicker) => {
  timepicker.timepicker("remove").timepicker({
    timeFormat: "h:i A",
    disableTextInput: true,
    minTime: "09:00 AM",
    maxTime: "6:00 PM",
    step: 30,
  });
};

const setDates = (date) => {
  const options = [0, 1];
  let day = date.getDay();
  return [options.indexOf(day) === -1];
};

const getHairdresser = (value) => {
  if (value === "1") return "Cassandra";
  else if (value === "2") return "Trisha";
  else return "Steven";
};

const onValidateInput = (value, id) => {
  if (value) {
    $(`#${id}-invalidfeedback`).hide();
    $(`#${id}-validfeedback`).show();
  } else {
    $(`#${id}-validfeedback`).hide();
    $(`#${id}-invalidfeedback`).show();
  }
};
