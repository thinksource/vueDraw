<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <InputArea></InputArea>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import InputArea from './components/InputArea.vue'

@Component({
  components: {
    InputArea
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
