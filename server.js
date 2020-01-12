const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
let kehu = [];

http.createServer((req, res) => {
    if (req.url != "/favicon.ico") {
        var urlObj = url.parse(req.url);
        if (urlObj.pathname === "/api") {
            ajaxHandle(req, res);
        } else {
            fsHandle(req, res);
        }
    }
}).listen("8888", "127.0.0.2", function () {
    console.log("server is running on http://127.0.0.2:8888/index.html")
});

function fsHandle(req, res) {
    let path = "server" + url.parse(req.url).pathname;
    if (path == "server/") {
        path = "server/index.html"
    }
    console.log(path)
    fs.readFile(path, function (err, data) {
        if (err) {
            res.write("404");
        } else {
            res.write(data);
        }
        res.end();
    })
}

function ajaxHandle(req, res) {
    let str = "";
    req.on("data", (d) => {
        str += d;
    })
    req.on("end", () => {
        let data = querystring.parse(str);
        if (!str) {
            {
                data = url.parse(req.url, true).query;
            }
        }
        switch (data.empty) {
            case "1":
                getFile("server/" + data.file, res);
                break;
            case "2":
                verify(data.phone, data.pass, res);
                break;
            case "3":
                login(data.phone, data.pass, res);
                break;
            case "200":
                postVerifyCode(res);
                break;
        }
    })
}

function getFile(path, res) {
    console.log(path)
    fs.readFile(path, function (err, data) {
        if (err) {
            res.write("404");
        } else {
            res.write(data);
        }
        res.end();
    })
}

function verify(phone, pass, res) {
    let a = 0; //默认没有此用户
    for (let i = 0; i < kehu.length; i++) {
        if (kehu[i].phone == phone) { //有用户终止循环且返回
            a = 1; //用户存在
            res.write(JSON.stringify({
                registerStatus: "1"
            }));
            break;
        }
    }
    if (!a) {
        kehu.push({
            phone: phone,
            pass: pass
        });
        res.write(JSON.stringify({
            registerStatus: "2" //注册成功
        }));
        console.log(kehu);
    }
    res.end();
}

function postVerifyCode(res) {
    let random = parseInt(Math.random() * (9999 - 1000) + 1000);
    res.write(JSON.stringify({
        code: random
    }))
    res.end();
}

function login(phone, pass, res) {
    let status = 0; //默认没有此用户
    console.log(kehu.length)
    for (let i = 0; i < kehu.length; i++) {
        if (kehu[i].phone == phone) { //有用户
            status = 1; //找到用户
            if (kehu[i].pass == pass) {
                
                status = 2; //密码正确
            }
            break;
        }
    }
    res.write(JSON.stringify({
        loginStatus: status
    }));

    res.end();
}