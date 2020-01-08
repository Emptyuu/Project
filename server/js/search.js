require(["js/ajax.js"], function (ajax) {
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
                <div class="goods">
                    <img
                        src="${this.res[i].img}" />
                    <span class="logo">
                        <img
                            src="${this.res[i].logo}" />
                    </span>
                    <a class="tit">${this.res[i].tit}</a>
                    <p class="zt">
                        ￥
                        <span class="now">${this.res[i].now}</span>
                        <span class="before">${this.res[i].before}</span>
                    </p>
                </div>
                `
            }
            this.list.innerHTML = str;
        }
    }
    new Search();
});