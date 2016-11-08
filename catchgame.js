var basketwidth,
    basketheight,
    sreenSizeX = window.innerWidth,
    sreenSizeY = window.innerHeight,
    objects=1,
    basket_top,
    basket_left_side,
    basket_right_side;

function do_game() {
    objectsCreator();
    objectsFalling();
}

function basket(){
    basketwidth = 100;
    basketheight = 50;
    var basket = document.getElementById("basket");
    basket.style.width = basketwidth + "px";
    basket.style.height = basketheight + "px";
    basket_top = sreenSizeY*0.9 - basketheight;
    document.getElementById("game-window").style.height=sreenSizeY*0.9 + "px";
    basket.style.top= basket_top+"px";
}

function basketmove(event) {
    var mouseX = event.clientX,
        basket_center = basketwidth/2;
        basket_left_side = mouseX - basket_center;
        basket_right_side = mouseX + basket_center;
    if(basket_left_side >= 0 && basket_right_side <= sreenSizeX){
        document.getElementById("basket").style.left = basket_left_side+"px";
    }
}

function objectsCreator() {
    object = document.createElement('img');
    object.style.top = 0+"px";
    object.style.left = rand_position()+"px";
    object.setAttribute("class", "html");
    object.setAttribute("src", "imgs/HTML.png");

    document.getElementById('game-window').appendChild(object);
    setTimeout(objectsCreator, 2000);
    objects ++;
}
function rand_position() {
    return Math.floor(Math.random()*sreenSizeX);
}

function objectsFalling() {
    var hmlObj= document.getElementsByClassName("html");
    var quantity = hmlObj.length,
        correct=0;
    for(var i=0; i <quantity; i++){
        var value = 0;
        value = hmlObj[i-correct].style.top;
        hmlObj[i-correct].style.top = parseFloat(value)+2+"px";
        if (parseFloat(hmlObj[i-correct].style.top) >= basket_top &&
            parseFloat(hmlObj[i-correct].style.left) > basket_left_side &&
            parseFloat(hmlObj[i-correct].style.left) < basket_right_side){
            hmlObj[i-correct].parentElement.removeChild(hmlObj[i-correct]);
            correct=1;
        }
        else {correct=0}
    }
    setTimeout(objectsFalling, 10);
}