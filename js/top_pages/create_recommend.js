function createRecommend() {
  const container = $(".recommend .container");
  let data = [];

  $.ajax({
    url: "data/recommend_data.json",
    dataType: "json",
  }).done(function (response) {
    data = response;
    // データ確認
    console.log(data);

    // データ作成
    createData(data, container);
  })
    .fail(function (status) {
      console.log(status + "「recommend_data」エラーが発生しました:");
    })
    .always(function () {
      console.log("「recommend_data」リクエストが完了しました");
    });

  /**
   * データ作成
   */
  function createData(data, container) {
    // データ確認
    // console.log(data);

    const length = data.length;
    let element = "";

    for (let i = 0; i < length; i++) {
      element += `
        <a href=${data[i].link} class="img_wrapper">
          <img src=${data[i].image} alt="${data[i].title}">
        </a>
      `;
    }

    // データを追加
    container.append(element);
  };
}