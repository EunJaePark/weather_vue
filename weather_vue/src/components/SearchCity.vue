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
      console.log(this.cityInput)
      
      eventbus.inputName(this.cityInput)

      this.cityInput = null

      eventbus.getSignal(true)
    },

  }

}
</script>

<style>

</style>