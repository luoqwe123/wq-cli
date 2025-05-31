<template>
    <div class="home-container flex  w-full h-screen !py-[8%]">
        <div class="left flex justify-center items-center flex-col" style="flex: 1;">
            <div class="img"><img src="@/assets/images/2.gif" alt="这是gif图" class=" img w-60 h-60"></div>
            <div class="">
                <div class="word text-blue-100  flex justify-center items ">你好，欢迎使用小秋的前端脚手架</div>
                <div class="icon flex justify-around  ">
                    <svgComp name="gitee" fill="black" width="28px" height="28px" class="transform translate-x-6"
                        @click="goNewWindow" />
                    <a href="https://github.com/luoqwe123/wq-cli" rel="noopener noreferrer" target="_blank">
                        <svgComp name="github" fill="black" width="28px" height="28px" class="transform -translate-x-6">
                        </svgComp>
                    </a>
                </div>
            </div>
        </div>
        <div class="right flex-1 flex items-center flex-col  border-l border-[#42b883] gap-[40px]" >
            <div class="doThing  flex justify-center items-center w-[96%] h-10 text-sm gap-2.5 mx-auto">
                <div class="none flex1" ></div> 
                <div class="study flex-1 text-center cursor-pointer"
                    @click="changeRouter('study')" :class="{'selected':checked === 'study'}">学习</div>
                <div class="none flex1"></div>
                <div class="work flex-1 text-center cursor-pointer" 
                    @click="changeRouter('work')" :class="{'selected':checked === 'work' }">工作</div>
                <div class="none flex1" ></div>
            </div>
            <div class="getthing">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, } from 'vue';
import { RouterView, useRouter } from 'vue-router';
const $router = useRouter()
const checked = ref('study')
//h-[100px]

const goNewWindow = (event: Event) => {
    event.preventDefault();
    window.open("https://gitee.com/fengqikengni", '_blank', 'noopener,noreferrer')
}
const changeRouter = (url: string) => {
    checked.value = url
    $router.push({ path: `/${url}` })
}
</script>

<style scoped>
.selected {
    background-color: #5d5cde;
    color: aliceblue;
    border-radius: 5px;
}


</style>