/**
 * メーカー検索アコーディオン
 */
function clickManufacturerAccordion() {
  const accordionBtn = $(".search .manufacturer button.accordion");
  const manufacturerList = $(".search .manufacturer ul");

  // 初期状態
  manufacturerList.hide();

  accordionBtn.on('click', function () {
    manufacturerList.slideToggle(100);
    $(this).toggleClass('active');
  });
}