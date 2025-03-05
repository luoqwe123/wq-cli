<template>
    <div class="home-container flex justify-center items-center flex-col w-full h-screen">
        <div class="img"><img src="@/assets/images/2.gif" alt="这是gif图" class=" img w-60 h-60"></div>
        <div class="">
            <div class="word text-blue-100  flex justify-center items ">你好，欢迎使用小秋的前端脚手架</div>
            <div class="icon flex justify-around  ">
                <svgComp name="gitee"  fill="black"  width="28px" height="28px" class="transform translate-x-6" @click="goNewWindow"/>
                <a href="https://github.com/luoqwe123/wq-cli" rel="noopener noreferrer" target="_blank">
                    <svgComp name="github" fill="black" width="28px" height="28px" class="transform -translate-x-6">
                    </svgComp>
                </a>
            </div>
        </div>


    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, type Events } from 'vue';

//h-[100px]

const goNewWindow = (event:Event)=>{
    event.preventDefault();
    window.open("https://gitee.com/fengqikengni",'_blank', 'noopener,noreferrer')
}

</script>

<style scoped>
</style>