function hamburger() {
  const hamburger = $(".hamburger");
  const nav = $(".company_nav");

  hamburger.click(function () {
    $(this).find(".hamburger_bar").toggleClass("active");
    nav.toggleClass("active");
  });
}