<template>
  <div class="login-page">
    <div class="layer bg" id="login"></div>
    <div class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
        <img src="./image/logo.png" alt="logo">
      </div>
      <!-- 表单部分 -->
      <div class="form-group">
        <el-card :body-style="{paddingTop: '50px'}">
          <h3 style="text-align: center;    margin-top: 0;">登陆监控平台</h3>
          <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin">
            <el-form-item prop="username">
              <el-input type="text" v-model="formLogin.username" placeholder="用户名">
                <template slot="prepend">
                  <d2-icon name="user" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="formLogin.password" placeholder="密码">
                <template slot="prepend">
                  <d2-icon name="key" />
                </template>
              </el-input>
            </el-form-item>
            <el-button @click="submit" type="primary" class="button-login">登录</el-button>
          </el-form>
        </el-card>
      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
require('particles.js');
import config from './config/default.js';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      // 表单
      formLogin: {
        username: 'admin',
        password: 'admin'
      },
      // 校验
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  mounted() {
    // 初始化例子插件
    particlesJS('login', config);
  },
  beforeDestroy() {
    // 销毁 particlesJS
    // thanks https://github.com/d2-projects/d2-admin/issues/65
    // ref https://github.com/VincentGarreau/particles.js/issues/63
    if (pJSDom && pJSDom.length > 0) {
      pJSDom[0].pJS.fn.vendors.destroypJS();
      pJSDom = [];
    }
  },
  methods: {
    ...mapActions('d2admin/account', ['login']),
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.login({
            vm: this,
            username: this.formLogin.username,
            password: this.formLogin.password
          });
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败');
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import './style.scss';
</style>
