<template>
    <div class="icon-container flex items-center">
      <i class="icon" role="img" :aria-label="ariaLabel">
        <svg
          :width="width"
          :height="height"
          :fill="fill"
          :style="svgStyle"
          focusable="false"
        >
          <use :xlink:href="iconId" />
        </svg>
      </i>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, withDefaults, defineProps } from 'vue';
  import type { CSSProperties } from 'vue';
  
  // 定义 SVG 组件的 props 类型
  interface SvgIconProps {
    prefix?: string;   
    name: string;      
    width?: string;    
    height?: string;   
    fill?: string;     
    rotate?: number;   // 旋转角度（度），可选增强功能
  }
  
  // 使用 withDefaults 定义默认值
  const props = withDefaults(defineProps<SvgIconProps>(), {
    prefix: '#icon',
    name: '',          // 保持必填，但提供空默认值
    width: '18px',
    height: '18px',
    fill: 'black',
    rotate: 0,
  });
  
  // 计算图标 ID
  const iconId = computed(() => `${props.prefix}-${props.name}`);
  
  // 计算动态样式
  const svgStyle = computed((): CSSProperties => ({
    transform: props.rotate ? `rotate(${props.rotate}deg)` : undefined,
    // 可扩展其他动态样式，如缩放或偏移
  }));
  
  // 计算无障碍标签
  const ariaLabel = computed(() => props.name || 'icon');
  </script>
  
  <style scoped>
  .icon-container {
    display: inline-flex; /* 确保容器适应内容，支持行内布局 */
    align-items: center; /* 垂直居中对齐 */
  }
  
  .icon {
    display: flex; /* 保持内部 SVG 对齐 */
  }
  
  /* 优化 SVG 显示 */
  svg {
    display: block; /* 移除底部多余间距 */
    transition: transform 0.2s ease; /* 添加旋转动画 */
  }
  </style>