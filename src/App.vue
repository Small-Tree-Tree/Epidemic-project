<template>
  <home></home>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import home from "./views/home/index.vue"
export default defineComponent({
  components:{home},
  setup (props,context) {
    return {

    }
  }
})
</script>
<style lang='less'>
*{
  padding: 0;
  margin: 0;
}
</style>