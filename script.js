// JavaScript code
let saturate = document.getElementById('saturate');
let contraste = document.getElementById('contraste');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let greyscale = document.getElementById('greyscale');
let blur = document.getElementById('blur');
let hue_rotate = document.getElementById('hue-rotate');
let download = document.getElementById('download');
let upload = document.getElementById('upload');
let img = document.getElementById('img');
let reset = document.querySelector('span');
let imgbox = document.querySelector('.imgbox');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

function resetValue() {
    img.style.filter = 'none';
    saturate.value = '100';
    contraste.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    greyscale.value = '0';
    blur.value = '0';
    hue_rotate.value = '0';
}

window.onload = function() {
    download.style.display = 'none';
    reset.style.display = 'none';
    imgbox.style.display = 'none';
};

upload.onchange = function() {
    resetValue();
    download.style.display = 'block';
    reset.style.display = 'block';
    imgbox.style.display = 'block';
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function() {
        img.src = file.result;
    };
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display = 'none';
    };
};

let filters = document.querySelectorAll("ul li input");
filters.forEach(filter => {
    filter.addEventListener('input', function() {
        context.filter = `
            saturate(${saturate.value}%)
            contrast(${contraste.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${greyscale.value})
            blur(${blur.value}px)
            hue-rotate(${hue_rotate.value}deg)
        `;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    });
});

download.onclick = function() {
    download.href = canvas.toDataURL();
};
