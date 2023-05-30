<template>
    <div class="main">
      <router-view></router-view>
    </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
	name: "App",
  components: {
    },
    setup() {
     
    },
  });
</script>
  
<style>
@import url('https://fonts.googleapis.com/css2?family=Lora&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lora&family=Wix+Madefor+Display:wght@500;600;700;800&display=swap');

body, html {
  margin: 0;
  padding: 0;
  height: auto;
  background-image: url("../src/background.jpg");
  background-size: cover;
  background-position: center;
  padding-bottom: 80px;
}

.main {
  font-family: 'Wix Madefor Display', sans-serif;
  width: 100%;

}
</style>

