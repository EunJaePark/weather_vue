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
    })    
  },
  methods: {
    newCity(cityInput) {
      console.log('city name 받았어!!!!!!!!!');
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
