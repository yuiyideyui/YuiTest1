<template>
  <div id="content">
    <div id="map" ref="map" />
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, Feature,View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Stroke, Icon } from "ol/style";
import { LineString, Point, Polygon } from "ol/geom";
import XYZ from "ol/source/XYZ";
import OSM from "ol/source/OSM";
// 一段经纬度数据
import trackCar from "./track-car.json";
export default {
  data() {
    return {
      map: null,
      vectorLayer: null,
    };
  },
  mounted() {
    this.addTrack(); //创建
    this.initMap(); //初始化地图
  },
  methods: {
    addTrack() {
      // 根据经纬度点位创建线
      var routeFeature = new Feature({
        type: "route",
        geometry: new LineString(trackCar),
      });
      // 创建开始图标
      const startMarker = new Feature({
        type: "startMarker",
        geometry: new Point(trackCar[0]),
      });
      // 创建结束图标
      const endMarker = new Feature({
        type: "endMarker",
        geometry: new Point(trackCar[trackCar.length - 1]),
      });
      // 设置样式
      var styles = {
        // 如果类型是 route 的样式
        route: new Style({
          stroke: new Stroke({
            width: 2, //线的宽度
            color: "#ffc641", //线的颜色
          }),
        }),
        // 如果类型是 geoMarker 的样式
        startMarker: new Style({
          image: new Icon({
            src: new URL('../../assets/img/runningboy.jpg', import.meta.url).href,
            anchor: [0.5, 1.1], // 设置偏移
            width: 15,
            height: 15
          }),
        }),
        endMarker: new Style({
          image: new Icon({
            src: new URL('../../assets/img/runningboy.jpg', import.meta.url).href,
            anchor: [0.5, 1.1], // 设置偏移
            width: 15,
            height: 15
          }),
        }),
      };
      // 把小车和线添加到图层
      this.vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [routeFeature, startMarker, endMarker],
        }), //线,起点的图标,终点的图标
        style: function (feature) {
          return styles[feature.get("type")];
        },
      });
    },
    /**
     * 初始化一个 openlayers 地图
     */
    initMap() {
      const target = "map"; // 跟页面元素的 id 绑定来进行渲染
      let view = new View({
        center: [120.97202539443971,29.149083495140076], //地图中心坐标
        zoom: 15, //缩放级别
        projection: 'EPSG:4326',
    });
      let tileLayer = new TileLayer({ source: new OSM() })
      
    //   const tileLayer = [
    //     new TileLayer({
    //       source: new XYZ({
    //         url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
    //       }),
    //       projection: "EPSG:4326",
    //     }),
    //     this.vectorLayer, //把线,起点,终点的图标加载到图层
    //   ];
      this.map = new Map({
        target: target, // 绑定dom元素进行渲染
        // layers: tileLayer, // 配置地图数据源
        view:view
      });
      this.map.addLayer(tileLayer)
      this.map.addLayer(this.vectorLayer)
    //   this.map
    //     .getView()
    //     .fit(new Polygon([trackCar]), {
    //       padding: [100, 100, 100, 100],
    //     }); //设置地图的缩放距离离屏幕的大小
    },
  },
};
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
</style>