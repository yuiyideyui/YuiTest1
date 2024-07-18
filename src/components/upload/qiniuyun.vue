<template>
	<div>
		<!-- <el-upload
			ref="uploadRef"
			class="upload-demo"
			:auto-upload="false"
		>
			<template #trigger>
				<el-button type="primary">select file</el-button>
			</template>

			<el-button class="ml-3" type="success" @click="submitUpload">
				upload to server
			</el-button>

			<template #tip>
				<div class="el-upload__tip">
					jpg/png files with a size less than 500kb
				</div>
			</template>
		</el-upload> -->
		<input type="file" ref="input"  multiple="multiple" @change="upload" />
		<div @click="uploadFile">上传</div>
	</div>
</template>

<script setup lang="ts">
import * as qiniu from 'qiniu-js'
import { onMounted, ref } from 'vue'
import { start } from './upload'
// import type { UploadInstance } from 'element-plus'

const input = ref()
const uploadToken =
	'DPb1dRjn_FGPOhfJPfxJXBS52vnTi6r0nOErsb9q:H8n2qtawFkOAi2PrEjXJlHRE2YA=:eyJzY29wZSI6Inl1aXRlc3QiLCJkZWFkbGluZSI6MTg5MDMzODY1OX0='
// const uploadToken = 'DPb1dRjn_FGPOhfJPfxJXBS52vnTi6r0nOErsb9q:MNw42qcWtfeatXwsZq4fKooiMyc=:eyJzY29wZSI6Inl1aXRlc3QvdGVzdC8iLCJkZWFkbGluZSI6MTY5MDM2MjMzNn0='
let myfile = null
const upload = () => {
	console.log('e.value', input.value.files)
	myfile = input.value.files
}
let myimgs = []
const uploadFile = () => {
	console.log('value', myfile)
	for (const value of myfile) {
        start(value)
		// const qiniuUploadInfo = {
		// 	file: value, //文件对象
		// 	key: value.name, //文件资源名称
		// 	token: uploadToken, //从后端获取的uplodaToken
		// }
		// const putExtra = {
		// 	fname: value.name, // 文件原文件名
		// 	params: {}, // 用来放置自定义变量
		// 	mimeType: null, // 用来限制上传文件类型，为 null 时表示不对文件类型限制；eg: ["image/png", 	  "image/jpeg"]
		// }
		// const config = {
		// 	useCdnDomain: true, //cdn加速
		// 	region: qiniu.region.z2, //区域
		// }
		// const observable = qiniu.upload(
		// 	qiniuUploadInfo.file,
		// 	`tests/${qiniuUploadInfo.key}`,
		// 	qiniuUploadInfo.token,
		// 	putExtra,
		// 	config
		// )
		// //上传开始
		// observable.subscribe({
		// 	next(res) {
		// 		console.log('next', res)
		// 	},
		// 	error(err) {
		// 		console.log('err', err)
		// 	},
		// 	complete(res) {
		// 		//来到这里就是上传成功了。。
		// 		console.log('complete', res)
        //         myimgs.push(qiniu.imageMogr2({}, value.name, 'rybxdz99i.hn-bkt.clouddn.com'))
        //         console.log('myimgs',myimgs)
		// 	},
		// })
	}
}

</script>

<style scoped>
</style>