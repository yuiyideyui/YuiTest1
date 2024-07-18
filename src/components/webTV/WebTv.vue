<template>
	<div>
		<div class="title1">一</div>
		<div style="display: flex" class="box1 box">
			<div class="active">1</div>
			<div>2</div>
			<div>3</div>
			<div>4</div>
			<div>5</div>
			<div>6</div>
		</div>
		<div class="title2">二</div>
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
	</div>
</template>

<script setup>
import { onMounted, watch, ref, reactive, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const showfather = ref(true)
console.log('route', route.meta)
let keydownListen = ''
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
				let title = document.querySelector(`.title${box}`)
				router.push({ path: `/webtv/${title.innerHTML}/list` })
				break
			default:
		}
	}
	document.addEventListener('keydown', keydownListen)
})

onBeforeUnmount(() => {
	document.removeEventListener('keydown', keydownListen)
})
// watch(() => route.path,(newval)=>{
//     if(newval != '/webtv/'){
//         showfather.value = false
//     }else{
//         showfather.value = true
//     }
// })
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
</style>