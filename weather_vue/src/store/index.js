import Vue from 'vue'
import Vuex from 'vuex'
import { weatherCity } from '../api/index'

Vue.use(Vuex)

export default new Vuex.Store({ //const로 선언하는 것과 차이....?
  state: {
    weatherData: []
  },
  mutations: {
    SET_CITY(state, city) {
      state.weatherData = city
    }
  },
  actions: {
    FETCH_WEATHER(context, cityname) {
      return weatherCity(cityname)
      .then(res => {
        context.commit('SET_CITY', res.data) 
        return res;
      })
      .catch(err => {
        console.log(err)   
      })
    }
  },
  modules: {
  }
})
