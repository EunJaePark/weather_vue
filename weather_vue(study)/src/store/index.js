import Vue from 'vue'
import Vuex from 'vuex'
import { weatherCity,  weather5days, weatherDays } from '../api/index'

Vue.use(Vuex)

export default new Vuex.Store({ //const로 선언하는 것과 차이....?
  state: {
    weatherData: [],
    weather5daysData: [],
    // weatherDaysData: [],
    // weatherLat:[],
    // weatherLon:[]
  },
  mutations: {
    SET_CITY(state, city) {
      state.weatherData = city
    },
    SET_5DAYS(state, city) {
      state.weather5daysData = city
    },
    SET_DAYS(state,  lat, lon) {
      state.weatherLat = lat
      state.weatherLon = lon
    }
  },
  actions: {
    FETCH_WEATHER(context, cityname) {
      return weatherCity(cityname)
      .then(res => {
        context.commit('SET_CITY', res.data) 
        return res
      })
      .catch(err => {
        console.log(err)   
      })
    },
    FETCH_5DAYS(context, cityname) {
      return weather5days(cityname)
      .then(res => {
        context.commit('SET_5DAYS', res.data)
        return res
      })
      .catch(err => {
        console.log(err);
        
      })
    },
    FETCH_DAYS(context, lat, lon) {
      console.log(lat, lon);
      
      return weatherDays( lat, lon)
      .then(res => {
        context.commit('SET_DAYS', res.data)
        return res
      })
      .catch(err => {
        console.log(err);
        
      })
    },
  },
  modules: {
  }
})
