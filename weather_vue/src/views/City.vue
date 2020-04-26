<template>
  <div 
    class="city"
  >
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

    // eventbus.$on('sendCityName', (cityInput) => {
    //     console.log(cityInput)
        
    //     this.cityname = cityInput
        
    // })
    // eventbus.$on('sendSignal', signal => {
    //   console.log(signal);
        
    // })

    // this.$store.dispatch('FETCH_WEATHER', this.cityname);
    
  },
  methods: {
    newCity() {
      eventbus.$on('sendCityName', (cityInput) => {
        console.log(cityInput)
        
        this.cityname = cityInput
        
      })
      eventbus.$on('sendSignal', signal => {
        console.log(signal);
        
      })

      this.$store.dispatch('FETCH_WEATHER', this.cityname);
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
