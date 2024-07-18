<template>
	<div>
		<!-- <div>User {{ $route.params.id }}</div> -->
		<div class="title">{{ props.id }}</div>
		<div style="display: flex" class="box1 box">
			<div class="active" url="http://hello.com">1</div>
			<div>2</div>
			<div>3</div>
			<div>4</div>
			<div>5</div>
			<div>6</div>
		</div>
		<div style="display: flex" class="box2 box">
			<div>1</div>
			<div>2</div>
			<div>3</div>
			<div>4</div>
			<div>5</div>
			<div>6</div>
			<div>7</div>
			<div>8</div>
		</div>
		<router-view :urlname="urlname" @startListen="startListen"></router-view>
	</div>
</template>

<script setup>
import { onMounted, defineProps, ref, onBeforeUnmount,onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const props = defineProps(['id'])
let keydownListen = ''
let urlname = ref('')
onMounted(() => {
	let box = 1
	let activebox = document.querySelector(`.box${box}`)
	let num = 0
	const vwValue = 20 // 指定的vw值
	const pxValue = (vwValue * window.innerWidth) / 100 // 将vw值转换为像素值
	keydownListen = function (e) {
		let active = document.querySelectorAll(`.box${box}>div`)
		function clearnull() {
			active.forEach((e) => {
				e.className = ''
			})
		}
		console.log('e.key', e.key)
		switch (e.key) {
			case 'ArrowUp':
				console.log('ArrowUp', box)
				if (box > 1) box--
				else break
				clearnull()
				activebox.scrollTo({
					left: 0,
					behavior: 'smooth',
				})
				activebox = document.querySelector(`.box${box}`)
				active = document.querySelectorAll(`.box${box}>div`)
				num = 0
				active[num].className = 'active'
				break
			case 'ArrowDown':
				console.log('ArrowDown', box)
				if (box < 2) box++
				else break
				clearnull()
				activebox.scrollTo({
					left: 0,
					behavior: 'smooth',
				})
				activebox = document.querySelector(`.box${box}`)
				active = document.querySelectorAll(`.box${box}>div`)
				num = 0
				active[num].className = 'active'
				break
			case 'ArrowLeft':
				console.log('ArrowLeft')
				if (num === 0) {
					clearnull()
					active[active.length - 1].className = 'active'
					num = active.length - 1
					activebox.scrollTo({
						left: (num + 1) * pxValue,
						behavior: 'smooth',
					})
				} else {
					clearnull()
					active[num - 1].className = 'active'
					activebox.scrollTo({
						left: (num - 1) * pxValue,
						behavior: 'smooth',
					})
					num--
				}
				break
			case 'ArrowRight':
				console.log('ArrowRight')
				if (num === active.length - 1) {
					clearnull()
					active[0].className = 'active'
					activebox.scrollTo({
						left: 0,
						behavior: 'smooth',
					})
					num = 0
				} else {
					clearnull()
					active[num + 1].className = 'active'
					activebox.scrollTo({
						left: (num + 1) * pxValue,
						behavior: 'smooth',
					})
					num++
				}
				break
			case 'Enter':
				active = document.querySelectorAll(`.box${box}>div`)
				console.log('active[num].getAttribute', active[num].getAttribute('url'))
                    urlname.value = active[num].getAttribute('url')
                    if(urlname.value){
                        router.push({path:`/webtv/${props.id}/list/vTv`})
                        document.removeEventListener('keydown', keydownListen)
                    }else{
                        ElMessage({
                            showClose: true,
                            message: '没有url',
                            type: 'warning',
                        })
                    }
				break
			case 'Escape':
				// router.push({ path: '/webtv' })
                router.back()
				break
			default:
		}
	}
	document.addEventListener('keydown', keydownListen)
})
const startListen = function () {
    console.log('haha');
    document.addEventListener('keydown', keydownListen)
}
onBeforeUnmount(() => {
	document.removeEventListener('keydown', keydownListen)
})
</script>

<style lang="less" scoped>
.active {
	color: red;
}
.box {
	width: 100vw;
	height: auto;
	overflow: auto;
	&::-webkit-scrollbar {
		display: block;
		width: 5px;
		height: 5px;
	}

	&::-webkit-scrollbar-thumb {
		background: #4b6ce0;
		display: block;
		border-radius: 10px;
	}
}
.box div {
	width: calc(20vw);
	height: 50px;
	flex-shrink: 0;
	text-align: center;
	line-height: 50px;
}
.title {
	text-align: center;
}
</style>