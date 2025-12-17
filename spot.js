
console.log("Welcome to World");


let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));


function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = "0" + secs;
    return `${mins}:${secs}`;
}

function updateSongItemIcons() {
    makeAllPlays();   // reset all icons to play
    let currentIcon = document.getElementById(songIndex);
    currentIcon.classList.remove('fa-circle-play');
    currentIcon.classList.add('fa-circle-pause');
}



let songs=[
    {Name:"Wariyo", filePath:"songs/1.mp3",coverPath:"Image/1.jpg"},
    {Name:"Sdk", filePath:"songs/2.mp3",coverPath:"Image/2.jpg"},
    {Name:"Sdq", filePath:"songs/3.mp3",coverPath:"Image/3.jpg"},
    {Name:"Sed", filePath:"songs/4.mp3",coverPath:"Image/4.jpg"},
    {Name:"Adha Tera Ishq Aadha Mera", filePath:"songs/5.m4a",coverPath:"Image/5.jpg"},
    {Name:"Abc", filePath:"songs/6.mp3",coverPath:"Image/6.jpg"},
    {Name:"Sabcjc", filePath:"songs/7.mp3",coverPath:"Image/7.jpg"},
    {Name:"Sit", filePath:"songs/8.mp3",coverPath:"Image/8.jpg"},
    {Name:"Yeh Tune Kya Kia", filePath:"songs/9.m4a",coverPath:"Image/9.jpg"},
   {Name:"Na jana", filePath:"songs/10.mp3",coverPath:"Image/10.jpg"},
];


songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("Songname")[0].innerText=songs[i].Name;
});


// UPDATE DURATIONS
songItems.forEach((element, i) => {
    let tempAudio = new Audio(songs[i].filePath);

    tempAudio.addEventListener("loadedmetadata", () => {
        let duration = formatTime(tempAudio.duration);
        element.getElementsByClassName("timestamp")[0].innerText = duration;
    });
});

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause')
         masterPlay.classList.add('fa-circle-play');
         gif.style.opacity=0;
    }
})


audioElement.addEventListener('timeupdate', () => {
    // Update progress bar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    // Update current time
    document.getElementById("currentTime").innerText = formatTime(audioElement.currentTime);

    // Update total duration (only once loaded)
    if (!isNaN(audioElement.duration)) {
        document.getElementById("totalTime").innerText = formatTime(audioElement.duration);
    }
});

    myProgressBar.addEventListener('input',()=>{
        audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
    })
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
});
};



    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {

        let clickedIndex = parseInt(e.target.id);

        // If clicking the SAME song → toggle play/pause
        if (songIndex === clickedIndex) {

            if (audioElement.paused) {
                audioElement.play();

                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');

                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');

                gif.style.opacity = 1;
            } 
            else {
                audioElement.pause();

                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');

                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');

                gif.style.opacity = 0;
            }

            return; 
        }

        // Clicking a NEW song
        makeAllPlays();
        songIndex = clickedIndex;

        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].Name;
        audioElement.currentTime = 0;
        audioElement.play();

        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});


    document.getElementById('next').addEventListener('click',()=>{
        if(songIndex>=9){
            songIndex=0
        }
        else{
            songIndex+=1;
        }
        audioElement.src= songs[songIndex].filePath;
        masterSongName.innerText=songs[songIndex].Name;
            audioElement.currentTime=0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            updateSongItemIcons();
        });
      document.getElementById('previous').addEventListener('click',()=>{
        if(songIndex<=0){
            songIndex=0
        }
        else{
            songIndex-=1;
        }
            audioElement.src= songs[songIndex].filePath;
            masterSongName.innerText=songs[songIndex].Name;
            audioElement.currentTime=0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            updateSongItemIcons();
        });
   