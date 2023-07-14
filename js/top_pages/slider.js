function slider() {
  let dir = -1;
  let interval = 3000;
  let duration = 700;
  let timer;

  $("#top_slider ul").prepend($("#top_slider li:last-child"));
  $("#top_slider ul").css("left", -1200);

  timer = setInterval(slideTimer, interval);

  function slideTimer() {
    $("#top_slider ul").animate(
      { "left": "-=1200px" }
      , duration
      , function () {
        $(this).append($("#top_slider li:last-child"));
        $(this).css("left", -1000);
      }

    );
  }
}