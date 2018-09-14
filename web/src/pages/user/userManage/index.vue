<template>
  <d2-container class="userManage">
    <template slot="header">用户管理
      <el-button style="float:right" size="mini" type="success" @click="addUserDialog=true">新增</el-button>
    </template>
    <el-table :data="users" stripe>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column label="角色">
        <template slot-scope="scope">
          <span>{{scope.row.role==='admin'?'管理员':"普通用户"}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editUserForm=Object.assign({},scope.row);editUserDialog=true">编辑</el-button>
          <el-button v-show="scope.row.role==='user'" size="mini" type="danger" @click="removeUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加用户" :visible.sync="addUserDialog">
      <el-form ref="addUserForm" :model="addUserForm" label-width="80px">
        <el-form-item label="用户名" prop="username" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }]">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码 " prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }]">
          <el-input v-model="addUserForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="手机号 " prop="phone">
          <el-input v-model="addUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱 " prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserDialog=false">取 消</el-button>
        <el-button type="primary " @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑用户" :visible.sync="editUserDialog">
      <el-form ref="editUserForm" :model="editUserForm" label-width="80px">
        <el-form-item label="手机号 " prop="phone">
          <el-input v-model="editUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱 " prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserDialog=false">取 消</el-button>
        <el-button type="primary " @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
    <template slot="footer ">footer</template>
  </d2-container>
</template>
<script>
import { getAllUser, addUser, removeUser, editUserinfo } from './../../../api/user';
export default {
  name: 'userManage',
  data() {
    return {
      name: 'userManage',
      addUserDialog: false,
      editUserDialog: false,
      users: [],
      addUserForm: {},
      editUserForm: {}
    };
  },
  mounted() {
    this.getusers();
  },
  computed: {},
  methods: {
    getusers() {
      getAllUser()
        .then(res => {
          this.users = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addUser() {
      // if (!this.addUserForm.username || !this.addUserForm.password) {
      //   this.$message.warning('请输入完整');
      //   return;
      // }
      this.$refs['addUserForm'].validate(valid => {
        if (valid) {
          addUser(this.addUserForm).then(res => {
            if (res.errno === 0) {
              this.getusers();
            } else {
              this.$message.error(res.errmsg);
            }
            this.addUserDialog = false;
          });
        } else {
          return false;
        }
      });
    },
    removeUser(user) {
      console.log(user);
      removeUser(user._id).then(res => {
        if (res.errno === 0) {
          this.$message.success('删除成功');
          this.getusers();
        } else {
          this.$message.error(res.errmsg);
        }
      });
    },
    editUser() {
      editUserinfo(this.editUserForm._id, {
        phone: this.editUserForm.phone,
        email: this.editUserForm.email
      }).then(res => {
        if (res.errno === 0) {
          this.$message.success('编辑成功');
          this.getusers();
        } else {
          this.$message.error(res.errmsg);
        }
        this.editUserDialog = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.userManage {
  .userManage_title {
    font-size: 14px;
  }
  // Your page style here
  // Do not use empty rulesets
  // If the page does not need an additional definition style, please delete
}
</style>
