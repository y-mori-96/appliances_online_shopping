function hamburger() {
  const hamburger = $(".hamburger");
  const nav = $(".company_nav");
  const noScroll = $("#no_scroll");

  hamburger.click(function () {
    $(this).find(".hamburger_bar").toggleClass("active");
    nav.toggleClass("active");
    noScroll.toggleClass("active");
  });
}