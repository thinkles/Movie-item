<template>
<div class="logincontain">
<div class="loginlayout">
<el-form ref="login-form" class="loginstyle" :model="user" label-width="80px" label-position="left" :rules='rules'
      size="medium">
  
          <h5>用户登录</h5>
          <el-form-item label="用户名:" prop='email'>
            <el-input v-model="user.email" placeholder="请输入用户名" size="medium">
              <i slot="prefix" class="el-icon-edit"></i>
            </el-input>

          </el-form-item>
          <el-form-item label="密码:" prop='password'>
            <el-input v-model="user.password" placeholder="请输入密码" show-password>
              <i slot="prefix" class="el-icon-caret-right"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop='isAgree' style="text-align:start">
            <el-checkbox label="我已同意相关规定" v-model="user.isAgree"></el-checkbox>

          </el-form-item>

          <el-button type="primary" @click="onSubmit()" 
          style="width:100%;margin-left:0px;margin-bottom:20px;" 
          :loading="load">登录</el-button>
       
          <el-button type="warning"
          style="width:100%;margin-left:0px"  
          :loading="load"  @click="onsubmitAdd()">注册</el-button>

</el-form>
</div>
</div>


</template> 

<script>
  import {
    userlogin,
    useradd
  } from '@/api/user'
  export default {
    name: 'LoginIndex',
    data: function () {
      return {
        checked: true,
        load: false,
        user: {
          email: '',
          password: '',
          isAgree: false
        },
        rules: {
          email: [{
              required: true,
              type:'email',
              message: '请输入正确的邮箱地址',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
            //后期可以改成 pattern 正则表达式 验证
          ],
          password: [{
              required: true,
              message: '请填写密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 15,
              message: '密码需要大于6位小于15位',
              trigger: 'blur'
            }
          ],
          isAgree: [{
            //自定义规则
            validator: (rule, value, callback) => {
              if (value == true) { //验证成功
                callback()
              } else {
                callback(new Error('勾选协议'))
              }

            },
            trigger: 'change'
          }]
        }

      }
    },
    methods: {
      onSubmit() {
        this.$refs['login-form'].validate((valid) => { 
          //validate 异步函数
          if (!valid) { //验证失败 停止提交请求
            return
          }
          //验证成功
          this.login();

        })
 
      },
      onsubmitAdd(){
          this.$refs['login-form'].validate((valid) => { //validate 异步函数
    
          if (!valid) { //验证失败 停止提交请求
            return
          }
          //验证成功
        this.load = true //使按钮处于加载中
        const data ={"email":this.user.email,"password":this.user.password}      //不要传入isAgress 参数, 因为需要添加进数据库的
       
       useradd(data).then(() => {
            this.$message({
            message: '注册成功,请重新登录',
            type: 'success'
           })
           this.load = false //关闭 load 

        }).catch(()=>{
          this.$message({
            message: '注册失败',
            type: 'warning'
           })
          this.load = false
        })

        })
      },

      login() {
//登录时前端虽然用的form 表单, 但是是以json类型进行传递的
        this.load = true //使按钮处于加载中
        userlogin(this.user).then((res) => {
          //console.log(res.data);
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.load = false //关闭 load 
          window.localStorage.setItem('user', JSON.stringify(res
            .data)) // 吧请求的用户数据 通过json字符串存储在本地存储 ,为了拿到后端返回的token令牌, 用来通过身份验证继续使用请求  50p
          this.$router.push('/movie');


        }).catch(() => {

         this.$message({
            message: '登录失败',
            type: 'warning'
           })
          this.load = false
        })

      },


    }
  }
</script>

<style lang="scss">

  .loginstyle {
    padding: 30px 65px;
  }

  .loginlayout {

    width: 480px;
   
     background-color: #ffffff; 
    border-radius: 6px;
    min-height: 500px;
    position: relative;
  }


  h5 {
    font-size: 30px;
    line-height: 1em;
    text-align: center;
    padding-bottom: 10px;
    font-weight: 400;
    margin-bottom: 25px;
    font-family: "微软雅黑", "microsoft yahei", Verdana, Lucida, arial, sans-serif
  }
.logincontain{
    background: url('./bag.jpg');
    text-align: center;
    padding: 80px 500px;
    height: 100%;
    overflow: hidden;
  }
</style>