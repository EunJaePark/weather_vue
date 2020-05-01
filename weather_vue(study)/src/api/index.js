import axios from 'axios'

const config = {
    baseUrl : "https://api.openweathermap.org/data/2.5/", //weather대신 forecast로 바꾸면 5일간의 날짜 데이터 불러올 수 있음.
    myApiKey : "e638734df5fd98d26258937c01adea8f",
}


function weatherCity(cityName) {
    return axios.get(`${config.baseUrl}weather?q=${cityName}&appid=${config.myApiKey}`)
}

function weather5days(cityName) {
    return axios.get(`${config.baseUrl}forecast?q=${cityName}&appid=${config.myApiKey}`)
}



export{ weatherCity, weather5days }