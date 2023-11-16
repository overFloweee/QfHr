<template>
  <div class="login-container">
    <div class="logo"/>
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <el-form ref="form" :model="loginForm" :rules="loginRules">
          <el-form-item prop="phone">
            <el-input v-model="loginForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree">
              用户平台使用协议
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button @click="login" style="width: 350px" type="primary">登陆</el-button>
          </el-form-item>
        </el-form>

      </el-card>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
import * as url from "url";

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        phone: '13800000002',
        password: 'hm#qd@23!',
        isAgree: true
      },
      loginRules: {
        phone: [
          {
            required: true, message: '必填'
          },
          {
            pattern: /^1[3-9]\d{9}$/, message: "手机号格式不正确"
          }
        ],
        password: [
          {
            required: true, message: '必填'
          },
          {
            min: 6, max: 16, message: "密码长度在6到16位之间"
          }
        ],
        isAgree: [
          {
            validator: (rule, value, callback) => {
              value ? callback() : callback(new Error("您必须勾选使用协议"))
            }
          }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.form.validate(async (isOK) => {
        if (isOK) {
          // Vuex 中 actions 返回的是 promise
          await this.$store.dispatch('user/login', this.loginForm)

          this.$router.push('/')
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;

  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png) no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;

    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }

    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }

  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;

    .el-card {
      border: none;
      padding: 0;
    }

    h1 {
      padding-left: 20px;
      font-size: 24px;
    }

    .el-input {
      width: 350px;
      height: 44px;

      .el-input__inner {
        background: #f4f5fb;
      }
    }

    .el-checkbox {
      color: #606266;
    }
  }
}
</style>
