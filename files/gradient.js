document.addEventListener("DOMContentLoaded", function () {
  const hiddenBtn = document.getElementById("hidden-btn");
  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 192) { // keyCode 192 corresponds to the "`" key
      window.location.href='./new/code.html'
    }
  });
});
const textList = [
  "Insert Text Here",
  "Javascript Is Cool",
  "Go Touch Grass",
  "outdoorschool",
  "Crazygird=Gamign",
    "why did school block my thingie",
  "this is made using html mostly",
  "minecraft from yexex, made by luphoria",
  "stop clicking me",
];
const dadJokes = [
  "what did the mathmatician say to his insurance company when he got into a car accident?",
  "his car got totalled!",
  "hahaha.....",
];
let dadJokeIndex = -1;
let canChangeText = true;
function changeText() {
  if (!canChangeText) return;
  const clickableText = document.getElementById("clickable-text");
  // 1% chance to start displaying dad jokes
  if (Math.random() < 0.01 && dadJokeIndex === -1) {
    dadJokeIndex = 0;
    showDadJokes();
  } else {
    const randomIndex = Math.floor(Math.random() * textList.length);
    clickableText.textContent = textList[randomIndex];
  }
  // 5% chance to start playing audio
  if (Math.random() < 0.05) {
    const audioChoices = [
      "https://insert-text-here.github.io/files/doublekill.mp3",
      "https://insert-text-here.github.io/files/gettrolled.mp3",
          "https://insert-text-here.github.io/files/NUTS.mp3",
    "https://insert-text-here.github.io/files/rickroll.mp3",
    ];
    const audioIndex = Math.floor(Math.random() * audioChoices.length);
    const audio = new Audio(audioChoices[audioIndex]);
    audio.play();
  }
}
if (Math.random() < 0.00000000000000000000000000000001) {
  alert("Achievement Unlock! Serious Dedication.");
  alert("Didja expect anything?);
  alert("ya did?");
  alert("only thing you getting is some info you already know");
  alert("you can click ` to get the code to my game site");
  alert("but you already know that, right????");
  alert("if you are a new person lucky ahh mfer");
}
function showDadJokes() {
  if (dadJokeIndex < 0 || dadJokeIndex >= dadJokes.length) return;
  const clickableText = document.getElementById("clickable-text");
  clickableText.textContent = dadJokes[dadJokeIndex];
  dadJokeIndex++;
  if (dadJokeIndex < dadJokes.length) {
    canChangeText = false;
    setTimeout(() => {
      canChangeText = true;
      showDadJokes();
    }, 5000);
  } else {
    dadJokeIndex = -1;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const clickableText = document.getElementById("clickable-text");
  clickableText.addEventListener("click", changeText);
});
