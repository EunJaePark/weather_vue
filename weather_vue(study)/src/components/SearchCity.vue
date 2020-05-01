<template>
  <div>Search City
    <form @submit.prevent="cityName">
      <input
        type="text"
        placeholder="나라 이름을 입력하세요(영어로)"
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
      
      // City.vue로 보내는 이벤트버스함수인 inputName()(main.js에 작성해놓은함수.)으로 전송할 데이터들 넣어줌.
      // true는 City.vue에서 사용할 signal.(지금 코드에서는 없어도 됨.)
      eventbus.inputName(this.cityInput)
      // eventbus.inputName(this.cityInput, true)

      // local storage에 입력한 도시이름 저장하는 함수 실행.
      this.saveName(this.cityInput)

      // input입력창 다시 비워줌.
      this.cityInput = null
    },
    saveName(city) {
      console.log(this);
      console.log(city);
      
      console.log('saveName가 실행됨!!!!');
      
      // local storage에 입력한 도시이름 저장.
      const CITY_NAME = 'city_name'
      console.log(`로컬에저장할 나라이름: ${city}`);
      
      localStorage.setItem(CITY_NAME, this.cityInput)
      // localStorage.setItem(CITY_NAME, JSON.stringify(this.cityInput))
    }

  }

}
</script>

<style scoped>
input{ width:300px; line-height:30px; font-size:20px; }
</style>