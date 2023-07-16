function slider() {
  const topSliderLists = $("#top_slider ul");
  const topSliderItems = $("#top_slider li");
  const previousBtn = $("#previous_btn");
  const nextBtn = $("#next_btn");

  const OFFSET_SLIDE_LENGTH = "1";

  let dotIndicatorLists = $("#dot_indicator ul");

  let interval = 5000;
  let duration = 700;
  let timer;

  let slideDirection = "next";

  let clickIndex = 0;
  let currentIndex = 0;

  let enableClickFlag = true;

  /**
   *  初期設定
   *
   *  1：インジゲーター生成
   *  2：最後の要素を最初にし、前後画面遷移できるようにする
   *  3：スライド遷移のサイズ指定に必要な定数宣言
   *  4：先頭画像が変わるため、一枚分ずらす
   *  5：遷移開始
   */
  createDotIndicator();
  // 生成後に宣言する
  const dotIndicatorItems = dotIndicatorLists.find("li");
  // 「0」からスタートのため「-1」する
  const slideLength = dotIndicatorItems.length - OFFSET_SLIDE_LENGTH;

  const SITE_SIZE = 100;
  const CHANGE_POSITON_LEFT = `-${SITE_SIZE}%`;
  const MULTI_CHANGE_POSITON_LEFT = `-${SITE_SIZE * slideLength}%`;

  const SINGLE_MOVE_LEFT = `-=${SITE_SIZE}%`;
  const MULTI_MOVE_LEFT = `-=${SITE_SIZE * slideLength}%`;

  const SINGLE_MOVE_RIGHT = `+=${SITE_SIZE}%`;
  const MULTI_MOVE_RIGHT = `+=${SITE_SIZE * slideLength}%`;

  topSliderLists.prepend($("#top_slider li:last-of-type"));
  topSliderLists.css("left", CHANGE_POSITON_LEFT);
  timer = setInterval(transitionSlider, interval);

  /**
   * 次へボタン押下処理
   */
  nextBtn.on("click", function () {
    if (enableClickFlag === true) {
      slideDirection = "next";
      restartSlider();
    } else {
      // 処理禁止
    }
  });

  /**
   * 戻るボタン押下処理
   */
  previousBtn.on("click", function () {
    if (enableClickFlag === true) {
      slideDirection = "previous";
      restartSlider();
    } else {
      // 処理禁止
    }
  });

  /**
   * ドットインジゲーター押下処理
   */
  dotIndicatorItems.on("click", function () {
    if (enableClickFlag === true) {
      clickIndex = $(this).index();
      let diffIndex = currentIndex - clickIndex;

      if (diffIndex === 0) {
        slideDirection = "nothing";
      } else if (diffIndex === -1) {
        slideDirection = "next";
      } else if (diffIndex === 1) {
        slideDirection = "previous";
      } else if (diffIndex <= -2) {
        slideDirection = "multiNext";
      } else if (diffIndex >= 2) {
        slideDirection = "multiPrevious";
      }

      restartSlider();
    } else {
      // 処理禁止
    }
  });

  /**
   * 画像遷移
   */
  function transitionSlider() {
    // アニメーション終了までクリック禁止
    enableClickFlag = false;

    if (slideDirection === "next") {
      topSliderLists.animate(
        { left: SINGLE_MOVE_LEFT },
        duration,
        function () {
          // 最初の要素を最後に挿入する
          $(this).append($("#top_slider li:first-of-type"));
          // 位置変更
          $(this).css("left", CHANGE_POSITON_LEFT);

          finishAnimation();
        }
      );
    } else if (slideDirection === "previous") {
      topSliderLists.animate(
        { left: SINGLE_MOVE_RIGHT },
        duration,
        function () {
          // 最初の要素を最後に挿入する
          $(this).prepend($("#top_slider li:last-of-type"));
          // 位置変更
          $(this).css("left", CHANGE_POSITON_LEFT);

          finishAnimation();
        }
      );
    } else if (slideDirection === "multiNext") {
      let firstItem = $("#top_slider li:first-of-type");
      topSliderLists.append(firstItem.clone());

      topSliderLists.animate(
        { left: MULTI_MOVE_LEFT },
        duration,
        function () {
          // 先頭削除
          $("#top_slider li:first-of-type").remove();
          // 最初の要素を最後に挿入する
          $(this).append($("#top_slider li:first-of-type"));
          // 位置変更
          $(this).css("left", CHANGE_POSITON_LEFT);

          finishAnimation();
        }
      );
    } else if (slideDirection === "multiPrevious") {
      let lastItem = $("#top_slider li:last-of-type");
      topSliderLists.prepend(lastItem.clone());
      topSliderLists.css("left", MULTI_CHANGE_POSITON_LEFT);

      topSliderLists.animate(
        { left: MULTI_MOVE_RIGHT },
        duration,
        function () {
          // 末尾削除
          $("#top_slider li:last-of-type").remove();
          // 末尾の要素を先頭に挿入する
          $(this).prepend($("#top_slider li:last-of-type"));
          // 位置変更
          $(this).css("left", CHANGE_POSITON_LEFT);

          finishAnimation();
        }
      );
    } else {
      topSliderLists.animate(
        {
          /* 処理なし */
        },
        duration,
        function () {
          finishAnimation();
        }
      );
    }
  }

  /**
   * 画面遷移再開
   */
  function restartSlider() {
    clearInterval(timer);
    timer = setInterval(transitionSlider, interval);
    transitionSlider();
  }

  /**
   * アニメーション終了処理
   *
   * resetSlideDirection();は最後に実行すること
   */
  function finishAnimation() {
    enableClickFlag = true;
    updateCurrentIndex();
    updateDotIndicator();
    resetSlideDirection();
    console.log(currentIndex);
  }

  /**
   * 参照値更新
   */
  function updateCurrentIndex() {
    if (slideDirection === "next") {
      incrementCurrentIndex();
    } else if (slideDirection === "previous") {
      decrementCurrentIndex();
    } else if (slideDirection === "multiNext") {
      clickCurrentIndex();
    } else if (slideDirection === "multiPrevious") {
      clickCurrentIndex();
    } else {
      // 更新なし
    }
  }

  /**
   * 参照値増加
   */
  function incrementCurrentIndex() {
    if (currentIndex >= slideLength) {
      currentIndex = 0;
    } else {
      ++currentIndex;
    }
  }

  /**
   * 参照値減少
   */
  function decrementCurrentIndex() {
    console.log(currentIndex);
    if (currentIndex <= 0) {
      currentIndex = slideLength;
    } else {
      --currentIndex;
    }
  }

  /**
   * 参照値クリック指定
   */
  function clickCurrentIndex() {
    currentIndex = clickIndex;
  }

  /**
   * ドットインジゲーター更新
   */
  function updateDotIndicator() {
    dotIndicatorItems.removeClass("active");
    dotIndicatorItems.eq(currentIndex).addClass("active");
  }

  /**
   * スライド方向リセット
   */
  function resetSlideDirection() {
    if (slideDirection === "next") {
      // 処理なし
    } else {
      slideDirection = "next";
    }
  }

  /**
   * ドットインジゲーター作成
   */
  function createDotIndicator() {
    topSliderItems.each(function (index) {
      let dot = $("<li><a href='#'></a></li>");
      if (index === 0) {
        dot.addClass("active");
      }
      dotIndicatorLists.append(dot);
    });
  }
}