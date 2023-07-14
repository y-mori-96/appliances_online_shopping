/**
 * ボタン初期
 */
function initActiveBtn(manufacturerBtn) {
  manufacturerBtn.each(function () {
    // ボタン点灯
    $(this).addClass("active");

    // 「すべて」点灯時、「すべて」ボタンの機能を停止
    if ($(this).hasClass("all")) {
      $(this).prop('disabled', true);
    }
  });
}

/**
 *  メーカー選択
 */
function changeActiveManufacturerBtn(
  manufacturerBtn,
  getManufacturerValue,
  getManufacturerClass
) {
  manufacturerBtn.each(function () {
    if (getManufacturerValue == "all") {
      // ボタン点灯
      $(this).addClass("active");
      // 「すべて」点灯時、「すべて」ボタンの機能を停止
      if ($(this).hasClass("all")) {
        $(this).addClass("disabled");
      }
    }
    else { // "all"以外の時
      // 「すべて」ボタンの機能を有効化
      $(this).removeClass("disabled");

      if ($(this).hasClass(getManufacturerClass)) {
        // 対象ボタン点灯
        $(this).addClass("active");
      } else {
        // 対象外のボタンをリセット
        $(this).removeClass("active");
        $(this).prop('disabled', false);
      }
    }
  });
}