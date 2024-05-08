<template>
  <div>
    <!-- vue 测试用例 -->
    <span>{{ value }}</span>
    <!-- 1 个错误 -->
    <textarea name="text" id="1" cols="30" rows="10">{{ value }}</textarea>
  </div>
</template>

<script lang='js'>
  export default {
    data() {
      return {
        value: 'value',
      }
    }
  }
</script>

<style scoped>

</style>