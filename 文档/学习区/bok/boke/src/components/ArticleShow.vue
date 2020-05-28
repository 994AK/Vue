<template>
    <div class="articleShow">
        <!--动画效果-->
        <transition v-for="item in articleList" name="scale">
            <!--文章内容-->
            <section>
                <!--文章头-->
                <h5>
                    <span>【{{item.type}}】</span>
                    <a href="">{{item.title}}</a>
                </h5>

                <!--日期显示-->
                <div class="time">
                    <span class="date">{{item.date | date}}</span>
                    <span class="mouth">{{item.date | month}}<span>月</span></span>
                    <span class="year">{{item.date | year}}</span>
                </div>

                <!--核心图片+内容-->
                <div class="content">
                    <a href="" :style="{backgroundImage:`url(http://localhost:3000${item.surface})`}">
                        <i></i>
                    </a>
                    {{item.content}}
                </div>

                <!--继续阅读条-->
                <div class="read-more">
                    <a href="">继续阅读</a>
                </div>

                <!--标签+阅读量+留言量-->
                <div class="footer">
                    <div class="fl">
                        <i class="el-icon-collection-tag"></i>
                        <span>{{item.tag}}</span>
                    </div>
                    <div class="fr">
                    <span class="pv">
                        <i class="el-icon-view"></i>
                        <i>{{item.pv}}</i>
                    </span>
                        <span class="comment">
                        <i class="el-icon-chat-dot-round"></i>
                        <i>{{item.comment.length}}</i>
                    </span>
                    </div>

                </div>
            </section>
        </transition>
        <!--加载状态-->
        <div v-if="ifLoding" class="bruce flex-ct-x">
            <ul class="chaos-loading">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <!--底部文章-->
        <p v-if="ifNoMore" class="no-more">哼,没有文章了,快写一篇吧</p>
    </div>
</template>

<script>
    import request from '../api'

    const getArticleShow = request.getArticleShow;

    export default {
        name: "ArticleShow",
        data() {
            return {

                //文章数据
                articleList: [],

                //no-more的显示与否
                ifNoMore: false,

                //是否加载
                ifLoding: false,
            }
        },

        filters: {
            date(value) {
                return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[3];
            },
            month(value) {
                return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[2];

            },
            year(value) {
                return value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[1];

            }

        },

        computed: {
            id() {
                return this.$route.params.id;
            },
        },

        watch: {
            id() {
                this.getArticleShowFresh()
            }
        },

        methods: {
            getArticleShowFresh() {
                this.ifNoMore = this.ifLoding = false;
                //当id发生变化时
                getArticleShow(this.id, true).then(res => {
                    this.articleList = res.data.data;
                })

            },

            //滚动事件
            handleScroll() {

                if (this.ifNoMore || this.ifLoding) return;


                /*
                × 滚动显示文章
                * c : 文档高
                * a : 滚动高
                * b : 可视区高
                * */

                let c = document.documentElement.offsetHeight;
                let a = document.documentElement.scrollTop;
                let b = document.documentElement.clientHeight;

                if (a + b >= c - 200) {
                    this.ifLoding = true;
                    getArticleShow(this.id, false).then(res => {
                        this.ifLoding = false;
                        let data = res.data.data;
                        if (data.length) {
                            this.articleList.push(...res.data.data);
                        } else {
                            this.ifNoMore = true;
                        }
                    }).catch(err => {
                        this.ifLoding = false;
                    })
                }
            }
        },

        mounted() {
            //发生第一次请求
            this.getArticleShowFresh();

            //监听滚动事件
            window.addEventListener('scroll', this.handleScroll);
        }
    }
</script>

