<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-row>
        <el-col :span='16'>
          <el-card>
            <h3 class='settinglike'>最近喜欢</h3>
            <el-divider></el-divider>
            <el-carousel :interval="5000" height="380px">
              <el-carousel-item v-for="(item,index) in watchMoviepanel" :key="'w'+index">
                <a class="setting_head_a" :href="'/filmdail/'+item._id">

                  <img :src="'http://localhost/'+item.poster"
                    style="object-fit: fill; height:100%;width:30%;float:left;margin-left:2px">
                  <div style="margin-left:300px">
                    <p class="setting_title">{{item.filmname}}({{item.titleyear}})</p>
                    <p class='setting_head'>导演:{{item.director.join('/')}}</p>
                    <p class='setting_head'>演员:{{item.actor.join('/')}}</p>
                    <p class='setting_head'>上映时间:{{item.filmtime}}</p>
                    <p class='setting_head' style="height:160px">内容简介:{{item.story}}</p>
                  </div>
                </a>
              </el-carousel-item>
            </el-carousel>

            <div style="margin-top:40px">
              <h3 class='settinglike'>收藏电影</h3>
              <el-divider></el-divider>
              <el-row>
                <el-col :span="4" v-for="(item, index) in likeMoviepanel.likeresult" :key="'like'+index"
                  :offset='index > 0 ? 2 : 1'>
                  <a :href="'/filmdail/'+item._id">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover" style="width:130px;">
                      <img :src="'http://localhost/'+item.poster" class="image" height="180px">
                      <p class="moviename"><span class="title">{{item.filmname}}</span></p>
                    </el-card>
                  </a>
                </el-col>
              </el-row>
              <el-pagination layout="prev, pager, next" background style="text-align:end"
                :page-count="likeMoviepanel.pages" :current-page.sync='cur_page_likemovie'
                @current-change='likemoviehandlepage(cur_page_likemovie)'>
              </el-pagination>


            </div>

            <div>
              <h3 class='settinglike'>我收藏的影评</h3>
              <el-divider></el-divider>
              <el-row v-for="(item, index) in likeArtpanel.watchart_result" :key="'artlike'+index">

                <el-card shadow="hover" style="margin-bottom:15px">
                  <a :href="'/articleview/'+item._id" class="arti" style="color:black">
                    <div>
                      <div class="commentleft">
                        <img :src="getcontent(item.content).src" width="100%" height="100%" style="object-fit: cover;">
                      </div>
                      <div class="commentright">
                        <p style="color:#339999;margin-bottom:8px;padding-top:5px">
                          <span><span style="color:#38688c">Author: </span>{{item.author.author.username}}</span>
                          <span style='margin-left:20px'>
                            <span style="color:#38688c">Time: </span>
                            {{item.time.split('T')[0]}}
                          </span>
                          <span style="float: right;">
                            <span style="color:#38688c">Hot: </span>
                            <i class="el-icon-paperclip">{{item.like}}</i>
                          </span>
                        </p>
                        <p class="artitle">
                          {{item.title}}
                        </p>
                        <div class="artcomment">
                          {{getcontent(item.content).content}}...
                        </div>
                      </div>

                      <div class="clearfix"></div>
                    </div>
                  </a>
                </el-card>

              </el-row>

              <el-pagination layout="prev, pager, next" background style="text-align:end"
                :page-count="likeArtpanel.pages" :current-page.sync='cur_page_likeart'
                @current-change='likeArthandlepage(cur_page_likeart)'>
              </el-pagination>

            </div>



            <div>
              <h3 class='settinglike'>我发布的影评</h3>
              <el-divider style="margin:5px 0"></el-divider>


              <div class="moviecomment">
                <div class="comment-body" v-for='(item,index) in publishArtpanel.publishart_result' :key="'publish'+index">

                   <a :href="'/articleview/'+item._id">
                  <div class="moviecomment-poster">
                    <img :src="'http://localhost/'+item.filmid.poster">
                  </div>
                  
                   <span class="main-bd">
                      <header class="moviecomment-hd">
                       <a :href="'/filmdail/'+item.filmid._id" class="moviecoment_a"> <span style="color:rgb(134, 133, 128)">{{item.filmid.filmname}}</span></a>
                        <span class="allstar" style='margin-left:10px'>
                          <el-rate v-model="item.article_rate" disabled>
                          </el-rate>
                        </span>

                        <span style="margin-left:10px">{{item.time.split('T')[0]}}</span>
                        
                      </header>
                      <h2 style="margin-bottom: 10px;margin-top:10px">
                        <a :href="'/articleview/'+item._id" style="font-size:20px;text-decoration:none">
                          {{item.title}}
                        </a>
                      </h2>
                      <div class="short-content" style="color:black; height:82px">
                        {{getcontent(item.content).content}}....
                      </div>


                    </span>

               </a>
               <span style="float:right">
                        <el-button size='mini' type='warning' @click="updateArt(item._id)">修改</el-button>
                        <el-button size='mini' type='danger' @click='removeArt(item._id)'>删除</el-button>
                        </span>
                </div>

              </div>
              <el-pagination layout="prev, pager, next" background style="text-align:end"
                :page-count="publishArtpanel.pages" :current-page.sync='cur_page_publishart'
                @current-change='publishArthandlepage(cur_page_likeart)'>
              </el-pagination>
            </div>
          </el-card>
        </el-col>

        <el-col :offset='3' :span='5'>
          <div class="imgcontain">
            <el-avatar shape="circle" :size="200" fit="cover" v-if='this.user.photo'
              :src="'http://localhost'+this.user.photo" class="showipc">
            </el-avatar>

            <p class='updateuser_p' @click="$refs.file.click()"  v-if='usershow'>点击修改图像</p>
            <input type="file" name='cover' ref="file" hidden @change="onFileChange">
          </div>

          <el-link @click='dialognameVisible = true'  v-if='usershow'>
            <h1 style="width:200px;text-align:center;">{{this.user.name}}
            </h1>
          </el-link>
          <el-dialog title="更改昵称" :visible.sync="dialognameVisible" append-to-body>
            <span style="font-weight:700;font-size:16px;margin-right:50px">输入昵称:</span>
            <el-input type="text" placeholder="请输入内容" v-model="text" maxlength="20" show-word-limit
              style="diplay:inline-block;width:70%">
            </el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialognameVisible = false; text='';">取 消</el-button>
              <el-button type="primary" @click="updatename" :loading='loadusername'>确 定</el-button>
            </span>

          </el-dialog>

          <p style="width:200px;font-size:14px;text-align:center">
            <el-link type="warning" :underline="false" @click='dialogFormVisible = true' v-if='usershow'>修改密码</el-link>
          </p>
          <el-dialog title="修改头像" :visible.sync="dialogVisible" width="30%" append-to-body @opened='onDialogOpened'
            @close='onDialogClosed'>
            <div>
              <img class="preview-image" :src="PreviewPhoto" ref="preview-image">
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="UpdataPhoto" :loading='updatePhotoLoading'>确 定</el-button>
            </span>
          </el-dialog>


          <el-dialog title="账户修改" :visible.sync="dialogFormVisible" append-to-body destroy-on-close>


            <el-form ref="userform" :model="user" label-width="80px" :rules="formRules">
              <el-form-item label="邮箱地址" prop="email">
                <el-input type="text" v-model="user.email" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="修改密码" prop="password">
                <el-input type="password" v-model="user.password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="user.checkPass"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="UpdateUserinfo" style="width:100px" :loading='updateuserpass'>保存
                </el-button>
                <el-button type="primary" @click="dialogFormVisible = false;user.password='';user.checkPass='';"
                  style="width:100px">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

        </el-col>
      </el-row>
    </div>

  </el-card>


