<template>
<div>
    <div v-for="(i,index) in commentnum" :key='index'>
        <div class="comment-item-body">
    <div class="author-avatar">
        <a href="https://www.douban.com/people/200828729/" title="稀缺资源">
            <img src="https://img3.doubanio.com/icon/up200828729-1.jpg" alt="稀缺资源">
        </a>
    </div>
    <div class="comment-main">
        <div class="meta-header" style="background-color: rgb(243, 245, 247);">
            <a href="https://www.douban.com/people/139887906">
                文錦同學 </a>
            <time>
                2020-12-30 20:59:22
            </time>
        </div>

        <div class="comment-content">
            <span>谢谢你，我看懂了</span>
        </div>

        <div class="comment-action-bar">
            <div class="action-deitor">
                <el-button size="mini"
                @click="replaybut(index)"
                v-if='!(index == hideitem)'>回应
                </el-button>
             </div>

            <div class="replay-deitor" v-if='(index == hideitem)'>
                <el-form 
                :inline="true" 
                :model="replay"
                size="mini">
                    <el-form-item>
                        <el-input 
                        v-model="replay.content"
                         placeholder="输入回复内容" 
                         style='width:450px;margin-bottom:0px'
                        >
                        </el-input>

                    </el-form-item>
                    <el-form-item style='margin-bottom:0px;margin-right:0px'>
                        <el-button type="primary" plain @click='commentsubmit'>回应</el-button>
                        <el-button size="mini" @click='hideitem=-1'>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>
    </div>
    </div>
    <div class="replay-comment" v-if='replayhide'>
        <div v-for='(j,indexplus) in 3' :key='indexplus'>
        <div class="comment-item-body">
        <div class="avatar-small">
        <a href="https://www.douban.com/people/200828729/" title="稀缺资源">
            <img src="https://img3.doubanio.com/icon/up200828729-1.jpg" alt="稀缺资源">
        </a>
    </div>
    
    <div class="comment-main">
        <div class="meta-header" style="background-color: rgb(243, 245, 247);">
            <a href="https://www.douban.com/people/139887906">
                文錦同學 </a>
            <time>
                2020-12-30 20:59:22
            </time>
        </div>

        <div class="comment-content">
            <span>谢谢你，我看懂了</span>
        </div>

        <div class="comment-action-bar">
            <div class="action-deitor">
                <el-button size="mini"
                @click="replayplus(index,indexplus)"
                v-if='!(replayvalue == index&& replayitem == indexplus)'>回应
                </el-button>
             </div>

            <div class="replay-deitor" v-if='(replayvalue == index && replayitem == indexplus)'>
                <el-form 
                :inline="true" 
                :model="replaypl"
                size="mini">
                    <el-form-item>
                        <el-input 
                        v-model="replaypl.content"
                         placeholder="输入回复内容" 
                         style='min-width:565px;margin-bottom:0px'
                        >
                        </el-input>

                    </el-form-item>
                    <el-form-item style='margin-bottom:0px;margin-right:0px'>
                        <el-button type="primary" plain >回应</el-button>
                        <el-button size="mini" @click='replayvalue=-1;replayitem = -1'>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>
    </div>
  </div>
    </div>
    </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'review-comment',
        props: ['comment-list'],
        data() {
            return {
             hideitem : -1, //隐藏的哪一个元素的值
             replay:{
                 content:'',
             },
             replaypl:{
                    content:'',
             },

             commentnum:3, //评论数量
             // 后端请求评论数量 内容..
           replayhide:true, //评论回复 是否隐藏
           replayitem : -1,
           replayvalue : -1 , //中间值用来判断嵌套循环中谁被点击了
            }
        },
        methods:{
            replaybut(index){
              this.hideitem = index
            },
            commentsubmit(){
              //提交发送请求  把事件发送出去
            },
            replayplus(index,indexplus){
               this.replayvalue = index
               this.replayitem =indexplus
            }

        }
    }
</script>

<style>
 .comment-item-body {
        display: flex;
    }

.author-avatar {
	width: 48px;
	height: 48px;
	margin-right: 20px;
}

.avatar-small {
	height: 24px;
	width: 24px;
	margin-right: 10px;
}

.comment-main {
        flex: 1;
    }

    .meta-header {
        background: #F3F5F7;
        padding: 3px 5px;
        margin-bottom: 5px;
        color: #999;
    }

    .meta-header a:link {
        color: #37a;
        text-decoration: none;
    }

    .meta-header a:hover {
        color: #FFFFFF;
        text-decoration: none;
        background: #37a;
    }

    .comment-item-body .comment-content {
        padding: 5px 0;
        word-wrap: break-word;
        word-break: break-word;
        white-space: pre-wrap;
    }

    .comment-action-bar {
        color: #bbb;
        font-size: 13px;
        text-align: right;
        min-height: 21px;
        margin-bottom: 10px;

    }

    div.comment-item-body {
        margin-bottom: 1em;
        word-break: break-word;
    }
    .replay-comment{
        padding-left: 68px;
    }
</style>