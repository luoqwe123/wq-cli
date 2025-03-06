<template>
    <div class="study-container">
        <img :data-src="study" alt="" ref="lazyImage" class="img h-[360px] w-[360px] rounded-[20px]" loading="lazy">
    </div>
</template>

<script setup lang='ts'>
import study from "/study.jpeg"
import { ref, onMounted, onUnmounted } from "vue"

const isImageLoaded = ref(false)
const lazyImage = ref<HTMLImageElement | null>(null)
let observer: IntersectionObserver | null = null // 定义 observer 变量

const loadImage = () => {
    if (lazyImage.value) {
        lazyImage.value.src = lazyImage.value.dataset.src || ""
        lazyImage.value.onload = () => {
            isImageLoaded.value = true
        }
    }
}

// 检查浏览器是否支持 loading="lazy"
const supportsLazyLoading = "loading" in HTMLImageElement.prototype

onMounted(() => {
    if (supportsLazyLoading) {
        // 支持原生懒加载，直接设置 src
        if (lazyImage.value) {
            lazyImage.value.src = study
            lazyImage.value.loading = "lazy"
            lazyImage.value.onload = () => {
                isImageLoaded.value = true
            }
        }
    } else {
        // 使用 Intersection Observer 回退
        observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        loadImage()
                        observer.unobserve(entry.target)
                    }
                })
            },
            { rootMargin: "100px" } // 提前 100px 加载
        )

        if (lazyImage.value) {
            observer.observe(lazyImage.value)
        }
    }
})

onUnmounted(() => {
    if (observer && lazyImage.value) {
        observer.unobserve(lazyImage.value)
        observer.disconnect() // 断开所有观察
        observer = null // 置空引用
    }
})

</script>

<style scoped></style>