</template>
<script>
  import Cropper from 'cropperjs';
  import 'cropperjs/dist/cropper.css'
  import {
    getUserProfile,
    UpdateUserPhoto,
    UpdateUserBaseProfile,
    UpdateUserName,
    getUserlikeMovie,
    getUserwatchMovie,
    getUserlikeArt,
    getUserpublishArt,
    judgmentUser
  } from '@/api/user'
import { DeleteArticle} from '@/api/articles'

  /* import globalBus from '@/utils/globalbus' */

  export default {
    name: 'seetings',
    data() {
      return {
        value: 2, //评论分数

        dialogFormVisible: false,
        text: '', //修改昵称框
        user: {
          name: '',
          email: '',
          photo: '',
          password: '',
          checkPass: '',
          id: '',
        }, //后端获取对象  这里进行模拟数据

        dialogVisible: false,
        PreviewPhoto: '',
        dialognameVisible: false,
        cropper: {}, //裁切器实例  为了共享这个状态 写在组件中
        updatePhotoLoading: false, //发送时 按钮loading
        loadusername: false, //更改昵称按钮加载
        updateuserpass: false, //修改密码 load
        formRules: {
          // email:[{ required: true, message: '请输入邮箱', trigger: 'blur' }],
          password: [{
              required: true,
              message: '请填写密码',
              trigger: 'blur',
            },
            {
              max: 15,
              min: 6,
              message: '密码必须大于6位,小于15位',
              trigger: 'blur',
            }
          ],
          checkPass: [{
              required: true,
              message: '请再次填写密码',
              trigger: 'blur'
            },
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入密码'));
                } else if (value !== this.user.password) {
                  callback(new Error('两次输入密码不一致!'));
                } else {
                  callback();
                }
              },
              trigger: 'blur'
            }
          ]

        },
        likeMoviepanel: {}, // 
        watchMoviepanel: [],
        likeArtpanel: {},
        publishArtpanel: {},
        cur_page_likemovie: 1,
        cur_page_likeart: 1,
        cur_page_publishart: 1,
        usershow: false,

      }
    },
    created() {
      this.IsUser()
      this.loadUser()
      this.loadUserinfo()
    },


    methods: {

      loadUser() {
        getUserProfile().then(res => {
          this.user.name = res.data.username //  后端获取user的信息
          this.user.photo = res.data.photo
          this.user.email = res.data.email
          this.user.id = res.data._id
        })
      },
      IsUser(){   //是否是本人访问个人中心  判断 来决定加载ui
      //1. 如果没有params 则是本人   2.有params  也要发送请求 加上本地参数 进行校准
         const id = this.$route.params.id
         const data ={id,}
         if(id){
             judgmentUser(data).then(res=>{
             if(res.data.type == 0){//不是用户本人
                  this.usershow =false
             }else if(res.data.type == 1){  //用户本人
                this.usershow = true
               }}).catch(()=>{ 
                 console.log('获取用户信息失败')
                   this.$router.go(0); //重新加载页面
                 })

         }else{
            this.usershow = true
         }
       },

      

      onFileChange() {
        const file = this.$refs.file
        const blobData = window.URL.createObjectURL(file.files[0]) //获得选择文件的路径
        this.PreviewPhoto = blobData //  复制给预览图像路径
        this.dialogVisible = true //展示弹出层
        this.$refs.file.value = '' //防止选择相同的图片时 change 事件不触发 把值清空就可以一直触发

      },

      onDialogOpened() {
        // 裁切器必须在img 可见时才能正常初始化, 
        // 所以这里需要监听 dialog的opened 事件,等dialog完全加载出来之后才加载裁切器
        const image = this.$refs['preview-image'] //获得DOM 元素
        this.cropper = new Cropper(image, {
          aspectRatio: 16 / 9,
          viewMode: 1, //使裁剪器不移出图片
          background: false,

        });

      },
      onDialogClosed() {
        this.cropper.destroy()
        //销毁裁切器 为了在重新选择图片是 裁切器的图片也进行改变
      },
      /* 通过 函数 replace 替换地址也是可以的 */

      UpdataPhoto() { //拿到裁剪结果 ,请求更新的图像 ,关闭对话框 ,更新视图 
        this.updatePhotoLoading = true
        this.cropper.getCroppedCanvas().toBlob((file) => {
          const formData = new FormData()
          //这里可以直接传递一个blob 对象给后端, 但是因为是二进制对象所以无法查看,这里转换成file类型进行传递
          const file_up = new File([file], `${(new Date).getTime()}.png`)

          formData.append('cover', file_up) //第一个参数:接口字段
          UpdateUserPhoto(formData).then(res => {
            this.dialogVisible = false //关闭对话框
            //console.log(res)
            const photourl = res.data.photo
            this.user.photo = "http://localhost" + photourl
            // console.log(this.user.photo)
            // 2. this.user.photo = window.URL.createObjectURL(file)  直接把裁剪数据返回 不去调用后端数据了 比较快

            this.updatePhotoLoading = false //关闭loading 状态
            //发布通知,用户信息修改   给父组件告知头像已改变
            this.$emit('updateuser', photourl)
          })
        })

      },

      UpdateUserinfo() { // 表单验证  成功后提交表单

        this.$refs['userform'].validate(valid => {
          if (!valid) {
            return
          }
          this.updateuserpass = true // 按钮加载
          UpdateUserBaseProfile(this.user).then(() => {
            // console.log(res)
            this.updateuserpass = false
            this.dialogFormVisible = false
            this.$message({
              message: '修改成功,请重新登录',
              type: 'success'
            })
            this.$router.push('/login')
          }).catch(() => {

            this.updateuserpass = false
            this.dialogFormVisible = false
            this.$message.error('修改失败');
          })

        })
      },

      updatename() {
        if (this.text.trim() === '') {
          this.$message.error('昵称为空,修改失败');
        } else {
          this.loadusername = true // 按钮加载中
          UpdateUserName({
            name: this.text
          }).then(res => {
            //关闭对话框
            this.loadusername = false
            this.dialognameVisible = false
            this.text = ''
            this.user.name = res.data.name
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          })
        }

      },
      loadUserinfo() {

        getUserProfile().then(res => {
          getUserlikeMovie(res.data._id, 1).then(res => {
            this.likeMoviepanel = res.data;
           // console.log(this.likeMoviepanel)
          }).catch(() => {
            console.log('加载收藏电影失败')
          });
          getUserwatchMovie(res.data._id).then(res => {
            this.watchMoviepanel = res.data.watchresult;
           // console.log(this.watchMoviepanel)
          }).catch(() => {
            console.log('加载看过的电影失败')
          });

          getUserlikeArt(res.data._id, 1).then(res => {
            this.likeArtpanel = res.data;
           // console.log(res.data)
          }).catch(() => {
            console.log('加载收藏影评失败')
          });
          getUserpublishArt(res.data._id, 1).then(res => {
            this.publishArtpanel = res.data;
          //  console.log(this.publishArtpanel)
          }).catch(() => {
            console.log('加载发表的影评失败')
          });


        }).catch(() => {
          console.log('用户id请求失败')
        })

      },

      likemoviehandlepage(page) {
         getUserlikeMovie(this.user.id,page).then(res => {
            this.likeMoviepanel ={};
            this.likeMoviepanel = res.data;
            //console.log(this.likeMoviepanel)
          }).catch(() => {
            console.log('加载收藏电影失败')
          });
      },
      likearthandlepage(page) {
        getUserlikeArt(this.user.id,page).then(res => {
            this.likeArtpanel={};
            this.likeArtpanel = res.data;
           // console.log(res.data)
          }).catch(() => {
            console.log('加载收藏影评失败')
          });
      },
      publishArthandlepage(page){
          getUserpublishArt(this.user.id,page).then(res => {
            this.publishArtpanel={}
            this.publishArtpanel = res.data;
          //  console.log(this.publishArtpanel)
          }).catch(() => {
            console.log('加载发表的影评失败')
          });
      },

      updateArt(id){
        this.$router.push(`/publish/${id}`);
      },
      removeArt(id){  //文章id
         
         DeleteArticle(id).then(()=>{
          this.$message({type:'success',message:'删除成功'})
          this.publishArthandlepage(this.cur_page_publishart)
         }).catch(()=>{
            this.$message.error('删除失败')
         })
         
      }



    },
    computed: {
      getcontent() { // 对字符串标签进行处理, 返回规定长度的数据
        return function (str) {
          let parse = new DOMParser()
          let Dom = parse.parseFromString(str, 'text/html')
          let element = Dom.querySelectorAll('p')
          let src = '/ba.jpg'
          let content = '';
          if (Dom.querySelector('img') != null) {
            src = Dom.querySelector('img').src
          }
          element.forEach(item => {
            content += item.textContent;
          });
          if (content.length > 80) {
            content = content.slice(0, 78);
            return {
              content,
              src
            };
          } else {

            return {
              content,
              src
            }
          }



        }
      },

      
      
    }


  }
