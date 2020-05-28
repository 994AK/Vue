<template>
    <div id="Container">
        <!--外层容器-->
        <el-container>
            <!--主要区域容器-->
            <el-main>
                <ArticleShow />
            </el-main>
            <!--侧边栏容器-->
            <el-aside>
                <div :class="['search',{'fixed':ifSearchFixed}]">
                    <!--搜索框-->
                    <div class="search-main">
                        <input type="text" v-model="searchInput" placeholder="请输入搜索内容">
                        <i class="el-icon-search"></i>
                    </div>
                    <!--关键词-->
                    <div class="search-article">
                        <!--handleMouseleave:鼠标离开ul,top为0-->
                        <ul @mouseleave="handleMouseleave">
                            <!--handleMouseenter:鼠标进入后,判断鼠标top进行移动-->
                            <li @mouseenter="handleMouseenter(index)" v-for='(item,index) in  getArticleInfo'>
                                <router-link :to="'/blog/'+index">{{item}}</router-link>
                            </li>
                        </ul>
                        <div class="cover" :style="{top:coverIndex*40+'px'}"></div>
                    </div>
                </div>
                <div class="hot">
                    <h3>热门文章</h3>
                    <ul>
                        <li v-for="(item,index) in articleHot">
                            <i>{{index+1}}</i>
                            <a :href="item._id">{{item.title}}</a>
                        </li>
                    </ul>
                </div>
                <div class="recommend">
                    <h3>置顶推荐</h3>
                    <ul>
                        <li v-if="!!getArticleRecommend.title">
                            <i>{{1}}</i>
                            <a :href="getArticleRecommend._id">{{getArticleRecommend.title}}</a>
                        </li>
                    </ul>
                </div>
                <div class="visitor">
                    <h3>最近访客</h3>
                    <ul>
                        <li v-for="item in visitor" :style="{backgroundImage:`url(${item.photo})`}">
                            <p>{{item.user}}</p>
                        </li>
                    </ul>
                </div>
            </el-aside>
        </el-container>
    </div>

</template>

<script>
    /*组件导入*/
    import ArticleShow from "./ArticleShow";


    import request from '../api/index'
    let getArticleInfo = request.getArticleInfo;
    let getArticleHot = request.getArticleHot;

    export default {
        name: "Container",
        data() {
            return {
                /*搜索框 v-model*/
                searchInput: ''

                /*控制class的样式*/
                , ifSearchFixed: false

                /*文章分类(tags)*/
                , articleTags: []

                /*热门文章列表*/
                , articleHot: []

                /*cover条的top*/
                , coverIndex: this.$route.params.id * 1

                /*假设 最近访客的数量*/
                , visitor: [
                    {user: 'lsy', photo: 'http://localhost:3000/img/defaultPhot.png'},
                    {user: 'lsy', photo: 'http://localhost:3000/img/defaultPhot.png'},
                    {user: 'lsy', photo: 'http://localhost:3000/img/defaultPhot.png'},
                    {user: 'lsy', photo: 'http://localhost:3000/img/defaultPhot.png'},
                    {user: 'lsy', photo: 'http://localhost:3000/img/defaultPhot.png'},
                    {user: 'lsy', photo: 'http://localhost:3000/img/defaultPhot.png'},
                    {user: 'lsy', photo: 'http://localhost:3000/img/defaultPhot.png'},
                    {user: 'lsy', photo: 'http://localhost:3000/img/defaultPhot.png'},
                    {user: 'lsy', photo: 'http://localhost:3000/img/defaultPhot.png'},
                    {user: 'lsy', photo: 'http://localhost:3000/img/defaultPhot.png'},
                    {user: 'lsy', photo: 'http://localhost:3000/img/defaultPhot.png'},
                    {user: 'lsy', photo: 'http://localhost:3000/img/defaultPhot.png'},
                ]
            }
        },
        computed: {
            getArticleInfo() {
                return ['全部文章', ...this.articleTags];
            },
            getArticleRecommend() {
                return this.articleHot[0] || {};
            },
        },
        methods: {
            handleMouseenter(index) {
                //根据鼠标判断他的top
                this.coverIndex = index;
            },
            handleMouseleave() {
                this.coverIndex = this.$route.params.id * 1;
            },

            handleWindowScroll() {
                this.ifSearchFixed = document.documentElement.scrollTop >= 930;
            }
        },
        /*组件导入*/
        components: {
            ArticleShow
        },
        created() {
            //请求分类
            getArticleInfo().then(res => {
                //后端接口接收
                this.articleTags = res.data.data.tags
            });
            //请求热门文章
            getArticleHot().then(res => {
                this.articleHot = res.data.data;
            })
        },
        mounted() {
            this.handleWindowScroll();
            /*监听一下window的滚动事件*/
            window.addEventListener('scroll', this.handleWindowScroll)
        },
        /*离开页面 清除功能*/
        destroyed() {
            window.addEventListener('scroll', this.handleWindowScroll)
        }
    }
</script>

