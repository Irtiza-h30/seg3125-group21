window.onload = () => {
  var optionsList = document.getElementById("typeOfService"),
    allTargets = document.querySelectorAll(".option-target"),
    currentOption,
    currentTarget;

  const hideShowTargets = () => {
    allTargets.forEach((i) => {
      i.classList.add("hidden");
    });
    currentOption = optionsList.value;
    currentTarget = document.getElementById(currentOption);
    console.log(currentTarget);
    if (currentTarget) {
      currentTarget.classList.remove("hidden");
      document.getElementById("submit").classList.remove("hidden");
      document.getElementById("appointment").classList.remove("hidden");
    }
  };
  optionsList.addEventListener("change", hideShowTargets);
};
