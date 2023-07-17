function navOpenCategory() {
  const categoryWrapper = $("#category_wrapper");
  const openNav = $("#open_nav");
  const categoryListsWrapper = $(".category_lists_wrapper");
  const navLists = $("#nav_lists");
  const navItem = $(".nav_item");
  const genreDisplay = $("#genre_display");

  /**
   * 初期状態
   */
  // ナビ非表示
  allClearCategoryLists();

  // トップページ表示
  topPage.show();
  listPage.hide();

  // デバッグ用（初期ページ設定）
  // topPage.hide();
  // listPage.show();

  /**
   * 表示
   */
  openNav.on('mouseenter', function () {
    categoryListsWrapper.show();
    navLists.show();
    navItem.show();
  });

  navItem.on('mouseenter', function () {
    let getCategoryVal = $(this).find("button").val();
    genreDisplay.show();
    displayGenre(getCategoryVal);
  });

  /**
   * 非表示
   */
  categoryWrapper.on('mouseleave', function () {
    allClearCategoryLists();
  });

  categoryListsWrapper.on('mouseleave', function () {
    allClearCategoryLists();
  });

  /**
   * ジャンル表示処理
   */
  function displayGenre(getCategoryVal) {
    switch (getCategoryVal) {
      case "category_all":
        categoryCook.show();
        categoryLife.show();
        categorySeason.show();
        categoryBeauty.show();
        categoryTv.show();
        break;

      case "category_cook":
        categoryCook.show();
        categoryLife.hide();
        categorySeason.hide();
        categoryBeauty.hide();
        categoryTv.hide();
        break;

      case "category_life":
        categoryCook.hide();
        categoryLife.show();
        categorySeason.hide();
        categoryBeauty.hide();
        categoryTv.hide();
        break;

      case "category_season":
        categoryCook.hide();
        categoryLife.hide();
        categorySeason.show();
        categoryBeauty.hide();
        categoryTv.hide();
        break;

      case "category_beauty":
        categoryCook.hide();
        categoryLife.hide();
        categorySeason.hide();
        categoryBeauty.show();
        categoryTv.hide();
        break;

      case "category_tv":
        categoryCook.hide();
        categoryLife.hide();
        categorySeason.hide();
        categoryBeauty.hide();
        categoryTv.show();
        break;

      default:
        categoryLists.hide();
        break;
    }
  }

  /**
   * ナビクリア処理
   */
  function allClearCategoryLists() {
    categoryListsWrapper.hide();
    navLists.hide();
    navItem.hide();
    genreDisplay.hide();
    categoryLists.hide();
  }

  /**
   * クリック処理
   */
  categoryLists.on('click', function () {
    topPage.hide();
    listPage.show();
  });


  logo.on('click', function () {
    listPage.hide();
    topPage.show();
  });
}