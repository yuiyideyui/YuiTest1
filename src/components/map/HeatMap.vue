<template>
	<div id="content">
		<div id="map" ref="map"></div>
		<div id="mouse-position"></div>
		<div id="popup" class="ol-popup">
			<a href="#" id="popup-closer" class="ol-popup-closer">关闭</a>
			<div id="popup-content" class="popup-content"></div>
		</div>
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
let trackvectorLayer = null
function addTrack() {
	// 根据经纬度点位创建线
	var routeFeature = new Feature({
		type: 'route',
		geometry: new LineString(trackCar),
	})
	// 创建开始图标
	const startMarker = new Feature({
		type: 'startMarker',
		geometry: new Point(trackCar[0]),
	})
	// 创建结束图标
	const endMarker = new Feature({
		type: 'endMarker',
		geometry: new Point(trackCar[trackCar.length - 1]),
	})
	// 设置样式
	var styles = {
		// 如果类型是 route 的样式
		route: new Style({
			stroke: new Stroke({
				width: 2, //线的宽度
				color: '#ffc641', //线的颜色
			}),
		}),
		// 如果类型是 geoMarker 的样式
		startMarker: new Style({
			image: new Icon({
				src: new URL('../../assets/img/runningboy.jpg', import.meta.url).href,
				anchor: [0.5, 1.1], // 设置偏移
				width: 15,
				height: 15,
			}),
		}),
		endMarker: new Style({
			image: new Icon({
				src: new URL('../../assets/img/runningboy.jpg', import.meta.url).href,
				anchor: [0.5, 1.1], // 设置偏移
				width: 15,
				height: 15,
			}),
		}),
	}
	// 把小车和线添加到图层
	trackvectorLayer = new VectorLayer({
		source: new VectorSource({
			features: [routeFeature, startMarker, endMarker],
		}), //线,起点的图标,终点的图标
		style: function (feature) {
			return styles[feature.get('type')]
		},
	})
}

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
let initMap = async () => {
	let target = 'map' //跟页面元素的 id 绑定来进行渲染
	let tileLayer = new Tile({ source: new OSM() })
	let view = new View({
		center: [118.73749, 30.94711], //地图中心坐标
		// center:fromLonLat([104.065735, 30.659462]),
		// center:[120.97202539443971,29.149083495140076],
		zoom: 15, //缩放级别
		projection: 'EPSG:4326',
		// zoom: 6.5,
		// maxZoom: 19,
		// minZoom: 3,
	})
	map = new Map({
		target: target, //绑定dom元素进行渲染
		// controls: defaults().extend([mousePositionControl]),
		// layers: [
		//     new TileLayer({
		//         source: new XYZ({
		//             url:
		//                 "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}"
		//         })
		//     })
		// ],
		//配置地图数据源
		view: view, //配置地图显示的options配置（坐标系，中心点，缩放级别等）
	})
	map.addLayer(tileLayer)

	/*暂时不添加
    // let Vsource = new Vector({
    //     url:
    //         "http://192.168.0.26:22225/geoserver/Vsenser/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Vsenser%3Aregion_lane&outputFormat=application%2Fjson",
    //     format: new GeoJSON()
    // })
    // Vsource.on("featuresloadend", () => {
    //     // console.log('vectorLayer.getSource().getFeatures()', vectorLayer.getSource().getFeatures())
    //     let map = new Map();
    //     map.set("0", 1);
    //     map.set("1", 1);
    //     map.set("2", 2);
    //     map.set("3", 4);
    //     map.set("4", 3);
    //     map.set("5", 1);
    //     map.set("6", 2);
    //     map.set("7", 2);
    //     map.set("8", 3);
    //     map.set("9", 1);
    //     console.log(map)
    //     vectorLayer.getSource().getFeatures().forEach(item => {
    //         // Vsource.forEachFeature(item => {
    //         let segmentid = item.get("segmentid");
    //         // console.log('segmentid', segmentid)
    //         let danger = map.get(String(Number(segmentid) % 9));
    //         switch (danger) {
    //             case 1:
    //                 item.setStyle(new Style({
    //                     fill: new Fill({
    //                         color: [0, 255, 0, 0.6]	//使用了一个数组，[r,g,b,a]
    //                     }),
    //                     //设置边框
    //                     // stroke: new Stroke({
    //                     //     width: 3,
    //                     //     color: [71, 137, 227, 1]
    //                     // })
    //                 }))
    //                 break;
    //             case 2:
    //                 item.setStyle(new Style({
    //                     fill: new Fill({
    //                         color: [0, 0, 255, 0.6]	//使用了一个数组，[r,g,b,a]
    //                     }),
    //                     // stroke: new Stroke({
    //                     //     width: 3,
    //                     //     color: [71, 137, 227, 1]
    //                     // })
    //                 }))
    //                 break;
    //             case 3:
    //                 item.setStyle(new Style({
    //                     fill: new Fill({
    //                         color: [255, 0, 0, 0.6]	//使用了一个数组，[r,g,b,a]
    //                     }),
    //                     // stroke: new Stroke({
    //                     //     width: 3,
    //                     //     color: [71, 137, 227, 1]
    //                     // })
    //                 }))
    //                 break;
    //         }
    //     })
    // })
    // const vectorLayer = new VectorLayer({
    //     source: Vsource,
    //     //style: style
    // })
    // console.log('vector.getSource(). getGeometry()', vectorLayer.getGeometry())
    // map.addLayer(vectorLayer)
    // vectorLayer.setStyle(
    //     new Style({
    //         fill: new Fill({ color: "#39c5bb" }),
    //     })
    // );
    */

	let anmiteCenter = () => {
		let pos = [118.72809641557353, 30.94450628737138]
		pos = transform(pos, 'EPSG:4326', 'EPSG:3857')
		map.getView().animate({
			center: pos,
			zoom: 15,
		})
	}
}
//overlay添加gif动态
let addgif = () => {
	let coordinates = [
		[118.73749, 30.94711],
		[118.83749, 30.99711],
		[118.89749, 31.04711],
	]
	for (let i = 0; i < coordinates.length; i++) {
		// console.log('overlaymap', overlaymap)
		var oDiv = document.createElement('span')
		oDiv.id = 'gif-' + i
		document.getElementById('map').appendChild(oDiv)
		nextTick(() => {
			let overlay = new Overlay({
				element: document.getElementById('gif-' + i),
				position: [coordinates[i][0], coordinates[i][1]],
				positioning: 'center-center',
				stopEvent: false,
			})
			map.addOverlay(overlay)
		})
	}
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
	map.on('singleclick', function (evt) {
		console.log(evt.coordinate)
		let coordinate = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')
		// 点击尺 （这里是尺(米)，并不是经纬度）;
		let hdms = toStringHDMS(toLonLat(evt.coordinate)) // 转换为经纬度显示
		content.innerHTML = `
        <p>你点击了这里：</p>
        <p>经纬度：<p><code> ${hdms}  </code> <p>
        <p>坐标：</p>X：${coordinate[0]} &nbsp;&nbsp; Y: ${coordinate[1]}`
		overlay.setPosition(evt.coordinate) //把 overlay 显示到指定的 x,y坐标
	})
}

