function navOpenCategory() {
  const openNav = $("#open_nav");
  const genreDisplay = $("#genre_display");
  const nav = $("#nav");
  const navItem = $(".nav_item");

  /**
   * 初期状態
   */
  // ナビ非表示
  navClear();

  // トップページ表示
  topPage.show();
  listPage.hide();

  // デバッグ用（初期ページ設定）
  // topPage.hide();
  // listPage.show();

  /**
   * ホバー処理
   */
  // カテゴリボタンのホバー処理
  openNav.hover(
    // カテゴリリスト表示
    function () {
      nav.show();
    },
    function (e) {
      const openNavRelatedTarget = $(e.relatedTarget);
      const getNavItemBtnValue = openNavRelatedTarget.find("button").attr("value");
      const getBtnValue = openNavRelatedTarget.val();

      // カテゴリリストをホバーしたか判断
      // カテゴリリストをホバーしない場合は閉じる
      if ((getNavItemBtnValue === "category_all")
        || (getBtnValue === "category_all")
      ) {
        // カテゴリリストのホバー処理
        navItem.hover(
          // ジャンル表示
          function () {
            let getCategoryVal = $(this).find("button").val();

            // 背景表示後、ジャンルリスト表示
            genreDisplay.show();
            displayGenre(getCategoryVal);
          },
          function () {
            // ジャンルのホバー処理
            genreDisplay.hover(
              // ジャンル表示中
              function () {
                // そのまま表示
              },
              // ホバーが外れたとき全て非表示
              function (e) {
                const genreDisplayRelatedTarget = $(e.relatedTarget);
                const getParentsClass = genreDisplayRelatedTarget.parents(".nav_item").attr("class");

                if (getParentsClass === "nav_item") {
                  // そのまま表示
                } else {
                  navClear();
                }
              }
            );
          }
        );

        nav.on('mouseleave', function (e) {
          const navRelatedTarget = $(e.relatedTarget);
          const getId = navRelatedTarget.attr("id");
          const getClass = navRelatedTarget.attr("class");

          if ((getId === "genre_display")
            || (getClass === "category_lists")
          ) {
            // そのまま表示
          } else {
            navClear();
          }
        });

      } else {
        navClear();
      }
    }
  );

  /**
   * ナビクリア処理
   */
  function navClear() {
    nav.hide();
    genreDisplay.hide();
  }

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