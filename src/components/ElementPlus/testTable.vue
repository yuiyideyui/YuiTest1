<template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="全景图片" width="180">
        <template #default="scope">
          <!-- <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.img }}</span>
          </div> -->
          <img :src="scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="图片名称" width="180" />
      <el-table-column label="关联拍摄点">
        <template #default="scope">
            <el-select v-model="scope.row.shoot" class="m-2" placeholder="Select">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                />
            </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script setup>
import { ref } from 'vue';
  const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
  const handleDelete = (index, row) => {
    tableData.value.splice(index,1)
  }
  
  const tableData= ref([
    {
      img: '2016-05-03',
      name: 'Tom',
      shoot:'',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      img: '2016-05-02',
      name: 'Tom',
      shoot:'',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      img: '2016-05-04',
      name: 'Tom',
      shoot:'',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      img: '2016-05-01',
      name: 'Tom',
      shoot:'',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ])
  </script>
  