<style lang="less" scoped>
    #Container {
        padding-top: 80px;
        width: 100%;
        height: 2000px;
        user-select: none;

        > .el-container {
            box-sizing: border-box;
            width: 100%;
            max-width: 1360px;
            height: 100%;
            margin: 0 auto;
            padding: 0 50px;
            > .el-main{
                padding-top: 0;
                padding-left: 0;
            }
            > .el-aside {
                width: 300px;
                height: 100%;
                /*background-color: aqua;*/

                > .search {
                    width: 100%;
                    background-color: #fff;
                    /*padding-bottom: 20px;*/

                    /*高度过于950就显示出来*/

                    &.fixed {
                        position: fixed;
                        z-index: 3;
                        width: 300px;
                        /*不懂这个什么意思*/
                        animation: searchMove .5s 1 ease-in-out;
                        animation-fill-mode: forwards;
                    }

                    @keyframes searchMove {
                        /*弹动效果*/
                        0% {
                            top: -500px
                        }

                        40% {
                            top: 81px
                        }

                        70% {
                            top: 60px
                        }

                        100% {
                            top: 81px
                        }
                    }

                    .search-main {
                        position: relative;
                        box-sizing: border-box;
                        width: 100%;
                        height: 80px;
                        padding: 20px;
                        background-color: gray;

                        input {
                            width: 100%;
                            height: 40px;
                            border-radius: 20px;
                            border: 0;
                            outline: 0;
                            text-indent: 2em;
                        }

                        i {
                            position: absolute;
                            /*定位到搜索框内*/
                            right: 40px;
                            top: 29px;

                            width: 22px;
                            height: 22px;
                            font-size: 18px;
                            line-height: 22px;
                            text-align: right;
                            //加粗
                            font-weight: bolder;
                            //搜索小按钮颜色
                            color: rgb(120, 121, 119);
                            //鼠标样式
                            cursor: pointer;
                        }
                    }

                    .search-article {
                        position: relative;
                        width: 100%;
                        margin-top: 20px;

                        ul {
                            width: 100%;

                            li {
                                box-sizing: border-box;
                                position: relative;
                                z-index: 1;
                                width: 100%;
                                height: 40px;
                                padding: 0 30px;
                                line-height: 40px;

                                a {
                                    display: block;
                                    width: 100%;
                                    height: 100%;
                                    color: #787977;
                                    border-bottom: 1px dotted #eee;

                                }
                            }
                        }

                        /*搜索列表滚动条*/

                        .cover {
                            box-sizing: border-box;
                            position: absolute;
                            left: 0;
                            top: 0;

                            width: 100%;
                            height: 40px;
                            border-right: 5px solid #000;
                            background-color: rgba(0, 0, 0, .05);

                            transition: top .3s;
                        }
                    }
                }

                //热门文章标签 与置顶样式
                > .hot, .recommend {
                    box-sizing: border-box;
                    width: 100%;

                    margin-top: 20px;

                    background-color: #fff;
                    padding: 15px 20px 20px;

                    h3 {
                        padding: 0 5px;
                        line-height: 30px;
                        font-weight: 400;
                        border-bottom: 1px solid #e8e9e7;
                        color: #383937;
                        position: relative;
                        font-size: 18px;
                    }

                    ul {
                        margin-top: 15px;

                        li {
                            overflow: hidden;
                            height: 30px;
                            line-height: 30px;
                            margin: 7px 0;

                            a {
                                color: #787977;
                                font-size: 14px;
                                text-decoration: none;

                                &:hover {
                                    color: #6bc30d;
                                    text-decoration: underline;
                                }
                            }

                            i {
                                display: inline-block;
                                width: 22px;
                                height: 22px;
                                margin-right: 10px;

                                font-style: normal;
                                font-size: 12px;
                                color: #666;
                                line-height: 22px;
                                text-align: center;
                                border-radius: 100%;
                                background-color: #edefee;
                                text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
                            }

                            &:nth-child(1) i {
                                background-color: #e24d46;
                                color: #fff;
                            }

                            &:nth-child(2) i {
                                background-color: #2ea7e0;
                                color: #fff
                            }

                            &:nth-child(3) i {
                                background-color: #6bc30d;
                                color: #fff
                            }
                        }
                    }
                }

                > .visitor {
                    box-sizing: border-box;
                    width: 100%;

                    margin-top: 20px;

                    background-color: #fff;
                    padding: 15px 20px 20px;

                    h3 {
                        padding: 0 5px;
                        line-height: 30px;
                        font-weight: 400;
                        border-bottom: 1px solid #e8e9e7;
                        color: #383937;
                        position: relative;
                        font-size: 18px;
                    }

                    ul {
                        li {
                            position: relative;
                            float: left;
                            width: 23%;
                            height: 60px;
                            margin: 1%;

                            background-position: center top;
                            background-size: cover;
                            background-repeat: no-repeat;

                            p {
                                overflow: hidden;
                                position: absolute;
                                bottom: -13px;
                                left: 0;
                                width: 100%;
                                height: 20px;
                                line-height: 20px;
                                text-align: center;
                                background-color: rgba(0, 0, 0, .3);
                                color: #fff;
                                font-size: 12px;
                            }
                        }

                        &::after {
                            display: block;
                            content: '';
                            width: 0;
                            height: 0;
                            clear: both;
                        }
                    }
                }
            }

        }
    }
</style>