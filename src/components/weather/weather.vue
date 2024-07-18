<template>
    <div id="he-plugin-simple"></div>
</template>
<script>
export default {
    created() {
        //和风天气插件调用
        window.WIDGET = {
            "CONFIG": {
                "modules": "01234",
                "background": "1",
                "tmpColor": "FFFFFF",
                "tmpSize": "16",
                "cityColor": "FFFFFF",
                "citySize": "16",
                "aqiColor": "FFFFFF",
                "aqiSize": "16",
                "weatherIconSize": "24",
                "alertIconSize": "18",
                "padding": "10px 10px 10px 10px",
                "shadow": "0",
                "language": "auto",
                "fixed": "false",
                "vertical": "top",
                "horizontal": "left",
                "key": "373e001db2cf45a48e4eba7bd89340d9"
            }
        };
        (function (d) {
            var c = d.createElement('link');
            c.rel = 'stylesheet';
            c.href = 'https://widget.heweather.net/simple/static/css/he-simple.css?v=1.4.0';
            var s = d.createElement('script');
            s.src = 'https://widget.heweather.net/simple/static/js/he-simple.js?v=1.4.0';
            var sn = d.getElementsByTagName('script')[0];
            sn.parentNode.insertBefore(c, sn);
            sn.parentNode.insertBefore(s, sn);
        })(document);
    },
}

</script>
<style lang="less">
#he-plugin-simple {
    #weather-view-he {
        height: 500px !important;
        background-size: auto 270px !important;
        pointer-events: none
    }


    // div {
    //     // z-index: 1;
    //     // position: relative;
    // }
    // div {
    //     top: 15px !important;
    // }
}
</style>