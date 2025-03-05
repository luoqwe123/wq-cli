<template>
  <div
    class="doThing flex justify-center items-center w-[96%] h-10 text-sm gap-2.5 mx-auto"
  >
    <div
      class="study flex-1 text-center cursor-pointer"
      @click="changeRouter('study')"
      :class="{ 'selected': checked === 'study' }"
    >
      学习
    </div>
    <div
      class="work flex-1 text-center cursor-pointer"
      @click="changeRouter('work')"
      :class="{ 'selected': checked === 'work' }"
    >
      工作
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref('study') // 默认选中 'study'，可调整

const changeRouter = (route: string) => {
  checked.value = route
  // 可添加路由跳转逻辑，例如：router.push(`/${route}`)
}
</script>

<style scoped>
.selected {
  background-color: #42b883;
  color: white;
}
</style>