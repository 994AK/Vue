<template>
    <div class="Home">
        <!--bgHeight适配屏幕大小-->
        <div class="bg" :style="{height:bgHeight + 'px'}">
            <div class="bg-content loading">
                <h1>燕十三</h1>
                <h2>剑气xx三万里,一剑光寒十九x</h2>
                <router-link to="/blog/0">Enter Blog</router-link>
            </div>
            <i class="bg-icon el-icon-arrow-down"></i>
        </div>
        <!--右上角菜单-->
        <div :class="['menu',{'click':ifclick}]">
            <div class="btn" @click="handleClick">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="cover">
                <div class="point">
                    <router-link to="/">首页</router-link>
                    <router-link to="/blog/0">博客</router-link>
                    <router-link to="/message">留言</router-link>
                </div>
                <div class="cover-logo">YGH</div>
            </div>
        </div>
        <!--热门文章-->
        <div class="hot">
            <div class="hot-main">
                <div class="text loading">
                    <h2>热门文章</h2>
                    <p>
                        很想给你写封信,告诉你这里的天气.<br>
                        昨夜的那场电影,还有我的心情.
                    </p>
                </div>
                <ul class="loading">
                    <li v-for="item in articleHotList">
                        <div class="img">
                            <div class="bgImg"
                                 :style="{backgroundImage:`url(http://localhost:3000${item.surface})`}"></div>
                            <div class="link">
                                <a href=""><i class="el-icon-link"></i></a>
                            </div>
                        </div>
                        <div class="info">
                            <div class="title"><a href="">{{item.title}}</a></div>
                            <div class="time">
                                {{item.date| year}}年
                                {{item.date | month}}月
                                {{item.date | date}} 日
                            </div>
                            <div class="content">{{item.content}}</div>
                            <a href="" class="link">阅读更多</a>
                        </div>

                    </li>
                </ul>
            </div>
        </div>
        <!--关于&友联-->
        <div class="about">
            <div class="warp">
                <ul class="loading">
                    <li>
                        <router-link to="/about">关于</router-link>
                    </li>
                    <li>
                        <router-link to="/link">+友情链接</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <!--自我介绍-->
        <div class="introduce">
            <div class="introduceWarp loading">
                <h1>次元使者</h1>
                <p>
                    爱好游戏，动漫。闲来无事喜欢在一些不健康的场所虚度光阴，撸起代码就会废寝忘食。
                </p>
            </div>
        </div>
        <div class="footer">

        </div>
    </div>
</template>

<script>
    import request from '../../api/index'

    const getArticleHot = request.getArticleHot;

    //得到DOM距离页面顶部的距离
    function getTop(node) {
        let top = 0;
        while (node !== document.body) {
            top += node.offsetTop;
            node = node.offsetParent;
        }
        return top;
    }

    export default {
        name: "Home",
        data() {
            return {
                bgHeight: 0,
                ifclick: false,
                articleHotList: [],
            }
        },
        methods: {
            //设置bg高度与window高度一样
            getWindowHeight() {
                this.bgHeight = window.innerHeight;
            },

            //滚轮滚动事件
            handleScroll() {
                let loadingDom = document.querySelectorAll('.loading');
                let scrollTop = document.documentElement.scrollTop + window.innerHeight;
                loadingDom.forEach(node => {

                    if (scrollTop > getTop(node) + 100) {
                        node.classList.remove('loading')
                    }
                })
            },

            //点击右边菜单
            handleClick() {
                this.ifclick = !this.ifclick;
            },
        },
        //年月日
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
        created() {
            this.getWindowHeight();
        },
        mounted() {
            /*适配屏幕大小*/
            this.getWindowHeight();
            window.addEventListener('resize', this.getWindowHeight);

            /* 文章渲染 */
            getArticleHot(3).then(res => {
                this.articleHotList = res.data.data;
            });

            /*scroll*/
            this.handleScroll();
            window.addEventListener('scroll', this.handleScroll)

        },
        destroyed() {
            window.addEventListener('resize', this.getWindowHeight)
        }
    }
</script>

