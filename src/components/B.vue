<template>
    <div>
        <div class="table-container">
            <el-table
                id="real-time-table"
                :data="filterTableData"
                size="small"
                height="100%"
                :row-style="{ height: '20px' }"
            >
                <el-table-column
                    fixed
                    prop="name"
                    label="路段名称"
                    width="60"
                    align="center"
                />
                <el-table-column
                    prop="risk_level"
                    label="风险等级"
                    min-width="60"
                    align="center"
                />
                <el-table-column
                    prop="rsi"
                    label="静态风险指数"
                    min-width="55"
                    align="center"
                />
                <el-table-column
                    prop="event_index"
                    label="驾驶事件风险指数"
                    min-width="80"
                    align="center"
                />
                <el-table-column
                    prop="env_index"
                    label="驾驶环境风险指数"
                    min-width="80"
                    align="center"
                />
                <el-table-column
                    prop="risk_index"
                    label="公路驾驶风险指数"
                    min-width="80"
                    align="center"
                />
                <el-table-column
                    prop="hazardIndex"
                    label="风险驾驶事件发生频率"
                    header-align="center"
                >
                    <el-table-column
                        prop="freq_speeding"
                        label="超速"
                        width="45"
                        align="center"
                    />
                    <el-table-column
                        prop="freq_rapid_shifting"
                        label="急变速"
                        width="55"
                        align="center"
                    />
                    <el-table-column
                        prop="freq_sharp_turning"
                        label="急转弯"
                        width="55"
                        align="center"
                    />
                    <el-table-column
                        prop="freq_shortdistance_following"
                        label="跟车过近"
                        width="65"
                        align="center"
                    />
                    <el-table-column
                        prop="freq_dangerous_lanechanging"
                        label="危险变道"
                        width="65"
                        align="center"
                    />
                    <el-table-column
                        prop="freq_cognitive_overload"
                        label="认知负荷异常"
                        width="85"
                        align="center"
                    />
                </el-table-column>
                <el-table-column
                    label="风险驾驶事件发生频率"
                    header-align="center"
                >
                    <el-table-column
                        prop="exceed_speeding"
                        label="超速"
                        width="45"
                        align="center"
                    />
                    <el-table-column
                        prop="exceed_rapid_shifting"
                        label="急变速"
                        width="55"
                        align="center"
                    />
                    <el-table-column
                        prop="exceed_sharp_turning"
                        label="急转弯"
                        width="55"
                        align="center"
                    />
                    <el-table-column
                        prop="exceed_shortdistance_following"
                        label="跟车过近"
                        width="65"
                        align="center"
                    />
                    <el-table-column
                        prop="exceed_dangerous_lanechanging"
                        label="危险变道"
                        width="65"
                        align="center"
                    />
                    <el-table-column
                        prop="exceed_cognitive_overload"
                        label="认知负荷异常"
                        width="85"
                        align="center"
                    />
                    <el-table-column
                        prop="exceed_fatigue_driving"
                        label="疲劳驾驶"
                        width="65"
                        align="center"
                    />
                </el-table-column>
            </el-table>
        </div>
        <div @click="exportToExcel">导出</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
let filterTableData = ref([
    {
        name: 'a'
    }
])
let exportToExcel = function () {
    let tables = document.getElementById("real-time-table");
    let table_book = XLSX.utils.table_to_book(tables);
    var table_write = XLSX.write(table_book, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
    });
    try {
        FileSaver.saveAs(
            new Blob([table_write], { type: "application/octet-stream" }),
            "sheetjs.xlsx"
        );
    } catch (e) {
        if (typeof console !== "undefined") console.log(e, table_write);
    }
    return table_write;
}
</script>

<style scoped></style>