function createCategories() {
  let data = [];

  $.ajax({
    url: "data/nav_category_data.json",
    dataType: "json",
  }).done(function (response) {
    data = response;
    // データ確認
    // console.log(data);

    const length = data.length;

    // データ追加する項目を選択
    for (let i = 0; i < length; i++) {
      if (data[i].category === "cook") {
        createCategoryData(data[i], categoryCook);
        createCategoryData(data[i], categoryAll);
      }
      else if (data[i].category == "life") {
        createCategoryData(data[i], categoryLife);
        createCategoryData(data[i], categoryAll);
      }
      else if (data[i].category == "season") {
        createCategoryData(data[i], categorySeason);
        createCategoryData(data[i], categoryAll);
      }
      else if (data[i].category == "beauty") {
        createCategoryData(data[i], categoryBeauty);
        createCategoryData(data[i], categoryAll);
      }
      else if (data[i].category == "tv") {
        createCategoryData(data[i], categoryTv);
        createCategoryData(data[i], categoryAll);
      }
      else {
      }
    }
    // カテゴリボタン押下時の処理
    navOpenCategory();
  })
    .fail(function (status) {
      console.log(status + "「nav_category_data」エラーが発生しました:");
    })
    .always(function () {
      console.log("「nav_category_data」リクエストが完了しました");
    });

  /**
   * データ作成
   */
  function createCategoryData(data, container) {
    // データ確認
    // console.log(data);

    let genre = "";

    genre += `
      <li class="genre">
        <button value="${data.genre}" class="${data.genre}">
          <div class="header">
            <img src=${data.image} alt="${data.name}">
          </div>
          <div class="body">
            <h4>${data.name}</h4>
          </div>
        </button>
      </li>
    `;

    // データを追加
    container.append(genre);
  };
}