// Apikey.jsからexport
import firebaseConfig from "./ApiKey.js";


// firebaseの指定

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  update,
  remove,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//   APIキーを含む

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app); //RealtimeDBに接続
const dbRef = ref(db, "divelog/divedata"); //RealtimeDB内の"divelog"を使う

const dbRef_1 = ref(db, "divelog/year");
const dbRef_2 = ref(db, "divelog/month");
const dbRef_3 = ref(db, "divelog/date");
const dbRef_4 = ref(db, "divelog/hour1");
const dbRef_5 = ref(db, "divelog/minute1");
const dbRef_6 = ref(db, "divelog/hour2");
const dbRef_7 = ref(db, "divelog/minute2");
const dbRef_8 = ref(db, "divelog/spot");
const dbRef_9 = ref(db, "divelog/condition");
const dbRef_10 = ref(db, "divelog/depth");
const dbRef_11 = ref(db, "divelog/trans");
const dbRef_12 = ref(db, "divelog/visibly");

//データ登録(Click)
$(".save").on("click", function () {
  const divedata = {
    year: $(".year").val(),
    month: $(".month").val(),
    date: $(".date").val(),
    inhour: $(".hour1").val(),
    inminute: $(".minute1").val(),
    outhour: $(".hour2").val(),
    outminute: $(".minute2").val(),
    spot: $(".spot").val(),
    condition: $(".condition").val(),
    depth: $(".depth").val(),
    trans: $(".trans").val(),
    visibly: $(".visibly").val(),
    watertemp: $(".watertemp").val(),
    temp: $(".temp").val(),
  };

  const newPostRef = push(dbRef); //ユニークKEYを生成
  set(newPostRef, divedata);
  //"divelog"にユニークKEYをつけてオブジェクトデータを登録
});

//最初にデータ取得＆onSnapshotでリアルタイムにデータを取得
onChildAdded(dbRef, function (data) {
  //目標をonChildAddedのデータ表示
  const divedata = data.val(); //オブジェクトデータを取得し、変数msgに代入
  const key = data.key; //データのユニークキー（削除や更新に使用可能）
  //表示用テキスト・HTMLを作成
  let h = '<p id="' + key + '">'; //ユニークキーを埋め込んでいる
  h += divedata.year;
  h += divedata.month;
  h += divedata.date;
  h += "<br>";
  h += "エントリーTime　";
  h += divedata.inhour;
  h += divedata.inminute;
  h += "　エグジットTime　";
  h += divedata.outhour;
  h += divedata.outminute;
  h += "<br>";
  h += "ダイビングスポット　";
  h += divedata.spot;
  h += "　コンディション　";
  h += divedata.condition;
  h += "<br>";
  h += "最高水深　";
  h += divedata.depth;
  h += "M";
  h += "　透明度　";
  h += divedata.trans;
  h += "M";
  h += "　透視度　";
  h += divedata.visibly;
  h += "M";
  h += "<br>";
  h += "水温 ";
  h += divedata.watertemp;
  h += "℃";
  h += "　気温　";
  h += divedata.temp;
  h += "℃";
  h += "</p>";
  $("#output").prepend(h); //#outputに要素を上に追加
});

// 削除イベント
$(".clear").on("click", function () {
  // location.reload();
  const remove_item = ref(db, "divelog/divedata");
  remove(remove_item); //Firebaseデータ削除関数
});

// 削除処理がFirebase側で実行されたらイベント発生
onChildRemoved(dbRef, (data) => {
  $("#" + data.key).remove(); //let h以下の塊を全部削除する指示
});
