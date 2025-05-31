#!/usr/bin/env node

import prompts from "prompts";
import path from "node:path";
import fs from "fs";
import chalk from "chalk"
import figlet from "figlet"
import { fileURLToPath } from 'url';
import fse from 'fs-extra';
import { dirname } from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
            // console.log(data);
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
    // console.log(result)
    // console.log("path", process.cwd())
    //管理控制台输入
    //————————————————————————————————————————————————————————————————————————————————————————————————
    const targetPath = path.resolve(process.cwd(), result.projectName);
    console.log("path2", targetPath)
    const sourcePath = path.resolve(__dirname, "../template/web-cli");
    console.log("path1", sourcePath)


    // Copy files from sourcePath to targetPath
    // fs.cpSync(sourcePath, targetPath, { 
    //     recursive: true,
    //     filter:(sourcePath)=> !sourcePath.includes('node_modules')
    //  });
    try {
        const targetParent = path.dirname(targetPath);
        if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
            console.log(chalk.blue(`创建目标目录：${targetPath}`));
        }
        // 使用 fs-extra 替代 fs.cpSync
        // 检查写入权限
        try {
            await fs.promises.access(targetParent, fs.constants.W_OK);
            console.log(chalk.blue(`目标父目录 ${targetParent} 有写入权限`));
        } catch (err) {
            console.error(chalk.yellow(`警告：目标父目录 ${targetParent} 无写入权限，可能导致复制失败！`));
            console.error(chalk.yellow("建议以管理员模式运行命令，或检查目录权限。"));
        }
        await fse.copy(sourcePath, targetPath, {
            recursive: true,
        // filter: (src) => {
        //     console.log(src)
        //     console.log(src.includes('node_modules'))
        //     return true;
        // },
            overwrite: true,
            errorOnExist: false,
            dereference: true // 跟随符号链接
        });
        console.log(chalk.green(`成功创建项目：${result.projectName}`));
    } catch (err) {
        console.error(chalk.red("复制文件失败："));
        console.error(chalk.red(`错误详情: ${err.message}`));
        if (err.code === 'EACCES') {
            console.error(chalk.yellow("可能因权限不足失败，请尝试以管理员模式运行或检查目标路径权限。"));
        }
        console.dir(err);
        return;
    }
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

