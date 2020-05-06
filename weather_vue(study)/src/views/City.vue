<template>
  <div 
    class="city"
    :class="{'day': this.day, 'night': this.night}"
  ><!-- @cityname = "newCity" -->
    <p>나라이름ㅣㅣ: <span>{{ city.name }}</span></p>

    <!-- <div v-if="latLon">
      <p>lat: <span>{{ lat }}</span></p>
      <p>lon: <span>{{ lon }}</span></p>
    </div> -->

    <div v-if="tempInfo">
      <p>평균 기온: <span>{{ temp }} ℃</span></p>
      <p>최고 기온: <span>{{ maxTemp }} ℃</span></p>
      <p>최저 기온: <span>{{ minTemp  }} ℃</span></p>     
      <p>습도: <span>{{ tempInfo.humidity }} %</span></p>     
    </div>

    <div v-if="weather" >
      <p>날씨: <span v-for="item in weather">{{ item.main }}.  </span></p>
      <img v-bind:src="`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`" />
      <i class="wi" :class="`wi-owm-${weather[0].id}`"></i>
    </div>

    <div v-if="wind">
      <p>바람: <span>{{ windDeg }}풍({{ wind.deg }}) {{ wind.speed }}m/s</span></p>
    </div>

    <div v-if="sun">
      <p>일출: <span>{{ sunriseTime }}</span></p>
      <p>일몰: <span>{{ sunsetTime }}</span></p>
    </div>

    <div v-if="date5days">
      <h2>5days</h2>
      <div v-for="item in date5days"> 
        <p>날짜: <span>{{ item.dt_txt }}</span> </p>
        <p>기온: <span>{{ item.main.temp }}</span></p>
        <p v-for="icon in item.weather">아이콘: <i class="wi" :class="`wi-owm-${icon.id}`"></i></p> 
      </div>     
    </div>
    
    <div style="outline:2px solid gray;  padding:20px;">
      <p>날씨 전체 데이터</p>
      {{ city }}
    </div>
    
    <div style="outline:2px solid gray;  padding:20px;">
      <p>5일치 날씨 전체 데이터</p>
      {{ weather5days }}
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
      minus: 273.15,  // json데이터에서 temp는 Kelvin(절대온도)이므로 273.15를 빼주어야한다. // 켈빈은 절대온도(0을 기전으로 함)에 기반으로 하여 측정되는 온도이며, 'K' 심볼이 사용됩니다. 0K 은 -273.15 °C, 혹은 -459.67 °F 로 변환될 수 있습니다.
      time: '',
      day: false,
      night: false
 }
  },
  computed: {
    // 각 데이터 선언.
    city () {
      return this.$store.state.weatherData
    },
    tempInfo() {
      return this.city.main
    },
    weather() {
      return this.city.weather
    },
    sun() {
      return this.city.sys
    },
    wind() {
      return this.city.wind
    },
    latLon() {
      console.log(`보내보자 lat을!!!!!!! ${this.city.coord.lat}`)
      console.log(`보내보자 lon을!!!!!!! ${this.city.coord.lon}`)
      // 지역 입력했을 때 그 지역의 lat, lon보내서 5일치 날씨데이터 가져오도록 함.
      this.newCityDays(this.city.coord.lat, this.city.coord.lon)
      return this.city.coord
    },

    // lat, lon 구함.
    lat() {
      const LAT = 'lat'
      localStorage.setItem(LAT, this.latLon.lat)
      return this.latLon.lat
    },
    lon() {
      const LON = 'lon'
      localStorage.setItem(LON, this.latLon.lon)
      return this.latLon.lon
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
      localStorage.setItem('sunrise', sunrise);
      console.log(sunrise);
      const sunrisetime = new Date(sunrise * 1000)
      const sunriseTimestr = sunrisetime.toLocaleTimeString(sunrisetime)
      return sunriseTimestr;
    },
    sunsetTime() {
      // unix시간 변환.
      const sunset = this.sun.sunset
      localStorage.setItem('sunset', sunset)
      console.log(sunset);
      const sunsettime = new Date(sunset * 1000)
      const sunsetTimestr = sunsettime.toLocaleTimeString(sunsettime)
      return sunsetTimestr;
    },

    // 풍향: 방위 각도를 한글로 수정.
    windDeg() {
      let cardinalPoints = null
      if(0 <= this.wind.deg < 11.25 || 348.75 <= this.wind.deg < 360) { cardinalPoints = 'wi-direction-up-right' }
      else if(11.25 <= this.wind.deg < 78.75)  { cardinalPoints = '북동' }
      else if(78.75 <= this.wind.deg < 123.75)  { cardinalPoints = '동' }
      else if(123.75 <= this.wind.deg < 146.25)  { cardinalPoints = '남동' }
      else if(146.25 <= this.wind.deg < 191.25)  { cardinalPoints = '남' }
      else if(191.25 <= this.wind.deg < 236.25)  { cardinalPoints = '남서' }
      else if(236.25 <= this.wind.deg < 281.25)  { cardinalPoints = '서' }
      else if(281.25 <= this.wind.deg < 348.75)  { cardinalPoints = '북서' }
      
      return cardinalPoints
    },

    // 일출, 일몰시간 따라서 배경 밝기 조절.
    sunBG() {
      const riseTime = this.sun.sunrise
      const setTime = this.sun.sunset
      console.log(riseTime);
      console.log(setTime);
      sunBg(riseTime, settTime)   
      
      return sunBg(riseTime, settTime)     
    },
    

  // 5days 시간별 날씨 전체 데이터.
  weather5days() {
    return this.$store.state.weather5daysData
  },
  // 5days 날짜 + 기온 + icon(id).
  date5days() {
    return this.weather5days.list
  },


  // 1~16일치 날씨 전체 데이터.
  weatherDays() {
    return this.$store.state.weatherDaysData
  }


  },
  created() {  
    // lat, lon 로컬스토리지에 저장.
    // console.log(latLon);
    // console.log(this.lat, this.lon);
    // const LAT = this.lat //'lat'
    // const LON = this.lon //'lon'
    // localStorage.setItem(LAT, this.lat)
    // localStorage.setItem(LON, this.lon)
    
    // 페이지에 새롭게 접속할 경우, 이전에 입력해놓았던 나라가 보이도록 로컬스토리지에서 나라이름 가져옴.
    const localstorageCityName = localStorage.getItem('city_name')
    this.newCity(localstorageCityName)
    // // 페이지에 새롭게 접속할 경우, 이전에 입력해놓았던 나라의 lat, lon가져옴.
    // const cityLat = localStorage.getItem('lat')
    // const cityLon = localStorage.getItem('lon')
    // console.log(cityLat, cityLon);   
    // this.newCityDays(cityLat, cityLon)
    // 페이지에 새롭게 접속할 경우, 이전에 입력해놓았던 나라의 sunrise, sunset가져옴.  // 일출, 일몰 시간 따라서 배경색 바뀌게 함.
    const sunriseTime = localStorage.getItem('sunrise')
    const sunsetTime = localStorage.getItem('sunset')
    console.log(sunriseTime, sunsetTime);
    
    this.sunBg(sunriseTime, sunsetTime)
    

    

    // SearchCity.vue에서 input에 입력한 나라이름 가져와서 새롭게 나라날씨 데이터 가져옴.
    // eventbus.$on('sendCityName', (cityInput, signal) => {
    eventbus.$on('sendCityName', (cityInput) => {
      console.log(cityInput)
      // console.log(signal);     

      // 나라 이름이 맞을 경우 날씨데이터 보여주고, 이름 틀릴경우 알림창 뜨도록하기.(아직 미완성) 
      // if(signal === true) {
        this.newCity(cityInput)

        // const lat = localStorage.getItem('lat')
        // const lon = localStorage.getItem('lon')
        // this.newCityDays(cityInput, LAT, LON)

          // console.log(this.city.coord)
          
          // this.newCityDays(localstorageCityName, cityLat, cityLon)
          // console.log(localstorageCityName, cityLat, cityLon)

      // }    
      
    }) 
    

    
        
  },
  methods: {
    // api주소에 입력한 도시이름 넣어줌.(api의 index.js)
    newCity(cityname) {
      console.log('city name 받았어!!!!!!!!!12345');
      this.$store.dispatch('FETCH_WEATHER', cityname)  // 당일 날씨 데이터   
      this.$store.dispatch('FETCH_5DAYS', cityname)  // 5일치 시간별 날씨 데이터
    },
    // newCityDays(lat, lon) {
    //   console.log('lat, lon받음!!!!');
    //   console.log(lat,lon);
      
    //   this.$store.dispatch('FETCH_DAYS', lat, lon) // 1~16일치 날씨 데이터
    // },


    // sunset, sunrise따라서 배경색 바뀌게 함.
    sunBg(sunriseTime, sunsetTime) {

      const nowTime = new Date().getTime() / 1000
      console.log(`현재시간 : ${nowTime} 일출:${sunriseTime} 일몰:${sunsetTime}`);
      // console.log(`현재시간 : ${nowTime} 일출:${this.sun.sunrise} 일몰:${this.sun.sunset}`);

      const citybg = document.querySelector('.city')    

      if(sunriseTime, sunsetTime) {
        if(nowTime < sunriseTime) {
          console.log('해가 뜨기전 새벽입니다!!!!!!!');
          this.day = false
          this.night = true
        }
        if(sunriseTime < nowTime < sunsetTime && !(nowTime < sunriseTime)) {
          console.log('해가 떳습니다!!!!!!!!!!!');
          this.night = false
          this.day = true
          // this.daynight = 'day'       
          // citybg.classList.add('day')
        } 
        if(sunsetTime <= nowTime) {
          console.log('밤 입니다!!!!!!!!');
          this.day = false
          this.night = true
          // this.daynight = 'night'        
          // citybg.classList.add('night')
        }
        
        console.log(`day = ${this.day}`);
        console.log(`night = ${this.night}`);
      }


      // if(sunriseTime < nowTime < sunsetTime) {
      //   console.log('낮이다');  

      //   localStorage.setItem('time', this.time)       
      //   this.time = 'day'
      //   console.log(this.time);
        
      //   if(localStorage.getItem('time')) {
      //     this.time = localStorage.getItem('time')
      //     console.log(this.time);
          
      //   }
               
      //   // city.classList.add('sunrise')
      //   // document.querySelector('.city').classList.add('sunrise')
      // } else if (sunsetTime < nowTime) {
      //   console.log('밤이다'); 
      //   localStorage.setItem('time', this.time)
      //   this.time = 'night'
      //   // document.querySelector('.city').classList.add('sunset')
      // }
    }
  }
}


    //1. input이 입력되면 eventBus로 보낸 city명을 받아온뒤
    //2. city명을 데이터에 저장해주고,
    //3. 이 과정을 거친 후에 store로 시티명을 보내줘야함.
    // 온도, 날씨정보, 도시명, 날짜 출력.
</script>

<style>
@import url('../weather-icons-master/css/weather-icons.css');
.city{ outline:3px solid orange; padding:100px 40px; }
.sunrise{ background-color:yellow; }
.sunset{ background-color:lightslategray; }
.day{ background-color:rgba(255, 255, 255, .5); }
.night{ background-color:rgba(0, 0, 0, .5); }
span{ font-size:25px; font-weight:bold; }

i{ outline:1px solid red; width:30px; height:30px; display:inline-block; font-size:30px;  }
</style>
