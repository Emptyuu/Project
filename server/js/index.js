require(["js/ajax.js", "js/swiper.js"], function (ajax, swiper) {
    class Indexload {
        constructor() {
            this.list2 = document.querySelector("#list2");
            this.list1 = document.querySelector("#list1");
            this.list3 = document.querySelector("#list3");
            this.sport = document.querySelector("#sport");
            this.colbox = document.querySelector("#colbox");
            this.banner = document.querySelector("#banner");
            this.bul = document.querySelector("#banner .ben ul")
            this.bol = document.querySelector(".progress-bar-ol")
            this.prev = document.querySelector(".prev");
            this.next = document.querySelector(".next");
            this.gotop = document.querySelector("#gotop");
            this.gobottom = document.querySelector("#gobottom");
            this.timer;
            this.speed;
            this.addEvent();
            this.index = 0;
            this.res = "";
            this.getList1();
            this.createBanner();
            0
        }
        createBanner() {
            let url = ["http://i.okaybuy.cn/static/8387f61b4bb47d1053f5e38c1ba9712e.jpg", "http://i.okaybuy.cn/static/02023b269d73dc0233bcaa83ef30c3dd.jpg", "http://i.okaybuy.cn/static/8ca3b5fc20821d41789eb389839fcd57.jpg"];
            let str = "";
            let dot = "";
            for (let i = 0; i < url.length; i++) { //var i in that.res
                str += ` 
                        <li style="background: red;"  index=${i}><a href="#"><img src="${url[i]}" alt=""></a></li>`
                dot += `<li class ="odot"><a class="circle" index=${i}>${i}</a></li>`;
            }
            this.bul.innerHTML = str;
            this.bol.innerHTML = dot;
            this.bol.children[0].children[0].className = "active circle";
            let swpierobj = swiper;
            swpierobj.init({
                dom: this.banner,
                bul: this.bul,
                bol: this.bol,
                prevClassName: this.prev.className,
                nextClassName: this.next.className,
                index: this.index
            });
        }
        addEvent() {
            let that = this;
            this.sport.onmouseover = function () {
                that.colbox.style.display = "block";
            }
            this.sport.onmouseout = function () {
                that.colbox.style.display = "none";
            }
            this.banner.onmouseover = function () {
                that.prev.style.display = "block";
                that.next.style.display = "block";
            }
            this.banner.onmouseout = function () {
                that.prev.style.display = "none";
                that.next.style.display = "none";
            }

            this.gotop.onclick = function () {
                clearInterval(that.timer);
                that.timer = setInterval(() => {
                    if(document.documentElement.scrollTop == 0){
                        clearInterval(that.timer);
                    }
                    that.speed = document.documentElement.scrollTop / 20
                    if (that.speed < 5) {
                        that.speed = 5;
                    }
                    document.documentElement.scrollTop -= that.speed
                }, 20);
            }

            this.gobottom.onclick = function () {
                clearInterval(that.timer);
                that.timer = setInterval(() => {
                    that.speed = (document.body.offsetHeight - document.documentElement.clientHeight - document.documentElement.scrollTop) / 20
                    if (that.speed < 5) {
                        that.speed = 5;
                    }
                    document.documentElement.scrollTop += that.speed;
                    if (document.documentElement.scrollTop == document.body.offsetHeight - document.documentElement.clientHeight) {
                        clearInterval(that.timer);
                        console.log
                    }
                }, 20);
            }
        }

        getList1() {
            var that = this;
            ajax.init({
                url: "/api",
                data: {
                    empty: "1",
                    file: "json/index_list1.json"
                }
            }).then(function (res) {
                that.res = JSON.parse(res);
                that.list1_display();
            });
        }


        list1_display() {
            let str = "";
            for (let i in this.res) {
                // console.log(this.res[i].img);
                str += ` <a href="#">
                <img src="${this.res[i].img}" />
            </a>`
            }
            // console.log(str)
            this.list1.innerHTML = str;
            this.getList2();
        }

        getList2() {
            var that = this;
            ajax.init({
                url: "/api",
                data: {
                    empty: "1",
                    file: "json/index_list2.json"
                }

            }).then(function (res) {
                that.res = JSON.parse(res);
                that.list2_display();
            });
        }
        list2_display() {
            let str = "";
            for (let i in this.res) {
                // console.log(this.res[i].img);
                str += `<li>
                <a href="#">
                    <img src="${this.res[i].img}" />
                    <span class="tit1">${this.res[i].tit1}</span>
                    <span class="tit2">${this.res[i].tit2}</span>
                    <span class="tit3">${this.res[i].tit3}</span>
                    <span class="time">${this.res[i].time}</span>
                </a>
            </li>`
            }
            // console.log(str)
            this.list2.innerHTML = str;
            this.getList3();
        }

        getList3() {
            var that = this;
            ajax.init({
                url: "/api",
                data: {
                    empty: "1",
                    file: "json/index_list3.json"
                }

            }).then(function (res) {
                that.res = JSON.parse(res);
                that.list3_display();
            });
        }
        list3_display() {
            let str = "";
            for (let i in this.res) {
                // console.log(this.res[i].img);
                str += `<li>
                <a href="#">
                    <img src="${this.res[i].img}" />
                    <p class="list3tit1">${this.res[i].tit1}<span>${this.res[i].tit2}</span></p>
                    <span class="time">${this.res[i].time}</span>
                </a>
            </li>`
            }
            this.list3.innerHTML = str;
        }
    }
    new Indexload();
})