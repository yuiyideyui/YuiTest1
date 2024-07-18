<template>
    <div id="content">
        <div
            id="Map"
            ref="map"
        ></div>
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
const clusterData = {
    成都市: { center: { lng: 104.061902, lat: 30.609503 } },
    广安市: { center: { lng: 106.619126, lat: 30.474142 } },
    绵阳市: { center: { lng: 104.673612, lat: 31.492565 } },
    雅安市: { center: { lng: 103.031653, lat: 30.018895 } },
    自贡市: { center: { lng: 104.797794, lat: 29.368322 } },
    宜宾市: { center: { lng: 104.610964, lat: 28.781347 } },
    内江市: { center: { lng: 105.064555, lat: 29.581632 } },
}
const points = [
    { name: "成都市", value: 1 },
    { name: "绵阳市", value: 1 },
    { name: "广安市", value: 1 },
    { name: "雅安市", value: 1 },
    { name: "自贡市", value: 1 },
    { name: "宜宾市", value: 1 },
    { name: "内江市", value: 1 },
]
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
let map = ref()
// let tileLayer = new Tile({ source: new OSM() })
const init = () => {
    map = new Map({
        target: "Map",
        controls: defaultControls({
            zoom: true,
        }).extend([]),
        layers: [
          new Tile({
            source: new XYZ({
              url: "http://192.168.0.12:6080/tile/{z}/{x}/{y}.png",
            }),
          }),
        ],
        // layers:new Tile({ source: new OSM() }),
        view: new View({
            center: fromLonLat([104.065735, 30.659462]),
            zoom: 10,
            maxZoom: 20,
            minZoom: 0,
        }),
    });
    // map.addLayer(tileLayer)
    map.addControl(mousePositionControl);
    map.on("moveend", e => {
        const zoom = map.getView().getZoom();  //获取当前地图的缩放级别
        const size = map.getSize();
        const area = map.getView().calculateExtent(size)
        var itude= transform([area[0],area[1]], 'EPSG:3857', 'EPSG:4326')
        var itude2= transform([area[2],area[3]], 'EPSG:3857', 'EPSG:4326')
        // console.log('map.getProjection()',map.getView().getProjection());
        console.log('zoom',zoom,itude,itude2);
        if(zoom > 10){
            if(layer.isVisible()){
                layer.setVisible(false)
            }
        }else{
            if(!layer.isVisible()){
                layer.setVisible(true)
            }
        }
    });
}

let clusterSource = null
let layer = null
// let source = new VectorSource();

const addCluster = (clusterData, points) => {
    let source = new VectorSource();
    let feature = null
    clusterSource = new Cluster({
        distance: parseInt(20, 10),
        source: source,
    });
    layer = new VectorLayer({
        source: clusterSource,
        style: clusterStyle.call(this),
        className:'layerOne'
    });
    map.addLayer(layer);
    for (const key in clusterData) {
        points.forEach((e) => {
            if (e.name == key) {
                let point = fromLonLat([
                    clusterData[key].center.lng,
                    clusterData[key].center.lat,
                ]);
                feature = new Feature({
                    geometry: new Point(point),
                });
                feature.set("name", e.name);
                feature.set("value", e.value);
                source.addFeature(feature);
            }
        });
    }
}
//设置聚合样式
const clusterStyle = ()=>{
    return (feature, solution) => {
        var total = 0;
        feature.get("features").forEach((value, index) => {
            total += value.get("value");
        });
        if(total == 1){
            const name = feature.get("features")[0].values_.name
            var style = new Style({
                image: new CircleStyle({
                    radius: 15,
                    stroke: new Stroke({
                        color: "blue",
                    }),
                    fill: new Fill({
                        color: "rgba(24,144,255,100)",
                    }),
                }),
                text: new Text({
                    text: name,
                    fill: new Fill({
                        color: "#FFF",
                    }),
                    font: "12px Calibri,sans-serif",
                    stroke: new Stroke({
                        color: "red",
                        width: 5,
                    }),
                }),
            });
        }else{
            var style = new Style({
                image: new CircleStyle({
                    radius: 15,
                    stroke: new Stroke({
                        color: "blue",
                    }),
                    fill: new Fill({
                        color: "rgba(24,144,255,100)",
                    }),
                }),
                text: new Text({
                    text: total.toString(),
                    fill: new Fill({
                        color: "#FFF",
                    }),
                    font: "12px Calibri,sans-serif",
                    stroke: new Stroke({
                        color: "red",
                        width: 5,
                    }),
                }),
            });
        }
        
        return style;
    };
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

	/**
	 * 为弹窗添加一个响应关闭的函数
	 */
	closer.onclick = function () {
		//Set the position for this overlay. If the position is undefined the overlay is hidden.
		overlay.setPosition(undefined)
		closer.blur()
		return false
	}
    map.on('singleclick', function(evt) {
        // var coordinate = evt.coordinate;
        //判断当前单击处是否有要素，捕获到要素时弹出popup
        let feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layerVetor) { return feature; });
        if (feature && feature.values_.features.length == 1) { //捕捉到要素
            console.log(feature.values_)
            let coordinate = transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')
            // 点击尺 （这里是尺(米)，并不是经纬度）;
            let hdms = toStringHDMS(toLonLat(evt.coordinate)) // 转换为经纬度显示
            content.innerHTML = `
            <p>你点击了这里：</p>
            <p>经纬度：<p><code> ${hdms}  </code> <p>
            <p>坐标：</p>X：${coordinate[0]} &nbsp;&nbsp; Y: ${coordinate[1]}`
            overlay.setPosition(evt.coordinate) //把 overlay 显示到指定的 x,y坐标
        }
    });
}
onMounted(() => {
    init()
    addCluster(clusterData, points);
    addPopup()
   
})

</script>
<style lang="less" scoped>
html,
body {
    height: 100%;
}

#app {
    min-height: calc(100vh - 50px);
    width: 1000px;
    position: relative;
    overflow: none;

    #Map {
        height: 888px;
        min-height: calc(100vh - 50px);
    }

}
#popup {
	background-color: wheat;
	opacity: 0.5;
}
</style>