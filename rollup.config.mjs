// rollup.config.mjs
// ---cut-start---
/** @type {import('rollup').RollupOptions} */
// ---cut-end---

import terser from '@rollup/plugin-terser';


export default {
	input: 'src/index.js',
	output: {
		file: 'dist/index.mjs',
		format: 'es'
	},
    // external: ['prompts', 'chalk', 'figlet', 'node:path', 'fs', 'url', 'path'], // 标记为外部依赖
    plugins: [
        terser() // 添加压缩插件
    ]
};