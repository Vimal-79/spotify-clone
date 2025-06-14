
//curren audio
let currentSong = new Audio();

function playCurrentSong(songUrl , paused=false) {
    currentSong.src = songUrl

    setTimeout(() => {
    if(!paused){
        currentSong.play()
        document.querySelector("#play_song_btn").src = "/svgs/pause.svg"
        document.querySelector("#play_song_btn").classList.add("play_pause_btn")
    }
        document.querySelector(".song_name").innerHTML = currentSong.src.split("/songs/")[1].replaceAll("%20", " ").split("-")[0]
        document.querySelector(".song_duration").innerHTML = `00:00 / 00:00`
    }, 500)
}

//gettin value from songs title
let songsName = [];

async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text()
    let div = document.createElement('div')
    div.innerHTML = response
    let links = div.getElementsByTagName("a")
    let songs = []
    for (const element of links) {
        if (element.href.endsWith(".mp3" || ".MP3")) {
            songs.push(element.href)
            //pushing sogns titel in songsName
            songsName.push(element.title.replace(".mp3", ""))
        }
    }
    return songs

}

function secondToMinuteSeconds(second) {
    if (isNaN(second) || second < 0) {
        return "Invalid input"
    }

    const minutes = Math.floor(second / 60)
    const remainingSecods = Math.floor(second % 60)

    const formatedMinutes = String(minutes).padStart(2, '0');
    const formatedSeconds = String(remainingSecods).padStart(2, '0')

    return `${formatedMinutes}:${formatedSeconds}`
}

async function main() {
    //Getting the songs from songlist
    let songs = await getSongs()
    playCurrentSong(songs[0] , true)
    let songsConatainer = document.querySelector(".songs_list")

    for (const element of songsName) {

        let songsDetails = document.createElement('div')

        //Adding songs in left section
        songsDetails.innerHTML = `<div class="song_icon"><img src="" alt=""></div>
                        <div class="song_name_and_artist_name">
                        <h3>${element.split(" - ")[0]}</h3>
                        <p>${element.split(" - ")[1]}</p>
                        </div>
                        <div class="play">
                        <img src="/svgs/play.svg" alt=""></div>`;
        songsConatainer.append(songsDetails)
        songsDetails.classList.add("song")

        //spliting songName and Artist Name from Song title
        //songNewName is not a big deal it's just song name for cards
        let songNewName;

        if (songNewName = element.split("-")[0]) {
            songNewName = songNewName = element.split("-")[0]
        }
        else {
            songNewName = element
        }

        let artistName;

        if (element.split(" - ")[1]) {
            artistName = element.split(" - ")[1]
        }
        else {
            artistName = "Artist - Unkwon"
        }

        //Adding sogng card in right section from songsName or we say songs title
        let cardsContainer = document.createElement('div')
        cardsContainer.innerHTML = `<div class="card">
                    <div class="img_contianer">
                    <img src="" alt="">
                    <div class="play">
                    <img src="/svgs/play2.svg" alt=""></div>
                    </div><h2>${songNewName}</h2><p>${artistName}</p></div>`

        document.querySelector(".cards_container").append(cardsContainer)
    }

    //Playing song on click from left song tray
    document.querySelectorAll(".song").forEach(element => {
        element.addEventListener('click', () => {

            for (const song of songs) {
                //Matchin the songs Link to songs Name
                if (song.match(`${element.querySelector("h3").innerHTML.replaceAll(" ", "%20")}`)) {
                    playCurrentSong(song)
                }
            }
        })
    })

    //Play btn form card arives on mouseover 
    document.querySelectorAll(".card").forEach(element => {
        element.addEventListener('mouseover', () => {
            element.querySelector(".play").classList.add("play", "play_btn_on_image")
            element.classList.add("cardhoverd")
        })
        element.addEventListener('mouseleave', () => {
            element.querySelector(".play").classList.remove("play_btn_on_image")
            element.classList.remove("cardhoverd")
        })
    })

    document.querySelector("#play_song_btn").addEventListener('click', () => {

        //Consditions for play/pause btn
        if (currentSong.paused) {
            currentSong.play()
            document.querySelector("#play_song_btn").src = "/svgs/pause.svg"
            document.querySelector("#play_song_btn").classList.add("play_pause_btn")
        }

        //else play the first song from songs
        else {
            currentSong.pause()
            document.querySelector("#play_song_btn").src = "/svgs/play.svg"
        }
    })

    //previous song button 
    document.querySelector("#previous_song_btn").addEventListener('click', () => {
        if (songs.indexOf(currentSong.src) > 0) {
            playCurrentSong(songs[songs.indexOf(currentSong.src) - 1])
        }
        else if (songs.indexOf(currentSong.src) == 0) {
            playCurrentSong(currentSong.src)
        }

    })

    //Next song button
    document.querySelector("#next_song_btn").addEventListener('click', () => {
        if (songs.indexOf(currentSong.src) >= 0 && songs.indexOf(currentSong.src) < songs.length - 1) {
            playCurrentSong(songs[songs.indexOf(currentSong.src) + 1])
        }

        else if (songs.indexOf(currentSong.src) == songs.length - 1) {
            playCurrentSong(currentSong.src)
        }
    })

    currentSong.addEventListener('timeupdate', () => {

        document.querySelector(".song_duration").innerHTML = `${secondToMinuteSeconds(currentSong.currentTime)}/${secondToMinuteSeconds(currentSong.duration)} `
    })

}

main()

