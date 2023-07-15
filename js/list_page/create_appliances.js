function createAppliances() {
  const appliancesLists = $("#appliances_lists");
  const appliancesContainer = $(".appliances .container");

  const genreBtn = $(".genre button");
  const manufacturerBtn = $(".search .manufacturer button").not(".accordion");
  const keywordInput = $("#keyword_input");
  const rangeMin = $("input[name='min']");
  const rangeMax = $("input[name='max']");
  const sortBtn = $("select[name='sort']");
  const clearBtn = $("input[type='button']");

  // 初期値
  let data = [];
  let keyword = "";
  let getMinValue = "";
  let getMaxValue = "";
  let getGenreValue = "rice_cooker";
  let getManufacturerValue = "all";
  let sortBy = "release_new";

  $.ajax({
    url: "data/product_data.json",
    dataType: "json",
  }).done(function (response) {
    data = response;
    // データ確認
    // console.log(data);

    // 初期処理
    initActiveBtn(manufacturerBtn);
    createData(data, appliancesLists);
  })
    .fail(function (status) {
      console.log(status + "「product_data」エラーが発生しました:");
    })
    .always(function () {
      console.log("「product_data」リクエストが完了しました");
    });

  /**
   *  ジャンル選択処理
   */
  categoryLists.on('click', genreBtn, function (e) {
    getGenreValue = ($(e.target).parents(".genre").find("button").val());
    createDataFlow();
  });

  /**
   * メーカー選択処理
   */
  manufacturerBtn.on("click", function () {
    getManufacturerValue = $(this).val();
    const getManufacturerClass = $(this).attr("class");

    // ボタンの点灯処理
    changeActiveManufacturerBtn(manufacturerBtn, getManufacturerValue, getManufacturerClass);

    createDataFlow();
  });

  /**
   * フリーワード
   */
  keywordInput.on("input", function () {
    keyword = $(this).val().toLowerCase();
    createDataFlow();
  });

  /**
   *  最小
   */
  rangeMin.on("input", function () {
    getMinValue = parseInt(rangeMin.val());
    createDataFlow();
  });

  /**
   *  最大
   */
  rangeMax.on("input", function () {
    getMaxValue = parseInt(rangeMax.val());
    createDataFlow();
  });

  /**
   * セレクトボタン
   */
  sortBtn.on("change", function () {
    sortBy = $(this).val();
    createDataFlow();
  });

  /**
   * 検索条件クリア
   */
  clearBtn.on("click", function () {
    keywordInput.val("");
    rangeMin.val("");
    rangeMin.val("");
    sortBtn.val("release_new");
    manufacturerBtn.addClass("active");

    keyword = "";
    getGenreValue = "rice_cooker";
    getMinValue = "";
    getMaxValue = "";
    sortBy = "release_new";
    getManufacturerValue = "all";

    createDataFlow();
  });

  /**
   * データ作成フロー
   */
  function createDataFlow() {
    // 検索
    const filteredData = searchData();

    // ソート
    const sortedData = sortData(filteredData, sortBy);

    // データ作成
    appliancesLists.empty();
    createData(sortedData, appliancesLists);
  }

  /**
   * 検索（条件にヒットする要素数取得）
   */
  function searchData() {
    const searchedData = data.filter(function (item) {
      const nameMatches = item.name.toLowerCase().includes(keyword);
      const typeMatches = item.type.toLowerCase().includes(keyword);
      const genreMatches = ((getGenreValue === "all") || (item.genre === getGenreValue));
      const manufacturerMatches = ((getManufacturerValue === "all") || (item.manufacturer_en === getManufacturerValue));
      const MinMatches = (isNaN(getMinValue) || getMinValue <= 0) ? true : item.price >= getMinValue;
      const MaxMatches = (isNaN(getMaxValue) || getMaxValue <= 0) ? true : item.price <= getMaxValue;

      return (nameMatches || typeMatches) && genreMatches && manufacturerMatches && MinMatches && MaxMatches;
    });

    return searchedData;
  }

  /**
   * ソート
   */
  function sortData(data, sortBy) {
    let sortedData = data;

    if (sortBy === "release_new") {
      sortedData = sortedData.sort(function (a, b) {
        const dateA = new Date(a.release);
        const dateB = new Date(b.release);
        return dateB - dateA;
      });
    }
    else if (sortBy === "release_old") {
      sortedData = sortedData.sort(function (a, b) {
        const dateA = new Date(a.release);
        const dateB = new Date(b.release);
        return dateA - dateB;
      });
    }
    else if (sortBy === "price_inexpensive") {
      sortedData = sortedData.sort(function (a, b) {
        return a.price - b.price;
      });
    }
    else if (sortBy === "price_expensive") {
      sortedData = sortedData.sort(function (a, b) {
        return b.price - a.price;
      });
    }

    return sortedData;
  }

  /**
   * データ作成
   */
  function createData(data, container) {
    // データ確認
    console.log(data);

    // ソートを追加
    const sortedData = sortData(data, sortBtn.val());
    // ソート後のデータの数を取得
    const length = sortedData.length;
    // console.log(length);
    // 数を制限する
    const limitLength = Math.min(length, 20);

    let appliance = "";

    if (length === 0) {
      appliance += `
        <p class="nothing_appliance">対象の商品はございません。</p>
        <p class="nothing_appliance">別の条件でお探しください。</p>
      `;
      appliancesContainer.empty().append(appliance);
    } else {
      for (let i = 0; i < limitLength; i++) {
        // 日付を年月に変更
        const release = new Date(data[i].release);
        const formattedRelease = `${release.getFullYear()}年${release.getMonth() + 1}月${release.getDate()}日`;
        // 値段を3桁づつコンマ区切りにする
        const changePrice = `${data[i].price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;

        appliance += `
          <li class="${data[i].genre} ${data[i].manufacturer_en}">
            <a href=${data[i].link} >
              <div class="wrapper">
                <div class="header">
                  <img src=${data[i].image} alt="${data[i].name}">
                </div>
                <div class="name">
                  <p>${data[i].manufacturer}</p>
                  <p>${data[i].name}</p>
                  <p>${data[i].type}</p>
                </div>
                <div class="bottom">
                  <p class="price">￥${changePrice}</p>
                  <p>${formattedRelease} 発売</p>
                </div>
              </div>
            </a>
          </li>
        `;
      }
      // コンテナをクリア後、ソート後のデータを追加
      appliancesContainer.empty().append(container);
      container.empty().append(appliance);
    }
  };
}