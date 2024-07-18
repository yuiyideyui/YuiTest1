<template>
	<div id="content">
		<div id="map"></div>
		<div id="mouse-position"></div>
		<div id="icontextbox"></div>
	</div>
	<!-- <button @click="anmiteCenter">click</button> -->
</template>
 
<script setup>
import 'ol/ol.css'
import { defaults } from 'ol/control/defaults'
import { Map, View, Feature } from 'ol'
import { defaults as defaultControls } from 'ol/control'
import Tile from 'ol/layer/Tile'
import Heatmap from 'ol/layer/Heatmap'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import { nextTick, onMounted, ref } from 'vue'
import { transform } from 'ol/proj'
import MousePosition from 'ol/control/MousePosition'
import { createStringXY } from 'ol/coordinate'
import Overlay from 'ol/Overlay.js'
import { toLonLat } from 'ol/proj'
import { toStringHDMS } from 'ol/coordinate'
import VectorLayer from 'ol/layer/Vector'
import { Vector, XYZ } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON.js'
import {
	Style,
	Stroke,
	Fill,
	Circle as CircleStyle,
	Icon,
	Text,
} from 'ol/style'
import MultiPoint from 'ol/geom/MultiPoint.js'
import { Polygon, Point, LineString } from 'ol/geom'
import VectorSource from 'ol/source/Vector'
import { Cluster } from 'ol/source'
import trackCar from './track-car.json'

/**
 * 初始化一个 openlayers 地图
 */
// 向地图添加 MousePosition
var mousePositionControl = new MousePosition({
	//坐标格式
	coordinateFormat: createStringXY(4),
	//地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
	projection: 'EPSG:4326',
	//坐标信息显示样式类名，默认是'ol-mouse-position'
	className: 'yuiposition',
	//显示鼠标位置信息的目标容器
	target: document.getElementById('mouse-position'),
	//未定义坐标的标记
	undefinedHTML: '&nbsp;',
})
// map.value.addControl(mousePositionControl);

let map = ref(null)
let pointLayer = new VectorLayer({
    source: new VectorSource(),
})
let initMap = async () => {
	let target = 'map' //跟页面元素的 id 绑定来进行渲染
	// let tileLayer = new Tile({ source: new OSM() })
	let view = new View({
		center: [118.73749, 30.94711], //地图中心坐标
		zoom: 15, //缩放级别
		projection: 'EPSG:4326',
	})
	map = new Map({
		target: target, //绑定dom元素进行渲染
		controls: defaults().extend([mousePositionControl]),
		layers: [
		    new Tile({
		        source: new XYZ({
		            url:
		                "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"
		        })
		    })
		],
		//配置地图数据源
		view: view, //配置地图显示的options配置（坐标系，中心点，缩放级别等）
	})
	// map.addLayer(tileLayer)
    map.addLayer(pointLayer)
}

let clickAddPoint = function () {
	map.on('singleclick', function (evt) {
		// const coordinate = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')
		const coordinate = evt.coordinate
		addPoints(coordinate)
	})
}

function addPoints(coordinate) {
	// 创建feature，一个feature就是一个点坐标信息
	const feature = new Feature({
		geometry: new Point(coordinate),
	})
	//设置 图表的样式
	feature.setStyle(getIcon(coordinate))
    pointLayer.getSource().getFeatures().forEach(e=>{
        pointLayer.getSource().removeFeature(e)
    })
    
	pointLayer.getSource().addFeatures([feature])
	// addIconText(coordinate)
}
//图标的样式设置
function getIcon(coordinate) {
	var styleIcon = new Style({
		// 设置图片效果
		image: new Icon({
			// src: require("../../assets/img/runningboy.jpg"),
			src: new URL('../../assets/img/logo.png', import.meta.url).href,
			anchor: [0.5, 1],
            scale:0.5
		}),
		text: new Text({
		    text: "摄像头" + parseInt(coordinate[0]), // 添加文字描述
		    font: "14px font-size", // 设置字体大小
		    fill: new Fill({
		        // 设置字体颜色
		        color: "#fff",
		    }),
		    offsetY: 10, // 设置文字偏移量
		}),
	})
	return styleIcon
}



/**
 * 鼠标悬浮改变图标样式
 */
function pointerMove() {
	map.on('pointermove', (evt) => {
		var hit = map.hasFeatureAtPixel(evt.pixel)
		map.getTargetElement().style.cursor = hit ? 'pointer' : ''
	})
}

onMounted(() => {
	initMap()
    
	clickAddPoint()
    
	pointerMove()
})
</script>
<style lang="less" scoped>
#content {
	width: 500px;
	height: 500px;

	#map {
		width: 100%;
		height: 100%;
	}
}

#mouse-position {
	height: 50px;
	width: 150px;
}

.ol-overlaycontainer-stopevent .yuiposition {
	color: blue;
	font-size: 16px;
	margin-left: 35px;
}

#popup {
	background-color: wheat;
	opacity: 0.5;
}

::v-deep .ol-overlay-container {
	span {
		display: block;
		width: 50px;
		height: 82px;
		background: url('../../assets/img/runningboy.jpg') no-repeat;
		background-size: 50px 82px;
	}
}
</style>