// jQuery that will "listen" to the html niceSurvey.html
$(document).ready(function () {
  $("form").on("submit", function () {
    $.ajax({
      type: "POST",
      url: "/niceSurvey",
      data: $(this).serializeArray(),
      success: (data) => {
        $("#bb").css("background-color", "red");
        $("#bb").prop("disabled", "true");
        $("#bb").text("Thank you!");
      },
    });
    return false;
  });
});
