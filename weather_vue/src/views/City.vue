<template>
  <div 
    class="city"
    
  ><!-- @cityname = "newCity" -->
    {{ `나라이름: ${city.name}` }}
    {{ `기온: ${city.main.temp}(섭씨로 수정해야할듯)` }}
    {{ city.weather.main }}
    {{ city.name }}

    <br/><br/>
    {{ city }}
  </div>
</template>

<script>
import { eventbus } from '../main'
export default {
  data() {
    return {
      cityname: '',
      signal: false
    }
  },
  computed: {
    city () {
      return this.$store.state.weatherData
    }
  },
  created() {  
    // 페이지에 새롭게 접속할 경우, 이전에 입력해놓았던 나라가 보이도록 로컬스토리지에서 나라이름 가져옴.
    const localstorageCityName = localStorage.getItem('city_name');
    console.log(localstorageCityName);
    
    this.$store.dispatch('FETCH_WEATHER', localstorageCityName);
    console.log('aaaa');
    

    // SearchCity.vue에서 input에 입력한 나라이름 가져와서 새롭게 나라날씨 데이터 가져옴.
    eventbus.$on('sendCityName', (cityInput, signal) => {
      console.log(cityInput)
      console.log(signal);     

      // 나라 이름이 맞을 경우 날씨데이터 보여주고, 이름 틀릴경우 알림창 뜨도록하기.(아직 미완성)
      if(signal === true) {
        this.newCity(cityInput)
      }    
    })    
  },
  methods: {
    // 
    newCity(cityInput) {
      console.log('city name 받았어!!!!!!!!!');
      this.$store.dispatch('FETCH_WEATHER', cityInput);
      }
    }
}


    //1. input이 입력되면 eventBus로 보낸 city명을 받아온뒤
    //2. city명을 데이터에 저장해주고,
    //3. 이 과정을 거친 후에 store로 시티명을 보내줘야함.
    // 온도, 날씨정보, 도시명, 날짜 출력.
</script>

<style>
.city{ outline:3px solid orange; }
</style>