<!--suppress CssNoGenericFontName -->
<style scoped lang="less">
    .Home {
        user-select: none;
        //适配屏幕大小
        .bg {
            width: 100%;
            /*主页图片*/
            background: url("../../assets/img/bg.jpg") center center/cover;

            &::before {
                position: absolute;
                content: "";
                width: 100%;
                height: 100%;
                /*遮掩背景*/
                background-color: rgba(0, 0, 0, .3);
            }

            .bg-content {
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                z-index: 13;
                width: 100%;
                height: 154px;
                text-align: center;
                font-size: 14px;
                color: white;
                transform: scale(1);
                transition: transform .5s;

                &.loading {
                    transform: scale(0.5);
                }

                h1 {
                    font-weight: 400;
                    font-size: 2em;
                }

                h2 {
                    font-weight: 400;
                    letter-spacing: 10px;
                    margin: 20px 0;
                    font-size: 1em;
                }

                a {
                    display: inline-block;
                    height: 38px;
                    line-height: 38px;
                    padding: 0 18px;
                    background-color: #1E9FFF;
                    color: #fff;
                    white-space: normal;
                    text-align: center;
                    font-size: 14px;
                    border: none;
                    border-radius: 2px;
                    cursor: pointer;
                    margin-top: 20px;
                    transition: opacity .3s;

                    &:hover {
                        opacity: .8;
                    }
                }
            }

            .bg-icon {
                position: absolute;

                bottom: 30px;
                left: 50%;
                z-index: 11;
                margin-left: -25px;
                width: 50px;
                height: 50px;
                color: #fff;
                font-weight: 700;
                font-size: 36px;
                border-radius: 50%;
                transition: background-color .7s;
                line-height: 56px;
                text-align: center;
                cursor: pointer;

                &:hover {
                    background-color: #6bc30d;
                }
            }
        }

        //右上角菜单
        .menu {
            /*右上角菜单按钮*/

            .btn {
                position: fixed;
                box-sizing: border-box;
                z-index: 999;
                right: 55px;
                top: 40px;

                width: 40px;
                height: 40px;

                padding-top: 12px;

                cursor: pointer;
                border-radius: 50%;
                background-color: transparent;
                transition: background-color .3s;

                &:hover {
                    background-color: #6bc30d;
                }

                span {
                    position: relative;
                    top: 0;
                    display: block;
                    width: 26px;
                    height: 2px;
                    margin: 0 auto 5px;
                    background-color: #fff;
                    transition: all .32s;
                    transform: rotate(0deg);

                }

            }

            .cover {
                opacity: 0;
                z-index: 8;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, .5);
                transition: opacity .3s;

                &::before {
                    position: absolute;
                    left: 100%;
                    top: 0;
                    content: '';
                    width: 4999px;
                    height: 100%;
                    background-color: #F9F9F8;
                    /*斜着白布*/
                    transform: skew(-12deg);
                    transition: left .3s;
                }

                //右边导航栏
                .point {
                    position: absolute;
                    right: 0;
                    top: 200px;
                    z-index: 101;
                    font-size: 20px;

                    a {
                        position: relative;
                        display: block;
                        text-align: right;
                        color: #686967;
                        line-height: 46px;
                        padding: 10px 30px;
                        margin-right: 20px;
                        font-size: 20px;
                        text-decoration: none;
                        -webkit-transition: color .6s linear;
                        transition: color .6s linear;

                        &::before {
                            position: absolute;
                            top: 50%;
                            left: 0;

                            width: 0;
                            height: 1px;
                            opacity: 0;
                            background-color: #6bc30d;
                            content: "";
                            transition: all .3s;
                        }

                        &:hover {
                            color: #6bc30d;
                        }

                        &:hover::before {
                            width: 100%;
                            opacity: 1;
                        }
                    }
                }

                //文字
                .cover-logo {
                    font-size: 30px;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    z-index: 101;
                    padding: 10px 50px;
                    font-family: BarbaraHand;
                    color: #686967;
                    cursor: pointer;
                }
            }

            //菜单三杠动画
            &.click {
                .btn {
                    background-color: rgba(0, 0, 0, 0.1);

                    span:nth-child(1) {
                        top: 8px;
                        transform: rotate(45deg);
                        /*transform-origin: left center;*/
                    }

                    span:nth-child(2) {
                        top: 1px;
                        transform: rotate(-45deg);
                        /*transform-origin: center center;*/
                    }

                    span:nth-child(3) {
                        display: none;
                    }
                }

                .cover {
                    opacity: 1;

                    &::before {
                        left: 65%;
                    }
                }
            }
        }

        //热门文章
        .hot {
            position: relative;
            z-index: 9;
            width: 100%;
            overflow: hidden;
            padding: 100px 0;
            background-color: #fff;

            .hot-main {
                max-width: 1170px;
                width: 100%;
                margin: 0 auto;
                text-align: center;

                .text {
                    position: relative;
                    top: 0;
                    opacity: 1;
                    transition: opacity .3s, top .5s;

                    &.loading {
                        top: -100px;
                        opacity: 0;
                    }
                }

                > h2 {
                    position: relative;
                    font-size: 32px;
                    padding-bottom: 30px;
                    font-weight: 500;

                    &::before {
                        position: absolute;
                        width: 50px;
                        height: 2px;
                        content: '';
                        left: 50%;
                        margin-left: -25px;
                        bottom: -1px;
                        background: #00c2ff;
                    }
                }

                > p {
                    margin-top: 20px;
                    line-height: 22px;
                    color: #888;
                }

                > ul {
                    display: flex;
                    width: 100%;
                    height: 503px;
                    margin-top: 50px;

                    li {
                        position: relative;
                        top: 0;
                        flex: 1;
                        height: 503px;
                        padding: 0 10px;
                        opacity: 1;


                        .img {
                            overflow: hidden;
                            position: relative;
                            width: 100%;
                            height: 244px;

                            .bgImg {
                                width: 100%;
                                height: 100%;
                                background-position: center center;
                                background-size: cover;
                            }

                            .link {
                                position: absolute;
                                top: -100%;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background-color: rgba(255, 255, 255, .3);
                                opacity: 0;
                                transition: .3s;

                                a {
                                    position: absolute;
                                    left: 50%;
                                    top: 50%;

                                    margin-top: -20px;
                                    margin-left: -20px;

                                    width: 40px;
                                    height: 40px;
                                    background: #333;
                                    color: #fff;
                                    line-height: 40px;
                                    text-align: center;

                                    i {
                                        font-size: 16px;
                                    }
                                }
                            }

                            &:hover .link {
                                top: 0;
                                opacity: 1;
                            }
                        }

                        .info {
                            box-sizing: border-box;
                            width: 100%;
                            height: 209px;
                            padding: 30px 15px;
                            background-color: #faf9f9;
                            text-align: left;

                            .title {
                                margin-bottom: 10px;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                white-space: nowrap;

                                a {
                                    color: #333;

                                    &:hover {
                                        color: #777;
                                    }
                                }
                            }

                            .time {
                                color: #bbb;
                                font-size: 12px;
                                margin-bottom: 15px;
                            }

                            .content {

                                overflow: hidden;
                                line-height: 20px;
                                height: 60px;
                                color: #999;

                            }

                            .link {
                                display: inline-block;
                                margin-top: 15px;
                                padding: 0;
                                background: 0 0;
                                border: none;
                                color: #29b6f6;
                                transition: all .4s ease;
                                font-size: 15px;

                                &:hover {
                                    color: #333;
                                }
                            }

                        }

                    }

                    li:nth-child(1) {
                        transition: .6s 0s;
                    }

                    li:nth-child(2) {
                        transition: .6s .1s;
                    }

                    li:nth-child(3) {
                        transition: .6s .2s;
                    }

                    &.loading li {
                        top: 100px;
                        opacity: 0;
                    }
                ;
                }
            }
        }

        //关于和友联
        .about {
            position: relative;
            z-index: 9;
            width: 100%;
            height: 48px;
            padding: 111px 0;
            margin: 0 auto;
            background: url("../../assets/img/bg1.png") center center/cover fixed;

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                z-index: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, .5);
            }

            ul {
                position: relative;
                z-index: 9;
                width: 425px;
                margin: 0 auto;
                opacity: 1;
                transition: .6s;
                //特效
                &.loading {
                    width: 1000px;
                    opacity: 0;
                }

                li {
                    position: relative;
                    width: 198px;
                    height: 46px;
                    border: 1px solid #fff;

                    &:nth-child(1) {
                        float: left;
                    }

                    &:nth-child(2) {
                        float: right;
                    }

                    &::after {
                        position: absolute;
                        left: 0;
                        top: 0;
                        content: '';
                        width: 0;
                        height: 100%;
                        background-color: #6bc30d;
                        transition: width .5s;
                    }

                    &:hover::after {
                        width: 100%;
                    }

                    a {
                        position: relative;
                        z-index: 1;
                        display: block;
                        width: 100%;
                        height: 100%;
                        line-height: 46px;
                        text-align: center;
                        color: #fff;

                    }

                }
            }
        }

        //自我介绍
        .introduce {
            position: relative;
            width: 100%;
            height: 48px;
            margin: 0 auto;
            padding: 111px 0;
            line-height: 48px;
            text-align: center;
            //测试颜色
            background-color: #fff;

            .introduceWarp {
                width: 100%;
                margin-top: -40px;
                transition: width .5s;
                h1:nth-child(1){
                    transition: all .4s ease 0s;
                    margin-bottom: -10px;
                    float: left;
                    width: 100%;
                }
                p:nth-child(2){
                    transition: all .5s ease 0s;
                    font-size: 14px;
                    font-weight: 800;
                    float: right;
                    width: 100%;

                }
                &.loading {
                    h1:nth-child(1){
                        float: left;
                        width: 30%;

                    }

                    p:nth-child(2){
                        float: right;
                        width: 30%;
                    }

                }


            }
        }

        //页尾
        .footer{
            width: 100%;
            height: 48px;
            padding: 111px 0;
            margin: 0 auto;
            background-color: #242228;
        }
    }
</style>