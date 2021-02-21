<template>
  <div id="app">
     
     <router-view/> 
  </div>
</template>

<script>
export default {
  name:'App',
  data (){
    return{ }
  },
  methods:{

  },
  
}
</script>


<style lang="scss">
html,body{
  height: 100%;
}
*{
  margin: 0px;
  padding: 0px;
}
#app{
  height: 100%;
  overflow: hidden;

}
</style>
