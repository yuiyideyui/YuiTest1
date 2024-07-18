<template>
	<div>
		<div>this me {{ props.urlname }}</div>
		<video
			id="player-container-id"
			width="414"
			height="270"
			preload="auto"
			playsinline
			webkit-playsinline
		></video>
	</div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useMediaControls } from '@vueuse/core'
import TCPlayer from 'tcplayer.js'
import 'tcplayer.js/dist/tcplayer.min.css'
const props = defineProps(['urlname'])
let keydownListen = ''
const router = useRouter()
const emit = defineEmits(['startListen'])

onMounted(() => {
	keydownListen = function (e) {
		switch (e.key) {
			case 'Escape':
                console.log('hello');
				emit('startListen')
				router.back()
				break
			default:
		}
	}
    var player = TCPlayer('player-container-id', {autoplay:true}); // player-container-id 为播放器容器 ID，必须与 html 中一致
    // player.src(props.urlname); // url 播放地址
    player.src('http://192.168.0.98:6005/model/cesium/fireFighting/video/小区楼梯模拟数据.mp4')
    player.requestFullscreen()
	document.addEventListener('keydown', keydownListen)
})
onBeforeUnmount(() => {
	document.removeEventListener('keydown', keydownListen)
})
</script>

<style lang="scss" scoped>
</style>