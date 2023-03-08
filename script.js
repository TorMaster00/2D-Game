
var ninja = document.getElementById("ninja");

// Idel ANimation //

var idleImgNumber = 1; 
var idelAniNum = 0;

function idelAnimation(){
    idleImgNumber = idleImgNumber + 1;
    if (idleImgNumber == 10) {
        idleImgNumber = 1;
    }

    ninja.src = "resources/idle (" + idleImgNumber + ").png";
}

function idelAnimationStart(){
    idelAniNum = setInterval(idelAnimation, 100)
}

// Run Animation //

var runImgNumber = 1;
var runAniNumber = 0;

function runAnimation() {
    runImgNumber = ++runImgNumber;
        if (runImgNumber == 11) {
        runImgNumber = 1;
        }
    ninja.src = "resources/Run ("+runImgNumber+").png";
}

function runAnimationStart() {
    runAniNumber = setInterval(runAnimation, 100);
    clearInterval(idelAniNum);
}

// Jump Animation //

var jumpImgNumber = 1;
var jumpAniNumber = 0;
var ninjaMarginTop = 347;

function JumpAnimation() {
    jumpImgNumber = jumpImgNumber + 1;
        if (jumpImgNumber <= 6) {
        ninjaMarginTop = ninjaMarginTop - 45;
        ninja.style.marginTop = ninjaMarginTop + "px";
    }   if (jumpImgNumber >= 7) {
        ninjaMarginTop = ninjaMarginTop + 45;
        ninja.style.marginTop = ninjaMarginTop + "px";
    }
            if (jumpImgNumber == 11) {
                jumpImgNumber = 1;
                clearInterval(jumpAniNumber);
                jumpAniNumber = 0;
                runImgNumber = 0;
                runAnimationStart();
            }

    ninja.src = "resources/Glide ("+ jumpImgNumber +").png";
}

function jumpAnimationStart() {
    clearInterval(idelAniNum);
    runImgNumber = 0;
    clearInterval(runAniNumber);
    jumpAniNumber = setInterval(JumpAnimation, 100);
}

    // Key Asign //

function keycheck(event) {
    var keycode= event.which;
        if (keycode == 13) {
            if (runAniNumber == 0) {
                runAnimationStart();
        }
        if (moveAnimationBackgroundId == 0) {
            moveAnimationBackgroundId =  setInterval(moveBackground, 100);
        }   if (enimyAnimationId == 0) {
                enimyAnimationId = setInterval(enimyAnimation, 100);
            }
        }

    if (keycode == 32) {
        if (jumpAniNumber == 0) {
            jumpAnimationStart();
        }
        if (moveAnimationBackgroundId == 0) {
            moveAnimationBackgroundId =  setInterval(moveBackground, 100);
        }   if (enimyAnimationId == 0) {
                enimyAnimationId = setInterval(enimyAnimation, 100);
            }
    }
}

// Background Move Animation //

var backgroundPositionX = 0;
var moveAnimationBackgroundId = 0;
var score = 0;
function moveBackground(){
    
    backgroundPositionX = backgroundPositionX - 20;
    document.getElementById("background").style.backgroundPositionX = backgroundPositionX + "px";

    score = score + 1;
    document.getElementById("score").innerHTML = score + "m";

}


// Enemies // 

var enimyMArgin = 1540;
function creatBoxes() {
    
    for(var i = 0; i <= 10; i++){

     var enimy = document.createElement("div");
        enimy.className = "enimy";
        document.getElementById("background").appendChild(enimy);
        enimy.style.marginLeft =enimyMArgin + "px";
        enimy.id = "enimy" + i;
            if (i < 5) {
                enimyMArgin = enimyMArgin + 1000;
            }   if (i >= 5) {
                    enimyMArgin = enimyMArgin + 500;
                }
    }  
}
var enimyAnimationId = 0;
function enimyAnimation() {
    for(var i = 0; i< 10; i++){
        var enimy1 = document.getElementById("enimy" + i);
        var currentMArginLeft = getComputedStyle(enimy1).marginLeft;
        var newMarginLeft = parseInt(currentMArginLeft) - 20;
        enimy1.style.marginLeft = newMarginLeft + "px";

        if (newMarginLeft >= 100 & newMarginLeft <= 180) {

            if (ninjaMarginTop > 300) {
                clearInterval(enimyAnimationId);
                clearInterval(runAniNumber);
                runAniNumber = -1;
                clearInterval(jumpAniNumber);
                jumpAniNumber = -1;
                clearInterval(moveAnimationBackgroundId);
                moveAnimationBackgroundId = -1;
                deadAniNumber = setInterval(deathAnimation, 100);
            }
        }
    }
}

// Death Animation //

var deadImgNum = 1;
var deadAniNumber = 0;
function deathAnimation() {
    deadImgNum = deadImgNum + 1;
        if (deadImgNum == 11) {
            deadImgNum = 10;
            document.getElementById("end").style.visibility = "visible";
            document.getElementById("endscore").innerHTML = score + "m";
        }
    ninja.src = "resources/Dead ("+deadImgNum+").png";
}

// Reloard Page //

function again(){
    window.location.reload();
    document.getElementById("background").style.backgroundImage = "url ('resources/background.jpg')"
}

// Sounds // 

// var runsound = Audio.apply("resources/run.mp3");
// runsound.loop = true;
// var jumpsound = Audio("resources/jump.wav");