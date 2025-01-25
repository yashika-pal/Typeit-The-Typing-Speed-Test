// JS FOR RANDOM TEXT GENERATOR
const randomText = document.querySelector('.randomText');
const generate = document.querySelector('.generate');

// const randomTexts = [
//     'Hello World',
//     'Hello JavaScript',
//     'Hello React',
//     'Hello Vue',
//     'Hello Angular',
//     'Hello Node.js',
//     'Hello Express',
//     'Hello MongoDB',
//     'Hello MySQL',
// ];

generate.addEventListener('click', async () => {
    //randomText.textContent = randomTexts[Math.floor(Math.random() * randomTexts.length)];
    try{
        const response = await fetch('http://localhost:3000/generate');
        const data = await response.text();
        randomText.textContent = data;
    } catch (error){
        console.error('Error fetching data:', error);
        randomText.textContent = 'Hello World';
    }
});

//JS FOR STOPWATCH
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
const display = document.getElementById('display');

let timer=null;
let startTime = 0;
let duration = 0;
let isRunning = false;

start.addEventListener('click', function start(){
    if(!isRunning){
        startTime = Date.now()-duration;
        timer = setInterval(updateTime,100);
        isRunning=true;
    }
});

let timeInMsec = 0;

function updateTime(){
    timeInMsec = Date.now()-startTime;
    duration = Date.now()-startTime;
    // let hrs = Math.floor( duration / (1000*60*60));
    let min = Math.floor( duration /(1000*60)%60);
    let sec = Math.floor(duration /1000 % 60);
    let msec = Math.floor(duration % 1000/10);
    display.textContent = `${min<10 ? '0'+min : min}:${sec<10 ? '0'+sec : sec}:${msec<10 ? '0'+msec : msec}`;

}


stop.addEventListener('click', function stop(){
    if(isRunning){
        clearInterval(timer);
        isRunning=false;
    }
});

reset.addEventListener('click', function reset(){
    clearInterval(timer);
    isRunning=false;
    duration=0;
    display.textContent = '00:00:00';
    result.innerHTML='';
});

//JS FOR TYPING TEST
const userInput = document.querySelector('.userInput');
const submit = document.querySelector('.submit');
const result = document.getElementById('result');

submit.addEventListener('click',() =>{
    let inputText = randomText.textContent;
    let userText = userInput.value;
    inputText = inputText.trim().split(' ');
    userText = userText.trim().split(' ');
    result.innerHTML='';
    let wrong = 0;
    let inputvar=0;
    let uservar=0;
    while(inputvar<inputText.length && uservar<userText.length){
        let inputWord = inputText[inputvar];
        let userWord = userText[uservar];
        let i=0;
        let j=0;
        //let maxWordLength = Math.max(inputWord.length,userWord.length);
        while(i<inputWord.length || j<userWord.length){
            let charSpan = document.createElement('span');
            if(inputWord.length===userWord.length){
                if(inputWord[i]===userWord[j]){
                    charSpan.textContent= userWord[j];
                    charSpan.style.color = 'green';
                    charSpan.style.fontSize = '1.8rem';
                }
                else{
                    charSpan.textContent = userWord[j];
                    charSpan.style.color = 'red';
                    charSpan.style.fontSize = '1.8rem';
                    wrong++;
                }
                i++;
                j++;
            }
            else if(inputWord.length>userWord.length){
                if(inputWord[i]===userWord[j]){
                    charSpan.textContent = userWord[j];
                    charSpan.style.color = 'green';
                    charSpan.style.fontSize = '1.8rem';
                    i++;
                    j++;
                }
                else{
                    charSpan.textContent = inputWord[i] || '';
                    charSpan.style.color = 'red';
                    charSpan.style.fontSize = '1.8rem';
                    wrong++;
                    i++;
                }
            }
            else if(inputWord.length<userWord.length){
                if(inputWord[i]===userWord[j]){
                    charSpan.textContent = userWord[j];
                    charSpan.style.color = 'green';
                    charSpan.style.fontSize = '1.8rem';
                    i++;
                    j++;
                }
                else{
                    charSpan.textContent = userWord[j] || '';
                    charSpan.style.color = 'red';
                    charSpan.style.fontSize = '1.8rem';
                    wrong++;
                    j++;
                }
            }
            result.appendChild(charSpan);
        }
        result.appendChild(document.createTextNode(' '));
        inputvar++;
        uservar++;
    }
    let totalChars = inputText.length;
    let Accuracy = ((totalChars-wrong) / totalChars) * 100;
    let percentageDisplay = document.createElement('div');
    let wpmbox = document.createElement('wpmbox');

    let timeInMin = timeInMsec/(1000*60);
    const words = userText.length / 5;
    const wpm = Math.round(words / timeInMin);

    percentageDisplay.textContent = `Accuracy: ${Accuracy.toFixed(2)}%`;
    percentageDisplay.style.fontSize = '1.5rem';
    percentageDisplay.style.color = '#643296';
    result.appendChild(percentageDisplay);
    wpmbox.textContent = `WPM: ${wpm}`;
    wpmbox.style.fontSize = '1.5rem';
    wpmbox.style.color = '#643296';
    result.appendChild(wpmbox);
});

const restart = document.querySelector('.restart');

restart.addEventListener('click', () =>{
    userInput.value = '';
    userInput.style.color = 'black';
});

//JS for redirecting to pages
// const leaderboard = document.getElementById('leaderboard');

// leaderboard.addEventListener('click', () => {
//   window.location = 'scores.html';
// });

const back = document.getElementById('back');
back.addEventListener('click', () => {
  window.location = 'index.html';
});