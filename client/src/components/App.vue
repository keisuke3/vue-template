<template>
  <h1 :class="style.header">Vue3 template</h1>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue';

export default defineComponent({
  setup() {
    const style = useCssModule();
    return {
      style,
    };
  },
});
</script>

<style module lang="scss">
.header {
  font-size: 22px;
}
</style>
