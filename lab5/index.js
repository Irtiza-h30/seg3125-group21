$(function () {
  $("#bookingForm").validate({
    rules: {
      fullName: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      creditCardNumber: {
        required: true,
        creditcard: true,
      },
      creditCardCVV: {
        required: true,
        minlength: 3,
        maxlength: 3,
      },
    },
    messages: {
      fullName: "Please enter your full name",
      email: {
        required: "Please enter your email",
        email: "Please enter a valid email",
      },
      creditCardNumber: {
        required: "Please enter your credit card",
        creditcard: "Please enter a valid credit card",
      },
      creditCardCVV: {
        required: "Please enter your CVV",
        minlength: "Please enter a valid CVV",
      },
    },
    highlight: function (element) {
      $(element)
        .closest(".control-group")
        .removeClass("success")
        .addClass("error");
    },
    success: function (element) {
      $(element).closest(".form-group").removeClass("has-error");
      element.remove();
    },
  });
});
