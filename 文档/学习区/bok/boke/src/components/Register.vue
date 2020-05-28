<template>
    <div>
        <!--注册表单-->
        <el-form
                ref="form"
                :model="form"
                label-width="80px"
                :rules="rules"
        >
            <!--用户名-->
            <el-form-item label="用户名" prop="user">
                <el-input v-model="form.user" placeholder="用户名"></el-input>
            </el-form-item>
            <!--密码-->
            <el-form-item label="密码" prop="pwd">
                <el-input v-model="form.pwd" show-password placeholder="密码"></el-input>
            </el-form-item>
            <!--确认密码-->
            <el-form-item label="确认密码" prop="checkPwd">
                <el-input v-model="form.checkPwd" show-password placeholder="确认密码"></el-input>
            </el-form-item>
            <!--验证码-->
            <el-form-item label="验证码" class='vcode' prop="svgCode">
                <el-input v-model="form.svgCode"></el-input>
                <div class="svg" v-html="register.svgText" @click="getVCode"></div>
            </el-form-item>
            <!--注册-->
            <el-form-item>
                <el-button type="success" class="el-form-item-success" @click="submitForm('form')">立即注册</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>


<script>

    import request from '../api/index'

    const getRegisterVCode = request.getRegisterVCode;
    const getRegisterCheckVcode = request.getRegisterCheckVcode;


    export default {
        name: "Register",
        data() {
            return {
                //表单数据
                form: {
                    user: '',
                    pwd: '',
                    checkPwd: '',
                    svgCode:'',
                },
                //表单验证
                rules: {
                    /*用户名*/
                    user: [
                        /*失去焦点就检测*/
                        {
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        },
                        /*数据变化的时候检测*/
                        {
                            //数据类型
                            type: 'string',
                            //正则规则
                            pattern: /^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/,
                            message: '2-7位,数字,字母,中日韩文',
                            trigger: ['blur', 'change']
                        }
                    ],
                    /*密码验证*/
                    pwd: {
                        //数据类型
                        type: "string",
                        validator: (rule, value, cb) => {
                            if (value) {
                                //验证密码是否符合规则
                                if (/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(value)) {
                                    cb();
                                } else {
                                    cb(new Error('6-18位,不能出现!@#$%^&*()'))
                                }
                            } else {
                                cb(new Error('请输入密码'))
                            }
                            //再次触发确认密码验证
                            this.form.checkPwd && this.$refs.form.validateField('checkPwd');
                        },
                        required: true,
                        message: '6-18位,不能出现!@#$%^&*()',
                        trigger: ['blur', 'change']
                    },
                    /*确认密码验证*/
                    checkPwd: {
                        validator: (rule, value, cb) => {
                            if (value) {
                                if (value === this.form.pwd) {
                                    cb()
                                } else {
                                    cb(new Error('两次密码不一致'))
                                }
                            } else {
                                cb(new Error("请再次输入密码"))
                            }
                        },
                        required: true,
                        trigger: ['blur', 'change']
                    },
                    /*验证码*/
                    svgCode: {
                        validator: (rule, value, cb) => {

                            if(!value){
                                cb(new Error('请输入验证码'));
                            }else{
                                getRegisterCheckVcode(value).then(res => {
                                    if(res.data.code === 0 ){
                                        cb()
                                    }else{
                                        cb(new Error('验证码错误'))
                                    }
                                }).catch(e => {
                                    cb(new Error('未知错误..'))
                                })
                            }
                        },
                        required: true,
                        trigger: 'blur',
                    }
                },
                //注册相关
                register: {
                    //验证码
                    svgText: 'loading...',
                }
            }
        },
        methods: {
            getVCode() {
                console.log(1);
                //组件创建之后发生验证码请求
                getRegisterVCode().then(res => {
                    //验证成功后改变svgCode
                    this.register.svgText = res.data.data
                }).catch(e => {
                    console.log('出错了', e);
                })
            },
            //注册验证
            submitForm(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        //验证都通过
                        alert('submit!');
                    }else {
                       //验证没通过
                        return false
                    }
                })
            }
        },
        mounted() {
            this.getVCode();
        }
    }
</script>

<style scoped lang="less">
    .el-form {
        user-select: none;
        padding-right: 30px;

        .vcode {
            .el-input {
                float: left;
                width: 35%;
            }

            div.svg {
                float: left;
                width: 35%;
                height: 40px;

                /deep/ svg {
                    width: 100% !important;
                    height: 100% !important;

                }
            }

            .refresh {
                overflow: hidden;
                float: left;
                width: 30%;
                cursor: pointer;
                font-size: 12px;
                line-height: 50px;
                color: blue;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }

</style>