window.onload = () => {
  const acc = [...document.getElementsByClassName("accordion")];

  acc.forEach((accordion) => {
    accordion.addEventListener("click", (e) => {
      toggleAccordion(e.currentTarget);
    });
  });
};
