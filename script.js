




// SLIDER

let imageArr = ["1.png", "2.png", "3.png"];

init(imageArr);

function init(imageArr) {


    let image = document.querySelector('.slide-image');
    let slider = document.querySelector('.section-slide');
    let dots = document.querySelector('.dots');
    let allDots = [];

    function changeImage() {
        image.src = "./images/Slide-images/" + imageArr[currectImageIndex];
        allDots[prevImageIndex].classList.remove('active');
        allDots[currectImageIndex].classList.add('active');
        // console.log('prev',allDots[prevImageIndex]);
        // console.log('currect',allDots[currectImageIndex]);

    }

    let currectImageIndex = 0;
    let prevImageIndex;


    // leftArrow.onclick = goLeft;
    // rightArrow.onclick = goRight;


    function createDots() {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        for (let i = 0; i < imageArr.length; i++) {
            let node = dot.cloneNode();
            node.onclick = dotClick;
            node.dataset.index = i;
            if (i === 0) {
                node.classList.add('active');
            }
            dots.appendChild(node);
            allDots.push(node);
        }
        function dotClick(event) {
            prevImageIndex = currectImageIndex;
            currectImageIndex = +event.target.dataset.index;
            changeImage()
            // console.log(event.target.dataset.index);
        }
    }




    function goRight() {
        prevImageIndex = currectImageIndex;
        if (currectImageIndex === imageArr.length - 1) {
            currectImageIndex = 0;
        }
        else {
            currectImageIndex++;
        }
        changeImage();
    }


    // SLIDER INTERVAL

    let interval = null;
    startSlider();

    createDots();

    function startSlider() {
        interval = setInterval(goRight, 3000);
    }

    function stopSlider() {
        clearInterval(interval);
        interval = null;
    }

    slider.onmouseover = stopSlider;
    slider.onmouseleave = startSlider;


}




//WORK LOAD MORE

const loadMoreButton = document.querySelector(".work-button");
const workImageGallery = document.querySelector(".work-gallery");

let imgsCount = 0;
let clickCount = 0;

loadMoreButton.onclick = () => {
    clickCount++;

    request("get", "https://jsonplaceholder.typicode.com/photos", null, (res) => {
        let urls = res.splice(imgsCount, 6).map(el => el.thumbnailUrl);

        imgsCount += urls.length;
        urls.forEach(url => {
            const template = `<div class="col-xl-4 col-md-6 col-sm-12 mb-4 "><img src="${url}" class="img-fluid newImage" alt=""></div>`;
            workImageGallery.insertAdjacentHTML('beforeend', template)
        });

        if (clickCount >= 3) {
            loadMoreButton.onclick = null;
        }
    });
}



function request(method, url, data, callback) {
    const request = new XMLHttpRequest();

    request.open(method, url);

    request.setRequestHeader("Content-type", 'application/json')

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status >= 200 && this.status < 400) {
            callback(JSON.parse(this.response));
        }
    }

    if (data) {
        request.send(data);
    }
    else {
        request.send();
    }

}



// FORM


const contactButton = document.querySelector(".contact-submit-button");
let inputs = document.querySelectorAll(".input-text");



contactButton.onclick = (event) => {
    event.preventDefault();
    const data = {};
    for (let el of inputs) {
        if (el.value) {
            data[el.name] = el.value;
        }
    }

    request('POST', 'https://jsonplaceholder.typicode.com/posts', JSON.stringify(data), (res) => {
        console.log(res);
    });
}




// Scroll

let upButton = document.querySelector(".upButton");

document.onscroll = () => {
    const scrollPosition = document.documentElement.scrollTop;
    const documentHeight = document.body.clientHeight;
    if (documentHeight - scrollPosition < 3000) {
        upButton.classList.remove('hidden');
    }
    else {
        upButton.classList.add('hidden');
    }
};

upButton.onclick = () => {
    document.documentElement.scroll(0, 0);
}