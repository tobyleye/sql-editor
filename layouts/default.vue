<template>
  <div class="text-base text-gray-800 font-sans-serif border">
      <nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style lang="css">
svg:not(:root).svg-inline--fa {
    overflow: visible;
}
.svg-inline--fa.fa-w-16 {
    width: 1em;
}
.svg-inline--fa {
    display: inline-block;
    font-size: inherit;
    height: 1em;
    overflow: visible;
    vertical-align: -.125em;
}
</style>
