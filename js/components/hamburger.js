function hamburger() {
  const hamburger = $(".hamburger");
  const navLists = $(".company_nav ul");

  // nav.hide();

  hamburger.click(function () {
    $(this).find(".hamburger_bar").toggleClass("active");
    navLists.toggleClass("active");
  });
}