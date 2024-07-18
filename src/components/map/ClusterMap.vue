<template>
  <div id="app">
    <div id="Map" ref="map"></div>
    <div class="radio">
      <el-radio-group v-model="radio" @change="change(radio)">
        <el-radio :label="1">添加聚合标注</el-radio>
        <el-radio :label="2">移除聚合标注</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import Tile from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import { Map, View, Feature } from "ol";
import { Style, Stroke, Fill, Text, Circle as CircleStyle } from "ol/style";
import { Point } from "ol/geom";
import { defaults as defaultControls } from "ol/control";
import { Cluster } from "ol/source";
import { fromLonLat } from "ol/proj";

export default {
  data() {
    return {
      radio: 1,
      map: null,
      layer: null,
      clusterSource: null,
      feature: null,
      clusterData: {
        成都市: { center: { lng: 104.061902, lat: 30.609503 } },
        广安市: { center: { lng: 106.619126, lat: 30.474142 } },
        绵阳市: { center: { lng: 104.673612, lat: 31.492565 } },
        雅安市: { center: { lng: 103.031653, lat: 30.018895 } },
        自贡市: { center: { lng: 104.797794, lat: 29.368322 } },
        宜宾市: { center: { lng: 104.610964, lat: 28.781347 } },
        内江市: { center: { lng: 105.064555, lat: 29.581632 } },
      },
      points: [
        { name: "成都市", value: 85 },
        { name: "绵阳市", value: 36 },
        { name: "广安市", value: 50 },
        { name: "雅安市", value: 555 },
        { name: "自贡市", value: 55 },
        { name: "宜宾市", value: 666 },
        { name: "内江市", value: 777 },
      ],
    };
  },
  methods: {
    //按钮切换控制图层
    change() {
      this.radio == 1 ? this.addFeatures() : this.removeFeatures();
    },
    //添加聚合标注
    addFeatures() {
      var currentFeatures = this.clusterSource.getSource().getFeatures();
      //如果聚合标注数据源中没有要素，则重新添加要素
      if (currentFeatures.length == 0) {
        this.addCluster(this.clusterData, this.points);
      } else {
        alert("要素已经存在");
      }
    },
    //移除聚合标注
    removeFeatures() {
      this.clusterSource.getSource().clear(); //移除聚合标注数据源中的所有要素
      this.map.removeLayer(this.layer); //移除标注图层
    },
    //初始化地图
    initMap() {
      let tileLayer = new Tile({ source: new OSM() })
      this.map = new Map({
        target: "Map",
        controls: defaultControls({
          zoom: true,
        }).extend([]),
        // layers: [
        //   new TileLayer({
        //     source: new XYZ({
        //       url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
        //     }),
        //   }),
        // ],
        // layers:new Tile({ source: new OSM() }),
        view: new View({
          center: fromLonLat([104.065735, 30.659462]),
          zoom: 6.5,
          maxZoom: 19,
          minZoom: 3,
        }),
      });
      this.map.addLayer(tileLayer)
    },
    addCluster(clusterData, points) {
      let source = new VectorSource();
      this.clusterSource = new Cluster({
        distance: parseInt(20, 10),
        source: source,
      });
      this.layer = new VectorLayer({
        source: this.clusterSource,
        style: this.clusterStyle.call(this),
      });
      this.map.addLayer(this.layer);
      for (const key in clusterData) {
        points.forEach((e) => {
          if (e.name == key) {
            let point = fromLonLat([
              clusterData[key].center.lng,
              clusterData[key].center.lat,
            ]);
            this.feature = new Feature({
              geometry: new Point(point),
            });
            this.feature.set("name", e.name);
            this.feature.set("value", e.value);
            source.addFeature(this.feature);
          }
        });
      }
    },
    //设置聚合样式
    clusterStyle() {
      return (feature, solution) => {
        var total = 0;
        feature.get("features").forEach((value, index) => {
          total += value.get("value");
        });
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
        return style;
      };
    },
    /**
     * 鼠标悬浮改变图标样式
     */
    pointerMove() {
      this.map.on("pointermove", (evt) => {
        var hit = this.map.hasFeatureAtPixel(evt.pixel);
        this.map.getTargetElement().style.cursor = hit ? "pointer" : "";
      });
    },
  },
  mounted() {
    //初始化地图
    this.initMap();
    //添加鼠标移入事件
    this.pointerMove();
    //添加聚合效果
    this.addCluster(this.clusterData, this.points);
  },
};
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
  .radio {
    position: absolute;
    top: 20px;
    left: 50px;
  }
  .el-radio {
    color: #fff;
  }
}
</style>