</script>

<style>
  .imgcontain {
    margin-top: 90px;
    width: 200px;
    border-radius: 50%;
    position: relative;
  }

  .updateuser_p {
    position: absolute;
    top: 1px;
    width: 200px;
    height: 200px;
    text-align: center;
    line-height: 200px;
    background: #91a1b187;
    border-radius: 50%;
    display: none;
    z-index: 10;
  }

  .showipc img {
    width: 100%;
  }

  .imgcontain:hover .updateuser_p {
    display: block;
  }

 .preview-image {
    display: block;
    max-width: 100%;
    height: 200px;
  } 


  .el-carousel__item {
    background-color: transparent;
  }

  .setting_head {
    font-weight: 300;
    padding: 10px 0;
    font-size: 19px;
    overflow: hidden;
    text-overflow: ellipsis;

  }

  .setting_title {

    font-weight: 500;
    font-size: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .setting_head_a {
    text-decoration: none;
    color: #475669;
  }


  .settinglike {
    font-weight: bold;
    color: #475669;
    font-size: 24px;
    text-indent: 10px;

  }

  .allstar {
    display: inline-block;
    vertical-align: top;
  }

  .allstar .el-rate__item {
    width: 16px;
  }

.moviecomment-poster{
width:140px;
height:180px;
display: inline-block;
  }
.moviecomment-poster img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.main-bd {
    display: inline-block;
    vertical-align: top;
    width: 60%;
    margin-left: 15px;
    color: #475669;
  } 
.moviecomment-hd{
margin-top: 10px;
}
.moviecomment-hd a{

  text-decoration: none;
}
.short-content{
  overflow: hidden;

  
}
.comment-body{
 margin-bottom:20px;
 padding: 10px;
 border-bottom:1px dashed #475669;
}  
.main-bd .moviecoment_a:hover{
  background-color: #475669;
  color:aliceblue;

}
</style>