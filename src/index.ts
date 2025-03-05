#!/usr/bin/env node

import prompts from "prompts";
import path from "node:path";
import fs from "node:fs";
import chalk from "chalk"
import figlet from "figlet"

const bootstrap = async () => {
    await figlet.text(
        "Welcome Wq-cli",
        {
            font: "Graffiti",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 500,
            whitespaceBreak: true,
        },
        function (err, data) {
            if (err) {
                console.log("Something went wrong...");
                console.dir(err);
                return;
            }
            console.log(data);
        }

    );
    console.log(`———————————————————————————————————————————————————`)
    console.log(chalk.cyan.bold(`欢迎使用小秋的前端脚手架，请多指教(＾• ω •＾)`))
    console.log(`———————————————————————————————————————————————————`)
    const result = await prompts([
        {
            type: "text",
            name: "projectName",
            message: "请输入项目名称:"
        },
    ]);
    console.log(result)
    console.log("path", process.cwd())
    //管理控制台输入
    //————————————————————————————————————————————————————————————————————————————————————————————————
    const targetPath = path.resolve(process.cwd(), result.projectName);

    const sourcePath = path.resolve(__dirname, "../template/web-cli");
    console.log("path1", sourcePath)
    // Copy files from sourcePath to targetPath
    fs.cpSync(sourcePath, targetPath, { 
        recursive: true,
        filter:(sourcePath)=> !sourcePath.includes('node_modules')
     });
   
    // Update package.json
    // const packageJsonPath = path.resolve(targetPath, 'package.json');
    // const packageJson = require(packageJsonPath);
    // packageJson.name = result.projectName;
    // Write the updated package.json back to the file
    //fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    // Rename _gitignore to .gitignore
    fs.renameSync(
        path.resolve(targetPath, "_gitignore"),
        path.resolve(targetPath, ".gitignore")
    );
    //————————————————————————————————————————————————————————————————————————————————————————————————
    //最后输出
    console.log("Done, now run:")
    console.log(chalk.green(` cd ${result.projectName}`))
    console.log(chalk.green(' pnpm install'))
    console.log(chalk.green(' pnpm dev'))
    console.log('\n')

};
bootstrap();

