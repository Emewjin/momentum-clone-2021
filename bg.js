const main = document.querySelector("main");

const IMG_NUMBER = 9;

function paintImage(number){
    const image = new Image();
    image.src = `images/${number+1}.jpg`;
    image.classList.add("bgImage");
    main.appendChild(image);
}

function genRandom(){
    const number = Math.floor(Math.random()*IMG_NUMBER);
    return number;    
}


function init() {
    const randomNumber = genRandom();
    paintImage (randomNumber);
}

init();