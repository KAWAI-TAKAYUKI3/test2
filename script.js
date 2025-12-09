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
let firstTriger = 0;
let secondTriger = 0;
let latitude = 0;
let longitude = 0;
let gpsAccuracy = 200; //単位はメートル
let destinationLatitude = 0;
let destinationLongitude = 0;
let firstLatitude = 0;
let firstLongitude = 0;
let secondLatitude = 0;
let secondLongitude = 0;
let interval = 1;

// 開始処理
function getStartTime() {
  // let homeLatitiude = 34.98312;
  // let homeLongitude = 136.98990;
  // let accuracy = gpsAccuracy * 0.00001;
  // if (latitude < homeLatitiude - accuracy 
  //     || latitude > homeLatitiude + accuracy 
  //     || longitude < homeLongitude - accuracy 
  //     || longitude > homeLongitude + accuracy) {
  //   document.getElementById("not-home").textContent = "自宅以外からは計測開始できません";
  //   return;
  // }
  if (startTriger === 0) {
    document.getElementById("start-time").textContent = makeTime();
    document.getElementById("not-start").textContent =""
    startTime = new Date().getTime();
    startTriger = 1;
    navigator.geolocation.watchPosition(success, error);
    underMoving();
    interval = setInterval(underMoving, 1000);
    destinationLatitude = Number(document.getElementById("third-latitude").value)
    destinationLongitude = Number(document.getElementById("third-longitude").value)
    firstLatitude = Number(document.getElementById("first-latitude").value)
    firstLongitude = Number(document.getElementById("first-longitude").value)
    secondLatitude = Number(document.getElementById("second-latitude").value)
    secondLongitude = Number(document.getElementById("second-longitude").value)
    document.getElementById("arrival-time").textContent = "";
    document.getElementById("spended-time").textContent = "";
    document.getElementById("arrived").textContent = "";
  }
}
      
// 測定関数
function underMoving() {
  let accuracy = gpsAccuracy * 0.00001;
  document.getElementById("current-latitude").textContent = latitude.toFixed(5);
  document.getElementById("current-longitude").textContent = longitude.toFixed(5);
  let startText = document.getElementById("start-bottun").textContent
  if (startText === "出発！" || startText ==="実行中") {
    document.getElementById("start-bottun").textContent = "実 行 中";
  } else {
    document.getElementById("start-bottun").textContent = "実行中";
  }
  if (latitude > destinationLatitude - accuracy 
    && latitude < destinationLatitude + accuracy 
    && longitude > destinationLongitude - accuracy 
    && longitude < destinationLongitude + accuracy) {
        document.getElementById("arrival-time").textContent = makeTime();
        arrivalTime = new Date().getTime();
        document.getElementById("spended-time").textContent = getSpendTime(startTime, arrivalTime);
        document.getElementById("arrived").textContent = "到着しました🐢";
        clearInterval(interval);
        document.getElementById("start-bottun").textContent = "到着済";
  } else if (latitude > firstLatitude - accuracy 
    && latitude < firstLatitude + accuracy 
    && longitude > firstLongitude - accuracy 
    && longitude < firstLongitudee + accuracy
    && firstTriger === 0) {
        document.getElementById("lap1").textContent = makeTime();
        arrivalTime = new Date().getTime();
        document.getElementById("lap1-spend").textContent = getSpendTime(startTime, arrivalTime);
        firstTriger = 1;
  } else if (latitude > secondLatitude - accuracy 
    && latitude < secondLatitude + accuracy 
    && longitude > secondLongitude - accuracy 
    && longitude < secondLongitude + accuracy
    && secondTriger === 0) {
        document.getElementById("lap1").textContent = makeTime();
        arrivalTime = new Date().getTime();
        document.getElementById("lap1-spend").textContent = getSpendTime(startTime, arrivalTime);
        secondTriger = 1;
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
  document.getElementById("start-bottun").textContent = "出発！"
  startTriger = 0;
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