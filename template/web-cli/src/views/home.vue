<template>
    <div class="home-container flex  w-full h-screen !py-[8%]" >
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
        <div class="right flex-1 flex justify-center  border-l border-[#42b883] " >
            <div class="doThing" style="font-size: 14px;display: flex;justify-content: center;width: 96%;height: 40px;align-items: center;gap: 10px;">
                <div class="none" style="flex: 1;"></div>
                <div class="study"style="background-color: aqua;flex: 1;text-align: center;border-radius: 5px;" @click="changeRouter('study')">学习</div>
                <div class="none" style="flex: 1;"></div>
                <div class="work" style="background-color: aqua;flex: 1; text-align: center;" @click="changeRouter('work')">工作</div> 
                <div class="none" style="flex: 1;"></div>
            </div>
            <div class="getthing">
                <RouterView/>
            </div>
        </div>


    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref,  } from 'vue';
import { RouterView ,useRouter} from 'vue-router';
const $router = useRouter()

//h-[100px]

const goNewWindow = (event: Event) => {
    event.preventDefault();
    window.open("https://gitee.com/fengqikengni", '_blank', 'noopener,noreferrer')
}
const changeRouter = (url:string)=>{
    $router.push({path:`/${url}`})
}
</script>

<style scoped></style>