/**
 * 添加热力图
 */
let layer = null
let addHeatMap = () => {
	let colors = ['#DC143C', '#16D9CC', '#4DEE12', '#E8D225', '#DC143C']
	let hatmapData = [
		{ name: '成都市' },
		{ name: '成都市' },
		{ name: '成都市' },
		{ name: '成都市' },
		{ name: '绵阳市' },
		{ name: '广安市' },
		{ name: '雅安市' },
		{ name: '自贡市' },
		{ name: '自贡市' },
		{ name: '自贡市' },
		{ name: '自贡市' },
		{ name: '自贡市' },
		{ name: '自贡市' },
		{ name: '自贡市' },
		{ name: '宜宾市' },
		{ name: '甘孜藏族自治州市' },
	]
	let codeList = {
		成都市: { center: { lng: 104.061902, lat: 30.609503 } },
		广安市: { center: { lng: 106.619126, lat: 30.474142 } },
		绵阳市: { center: { lng: 104.673612, lat: 31.492565 } },
		雅安市: { center: { lng: 103.031653, lat: 30.018895 } },
		自贡市: { center: { lng: 104.797794, lat: 29.368322 } },
		宜宾市: { center: { lng: 104.610964, lat: 28.781347 } },
		甘孜藏族自治州市: {
			center: { lng: 101.592433, lat: 30.426712 },
		},
	}
	layer = new Heatmap({
		source: new VectorSource(),
		blur: 30,
		radius: 15,
		gradient: colors,
	})
	map.addLayer(layer)
	AppendFeatures(hatmapData, colors, codeList, 50)
}

/**
 * 增加要素到热力图
 */
let AppendFeatures = (hatmapData, colors, points, max) => {
	// for (var i in hatmapData) {
	//     if (points[hatmapData[i].name]) {
	//         var coords = points[hatmapData[i].name];
	//         var f = new Feature({
	//             geometry: new Point(
	//                 [coords.center.lng, coords.center.lat]
	//             )
	//         });
	//         layer.getSource().addFeature(f);
	//     }
	// }
	var f = new Feature({
		geometry: new Point([118.77749, 30.96711]),
	})
	layer.getSource().addFeature(f)
}

