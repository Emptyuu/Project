require(["js/ajax.js","js/cookie.js"], function (ajax,cookie) {
    class Search {
        constructor() {
            this.res = [];
            this.list = document.querySelector("#list");
            this.init();
        }
        init() {
            let that = this;
            ajax.init({
                url: "/api",
                data: {
                    empty: 1, //请求json
                    file: "json/search.json"
                }
            }).then(function (res) {
                that.res = JSON.parse(res);
                that.display();
            });
        }
        display() {
            let str = "";
            for (let i = 0; i < this.res.length; i++) {
                str += `
                <div class="goods" goodsid="${this.res[i].goodsid}">
                <a href="more.html">
                    <img
                        src="${this.res[i].img}" />
                </a>
                    <span class="logo">
                        <img
                            src="${this.res[i].logo}" />
                    </span>
                    <a href="more.html" class="tit">${this.res[i].tit}</a>
                    <p class="zt">
                        ￥
                        <span class="now">${this.res[i].now}</span>
                        <span class="before">${this.res[i].before}</span>
                    </p>
                </div>
                `
            }
            this.list.innerHTML = str;
            let goods = document.querySelectorAll(".goods");
            for (let i = 0; i < goods.length; i++) {
                goods[i].onclick = function (e) {
                    let goodsid = goods[i].getAttribute("goodsid")
                    console.log(goodsid);
                    if(goodsid != null){
                        cookie.setCookie("selectid",goodsid);
                    }
                }
            }
        }
    }
    new Search();
});