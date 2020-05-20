<template>
  <div id='App'>
    <H1>
      Домашнее задание по математике для 1го класса
    </H1>
    <List/>
  </div>
</template>

<script>

import List from "./components/List";

export default {
  name: 'Math',
  data() {
    return {
      ex1:[],
      ex2:[],
      msg:0,
      test:'test'
    }
  },
  components: {
    List
  },
  created: function(){
    let max=9, min=5;
    for (let i=0 ; i<=25 ; i++) {
      this.ex1.push(Math.round(Math.random()*(max-min)+min));
      this.ex2.push(Math.round(Math.random()*(max-min)+min));
    }
  },
  methods: {
  }
  
}
</script>

<style>
@font-face {
  font-family: mel;
  src: url("../fonts/mel.woff2") format("woff2") ;
}

body {
  background: #2a8d7b;
  color: #fff;
  font-family: mel;
  font-size: 120%;
  text-shadow: 5px 5px 5px #555;
}
</style>