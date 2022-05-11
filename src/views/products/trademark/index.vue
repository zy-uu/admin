<template>
  <div class="trademark">
    <el-button icon="el-icon-primary" @click="dialogFormVisible = true"
      >添加</el-button
    >
    <el-table style="width: 100%" border :data="tableData">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="品牌名称"
        width="200px"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="logo" label="logo" width="200px" align="center">
      </el-table-column>
      <el-table-column label="操作" width="400px" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="dialogFormVisible = true"
            >edit</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteInfo(row)"
            >delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- dialog -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" prop="name">
          <el-input autocomplete="off" v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="品牌说明">
          <el-input autocomplete="off" v-model="addForm.detail"></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirm">Confirm</el-button>
      </span>
    </el-dialog>

    <!-- pagination -->
    <el-pagination
      :current-page="page"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    var nameValidate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("please input the name"));
      } else {
        console.log(value.length);
        if (3 < value.length && value.length < 15) {
          callback();
        } else {
          return callback(new Error("The length should between 3 and 15"));
        }
      }
    };
    return {
      tableData: [
        {
          name: "apple",
          logo: "hi i am logo",
        },
        {
          name: "microsoft",
          logo: "hi i am mis",
        },
        {
          name: "inten",
          logo: "hi i am in",
        },
      ],
      page: 1,
      limit: 3,
      dialogFormVisible: false,
      dialogVisible: false,
      imageUrl: "",
      addForm: {
        name: "",
        url: "",
        id: "",
        detail: "",
      },
      // validate rules
      rules: {
        name: [{ validator: nameValidate, trigger: "blur", required: true }],
      },
    };
  },
  mounted() {
    // this.getTradeMarkList();
  },
  methods: {
    async getTradeMarkList() {
      let { page, limit } = this;
      let res = await this.$API.tradeMark.reqTradeMark(page, limit);
      console.log(res);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("Avatar picture must be JPG format!");
      }
      if (!isLt2M) {
        this.$message.error("Avatar picture size can not exceed 2MB!");
      }
      return isJPG && isLt2M;
    },
    async adOrUpdateTradeMark() {
      this.dialogFormVisible == false;
      let res = await this.$API.tradeMark.adOrUpdateTradeMark(this.addForm);
      this.$message(this.addForm.id ? "修改商品成功" : "添加商品成功");
    },
    confirm() {
      this.$refs[formRef].validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible == false;
          let res = await this.$API.tradeMark.adOrUpdateTradeMark(this.addForm);
          this.$message(this.addForm.id ? "修改商品成功" : "添加商品成功");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },

    //delete info
    deleteInfo() {
      this.$confirm("you wanna delete this info?", "warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$API.tradeMark.reqDeleteTrandeMark(row.id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "Delete completed",
            });
          } 
          else {
            this.$message({
              type: 'danger',
              message: 'Delete failed'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "delete canceled",
          });
        });
    },
  },
};
</script>

<style>
.trademark {
  margin-top: 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
