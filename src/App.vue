<template>
    <!-- <LineMap/> -->
    <div>
        <!-- <HeatMap /> -->
        <!-- <myTestMap></myTestMap> -->
        <!-- <abandonTest></abandonTest> -->
        <!-- <ClusterMap/> -->
        <!-- <ClusterMapTest></ClusterMapTest> -->
        <!-- <tcplayer/> -->
        <!-- <test :list="list" @tab-click="tabClick"/>
        <test :list="list" @tab-click="tabClick" :turn="true"/> -->
        <!-- <qiniuyun/> -->
        <!-- <WebTv/> -->
        <!-- <router-view></router-view> -->
        <!-- <Slider :boxhight="boxhight" :boxwidth="boxwidth" :default-value="1" :max="10" :min="0"></Slider> -->
        <!-- <Slider></Slider> -->
        <!-- <testTable></testTable> -->
        <!-- <testupload></testupload> -->
        <!-- <carousel></carousel> -->
        <!-- <quanjing /> -->
        <!-- <LoadingCom></LoadingCom> -->
        <!-- <div
            v-html="htmlText(600,2)"
        ></div> -->
        <!-- <div @click="yui = !yui">11111111</div> -->
        <!-- <test ></test> -->
        <!-- <test1 ></test1> -->
        <!-- <sseWork></sseWork> -->
        <!-- <videoCom/> -->
        <ar></ar>
    </div>
    <!-- <div
        style="width: 1000px;position: absolute;left: 100px;top: 100px;background-color: #39c5bb;"
        @click="testclick"
    ></div>
    <weather /> -->
</template>
  
<script lang="ts" setup>
import { reactive, ref, onMounted, provide } from 'vue';
import * as THREE from 'three'
import HeatMap from './components/map/HeatMap.vue';
import myTestMap from './components/map/myTest2.vue';
import abandonTest from './components/map/abandonTest.vue';
import LineMap from './components/map/LineMap.vue';

import ClusterMap from './components/map/ClusterMap.vue';
import ClusterMapTest from './components/map/ClusterMapTest.vue';
import weather from './components/weather/weather.vue';
import tcplayer from './components/tcplayer.vue'
import test from './components/test.vue'
import test1 from './components/test1.vue'
import qiniuyun from './components/upload/qiniuyun.vue'
import WebTv from './components/webTV/WebTv.vue'
import Slider from './components/ElementPlus/Slider.vue'
import { io } from "socket.io-client";
import testTable from './components/ElementPlus/testTable.vue'
import testupload from './components/upload/myupload/testupload.vue';
import carousel from './components/Carousel/carousel.vue';
import quanjing from './components/quanjing/quanJing.vue';
import LoadingCom from './components/LoadingCom/index.vue';
import sseWork from './components/sseWork/index.vue'
import videoCom from './components/videoCom/index.vue'
import ar from './components/XR/ar.vue'
// const yui = ref(false)
// const yui=ref([]);
// // provide("isSave", saveType);
// provide('yui',yui)
// setTimeout(() => {
//     yui.value = ['123']
// });
// const boxhight = '50px'
// const boxwidth = '100px'
// const socket = io("ws://192.168.0.159:13141");
// // send a message to the server
// socket.emit("createSocket");
// socket.on("createSocket", (msg)=>{
//     console.log('msg',msg)
//     socket.emit("findAllSocket",'我要查询啊啊啊');
// });
// socket.on("findAllSocket", (msg)=>{
//     console.log('msg',msg)
// });
// socket.on("event_fire_reply_one", (msg)=>{
//     console.log('msg',msg)
// });
// socket.on("firaid", (msg)=>{
//     console.log('firaid',msg)
// });
const testclick = function () {
    console.log('testclick')
}
const tableData = reactive([])

const list = reactive([
    {
        name: '基础信息'
    },
    {
        name: '功能概述'
    },
    {
        name: '实时状态'
    },
    {
        name: '基础信息'
    },
    {
        name: '功能概述'
    },
    {
        name: '实时状态'
    }
])
const tabClick = (val) => {
    console.log('val', val);
}
</script>
<style lang="less">
body {
    margin: 0;
}

.svgloading {
    width: 100px;
    height: 100px;
    // background-color: #39c5bb;
}
</style>
