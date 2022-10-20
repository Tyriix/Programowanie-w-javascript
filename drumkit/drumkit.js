document.addEventListener('keypress', onKeyPress)

function onKeyPress(ev){
    console.log(ev);
    var keyCodes = ["w", "a", "s", "d", "c", "y", "g", "j", "k"] //w, a, s, d, c,  | y, g, j, k
    const audioId = ''
    if (!keyCodes.some(el => el===ev.keyCode)) {
        return
    }
    switch(ev.keyCode){
        // case(keyCodes.some(el => el===ev.keyCode) === 87):
        case 'w':
        audioId = 'boom'
        break;
        case 'a':
        audioId = 'clap'
        break;
        case 's':
        audioId = 'hihat'
        break;
        case 'd':
        audioId = 'kick'
        break;
        case 'c':
        audioId = 'openhat'
        break;
        case 'y':
        audioId = 'ride'
        break;
        case 'g':
        audioId = 'snare'
        break;
        case 'j':
        audioId = 'tink'
        break;
        case 'k':
        audioId = 'tom'
        break;
        default:
            console.log(`No case found`)
    }
        playSound(audioId)
}

function playSound(sound){
    console.log(sound)
    const audioTag = document.querySelector(`#${sound}`)
    audioTag.currentTime = 0
    audioTag.play()
}