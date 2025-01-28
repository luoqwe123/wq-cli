import { defineConfig } from 'tsup'
 
export default defineConfig({
    target:"node20",
    entry:["src/index.ts"],
    clean: true,     //打包前清空dist文件
    format:["cjs"],  //输出代码的模块规范
    minify: true,  //是否开启压缩
    platform: "node",
    outDir: "dist",
})