<template>
  <div>Search City
    <form @submit.prevent="cityName">
      <input
        type="text"
        v-model="cityInput"       
      />
    </form>    
  </div>
</template>

<script>
import { eventbus } from '../main'
export default {
  data() {
    return {
      cityInput: '',
    }
  },
  created() {
  },
  methods: {
    cityName() {
      console.log(`입력한 이름: ${this.cityInput}`)
      
      eventbus.inputName(this.cityInput, true)

      // eventbus.getSignal(true)
      // this.$emit('cityname', this.cityInput)

      // // local storage에 입력한 도시이름 저장하는 함수 실행.
      this.saveName(this.cityInput)

      this.cityInput = null
    },
    saveName(city) {
      console.log(this);
      console.log(city);
      
      console.log('saveName가 실행됨!!!!');
      
      // local storage에 입력한 도시이름 저장.
      const CITY_NAME = 'city_name'
      console.log(`로컬에저장할 나라이름: ${city}`);
      
      localStorage.setItem(CITY_NAME, JSON.stringify(this.cityInput))
    }

  }

}
</script>

<style>

</style>