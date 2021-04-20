'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
const answers = [
  '{userName}にピッタリなフレーズは「人生は妥協の連続なんだ そんなこと疾うにわかってたんだ」',
  '{userName}にピッタリなフレーズは「価値観だって自由なら 人を傷付けていいだろ 教えなかったのはあんたじゃないか」',
  '{userName}にピッタリなフレーズは「逃げるは恥だか役に立つとかいうけど 正直立てません。」',
  '{userName}にピッタリなフレーズは「きみがいいのなら ただ忘れたいのなら もう隠すことなんてないよ このまま少しだけ 踊ろうぜ」'
];

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    // 子どもの要素があるかぎり削除
    element.removeChild(element.firstChild);
  }
}

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字コード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添え字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  // TODO {userName} をユーザーの名前に置き換える
  return result = result.replaceAll('{userName}', userName);
}

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  console.log(userName);
  if (!userName) {
    // 名前が空の時は処理を終了する
    return;
  }
  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue =
    `https://twitter.com/intent/tweet?button_hashtag=${encodeURIComponent('あなたにピッタリなフレーズ')}&ref_src=twsrc%5Etfw`;
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたにピッタリなフレーズ';
  tweetDivided.appendChild(anchor);
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentButton.click();
  }
}

// テストコード
console.assert(assessment('suis') ===
  'suisにピッタリなフレーズは「人生は妥協の連続なんだ そんなこと疾うにわかってたんだ」',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

console.assert(assessment('suis') === assessment('suis'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
