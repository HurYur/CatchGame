var basketwidth,
    basketheight,
    sreenSizeX = window.innerWidth,
    sreenSizeY = window.innerHeight,
    objects=1,
    basket_top,
    basket_left_side,
    basket_right_side,
    difficulty;

/* start the game */
function do_game(diffi) {
    document.getElementById('start-window').style.display="none";
    difficulty=diffi;
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

/* Moving the basket */
function basketmove(event) {
    var mouseX = event.clientX,
        basket_center = basketwidth/2;
        basket_left_side = mouseX - basket_center;
        basket_right_side = mouseX + basket_center;
    if(basket_left_side >= 0 && basket_right_side <= sreenSizeX){
        document.getElementById("basket").style.left = basket_left_side+"px";
    }
}

/* Here add's objects */
function objectsCreator() {
    object = document.createElement('img');
    object.style.top = 0+"px";
    object.style.left = rand_position()+"px";
    object.setAttribute("class", "html");
    object.setAttribute("id", "ob"+objects);
    object.setAttribute("src", "imgs/HTML.png");

    document.getElementById('game-window').appendChild(object);
    setTimeout(objectsCreator, 1000*difficulty);
    objects ++;
}
/* Start position generation */
function rand_position() {
    return Math.floor(Math.random()*(sreenSizeX-50));
}

/* Changing falling objects position and removing catched  */
function objectsFalling() {
    var hmlObj= document.getElementsByClassName("html");
    var realquantity = quantity = hmlObj.length;
    for(var i=0; i <quantity; i++){
        if(quantity==realquantity) {// if deleted catched some block cycle finish
            var value = 0;
            value = hmlObj[i].style.top;
            hmlObj[i].style.top = parseFloat(value) + 2 + "px";
            /* deleting catched block*/
            if (parseFloat(hmlObj[i].style.top) >= basket_top &&
                parseFloat(hmlObj[i].style.left) > basket_left_side &&
                parseFloat(hmlObj[i].style.left) < basket_right_side) {
                hmlObj[i].parentElement.removeChild(hmlObj[i]);
                realquantity--;
            }
        }
    }
    setTimeout(objectsFalling, 15);
}