<style scoped lang="less">

    .articleShow {
        > section {
            overflow: hidden;
            position: relative;
            box-sizing: border-box;
            width: 100%;
            padding: 20px 30px 25px;
            margin-bottom: 20px;
            background-color: #fff;
            animation: show 1s 1;
            animation-fill-mode:forwards ;
            @keyframes show {
                from {
                    opacity: .5;
                    transform: scale(.5)
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            &:nth-child(1)::before {
                content: '置顶';
                position: absolute;
                height: 20px;
                line-height: 20px;
                text-align: center;
                width: 74px;
                background-color: #ff5722;
                color: #fff;
                transform: rotate(-45deg);
                left: -18px;
                top: 9px;
            }
        ;

            /*文章*/

            > h5 {
                line-height: 30px;
                padding: 5px 130px 5px 0;

                font-size: 18px;
                font-weight: 400;

                span {
                    font-size: 16px;
                    font-weight: 400;
                    display: inline-block;
                    vertical-align: bottom;
                    color: #2ea7e0;
                }

                a {
                    color: #000;
                    text-decoration: none;

                    &:hover {
                        color: #6bc30d;
                        text-decoration: underline;
                    }
                }
            }

            /*时间*/

            .time {
                width: 84px;
                font-family: Menlo, Monaco, Consolas;
                position: absolute;
                right: 10px;
                top: 10px;
                background-color: #fff;
                padding: 0 20px 5px 20px;
                line-height: 32px;

                .date {
                    display: block;
                    text-align: center;
                    font-size: 40px;
                    color: #6bc30d;
                    position: relative;
                    top: 2px;
                }

                .mouth {
                    color: #989997;
                    font-size: 16px;

                    span {
                        font-size: 16px;
                    }
                }

                .year {
                    color: #989997;
                    margin-left: 10px;
                    font-size: 18px;
                }
            }

            /*图片内容*/

            .content {
                margin-top: 20px;
                width: 100%;
                line-height: 28px;
                position: relative;
                min-width: 200px;
                overflow: hidden;

                a {
                    display: block;
                    width: 300px;
                    height: 180px;
                    border: 1px solid #e8e9e7;
                    overflow: hidden;
                    float: left;
                    margin-right: 20px;
                    background-position: center top;
                    background-size: cover;

                    i {
                        position: absolute;
                        top: 0;
                        left: 0;

                        display: block;
                        width: 0;
                        height: 100%;

                        transform: translateX(-70px) skew(-15deg);
                        box-shadow: 0 0 30px 20px rgba(255, 255, 255, .5);

                    }

                    &:hover i {
                        transition: transform .5s .5s;
                        transform: translateX(320px) skew(-15deg);
                    }
                }
            }

            /*继续阅读条*/

            .read-more {
                position: relative;

                &::before {
                    content: ' ';
                    display: inline-block;
                    height: 1px;
                    top: 20px;
                    left: 100px;
                    right: 0;
                    position: absolute;
                    background-color: #d0d0d0;
                }

                a {
                    font-weight: bold;
                    color: #383937;
                    text-decoration: none;
                    border: none;
                    line-height: 40px;

                    &:hover {
                        color: #6bc30d;
                        text-decoration: underline;
                    }

                }

            }

            /*标签栏*/

            .footer {
                .fl {
                    float: left;

                    i {
                        font-size: 18px;
                        margin-right: 5px;
                        color: #666;
                        font-weight: 400;

                    }

                    span {
                        display: inline-block;
                        font-size: 12px;
                        padding: 2px 5px;
                        background-color: #f1f2f0;
                        color: #787977;
                        margin: 2px;
                        text-decoration: none;
                        -webkit-transition: all .2s;
                        transition: all .2s;

                        &:hover {
                            color: #fff;
                            background: #6bc30d;
                        }
                    }
                }

                .fr {
                    float: right;
                    color: #666;

                    i {
                        font-style: normal;
                        margin-right: 12px;
                    }

                    .comment {
                        margin-left: 20px;
                    }

                }
            }


        }
    }

    .chaos-loading {
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        border-radius: 100%;
        width: 200px;
        height: 200px;

        &::after {
            display: block;
            filter: drop-shadow(2px 4px 6px #000);
            line-height: 200px;
            text-align: center;
            font-weight: bold;
            font-size: 30px;
            color: #fff;
            content: "Loading...";
        }

        li {
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 100%;
            width: 100px;
            height: 100px;
            filter: blur(25px);
            animation: move 2s linear infinite;

            &:nth-child(1) {
                background-color: #f66;
            }

            &:nth-child(2) {
                background-color: #66f;
                animation-delay: -500ms;
            }

            &:nth-child(3) {
                background-color: #f90;
                animation-delay: -1s;
            }

            &:nth-child(4) {
                background-color: #09f;
                animation-delay: -1.5s;
            }
        }
    }

    @keyframes move {
        0%,
        100% {
            transform: translate3d(0, 0, 0);
        }
        25% {
            transform: translate3d(100%, 0, 0);
        }
        50% {
            transform: translate3d(100%, 100%, 0);
        }
        75% {
            transform: translate3d(0, 100%, 0);
        }
    }

    .no-more {
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #fff;
        font-size: 12px;
    }

    .scale-enter {
        opacity: 0.5;
        transform: scale(.5);
    }

    .scale-enter-to {
        opacity: 1;
        transform: scale(1);
    }

    .scale-enter-active {
        transition: all .3s;
    }
</style>