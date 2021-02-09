const searchSong = () => {

    document.getElementById('motherDiv').innerHTML = '';
    let inputValue = document.getElementById('inputText').value;
    inputValue = inputValue.trim();

    if (inputValue == '') {
        document.getElementById('songLyrics').innerHTML = "Sorry this keyword is invalid!";
    } else {
        const url = `https://api.lyrics.ovh/suggest/${inputValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => songDisplay(data.data))
    }
}

const songDisplay = data => {


    data.forEach(element => {

        const mother = document.getElementById('motherDiv');
        const child = document.createElement('div');
        child.className = 'single-result row align-items-center my-3 p-3';
        child.innerHTML =

            `
        <div class="col-md-9">
            <h3 class="lyrics-name">${element.title}</h3>
            <p class="author lead">Album by <span>${element.artist.name}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="songLyricsDisplay('${element.artist.name}','${element.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        <audio controls>
            <source src="${element.preview}" type="audio/ogg">
        </audio>
        
        `
        mother.appendChild(child);
    });
}

const songLyricsDisplay = (artist, title) => {

    document.getElementById('motherDiv').innerHTML = '';
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {

        document.getElementById("songLyrics").innerText = data.lyrics;

    });
}