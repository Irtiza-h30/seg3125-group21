// jQuery that will "listen" to the html niceSurvey.html
$(document).ready(function () {
  $("form").on("submit", function () {
    $.ajax({
      type: "POST",
      url: "/niceSurvey",
      data: $(this).serializeArray(),
      success: function () {
        $("#submitBtn").prop("disabled", "true");

        $("#confirmation").removeAttr("hidden");
        $("#confirmation").text(
          "Thank you for participating in this user interface suryey!"
        );
      },
    });
    return false;
  });
});
