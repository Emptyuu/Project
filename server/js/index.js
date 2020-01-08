require(["js/ajax.js"], function (ajax) {
    class Indexload {
        constructor() {
            this.list2 = document.querySelector("#list2");
            this.list1 = document.querySelector("#list1");
            this.list3 = document.querySelector("#list3");
            this.sport = document.querySelector("#sport");
            this.colbox = document.querySelector("#colbox");
            this.addEvent();
            this.res = "";
            this.getList1();
        }
        addEvent(){
            let that = this;
            this.sport.onmouseover = function(){
                that.colbox.style.display = "block";
            }
            this.sport.onmouseout = function(){
                that.colbox.style.display = "none";
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