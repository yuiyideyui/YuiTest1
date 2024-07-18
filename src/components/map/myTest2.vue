<template>
	<div id="content">
		<div id="map"></div>
		<div id="mouse-position"></div>
		<div id="popup" class="ol-popup">
			<a href="#" id="popup-closer" class="ol-popup-closer">关闭</a>
			<div id="popup-content" class="popup-content"></div>
		</div>
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

let map = ref(null)
// 设置图层
let pointLayer = new VectorLayer({
    source: new VectorSource(),
})
let initMap = async () => {
	let target = 'map' //跟页面元素的 id 绑定来进行渲染
	// let tileLayer = new Tile({ source: new OSM() })
	let view = new View({
		center: [118.73749, 30.94711], //地图中心坐标
		// center:fromLonLat([104.065735, 30.659462]),
		// center:[120.97202539443971,29.149083495140076],
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

//overlay添加一个弹框
const addPopup = () => {
	// 使用变量存储弹窗所需的 DOM 对象
	var container = document.getElementById('popup')
	var closer = document.getElementById('popup-closer')
	var content = document.getElementById('popup-content')

	// 创建一个弹窗 Overlay 对象
	let overlay = new Overlay({
		element: container, //绑定 Overlay 对象和 DOM 对象的
		autoPan: true, // 定义弹出窗口在边缘点击时候可能不完整 设置自动平移效果
		autoPanAnimation: {
			duration: 250, //自动平移效果的动画时间 9毫秒）
		},
	})
	// 将弹窗添加到 map 地图中
	map.addOverlay(overlay)

	// let _that = this;
	/**
	 * 为弹窗添加一个响应关闭的函数
	 */
	closer.onclick = function () {
		//Set the position for this overlay. If the position is undefined the overlay is hidden.
		overlay.setPosition(undefined)
		closer.blur()
		return false
	}
	/**
	 * 添加单击map 响应函数来处理弹窗动作
	 */
	// map.on('singleclick', function (evt) {
    //     if(map.getFeaturesAtPixel(evt.pixel)){
    //         console.log(evt.coordinate)
    //         let coordinate = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')
    //         // 点击尺 （这里是尺(米)，并不是经纬度）;
    //         let hdms = toStringHDMS(toLonLat(evt.coordinate)) // 转换为经纬度显示
    //         content.innerHTML = `
    //         <p>你点击了这里：</p>
    //         <p>经纬度：<p><code> ${hdms}  </code> <p>
    //         <p>坐标：</p>X：${coordinate[0]} &nbsp;&nbsp; Y: ${coordinate[1]}`
    //         overlay.setPosition(evt.coordinate) //把 overlay 显示到指定的 x,y坐标
    //     }
	// })
    map.on('singleclick', function(evt) {
        var coordinate = evt.coordinate;
        /****************************************************/
        //判断当前单击处是否有要素，捕获到要素时弹出popup
        let feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layerVetor) { return feature; });
        if (feature) { //捕捉到要素
            console.log(evt.coordinate)
            let coordinate = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')
            // 点击尺 （这里是尺(米)，并不是经纬度）;
            let hdms = toStringHDMS(toLonLat(evt.coordinate)) // 转换为经纬度显示
            content.innerHTML = `
            <p>你点击了这里：</p>
            <p>经纬度：<p><code> ${hdms}  </code> <p>
            <p>坐标：</p>X：${coordinate[0]} &nbsp;&nbsp; Y: ${coordinate[1]}`
            overlay.setPosition(evt.coordinate) //把 overlay 显示到指定的 x,y坐标
        }
        /******************************************/
    });
}

function addPoints(coordinate) {
    console.log('coordinate',coordinate);
	// 创建feature，一个feature就是一个点坐标信息
	const feature = new Feature({
		geometry: new Point(coordinate),
        name: `医院${coordinate}`,
        remark: `这是医院${coordinate}`
	})
	//设置 图表的样式
	feature.setStyle(getIcon(coordinate))
	pointLayer.getSource().addFeatures([feature])
}
//图标的样式设置
function getIcon(coordinate) {
	var styleIcon = new Style({
		// 设置图片效果
		image: new Icon({
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
    // map.on('singleclick', (evt) => {
	// 	console.log('evt',map.getFeaturesAtPixel(evt.pixel));
	// })
}

onMounted(() => {
	initMap()
	addPopup()
    let array = [
        [118.74542933868409, 30.944577994689944],
        [118.7368033544922, 30.949084105834963]
    ]
    array.forEach(e=>{
        addPoints(e)
    })
    pointLayer.getSource().getFeatures().forEach(e=>{
        map.getView().on('change:resolution', function () {
            var style = e.getStyle();
            // 重新设置图标的缩放率，基于层级10来做缩放
            style.getImage().setScale(this.getZoom() / 50);
            e.setStyle(style);
        })
    })
    
    
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