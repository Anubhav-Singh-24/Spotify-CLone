console.log("Music is playing");

let songIndex = 0;
let audioElement = new Audio('songs/lev.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"Symphony", filePath:"songs/symph.mp3",cover:"cover/1.webp"},
    {songName:"Levitating", filePath:"songs/lev.mp3",cover:"cover/2.webp"},
    {songName:"There She Goes", filePath:"songs/goes.mp3",cover:"cover/3.webp"},
    {songName:"Heart Of a Warrior", filePath:"songs/warrior.mp3",cover:"cover/4.webp"},
    {songName:"Industry Baby", filePath:"songs/idbaby.mp3",cover:"cover/5.webp"},
    {songName:"Blinding Lights", filePath:"songs/blindli.mp3",cover:"cover/6.webp"},
    {songName:"Tired Of Being Sorry", filePath:"songs/tired.mp3",cover:"cover/7.webp"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].cover;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName; 
})


// Play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime == 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Listening to events
audioElement.addEventListener('timeupdate',()=>{
    // Music playing
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress;
    if(progressBar.value == 100){
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        progressBar.value = 0;
    }
})

// Progress bar seek
progressBar.addEventListener('change',()=>{
    audioElement.currentTime = (progressBar.value * audioElement.duration)/100
})

const allplays = ()=>{
    Array.from(document.getElementsByClassName('songPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        allplays(); //To get the play buttons for all the other songs.
        index = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `${songs[index].filePath}`
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        let playing = document.getElementById('current');
        playing.innerText = songs[index].songName;
    })
})

document.getElementById('previous').addEventListener('click',()=>{
    if(index == 0){
        index = 0;
    }else{
        index -= 1;
    }
    audioElement.src = `${songs[index].filePath}`
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    let playing = document.getElementById('current');
    playing.innerText = songs[index].songName;
})

document.getElementById('next').addEventListener('click',()=>{
    if(index == 7){
        index = 0;
    }else{
        index += 1;
    }
    audioElement.src = `${songs[index].filePath}`
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    let playing = document.getElementById('current');
    playing.innerText = songs[index].songName;
})

