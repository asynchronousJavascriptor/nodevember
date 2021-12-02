const btn = document.querySelector("button#play");
const prg = document.querySelector("#prg");
const audio = document.querySelector("audio");
const pause = document.querySelector("#pause");

const tl = new gsap.timeline({paused: true, onReverseComplete: function(){
    btn.style.pointerEvents = "initial";
    btn.textContent = "Play Now";    
}});

tl
.to(".lnk", {
    y: -20,
    stagger: .1,
    opacity: 0,
    duration: 1,
    ease: Expo.easeInOut
})
.to(".shift", {
    y: -80,
    duration: 1.4,
    ease: Expo.easeInOut,
    onComplete: function(){
        btn.style.pointerEvents = "none"
    }
}, '-=.7')
.to("#player", {
    bottom: 0,
    duration: 1.4,
    ease: Expo.easeInOut
}, '-=.7')
.to("#pause", {
    y: -20,
    opacity: 1,
    duration: 2,
    ease: Expo.easeInOut,
    onComplete: function(){
        pause.style.pointerEvents = "initial";
    }
}, '-=.7')

btn.addEventListener("click", function(){
    tl.play();
    btn.textContent = "PLaying";
    audio.play();
});

pause.addEventListener("click", function(){
    audio.pause();
    audio.currentTime = 0;
    tl.reverse();
});

audio.addEventListener("timeupdate", function(){
    var currentTime = audio.currentTime;
    var duration = audio.duration;
    var percent = (currentTime + .25) / duration * 100 + '%';
    prg.style.width = percent;
})