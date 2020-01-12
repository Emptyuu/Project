require(["js/ajax.js", "js/cookie.js"], function (ajax, cookie) {
    class More {
        constructor() {
            this.goodsid = cookie.getCookie("selectid")
            this.bigimg = document.querySelector("#bigimg");
            this.display();
        }
        addEvent() {
            this.masking = document.querySelector("#masking");
            this.magnify = document.querySelector("#magnify");
            this.fdt = document.querySelector("#fdt");
            this.fd = document.querySelector("#fd");
            this.bimgg = document.querySelector("#bimgg");
            this.smimg = document.querySelectorAll(".smimg");
            let that = this;

            for(let i = 0; i<this.smimg.length;i++){
                this.smimg[i].onclick = function(){
                    that.bimgg.src = that.smimg[i].src
                }
            }   




            this.magnify.onmouseover = function (eve) {
                that.masking.style.display = "block";
                that.fd.style.display = "block";
                let e = eve
                document.onmousemove = function (eve) {
                    // console.log(eve.offsetX);   
                    that.masking.style.left = e.target.offsetLeft - that.masking.offsetWidth / 2 + eve.offsetX + "px";
                    that.masking.style.top = e.target.offsetTop - that.masking.offsetHeight / 2 + eve.offsetY + "px";
                    // if(){

                    if (that.masking.offsetLeft < 0) {
                        that.masking.style.left = "0px";
                    } else if (that.masking.offsetLeft > 350) {
                        that.masking.style.left = "350px";
                    }
                    if (that.masking.offsetTop < 0) {
                        that.masking.style.top = "0px";
                    } else if (that.masking.offsetTop > 350) {
                        that.masking.style.top = "350px";
                    }
                    // }
                    that.fdt.style.left = (that.masking.offsetLeft * -4.5) + "px"
                    that.fdt.style.top = (that.masking.offsetTop * -4.5) + "px"

                }
            }
            that.magnify.onmouseout = function () {
                that.masking.style.display = "none";
                that.fd.style.display = "none";
                document.onmousemove = null;
            }
        }
        display() {
            let that = this;
            ajax.init({
                url: "/api",
                data: {
                    empty: "1",
                    file: "json/more.json"
                }
            }).then(function (res) {
                that.res = JSON.parse(res);
                // console.log(that.res)
                for (let i in that.res) {
                    if (that.res[i].goodsid == that.goodsid) {
                        that.bigimg.innerHTML = `
                        <div id="magnify">
                    <span id="masking"></span>
                    <img id="bimgg" src="${that.res[i].bimg1}" />
                </div>
                <ul>
                    <li><img class="smimg" src="${that.res[i].bimg1}" /></li>
                    <li><img class="smimg" src="${that.res[i].bimg2}" /></li>
                    <li><img class="smimg" src="${that.res[i].bimg3}" /></li>
                    <li><img class="smimg" src="${that.res[i].bimg4}" /></li>
                    <li><img class="smimg" src="${that.res[i].bimg5}" /></li>
                    <li><img class="smimg" src="${that.res[i].bimg6}" /></li>
                    <li><img class="smimg" src="${that.res[i].bimg7}" /></li>
                    <li><img class="smimg" src="${that.res[i].bimg8}" /></li>
                    <li><img class="smimg" src="${that.res[i].bimg9}" /></li>
                </ul>
                <div id="fd">
                    <img id="fdt" src="${that.res[i].bimg1}" />
                </div>`;
                        break;
                    }
                    
                }
                that.addEvent();
            });
        }
    }
    new More();
})