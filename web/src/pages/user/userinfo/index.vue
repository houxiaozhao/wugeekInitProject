<template>
  <d2-container class="userinfo">
    <template slot="header">{{user.username}}
    </template>
    <el-tabs value="first">
      <el-tab-pane label="用户信息" name="first">
        <el-form ref="user" :model="user" label-width="80px">
          <el-form-item label="用户名 " prop="userinfo">
            <el-input v-model="user.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号 " prop="phone">
            <el-input v-model="user.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱 " prop="email">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
        </el-form>
        <el-button size="mini" style="float:right" type="primary " @click="editUser()">修改</el-button>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="second">
        <el-form ref="editPasswordForm" :model="editPasswordForm" label-width="80px" :rules="rules">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="password" v-model="editPasswordForm.oldPassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="editPasswordForm.newPassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="newPassword2">
            <el-input type="password" v-model="editPasswordForm.newPassword2" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-button size="mini" style="float:right" type="primary " @click="editPassword()">提交</el-button>
      </el-tab-pane>
    </el-tabs>

  </d2-container>
</template>
<script>
import { getUserinfo, editUser, changePassword } from './../../../api/user';

export default {
  name: 'userinfo',
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.editPasswordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      name: 'userinfo',
      user: {},
      editPasswordForm: {},
      rules: {
        oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }, { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }],
        newPassword2: [{ validator: validatePass2, trigger: 'blur' }]
      }
    };
  },
  mounted() {
    this.getUserinfo();
  },
  computed: {},
  methods: {
    getUserinfo() {
      getUserinfo().then(res => {
        this.user = res.data;
      });
    },
    editUser() {
      editUser({ phone: this.user.phone, email: this.user.email }).then(res => {
        if (res.errno === 0) {
          this.$message.success('修改成功');
        } else {
          this.$message.error('修改失败');
        }
        this.getUserinfo();
      });
    },
    editPassword() {
      console.log(this.editPasswordForm);
      this.$refs['editPasswordForm'].validate(valid => {
        console.log(valid);
        if (valid) {
          changePassword(this.editPasswordForm.newPassword, this.editPasswordForm.oldPassword).then(res => {
            console.log(res);
            if (res.errno === 0) {
              this.$message.success('修改成功');
            } else {
              this.$message.error('修改失败');
            }
          });
        }
      });
      //
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.userinfo {
  .userinfo_title {
    font-size: 14px;
  }
  // Your page style here
  // Do not use empty rulesets
  // If the page does not need an additional definition style, please delete
}
</style>
