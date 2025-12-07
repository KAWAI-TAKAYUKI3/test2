'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// 現在位置を取得の関数
function success(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  console.log(latitude, longitude);
}
function error(err) {
  window.alert(`ERROR(${err.code}): ${err.message}`);
}
// まず一発GPS取得
navigator.geolocation.getCurrentPosition(success, error);


//時刻表示関数
function makeTime() {
  let hh = new Date().getHours()
  let mm = new Date().getMinutes()
  let ss = new Date().getSeconds()
  if (mm < 10) {
    mm = "0" + mm;
  }
    if (ss < 10) {
    ss = "0" + ss;
  }
  return hh + " : " + mm + " : " + ss;
}


let startTime = 0;
let arrivalTime = 0;
let startTriger = 0;
let latitude = 0;
let longitude = 0;
let gpsAccuracy = 250; //単位はメートル
let destinationLatitude = Number(document.getElementById("dest-latitude").value)
let destinationLongitude = Number(document.getElementById("dest-longitude").value)
let interval = 1;

// 開始処理
function getStartTime() {
  let homeLatitiude = 34.98449;
  let homeLongitude = 136.99180;
  let accuracy = gpsAccuracy * 0.00001;
  // if (latitude < homeLatitiude - accuracy 
  //     || latitude > homeLatitiude + accuracy 
  //     || longitude < homeLongitude - accuracy 
  //     || longitude > homeLongitude + accuracy) {
  //   document.getElementById("not-home").textContent = "自宅以外からは計測開始できません";
  //   return;
  // }
  document.getElementById("start-time").textContent = makeTime();
  document.getElementById("not-start").textContent =""
  startTime = new Date().getTime();
  startTriger = 1;
  navigator.geolocation.watchPosition(success, error);
  interval = setInterval(underMoving, 1000);
}
      
// 測定関数
function underMoving() {
  document.getElementById("current-latitude").textContent = latitude.toFixed(5);
  document.getElementById("current-longitude").textContent = longitude.toFixed(5);
  console.log("test")
  if (latitude > destinationLatitude - accuracy 
    && latitude < destinationLatitude + accuracy 
    && longitude > destinationLongitude - accuracy 
    && longitude < destinationLongitude + accuracy) {
        document.getElementById("arrival-time").textContent = makeTime();
        arrivalTime = new Date().getTime();
        document.getElementById("spended-time").textContent = getSpendTime(startTime, arrivalTime);
        document.getElementById("arrived").textContent = "到着しました🐢";
        clearInterval(interval);
      }
}
      
// 所要時間計算関数
function getSpendTime(start, arrival) {
  let spend = arrival - start;
  let spendMinutes = Math.floor(spend / 60 / 1000);
  let spendSeconds = Math.floor((spend / 1000) % 60);
  if (spendSeconds < 10) {
    spendSeconds = "0" + spendSeconds;
  }
  return `${spendMinutes} : ${spendSeconds}`;
}
// テスト用到着処理
function getArrivalTimeForTest() {
  if (startTriger !== 1) {
    document.getElementById("not-start").textContent ="出発前です";
    return;
  }
  document.getElementById("arrival-time").textContent = makeTime();
  arrivalTime = new Date().getTime();
  document.getElementById("spended-time").textContent = getSpendTime(startTime, arrivalTime);
  console.log(latitude, longitude, destinationLatitude, destinationLongitude);
  document.getElementById("arrived").textContent = "到着しました🐢";
  clearInterval(interval);
}

// テスト用位置捏造処理
// function generateLocationForTest() {
//   latitude = document.getElementById("temp-latitude").value;
//   longitude = document.getElementById("temp-longitude").value;
// }

const target = document.getElementById("start-bottun");
target.addEventListener("click", getStartTime);

const target2 = document.getElementById("arrival-bottun");
target2.addEventListener("click", getArrivalTimeForTest);

// const target3 = document.getElementById("locate-bottun");
// target2.addEventListener("click", generateLocationForTest);
