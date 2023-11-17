<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"/>

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">

          <!--          头像-->
          <img v-if="avatar" :src=avatar class="user-avatar">
          <span v-else class="username">{{ name?.charAt(0) }}</span>
          <!--          用户名称-->
          <span class="name">{{ name }}</span>
          <!--          图标-->
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://gitee.com/ququbudu/qf-hr/tree/master">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!--    修改密码的 弹框 -->
    <el-dialog width="500px" title="修改密码" :visible.sync="showDialog" @close="cancel" append-to-body>
      <el-form label-width="100px" ref="form" :model="passForm" :rules="passRules">
        <el-form-item prop="oldPassword" label="旧密码">
          <el-input size="small" v-model="passForm.oldPassword" show-password></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码">
          <el-input size="small" v-model="passForm.newPassword" show-password></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="重复密码">
          <el-input size="small" v-model="passForm.confirmPassword" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">确认修改</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {updatePassword} from "@/api/user";

export default {
  data() {
    return {
      showDialog: false,
      passForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      passRules: {
        oldPassword: [
          {
            required: true, message: '必填'
          }
        ],
        newPassword: [
          {
            required: true, message: '必填'
          },
          {
            min: 6, max: 16, message: '密码长度在6到16位之间'
          }
        ],
        confirmPassword: [
          {
            required: true, message: '必填'
          },
          {
            validator: (rule, value, callback) => {
              if (value === this.passForm.newPassword) {
                callback()
              } else {
                callback(new Error("密码不一致"))
              }
            }
          }
        ]
      },

    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    updatePassword() {
      this.showDialog = true
    },
    submit() {
      this.$refs.form.validate(async (isOk) => {
        if (isOk) {
          // 调用 修改密码 的 接口
          await updatePassword(this.passForm)
          // 弹出成功消息
          this.$message.success("修改密码成功")
          // 成功：重置表单，关闭dialog
          this.cancel()

        }
      })
    },
    cancel() {
      // 重置表单，关闭dialog
      this.$refs.form.resetFields()
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 40px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        .name {
          margin-right: 10px;
          font-size: 16px;

        }

        .username {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: #04c9be;
          color: #fff;
          border-radius: 50%;
          margin-right: 10px;
        }

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 15px;
          font-size: 20px;
        }
      }

    }
  }
}
</style>
