<template>
  <div id="app">
    <p>こんにちは</p>
    <div v-for="(item, index) in $options.static.list" :key="index">
      <div>
        <div>
          <a href="">
            {{ item.id }}
            <p :ref="'text' + index" :class="$style.text">{{ item.text }}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  static: {
    list: [
      {
        text: 'こんにちは',
        id: '1',
      },
      {
        text: 'こんばんは',
        id: '2',
      },
      {
        text: 'おはようございます',
        id: '3',
      },
      {
        text: 'ありがとございました',
        id: '4',
      },
    ],
  },
};
</script>

<style module lang="scss">
.text {
  content: 'おはよう';
  margin: 0;
}
</style>
