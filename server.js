const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");

http.createServer((req, res) => {
    if (req.url != "/favicon.ico") {
        var urlObj = url.parse(req.url);
        if (urlObj.pathname === "/api") {
            ajaxHandle(req, res);
        } else {
            fsHandle(req, res);
        }
    }
}).listen("82", "localhost", function () {
    console.log("server is running on http://localhost:82/index.html")
});

function fsHandle(req, res) {
    let path = "server" + req.url;
    if (path == "server/") {
        path = "server/index.html"
    }
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