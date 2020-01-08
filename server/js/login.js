require(["js/ajax.js"], function (ajax) {
    class Login {
        constructor() {
            this.inpuser = document.querySelector("#user");
            this.inppass = document.querySelector("#pass");
            this.btn = document.querySelector(".btnlogin");
            this.addEvent();
        }
        addEvent() {
            let that = this;
            this.btn.onclick = function () {
                that.loginPost();
            }
        }

        loginPost() {
            let that = this;
            ajax.init({
                url: "/api",
                data: {
                    empty: 3, //登录
                    phone: that.inpuser.value,
                    pass: that.inppass.value
                }
            }).then(function (res) {
                switch (JSON.parse(res).loginStatus) {
                    case 0:
                        alert("用户不存在")
                        break;
                    case 1:
                        alert("密码不正确");
                        break;
                    case 2:
                        alert("登录成功，跳转到首页");
                        location.href = "index.html"
                        break;
                    default:
                    alert("您当前环境存在异常，请与网站管理员Empty联系");
                }
            });
        }
    }
    new Login();
});