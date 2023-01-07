document.addEventListener('keypress', onKeyPress)

function onKeyPress(ev){
    console.log(ev);
    var keyCodes = ["q", "w", "e", "r", "t", "y", "u", "i", "o"] //w, a, s, d, c,  | y, g, j, k
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
        playSound(audioId)
}

function playSound(sound){
    console.log(sound)
    const audioTag = document.querySelector(`#${sound}`);
    audioTag.currentTime = 0
    soundActive(sound)
    audioTag.play()
}
function soundActive(sound){
    console.log(sound);
    const button = document.querySelector(`.${sound}-button`);
    console.log(button);
    button.classList.add("active");
    setTimeout(() => {
        button.classList.remove("active");
    }, 100);
}