<template>
  <div id="app">
    <TaskList />
  </div>
</template>

<script>
import TaskList from "./components/TaskList.vue";

export default {
  name: "app",
  components: {
    TaskList
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700");

body {
  background-color: #eeeeee;
  font-family: "Montserrat", sans-serif;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
}
body,
html {
  margin: 0;
  height: 100%;
}
#app {
  width: 80%;
  height: 80%;
}
</style>
