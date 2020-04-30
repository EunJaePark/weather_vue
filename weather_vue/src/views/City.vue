<template>
  <div 
    class="city"
    
  ><!-- @cityname = "newCity" -->
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
    eventbus.$on('sendCityName', (cityInput, signal) => {
      console.log(cityInput)
      console.log(signal);

      if(signal === true) {
        this.newCity(cityInput)
      }
      
      // cityname = cityInput

      // this.cityname = cityInput
      // console.log(this.cityname);       
    })

    // eventbus.$on('sendSignal', signal => {
    //   console.log(signal);

    //   //SearchCity.vue에서 받아온 signal신호가 true이면 newCity함수실행.(input에 나라이름 입력하고 엔터눌렀을 때 true신호도 함께 전송됨.)
    //   if(signal === true) {
    //     this.newCity()
    //     console.log(cityname);
        
    //   }
    // }) 
     
  },
  methods: {
    newCity(cityInput) {
      console.log('city name 받았어!!!!!!!!!');
      
      // eventbus.$on('sendCityName', (cityInput) => {
      //   console.log(cityInput)
        
      //   // this.cityname = cityInput
      //   console.log(this.cityname);       
      // })

      this.$store.dispatch('FETCH_WEATHER', cityInput);
      }
    }

    //1. input이 입력되면 eventBus로 보낸 city명을 받아온뒤
    //2. city명을 데이터에 저장해주고,
    //3. 이 과정을 거친 후에 store로 시티명을 보내줘야함.

}
</script>

<style>
.city{ outline:3px solid orange; }
</style>
