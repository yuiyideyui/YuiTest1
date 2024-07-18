<template>
     <div class="operate-box">
    
    // 给按钮绑定 handleSort 方法
   <el-button type="default" @click="handleSort" plain>{{ !isSort ? '开始排序' : '关闭排序' }}</el-button>
 </div>
    <el-table :data="tableData" row-key="name" maxHeight="500px" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </template>
  
  <script lang="ts" setup>
import { enableRowDrop } from './unit'
import { ref } from 'vue'
  const tableData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]
  // 获取--列表页数据
const getList = (evt: any) => {
  console.log(evt.oldIndex, 'evt')
  console.log('请求数据')
}

// 排序--当前是否开启排序
const isSort = ref(false)
// 排序--点击排序
const handleSort = () => {
  isSort.value = !isSort.value

  /**
   * 1. 把获取列表数据方法闯过去，作为回调函数
   * 2. 把 isSort 传过去，控制表单是否开启排序
   */
  enableRowDrop(getList, isSort.value)
}

  </script>
  