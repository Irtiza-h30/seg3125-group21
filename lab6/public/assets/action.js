// jQuery that will "listen" to the html niceSurvey.html
$(document).ready(function () {
  $("form").on("submit", function () {
    $.ajax({
      type: "POST",
      url: "/niceSurvey",
      data: $(this).serializeArray(),
    });
    return false;
  });
});
