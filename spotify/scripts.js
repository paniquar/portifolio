document.addEventListener('DOMContentLoaded', () => {
    const artistsData = [
        { name: 'Henrique & Juliano', image: './img/artista-henrique-juliano.jpg' },
        { name: 'Jorge & Mateus', image: './img/artista-jorge-mateus.jpg' },
        { name: 'Zé Neto & Cristiano', image: './img/artista-ze-neto.jpg' },
        { name: 'Gustavo Lima', image: './img/artista-gustavo-limma.jpg' },
        { name: 'Luan Santana', image: './img/artista-luan-santana.jpg' },
        { name: 'Matheus & Kauan', image: './img/artista-mateus-kauan.jpg' },
        { name: 'The Weeknd', image: './img/artista-the-weeknd.jpg' },
        { name: 'Taylor Swift', image: './img/artista-taylor.jpg' },
    ];
    
    const albumsData = [
        { name: 'White Noise (Sleep & relaxation Sounds)', artist: 'Sleep John', image: './img/album-white-noise.jpg' },
        { name: 'Nada como um dia após o outro', artist: 'Racionais', image: './img/album-vida-loka.jpg' },
        { name: 'HIT ME HARD AND SOFT', artist: 'Billie Eilish', image: './img/album-hit-me.jpg' },
        { name: 'Escândalo Íntimo', artist: 'Luísa Sonza', image: './img/album-escandalo.jpg' },
        { name: 'O Céu Explica Tudo (Ao Vivo)', artist: 'Henrique & Juliano', image: './img/album-ceu-explica.jpg' },
        { name: 'Caju', artist: 'Liniker', image: './img/album-caju.jpg' },
        { name: 'Djavan - AO VIVO- ', artist: 'Djavan', image: './img/album-djavan.jpg' },
        { name: 'Tribalistas', artist: 'Tribalistas', image: './img/album-tribalistas.jpg' },
    ];

    const artistGrid = document.querySelector('.artists-grid');
    const albumsGrid = document.querySelector('.albuns-grid');

    artistsData.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        artistCard.innerHTML = `
            <img src="${artist.image}" alt="Imagem de ${artist.name}">
            <div>
             <h3>${artist.name}</h3>
             <p>Artista</p>
            </div>
        `;
    
    artistCard.addEventListener('click', () => {
        window.location.href = artist.link; // Redireciona para a página do artista
    });

    artistGrid.appendChild(artistCard);
});


    albumsData.forEach(album => {
        const albumCard = document.createElement('div');
        albumCard.classList.add('album-card');

        albumCard.innerHTML = `
            <img src="${album.image}" alt="${album.name}">
            <div>
             <h3><strong>${album.name}</strong></h3>
             <p>${album.artist}</p>
            </div> 
        `;

        
        albumCard.addEventListener('click', () => {
            window.location.href = album.link; // Redireciona para a página do álbum
        });

        albumsGrid.appendChild(albumCard);
    });
});

const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('progress-bar');
const playerSong = document.getElementById('player-song');
const playerArtist = document.getElementById('player-artist');
const playerImg = document.getElementById('player-img');

const songs = [
    { name: "White Noise", artist: "Sleep John", src: "./songs/white-noise.mp3", img: "./img/album-white-noise.jpg" },
    { name: "HIT ME HARD AND SOFT", artist: "Billie Eilish", src: "./songs/hit-me.mp3", img: "./img/album-hit-me.jpg" }
];

let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio(songs[currentSongIndex].src);

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Atualiza a barra de progresso
audio.addEventListener('timeupdate', () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
});

// Troca a música ao clicar no "Próximo"
document.getElementById('next-btn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    changeSong();
});

// Troca a música ao clicar no "Anterior"
document.getElementById('prev-btn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    changeSong();
});

function changeSong() {
    audio.src = songs[currentSongIndex].src;
    playerSong.textContent = songs[currentSongIndex].name;
    playerArtist.textContent = songs[currentSongIndex].artist;
    playerImg.src = songs[currentSongIndex].img;
    audio.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isPlaying = true;
}


audio.addEventListener('playing', () => {
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    isPlaying = true;
});

audio.addEventListener('pause', () => {
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    isPlaying = false;
});

const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

document.addEventListener('keydown', (event) => {
    if (event.code === "Space") {
        event.preventDefault();
        playPauseBtn.click();
    }
});
