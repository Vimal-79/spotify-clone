

function volumeImg() {
    if (currentSong.volume === 0) {
        document.querySelector(".volume_img").src = "svgs/muted.svg"
    }
    else if (currentSong.volume > 0 && currentSong.volume < 0.1) {
        document.querySelector(".volume_img").src = "svgs/volume-off.svg"
    }
    else if (currentSong.volume > 0.1 && currentSong.volume < 0.5) {
        document.querySelector(".volume_img").src = "svgs/volume-low.svg"
    }
    else if (currentSong.volume > 0.5 && currentSong.volume < 1) {
        document.querySelector(".volume_img").src = "svgs/volume-high.svg"
    }
    else if (currentSong.volume === 1) {
        document.querySelector(".volume_img").src = "svgs/volume-max.svg"
    }
}

//curren audio
let currentSong = new Audio();

function volume() {
    if (localStorage.getItem("Volume")) {
        let vol = localStorage.getItem("Volume")
        currentSong.volume = vol
        document.querySelector("#volume").value = vol * 100
    }
    else {
        currentSong.volume = 0
    }
    volumeImg()
}


//gettin value from songs title
let songs = [];
let songsName = [];
let folders = [];
let currentFolder = [];

function playCurrentSong(songUrl, paused = false) {
    currentSong.src = songUrl
    volume()
    if (!paused) {
        currentSong.play()
        document.querySelector("#play_song_btn").src = "/svgs/pause.svg"
        document.querySelector("#play_song_btn").classList.add("play_pause_btn")
    }
    getCurrentSongName();
}

async function getCurrentSongName() {
    document.querySelector(".song_name").innerHTML = decodeURI(currentSong.src).split("-")[0].split(`/`).slice(-1)
    document.querySelector(".song_duration").innerHTML = `00:00 /  00:00`
}

// time fomate for songs
function secondToMinuteSeconds(second) {
    if (isNaN(second) || second < 0) {
        return "00:00"
    }
    const minutes = Math.floor(second / 60)
    const remainingSecods = Math.floor(second % 60)

    const formatedMinutes = String(minutes).padStart(2, '0');
    const formatedSeconds = String(remainingSecods).padStart(2, '0')
    return `${formatedMinutes}:${formatedSeconds}`
}


// geting songs from server


async function displayFolders() {
    let a = await fetch(`http://127.0.0.1:5500/songs/`);
    let response = await a.text();
    let div = document.createElement('div');
    div.innerHTML = response;
    for (const element of div.getElementsByTagName("a")) {
        if (element.href.includes("/songs/")) {
            let folder = element.href.split("/").slice(-1)[0];
            folders.push(folder);
            let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
            let response = await a.json();
            document.querySelector(".cards_container").innerHTML += `
                <div data-folder="${folder}" class="card">
                    <div class="img_container">
                    <img class="song_cover_img" src="songs/${folder}/cover.jpg" alt="">
                    <div class="play">
                        <img src="/svgs/play2.svg" alt="">
                    </div>
                </div>
                <h2>${response.title}</h2>
                <p>${response.description}</p>
                </div>`
        }
    }
}

async function getSongs(folder) {
    let a = await fetch(`http://127.0.0.1:5500/songs/${folder}`)
    let response = await a.text()
    let div = document.createElement('div')
    div.innerHTML = response
    let links = div.getElementsByTagName("a")
    songs = []
    songsName = []
    for (const element of links) {
        if (element.href.endsWith(".mp3" || ".MP3")) {
            songs.push(element.href)

            //pushing sogns titel in songsName
            songsName.push(element.title.replace(".mp3", ""))
        }
    }


    playCurrentSong(songs[0], true);
    let songsConatainer = document.querySelector(".songs_list");
    songsConatainer.innerHTML = '';

    for (const element of songsName) {
        let songsDetails = document.createElement('div');

        //Adding songs in left section
        songsDetails.innerHTML = `<div class="song_icon"><img src="" alt=""></div>
                        <div class="song_name_and_artist_name">
                        <h3>${element.split("-")[0]}</h3>
                        <p>${element.split("-")[1]}</p>
                        </div>
                        <div class="play">
                        <img src="/svgs/play.svg" alt=""></div>`;
        songsConatainer.append(songsDetails);
        songsDetails.classList.add("song");
    }

    //Playing song on click from left song tray in left
    document.querySelectorAll(".song").forEach(element => {
        element.addEventListener('click', () => {

            for (const song of songs) {
                //Matchin the songs Link to songs Name
                if (song.match(`${element.querySelector("h3").innerHTML.replaceAll(" ", "%20")}`)) {
                    playCurrentSong(song);
                }
            }
        })
    })

}


