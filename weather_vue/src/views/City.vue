<template>
  <div 
    class="city"
    
  ><!-- @cityname = "newCity" -->
    <p>나라이름: <span>{{ city.name }}</span></p>

    <div v-if="tempInfo">
      <p>평균 기온: <span>{{ temp }} ℃</span></p>
      <p>최고 기온: <span>{{ maxTemp }} ℃</span></p>
      <p>최저 기온: <span>{{ minTemp  }} ℃</span></p>     
      <p>습도: <span>{{ tempInfo.humidity }} %</span></p>     
    </div>

    <div v-if="weather" >
      <p>날씨: <span v-for="item in weather">{{ item.main }}.  </span></p>
      <img v-bind:src="`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`" />
    </div>

    <div v-if="wind">
      <p>바람: <span>{{ windDeg }}풍({{ wind.deg }}) {{ wind.speed }}m/s</span></p>
    </div>

    <div v-if="sun">
      <p>일출: <span>{{ sunriseTime }}</span></p>
      <p>일몰: <span>{{ sunsetTime }}</span></p>
    </div>

    
    <div style="outline:2px solid gray;  padding:20px;">
      <p>날씨 전체 데이터</p>
      {{ city }}
    </div>
  </div>
</template>

<script>
import { eventbus } from '../main'
export default {
  data() {
    return {
      cityname: '',
      // signal: false,
      minus: 273.15  // json데이터에서 temp는 Kelvin(절대온도)이므로 273.15를 빼주어야한다. // 켈빈은 절대온도(0을 기전으로 함)에 기반으로 하여 측정되는 온도이며, 'K' 심볼이 사용됩니다. 0K 은 -273.15 °C, 혹은 -459.67 °F 로 변환될 수 있습니다.
    }
  },
  computed: {
    // 각 데이터 선언.
    city () {
      return this.$store.state.weatherData
    },
    tempInfo() {
      return this.$store.state.weatherData.main
    },
    weather() {
      return this.$store.state.weatherData.weather
    },
    sun() {
      return this.$store.state.weatherData.sys
    },
    wind() {
      return this.$store.state.weatherData.wind
    },

    // 기온: 섭씨로 수정 + 소수점 반올림.
    temp() {
      return Math.round(this.tempInfo.temp - this.minus)  // 소수점 반올림.
    },
    maxTemp() {
      return Math.round(this.tempInfo.temp_max - this.minus)
    },
    minTemp() {
      return Math.round(this.tempInfo.temp_min - this.minus)
    },

    //일출,일몰시간: 유닉스 시간을 표준시간으로 변경.
    sunriseTime() {
      // unix시간 변환.
      const sunrise = this.sun.sunrise
      console.log(sunrise);
      const sunrisetime = new Date(sunrise * 1000)
      const sunriseTimestr = sunrisetime.toLocaleTimeString(sunrisetime)
      return sunriseTimestr;
    },
    sunsetTime() {
      // unix시간 변환.
      const sunset = this.sun.sunset
      console.log(sunset);
      const sunsettime = new Date(sunset * 1000)
      const sunsetTimestr = sunsettime.toLocaleTimeString(sunsettime)
      return sunsetTimestr;
    },

    // 풍향: 방위 각도를 한글로 수정.
    windDeg() {
      let cardinalPoints = null
      if(0 <= this.wind.deg < 11.25 || 348.75 <= this.wind.deg < 360) { cardinalPoints = '북' }
      else if(11.25 <= this.wind.deg < 78.75)  { cardinalPoints = '북동' }
      else if(78.75 <= this.wind.deg < 123.75)  { cardinalPoints = '동' }
      else if(123.75 <= this.wind.deg < 146.25)  { cardinalPoints = '남동' }
      else if(146.25 <= this.wind.deg < 191.25)  { cardinalPoints = '남' }
      else if(191.25 <= this.wind.deg < 236.25)  { cardinalPoints = '남서' }
      else if(236.25 <= this.wind.deg < 281.25)  { cardinalPoints = '서' }
      else if(281.25 <= this.wind.deg < 348.75)  { cardinalPoints = '북서' }

      return cardinalPoints
    }
  },
  created() {  
    // 페이지에 새롭게 접속할 경우, 이전에 입력해놓았던 나라가 보이도록 로컬스토리지에서 나라이름 가져옴.
    const localstorageCityName = localStorage.getItem('city_name');  
    this.newCity(localstorageCityName)


    // SearchCity.vue에서 input에 입력한 나라이름 가져와서 새롭게 나라날씨 데이터 가져옴.
    // eventbus.$on('sendCityName', (cityInput, signal) => {
    eventbus.$on('sendCityName', (cityInput) => {
      console.log(cityInput)
      // console.log(signal);     

      // 나라 이름이 맞을 경우 날씨데이터 보여주고, 이름 틀릴경우 알림창 뜨도록하기.(아직 미완성) 
      // if(signal === true) {
        this.newCity(cityInput)
      // }    
      
    }) 
    

    
        
  },
  methods: {
    // api주소에 입력한 도시이름 넣어줌.(api의 index.js)
    newCity(cityname) {
      console.log('city name 받았어!!!!!!!!!');
      this.$store.dispatch('FETCH_WEATHER', cityname)     
    },
  }
}


    //1. input이 입력되면 eventBus로 보낸 city명을 받아온뒤
    //2. city명을 데이터에 저장해주고,
    //3. 이 과정을 거친 후에 store로 시티명을 보내줘야함.
    // 온도, 날씨정보, 도시명, 날짜 출력.
</script>

<style>
.city{ outline:3px solid orange; margin-top:30px; padding:40px; }
span{ font-size:25px; font-weight:bold; }
</style>
