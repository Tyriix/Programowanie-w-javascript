document.addEventListener("keypress", onKeyPress);
const startMetronomeBtn = document.querySelector(".start-button");
const stopMetronomeBtn = document.querySelector(".stop-button");
const recordingBtn = document.querySelector(".btn-recording");
const recordingList = document.querySelector(".channel-recordings");
const playSelectedBtn = document.querySelector(".btn-play-selected");

startMetronomeBtn.addEventListener("click", function () {
  startMetronome();
  startMetronomeBtn.disabled = true;
  stopMetronomeBtn.disabled = false;
});
stopMetronomeBtn.addEventListener("click", function () {
  btnState = false;
  startMetronomeBtn.disabled = false;
  stopMetronomeBtn.disabled = true;
});
recordingBtn.addEventListener("click", startEventHandle);
playSelectedBtn.addEventListener("click", playSelectedChannels);

let btnState = true;
let isRecording = false;
const channels = [];
const channel = {
  id: null,
  startTime: 0,
  endTime: 0,
  notes: [],
};

function onKeyPress(ev) {
  var keyCodes = ["q", "w", "e", "r", "t", "y", "u", "i", "o"];
  let audioId = "";
  switch (keyCodes.find((el) => el === ev.key)) {
    case "q":
      audioId = "boom";
      break;
    case "w":
      audioId = "clap";
      break;
    case "e":
      audioId = "hihat";
      break;
    case "r":
      audioId = "kick";
      break;
    case "t":
      audioId = "openhat";
      break;
    case "y":
      audioId = "ride";
      break;
    case "u":
      audioId = "snare";
      break;
    case "i":
      audioId = "tink";
      break;
    case "o":
      audioId = "tom";
      break;
    default:
      console.log(`No case found`);
      return;
  }
  if (isRecording === true && audioId != undefined) {
    saveSound(audioId);
    playSound(audioId);
  } else {
    playSound(audioId);
  }
}

function playSound(sound) {
  const audioTag = document.querySelector(`#${sound}`);
  audioTag.currentTime = 0;
  soundActive(sound);
  audioTag.play();
}
function soundActive(sound) {
  const button = document.querySelector(`.${sound}-button`);
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 100);
}

//METRONOME
function startMetronome() {
  btnState = true;
  const snd = document.querySelector("#tink");

  function getTempo() {
    const tempo = document.querySelector("#tempo");
    return 1000 / (tempo.value / 60);
  }

  let interval = getTempo();
  let started = Date.now();

  function step() {
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

//RECORDING CHANNELS
function saveSound(sound) {
  channel.notes.push([sound, Date.now()]);
}

function recordingState() {
  if (isRecording == false) {
    isRecording = true;
    recordingBtn.setAttribute("class", "btn-recording-active");
  } else {
    isRecording = false;
    recordingBtn.setAttribute("class", "btn-recording");
    stopRecordingChannel();
  }
}

function startRecording() {
  channel.notes = [];
  channel.startTime = Date.now();
}

function startEventHandle() {
  recordingState();
  startRecording();
}
function stopRecordingChannel() {
  channel.endTime = Date.now();
  if (channel.notes.length > 0) {
    const channelWTS = [];
    channelWTS.id = channels.length;
    for (let i = 0; i < channel.notes.length; i++) {
      channelWTS.push([
        channel.notes[i][0],
        channel.notes[i][1] - channel.startTime,
      ]);
    }

    channels.push(channelWTS);
    showChannel(channelWTS);
  }
}

//SHOWING CHANNELS
function showChannel(channel) {
  const model = document.querySelector(".recording");
  const newRecording = model.cloneNode(true);
  newRecording.querySelector("#channel-title").innerText = `Channel ${
    channel.id + 1
  }`;
  newRecording.querySelector("#channel-checkbox").setAttribute("id", `#channel-checkbox${channel.id}`)
  newRecording
    .querySelector("#btn-play")
    .addEventListener("click", function () {
      playChannel(channel.id);
    });
  recordingList.appendChild(newRecording);
}

//PLAYING CHANNELS
function playChannel(id) {
  const channel = channels[id];
  channel.forEach((el) => {
    setTimeout(function () {
      playSound(el[0]);
    }, el[1]);
  });
}

function playSelectedChannels() {
  const checkboxes = document.querySelectorAll(".checkbox");
  let checkboxNodes = [].slice.call(checkboxes, 1);

  checkboxNodes.forEach(ch => {
    if(ch.checked){
        console.log(ch.id);
    }
  })
//   checkboxes.forEach(element => {
//     if (element.checked) {
//         playChannel(element.id.slice(-1))
//     }
//     });
}
