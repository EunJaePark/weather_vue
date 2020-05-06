<template>
  <div id="app">
      <SearchCity class="search"></SearchCity>
      <router-view class="router"></router-view>
  </div>
</template>


<script>
import SearchCity from './components/SearchCity'
export default {
  components: { 
    SearchCity 
  },
  // created() {
  //   eventbus.$on('suntime', (sunrise, sunset) => {
  //     console.log(sunrise, sunset);
      
  //   })
  // }
}
</script>
<style>
#app{ background-color:lightcoral; }
.search{ outline:10px solid blue; position:absolute; }
.router{  }
</style>
