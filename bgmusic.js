const audioPath = './Resources/Melancholic Walk [dm4kGvOxmjE].mp3';
window.bgMusic = new Audio(audioPath); 
window.bgMusic.loop = true;
window.bgMusic.volume = 0.5;

const savedTime = localStorage.getItem('bgMusicTime');
if (savedTime) {
    window.bgMusic.currentTime = parseFloat(savedTime);
}

window.tryPlay = () => {
    const shouldPlay = localStorage.getItem('bgMusicPlaying') !== 'false';
    if (shouldPlay) {
        window.bgMusic.play().catch(err => {
            console.log("Waiting for audio...");
        });
    }
};

window.tryPlay();

window.addEventListener('click', () => {
    window.tryPlay();
}, { once: true, capture: true });

setInterval(() => {
    if (window.bgMusic && !window.bgMusic.paused) {
        localStorage.setItem('bgMusicTime', window.bgMusic.currentTime);
    }
}, 500);

window.addEventListener('beforeunload', () => {
    if (window.bgMusic && !window.bgMusic.paused) {
        localStorage.setItem('bgMusicTime', window.bgMusic.currentTime);
    }
});

