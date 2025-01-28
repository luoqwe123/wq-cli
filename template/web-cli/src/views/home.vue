<template>
    <div class="home-container ">
        <Home/>
        <div class="">
            <div class="word text-blue-100  flex justify-center items ">你好，欢迎使用小秋的前端脚手架</div>  
            <div class="icon flex justify-around  ">
                <svgComponents name="gitee" fill="black" width="28px" height="28px" class="transform translate-x-6"/>
                <svgComponents name="github" fill="black" width="28px" height="28px" class="transform -translate-x-6"></svgComponents>
            </div>
        </div>
        

    </div>
</template>

<script setup lang='ts'>
//h-[100px]
import Home from '@/components/home.vue';
import svgComponents from '@/components/svgComponents.vue';



</script>

<style  scoped>
@import 'tailwindcss'


</style>