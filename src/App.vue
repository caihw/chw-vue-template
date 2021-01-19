<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
{{#if sass}}
<style lang="sass">
{{/if}}
{{#if less}}
<style lang="less">
{{/if}}
{{#if stylus}}
<style lang="stylus">
{{/if}}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 25px;

}

a {
  font-weight: bold;
  color: #2c3e50;

}

a.router-link-exact-active {
  color: #42b983;
}
</style>
