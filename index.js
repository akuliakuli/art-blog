let close = document.querySelector(".close"),
    open = document.querySelector(".btn"),
    modal = document.querySelector(".modal");

const id = setTimeout(showModal,5000);

function closeModal(){
    modal.classList.add("hide");
    modal.classList.remove("show");
    modal.style.overflow =""
}

function showModal(){
    modal.classList.add("show");
    modal.classList.remove("hide");
    modal.style.overflow = "hidden";
    clearInterval(id);
}

open.addEventListener("click",() => {
    showModal();
})

close.addEventListener("click",() => {
    closeModal();
})


modal.addEventListener("click",(e) => {
    if(e.target == modal){
        closeModal()
    }
})

document.addEventListener("keydown",(e) => {
    if(e.code ="Escape" && modal.classList.contains("show")){
        closeModal();
    }
})

function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        showModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}
window.addEventListener('scroll', showModalByScroll);

//TIMER

const deadline = '2030-05-11';

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor( (t/(1000*60*60*24)) ),
        seconds = Math.floor( (t/1000) % 60 ),
        minutes = Math.floor( (t/1000/60) % 60 ),
        hours = Math.floor( (t/(1000*60*60) % 24) );

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getZero(num){
    if (num >= 0 && num < 10) { 
        return '0' + num;
    } else {
        return num;
    }
}

function setClock(selector, endtime) {

    const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setClock('.date', deadline);

// content on page

class ArtWork{
    constructor(img,altimg,descr,parentElement){
        this.img = img;
        this.alt = altimg;
        this.descr = descr;
        this.parent = document.querySelector(parentElement);
    }

    render(){
        let newElement = document.createElement("div");
        newElement.classList.add("frame");
        newElement.innerHTML = `
            <div class= "matte">
            </div>
            <div class="img-wrapper">
                <img src=${this.img} alt = ${this.alt}>
            </div>
            <p>${this.descr}</p>
        `
        this.parent.append(newElement);
    }
}

//npx json-server db.json saved for me just to start jsonserv


async function postDataOnPage(url){
    const res = await fetch(url);
    if(!res.ok){
        throw new Error("something went wrong");
    }
    return await res.json();
}

postDataOnPage("http://localhost:3000/menu")
.then(data => data.forEach(({img,altimg,descr}) =>{
     new ArtWork(img,altimg,descr,".art-container").render();
}))