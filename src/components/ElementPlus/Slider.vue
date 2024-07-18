<template>
    <div class="Sliderbox">
        <div class="slider-demo-block">
            <el-slider
                v-model="value1"
                placement="bottom"
                :min="props.min"
                :max="props.max"
            />
        </div>
        <div class="showNum">
            <p>{{ props.min }}</p>
            <p>{{ props.max }}</p>
        </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  const props = defineProps({
    boxhight: {
        type: String,
        default: '40px'
    },
    boxwidth: {
        type: String,
        default: '100px'
    },
    max: {
        type: Number,
        required:true
    },
    min: {
        type: Number,
        required:true
    },
    defaultValue:{
        type:Number,
        required:true
    }
  })
  const value1 = ref(props.defaultValue)
  const boxhight = ref(props.boxhight)
  const boxwidth = ref(props.boxwidth)
  onMounted(() => {
  })
  </script>
  <style lang="scss" scoped>
  .Sliderbox{
    width: v-bind(boxwidth);
  }
  .showNum{
    display: flex;
    justify-content: space-between;
    p{
        margin: 0;
    }
  }
  .slider-demo-block {
    display: flex;
    align-items: center;
    height: v-bind(boxhight);
    width: v-bind(boxwidth);
  }
  
  ::v-deep .el-slider__runway {
    height: 100%;
    -webkit-clip-path: polygon(0 67%, 100% 0, 100% 100%, 0% 100%);
    clip-path: polygon(0 67%, 100% 0, 100% 100%, 0% 100%);
  }
  
  ::v-deep .el-slider {
    height: 100%;
  }
  
  ::v-deep .el-slider__bar {
    height: 100%;
  }
  
  .slider-demo-block .el-slider {
    margin-top: 0;
    margin-left: 10px;
  }
  
  ::v-deep .el-slider__button {
    border-radius: 0;
    height: 120%;
  }
  
  .slider-demo-block .demonstration {
    font-size: 14px;
    color: var(--el-text-color-secondary);
    line-height: 44px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0;
  }
  
  ::v-deep .el-slider__button-wrapper {
    top: -10%;
    height: 100%;
  }
  
  .slider-demo-block .demonstration+.el-slider {
    flex: 0 0 70%;
  }
  .dirSelBox {
  display: flex;
  margin-left: 6px;
  p {
    font-size: 14px;
    font-family: "webfont-regular";
    font-weight: 400;
    color: #ffffff;
    margin: 18px 0px 9px 7px;
  }


}

  </style>
  