async function main() {

    await displayFolders();
    currentFolder = folders[0];
    await getSongs(currentFolder);


    //Play btn form card arives on mouseover 
    document.querySelectorAll(".card").forEach(element => {
        element.addEventListener('mouseover', () => {
            element.querySelector(".play").classList.add("play", "play_btn_on_image");
            element.classList.add("cardhoverd");
        })
        element.addEventListener('mouseleave', () => {
            element.querySelector(".play").classList.remove("play_btn_on_image");
            element.classList.remove("cardhoverd");
        })
    })

    document.querySelector("#play_song_btn").addEventListener('click', () => {

        //Consditions for play/pause btn
        if (currentSong.paused) {
            currentSong.play();
            document.querySelector("#play_song_btn").src = "/svgs/pause.svg";
            document.querySelector("#play_song_btn").classList.add("play_pause_btn");
        }

        //else play the first song from songs
        else {
            currentSong.pause();
            document.querySelector("#play_song_btn").src = "/svgs/play.svg";
        }
    })

    //previous song button 
    document.querySelector("#previous_song_btn").addEventListener('click', () => {
        if (songs.indexOf(currentSong.src) > 0) {
            playCurrentSong(songs[songs.indexOf(currentSong.src) - 1]);
        }
        else if (songs.indexOf(currentSong.src) == 0) {
            playCurrentSong(currentSong.src);
        }

    })

    //Next song button
    document.querySelector("#next_song_btn").addEventListener('click', () => {
        if (songs.indexOf(currentSong.src) < songs.length - 1) {
            playCurrentSong(songs[songs.indexOf(currentSong.src) + 1]);
        }
    })

    currentSong.addEventListener('timeupdate', () => {

        document.querySelector(".song_duration").innerHTML = `${secondToMinuteSeconds(currentSong.currentTime)} / ${secondToMinuteSeconds(currentSong.duration)} `
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";

        if (currentSong.paused) {
            document.querySelector("#play_song_btn").src = "/svgs/play.svg";
        }
        else {
            document.querySelector("#play_song_btn").src = "/svgs/pause.svg";
        }

        //if current song finished
        if (currentSong.currentTime == currentSong.duration) {
            document.querySelector("#play_song_btn").src = "/svgs/play.svg";
            let index = songs.indexOf(currentSong.src);
            if (index < songs.length - 1) {

                currentSong.src = songs[index + 1]
                playCurrentSong(currentSong.src);
            }
        }
    })

    //seekbar song controls
    document.querySelector(".seekbar").addEventListener('click', e => {
        let value = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = value + "%";
        currentSong.currentTime = ((currentSong.duration) * value) / 100;
    })

    document.querySelector("#volume").addEventListener('change', vol => {
        currentSong.volume = vol.target.value / 100;
        localStorage.setItem("Volume", currentSong.volume);
        volumeImg();
    })

    //event lisner on image of volume if clicked togle to volumed and muted 
    document.querySelector(".volume_img").addEventListener('click', () => {
        if (currentSong.volume == 0) {
            currentSong.volume = localStorage.getItem("Volume");
            document.querySelector("#volume").value = localStorage.getItem("Volume") * 100;
        }
        else {
            currentSong.volume = 0;
            document.querySelector("#volume").value = 0;
        }

        volumeImg();
    })

    document.querySelectorAll(".card").forEach(e => {
        e.addEventListener('click', async item => {
            currentFolder = item.currentTarget.dataset.folder;
            document.querySelector(".circle").style.left = "0%";
            await getSongs(currentFolder);
            currentSong.play()
        })
    })

}

main()


