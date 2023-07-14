$(function () {

  // トップページ
  createCategories();
  slider();
  createRecommend();
  createFeature();

  // 製品リストページ
  createAppliances();
  clickManufacturerAccordion();

  // 共通
  hamburger();
  pagetop();
});