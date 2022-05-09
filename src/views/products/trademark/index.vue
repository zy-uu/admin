<template>
  <div class="trademark">
    <el-table style="width: 100%" border>
      <el-table-column prop="" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="" label="品牌名称" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="" label="品牌Logo" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="" label="操作" width="80px" align="center">
      </el-table-column>
    </el-table>
     <el-pagination
      :current-page="pageNo"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
export default {
    name: 'tradeMark',
    data() {
      return {
        pageNo: 1,
      }
    }
}
</script>

<style>
.trademark {
  margin-top: 10px;
}
</style>