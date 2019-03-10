var map = document.getElementById('map');
var block = document.getElementsByClassName('block');
var score = document.getElementById('score');
var mine = document.getElementById('mine');
var mineNum;
var mineOver;
var mineMap = [];
var redFlag;
var gameOverBool;

init();

map.oncontextmenu = function () {
    return false;
}

map.onmousedown = function (e) {
    var event = e.target;
    if (e.which == 1) {
        leftClick(event);
    } else if (e.which == 3) {
        rightClick(event);
    }
}

function init() {
    gameOverBool = false;
    map.innerHTML = '';
    mineNum = 10;
    mineOver = 10;
    redFlag = 10;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var con = document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id', i + '-' + j);
            map.appendChild(con);
            mineMap.push({ mine: 0 });
        }
    }
    while (mineNum) {
        var mineIndex = Math.floor(Math.random() * 100);
        if (mineMap[mineIndex].mine == 0) {
            block[mineIndex].classList.add("isMine");
            mineMap[mineIndex].mine = 1;
            mineNum--;
        }
    }
}
//鼠标左键事件
function leftClick(dom) {
    if (gameOverBool){
        return ;
    }
    var isMine = document.getElementsByClassName("isMine");
    if (dom.classList.contains("isMine")) {
        for (var i = 0; i < isMine.length; i++) {
            isMine[i].classList.add("show");
            isMine[i].innerHTML = "雷";
        }
        over();
        gameOverBool = true;
    } else {
        var n = 0;
        var posArr = dom && dom.getAttribute('id').split('-');
        var posX = posArr && +posArr[0];
        var posY = posArr && +posArr[1];

        var block1 = document.getElementById(posX + "-" + posY);

        if (block1.classList.contains('flag')) {
            return;
        }


        dom.classList.add("num");

        for (var i = posX - 1; i <= posX + 1; i++) {
            for (var j = posY - 1; j <= posY + 1; j++) {
                var aroundBox = document.getElementById(i + '-' + j);
                if (aroundBox && aroundBox.classList.contains('isMine')) {
                    n++;
                }
            }
        }

        dom.innerHTML = n;

        if (n == 0) {
            for (var i = posX - 1; i <= posX + 1; i++) {
                for (var j = posY - 1; j <= posY + 1; j++) {
                    var nearBox = document.getElementById(i + '-' + j);
                    if (nearBox && nearBox.length != 0) {
                        if (!nearBox.classList.contains('check')) {
                            nearBox.classList.add('check');
                            leftClick(nearBox);
                        }
                    }
                }
            }
        }
    }
}

function rightClick(dom) {
    if (dom.classList.contains('num') || redFlag <= 0) {
        return;
    }
    console.log("mineOver", mineOver);
    dom.classList.toggle('flag');

    if (dom.classList.contains("flag")) {
        redFlag--;
        if (dom.classList.contains("isMine"))
            mineOver--;
    }

    if (!dom.classList.contains("flag")) {
        redFlag++;
        if (dom.classList.contains("isMine"))
            mineOver++;
    }

    score.innerHTML = redFlag;


}

function over() {
    confirm("game over");
}

