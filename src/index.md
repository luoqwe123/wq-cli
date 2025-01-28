
1.typescript依赖包
    由于ts不能被bode直接编译需要使用下载typescript依赖包，使用npx tsc对  ts文件进行查找转换
package.json 中 "dev":"tsc --watch"  这个配置用于对ts文件进行监听

2.tsup 依赖包  
    用于对ts文件进行打包,(基于esbuild)

3."typecheck":"tsc --noEmit"
  用于检查ts的类型错误

4. "dev": "tsup --watch --sourcemap",
    --watch 用于持续监听 ， --sourcemap 用于开启debug模式，有助于迅速定位bug

5.对于项目模板，可以使用依赖包 degit 从远程仓库拉取，通过她拉取的模板不包含 .git 文件