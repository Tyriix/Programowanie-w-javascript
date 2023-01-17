document.addEventListener('keypress', onKeyPress)
const startMetronomeBtn = document.querySelector('.start-button');
const stopMetronomeBtn = document.querySelector('.stop-button');
const recordingBtn = document.querySelector('.btn-recording');

startMetronomeBtn.addEventListener("click", function(){
    startMetronome();
    startMetronomeBtn.disabled = true;
    stopMetronomeBtn.disabled = false;
});
stopMetronomeBtn.addEventListener("click", function() {
    play = false;
    startMetronomeBtn.disabled = false;
    stopMetronomeBtn.disabled = true;
});
recordingBtn.addEventListener("click", startEventHandle);
let play = true;


function onKeyPress(ev){
    var keyCodes = ["q", "w", "e", "r", "t", "y", "u", "i", "o"];
    let audioId = '';
    switch(keyCodes.find(el => el===ev.key)){
        case 'q':
        audioId = 'boom'
        break;
        case 'w':
        audioId = 'clap'
        break;
        case 'e':
        audioId = 'hihat'
        break;
        case 'r':
        audioId = 'kick'
        break;
        case 't':
        audioId = 'openhat'
        break;
        case 'y':
        audioId = 'ride'
        break;
        case 'u':
        audioId = 'snare'
        break;
        case 'i':
        audioId = 'tink'
        break;
        case 'o':
        audioId = 'tom'
        break;
        default:
            console.log(`No case found`)
            return;
    }
    if(isRecording === true && audioId != undefined){
        saveSound(audioId);
        playSound(audioId);
    }
    else
    {
        playSound(audioId);
    }
}

function playSound(sound){
    const audioTag = document.querySelector(`#${sound}`);
    audioTag.currentTime = 0
    soundActive(sound)
    audioTag.play()
}
function soundActive(sound){
    const button = document.querySelector(`.${sound}-button`);
    button.classList.add("active");
    setTimeout(() => {
        button.classList.remove("active");
    }, 100);
}

function startMetronome(){
    play = true;
    const snd = document.querySelector('#tink');

    function getTempo(){
        const tempo = document.querySelector('#tempo');
        return 1000/(tempo.value/60)
    }

    let interval = getTempo();
    let started = Date.now();

    function step(){
        if (play) {
            snd.play();
            var now = Date.now();
            var diff = now - started - interval;
            interval = getTempo();
            started = now;
            setTimeout(step, interval - diff);
            }
        }
    setTimeout(step, interval);
}

let isRecording = false;
const channels = [];
const channel = {
    startTime: 0,
    endTime: 0,
    notes: []
}

function saveSound(sound){
    channel.notes.push([sound, Date.now()]);
}
function startEventHandle(){
    recordingState();
    startRecording();
}

function startRecording(){
    channel.notes = [];
    channel.startTime = Date.now();
}
function stopRecordingChannel(){
    channel.endTime = Date.now();
    if (channel.notes.length>0) {
        const channelWTS = []

        for (let i = 0; i < channel.notes.length; i++) {
            channelWTS.push([channel.notes[i][0], channel.notes[i][1]- channel.startTime])
        }

        channels.push(channelWTS)
    }
}

function recordingState(){
    if(isRecording == false){
        isRecording = true;
        recordingBtn.setAttribute("class", "btn-recording-active");
        console.log("Recording")
    } else {
        isRecording = false;
        recordingBtn.setAttribute("class", "btn-recording");
        console.log("Not recording")
        stopRecordingChannel();
    }
}


function playChannel(id){
    const channel = channels[id];
    channel.forEach(el => {
       setTimeout(function(){playSound(el[0])}, el[1])
    });
}