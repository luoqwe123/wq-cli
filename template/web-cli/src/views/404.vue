<template>
    <div class="error-container">
      <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full text-center ">
          <div class="!mb-[10px]">
            <h1 class="text-9xl font-extrabold text-indigo-600 animate-bounce !mb-[10px]">404</h1>
            <h2 class="text-3xl font-bold text-gray-900 !mb-[10px]">页面未找到</h2>
            <p class="text-sm text-gray-600">
              抱歉，我们找不到您要访问的页面。请检查URL或返回首页。
            </p>
          </div>
          <div class="w-full flex justify-center">
            <a
              href="/"
              class="w-[60%] h-[30px]  flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              返回首页
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'

// 获取路由实例
const router = useRouter()

// 定义返回上一页的方法
const goBack = (): void => {
    router.go(-1)
}
</script>

<style scoped>
/* Tailwind 处理了大部分样式，这里可以添加一些自定义动画 */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.error-container {
    animation: fadeIn 0.5s ease-in;
}
</style>