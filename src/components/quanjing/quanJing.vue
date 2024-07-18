<template>
    <div>
        <div
            id="viewer"
            style="width: 100vw; height: 100vh;"
        ></div>
    </div>
</template>

<script setup>
// import { Viewer } from '@photo-sphere-viewer/core';
// import { EquirectangularTilesAdapter } from '@photo-sphere-viewer/equirectangular-tiles-adapter';
// import { onMounted } from 'vue';
// onMounted(()=>{
//     const viewer = new Viewer({
//         container: 'viewer',
//         adapter: EquirectangularTilesAdapter,
//         panorama: {
//             // width: 6656,s
//             cols: 54,
//             rows: 27,
//             // baseUrl: `${baseUrl}sphere-small.jpg`,
//             baseUrl: 'http://s184pgjc4.hn-bkt.clouddn.com/%E7%9C%81%E4%B8%AD%E5%8C%BB%20%282%29.png?e=1695629615&token=DPb1dRjn_FGPOhfJPfxJXBS52vnTi6r0nOErsb9q:M25MWvbiy1sdQ-0MaEpuIG9xRbc=',

//             tileUrl: (col, row) => {
//                 // const num = row * 4 + col;
//                 return `http://s184pgjc4.hn-bkt.clouddn.com/List/row-${row}-column-${col}.png`;
//             },
//         },
//         caption: 'Parc national du Mercantour <b>&copy; Damien Sorel</b>',
//         // loadingImg: baseUrl + 'loader.gif',
//         touchmoveTwoFingers: true,
//         mousewheelCtrlKey: true,
//     });
// })
const getImageInfo = (path) => {
    return new Promise((resolve, reject) => {
        // fetch(path, { responseType: 'blob' })
        // .then(res => {
        //     return res.blob();
        // }).then(blob => {
        //     const url = URL.createObjectURL(blob)
        //     resolve(url)
        // }).catch(() => {
        //     console.log('加载图片失败')
        //     reject(new Error('加载图片失败'))
        // })
        axios
        .get(path, { responseType: 'blob' })
        .then(res => {
            console.log('res',res);
            const blob = res.data
            const url = URL.createObjectURL(blob)
            resolve(url)
        })
        .catch(() => {
            console.log('加载图片失败')
            reject(new Error('加载图片失败'))
        })
    })
}
import { Viewer } from '@photo-sphere-viewer/core';
import { EquirectangularTilesAdapter } from '@photo-sphere-viewer/equirectangular-tiles-adapter';
import { CubemapAdapter } from '@photo-sphere-viewer/cubemap-adapter';
import { onMounted } from 'vue';
import axios from 'axios';
const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/';

onMounted(async () => {
    // const myurl = await getImageInfo('http://s184pgjc4.hn-bkt.clouddn.com/testaaaa.png')
    // const viewer = new Viewer({
    //     // container: 'viewer',
    //     // panorama: 'http://s184pgjc4.hn-bkt.clouddn.com/%E7%9C%81%E4%B8%AD%E5%8C%BB%20%282%29.png?e=1695629615&token=DPb1dRjn_FGPOhfJPfxJXBS52vnTi6r0nOErsb9q:M25MWvbiy1sdQ-0MaEpuIG9xRbc=',
    //     // panoData: {
    //     //     fullWidth: 5376,
    //     //     fullHeight: 2688,
    //     //     croppedWidth: 5376,
    //     //     croppedHeight: 2688,
    //     //     croppedX: 1000,
    //     //     croppedY: 500,
    //     //     poseHeading: 0, // 0 to 360
    //     //     posePitch: 0, // -90 to 90
    //     //     poseRoll: 0, // -180 to 180
    //     // },
    //     container: 'viewer',
    //     adapter: EquirectangularTilesAdapter,
    //     panorama: {
    //         width: 5376,
    //         cols: 64,
    //         rows: 32,
    //         baseUrl: 'http://s184pgjc4.hn-bkt.clouddn.com/testaaaa.png',
    //         tileUrl: (col, row) => {
    //             // const num = row * 16 + col + 1;

    //             // return `${baseUrl}sphere-tiles/image_part_${('000' + num).slice(-3)}.jpg`;
    //             return `http://s184pgjc4.hn-bkt.clouddn.com/%E7%9C%81%E4%B8%AD%E5%8C%BBcrop4/%E7%9C%81%E4%B8%AD%E5%8C%BBrow${row}-clo${col}.png`
    //             // return `http://s184pgjc4.hn-bkt.clouddn.com/List2/row-${row+1}-column-${col+1}.png`
    //             // console.log('col,row',col-1,row-1);
    //         },
    //     },
    //     caption: 'Parc national du Mercantour <b>&copy; Damien Sorel</b>',
    //     // loadingImg: baseUrl + 'loader.gif',
    //     touchmoveTwoFingers: true,
    //     mousewheelCtrlKey: true,
    //     navbar: false
    //     // panorama: {
    //     //     type: 'net',
    //     //     path: 'http://s184pgjc4.hn-bkt.clouddn.com/%E7%9C%81%E4%B8%AD%E5%8C%BB%20%282%29.png?e=1695629615&token=DPb1dRjn_FGPOhfJPfxJXBS52vnTi6r0nOErsb9q:M25MWvbiy1sdQ-0MaEpuIG9xRbc=',
    //     //     // order: ['left', 'right', 'top', 'bottom', 'back', 'front'] // optional
    //     // },
    //     // caption: 'Parc national du Mercantour <b>&copy; Damien Sorel</b>',
    //     // loadingImg: baseUrl + 'loader.gif',
    //     // touchmoveTwoFingers: true,
    //     // mousewheelCtrlKey: true,
    // });
    // const viewer = new Viewer({
    //     container: 'viewer',
    //     panorama: 'http://s184pgjc4.hn-bkt.clouddn.com/testaaaa.png',
    //     touchmoveTwoFingers: true,
    //     mousewheelCtrlKey: false,
    //     navbar:false
    // });   
    initquanjing()
})
// const newimgurl = ref()
const image = new Image()
image.src = new URL('../../assets/img/91f6f542-14b0-4010-95e5-bd642d484e07.jpg', import.meta.url).href;
const initquanjing = ()=>{
    const viewer = new Viewer({
        container: 'viewer',
        panorama: image.src ,
        touchmoveTwoFingers: true,
        mousewheelCtrlKey: false,
        navbar:false,
    });   
}
defineExpose({initquanjing})
</script>

<style lang="less" scoped>
.zhuzhu{
    width: 100px;
    height: 100px;
}
//设置与loadingCom上面的样式相同
::v-deep .psv-loader-canvas{
    // color:red;
    circle{
        fill:url(#myGradient)
    }
    path{
        stroke:url(#myGradient2)
    }
}
</style>