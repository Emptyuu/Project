require(["js/ajax.js"], function (ajax) {
    class Register {
        constructor() {
            this.phone = document.querySelector("#phonenum");
            this.passnum = document.querySelector("#passnum");
            this.btn = document.querySelector("#regbtn");
            this.verifyCode = document.querySelector("#VerifyCode");
            this.yzm = document.querySelector("#yzm");
            this.addEvent();
            this.getVerifyCode();
        }
        addEvent() {
            let that = this;
            this.verifyCode.onclick = function () {
                that.getVerifyCode();
            }
            this.btn.onclick = function () {
                that.postMsg();
            }
        }


        postMsg() {
            var that = this;
            if (!this.verify()) {
                return;
            }
            ajax.init({
                url: "/api",
                data: {
                    empty: "2", //注册
                    phone: that.phone.value,
                    pass: that.passnum.value
                }
            }).then(function (res) {
                switch (JSON.parse(res).registerStatus) {
                    case "1":
                        alert("用户已存在");
                        that.getVerifyCode();
                        break;
                    case "2":
                        alert("注册成功,确定后跳转");
                        location.href = "login.html";
                        break;
                    default:
                        alert("当前环境存在问题，请与管理员联系");
                        that.getVerifyCode();
                        break;
                }
            });
        }
        getVerifyCode() {
            var that = this;
            ajax.init({
                url: "/api",
                data: {
                    empty: "200", //验证码
                }
            }).then(function (res) {
                // console.log(JSON.parse(res))
                let code = JSON.parse(res).code;
                that.verifyCode.innerHTML = code;
                that.code = code;
            });
        }
        verify() {
            if (!(/^1[3456789]\d{9}$/.test(this.phone.value))) {
                alert("手机号码有误，请重填");
                this.getVerifyCode();
                return false;
            }
            if (this.passnum.value.length < 8 || this.passnum.value.length > 16) {
                alert("密码最长16位，最少8位")
                this.getVerifyCode();
                return false;
            }
            if (this.code != this.yzm.value) {
                alert("验证码有误！")
                this.getVerifyCode();
                return false;
            }
            return true;
        }
    }
    new Register();
})