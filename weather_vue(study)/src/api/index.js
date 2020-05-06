import axios from 'axios'

const config = {
    baseUrl : "https://api.openweathermap.org/data/2.5/", //weather대신 forecast로 바꾸면 5일간의 날짜 데이터 불러올 수 있음.
    myApiKey : "e638734df5fd98d26258937c01adea8f",
    cnt : "7", //몇일동안의 데이터 불러올건지.
}


function weatherCity(cityName) {
    return axios.get(`${config.baseUrl}weather?q=${cityName}&appid=${config.myApiKey}`)
}

function weather5days(cityName) { // 5일치 시간별 날씨(3시간 간격)
    return axios.get(`${config.baseUrl}forecast?q=${cityName}&appid=${config.myApiKey}&units=metric`) // &units=metric을 붙여주면 섭씨온도로 바꿔줌.
}


function weatherDays(lat, lon) { // 1~16일치 날씨(시간별 아님)
    console.log(lat, lon);
    
    return axios.get(`${config.baseUrl}onecall?lat=${lat}&lon=${lon}&appid=${config.myApiKey}`)
}

export{ weatherCity, weather5days, weatherDays }