let clusterData = {
	成都市: { center: { lng: 104.061902, lat: 30.609503 } },
	广安市: { center: { lng: 106.619126, lat: 30.474142 } },
	绵阳市: { center: { lng: 104.673612, lat: 31.492565 } },
	雅安市: { center: { lng: 103.031653, lat: 30.018895 } },
	自贡市: { center: { lng: 104.797794, lat: 29.368322 } },
	宜宾市: { center: { lng: 104.610964, lat: 28.781347 } },
	内江市: { center: { lng: 105.064555, lat: 29.581632 } },
}
let points = [
	{ name: '成都市', value: 85 },
	{ name: '绵阳市', value: 36 },
	{ name: '广安市', value: 50 },
	{ name: '雅安市', value: 555 },
	{ name: '自贡市', value: 55 },
	{ name: '宜宾市', value: 666 },
	{ name: '内江市', value: 777 },
]

let clickAddPoint = function () {
	map.on('singleclick', function (evt) {
		// const coordinate = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')
		const coordinate = evt.coordinate
		addPoints(coordinate)
	})
}
function addPoints(coordinate) {
	// 设置图层
	let pointLayer = new VectorLayer({
		source: new VectorSource(),
	})
	// 添加图层
	map.addLayer(pointLayer)
	// 创建feature，一个feature就是一个点坐标信息
	const feature = new Feature({
		geometry: new Point(coordinate),
	})
	//设置 图表的样式
	feature.setStyle(getIcon(coordinate))
	pointLayer.getSource().addFeatures([feature])
	addIconText(coordinate)
}
//图标的样式设置
function getIcon(coordinate) {
	var styleIcon = new Style({
		// 设置图片效果
		image: new Icon({
			// src: require("../../assets/img/runningboy.jpg"),
			src: new URL('../../assets/img/logo.png', import.meta.url).href,
			anchor: [0.5, 1],
		}),
		// text: new Text({
		//     text: "摄像头" + parseInt(coordinate[0]), // 添加文字描述
		//     font: "14px font-size", // 设置字体大小
		//     fill: new Fill({
		//         // 设置字体颜色
		//         color: "#fff",
		//     }),
		//     offsetY: 10, // 设置文字偏移量
		// }),
	})
	return styleIcon
}
function addIconText(coordinate) {
	console.log('coordinate', coordinate)
	let div = document.getElementById('icontextbox')
	div.className = 'iconTextbox'
	let span = document.createElement('span')
	;(span.contentEditable = true), (span.id = coordinate[0])
	var pText = document.createTextNode('摄像头' + parseInt(coordinate[0]))
	span.appendChild(pText)
	div.appendChild(span)
	nextTick(() => {
		var textInfo = new Overlay({
			position: coordinate, //设置位置
			element: document.getElementById(coordinate[0]),
			offset: [-35, 10], //设置偏移
		})
		map.addOverlay(textInfo)
		console.log(
			'document.getElementById(coordinate[0])',
			document.getElementById(coordinate[0])
		)
	})
}

//cluster聚合
let clusterSource = null
let Clusterfeature = null
function addCluster(clusterData, points) {
	let source = new VectorSource()
	clusterSource = new Cluster({
		distance: parseInt(20, 10),
		source: source,
	})
	layer = new VectorLayer({
		source: clusterSource,
		style: clusterStyle.call(this),
	})
	map.addLayer(layer)
	for (const key in clusterData) {
		points.forEach((e) => {
			if (e.name == key) {
				let point = [clusterData[key].center.lng, clusterData[key].center.lat]
				Clusterfeature = new Feature({
					geometry: new Point(point),
				})
				Clusterfeature.set('name', e.name)
				Clusterfeature.set('value', e.value)
				source.addFeature(Clusterfeature)
			}
		})
	}
}

//不同颜色设置
function getclusterStyle(val) {
	if (val < 100) return "blue";
    else if (val >= 100 && val < 500) return "yellow";
    else if (val >= 500) return "red";
}
//设置聚合样式
function clusterStyle() {
	return (Clusterfeature, solution) => {
		var total = 0
		Clusterfeature.get('features').forEach((value, index) => {
			total += value.get('value')
		})
		var style = new Style({
			image: new CircleStyle({
				radius: 15,
				stroke: new Stroke({
					color: getclusterStyle(total),
				}),
				fill: new Fill({
					color: getclusterStyle(total),
				}),
			}),
			text: new Text({
				text: total.toString(),
				fill: new Fill({
					color: '#FFF',
				}),
				font: '12px Calibri,sans-serif',
				stroke: new Stroke({
					color: 'red',
					width: 5,
				}),
			}),
		})
		return style
	}
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
	// console.log(", import.meta.url).href",new URL('../../assets/img/runningboy.jpg', import.meta.url).href)
	addTrack()
	initMap()
	map.addControl(mousePositionControl)
	addPopup()
	addgif()
	addHeatMap()
	clickAddPoint()
	map.addLayer(trackvectorLayer)
	pointerMove()
	//添加聚合效果
	addCluster(clusterData, points)
	// .getView()
	// .fit(new Polygon([trackCar]).transform("EPSG:4326", "EPSG:3857"), {
	//     padding: [100, 100, 100, 100],
	// })
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