let container = document.getElementsByClassName("container")[0];
container.style.width = `${window.innerHeight * 0.80}px`;

// select the drawing canvas
let canvas = document.getElementById("my_canvas");

// widthe and height of the canvas
const cwidth = canvas.width;
const cheight = canvas.height;

// create drawing object
let ctx = canvas.getContext("2d");
// angle in degree
let degree = 0;

let pic_pos = 0;
let pictures = [
    ["https://c8.staticflickr.com/9/8551/29262438391_2c96de7cac_b.jpg", 10],
    ["https://c6.staticflickr.com/9/8113/29262438261_3c73867edd_b.jpg", 10],
    ["https://c8.staticflickr.com/9/8306/29262437711_7a36736efa_b.jpg", 10],
    ["https://c1.staticflickr.com/9/8370/29307582096_cfd2c118c2_b.jpg", 10],
    ["https://c2.staticflickr.com/9/8427/29262438121_ceca2249be_b.jpg", 10],
    ["https://c1.staticflickr.com/8/7555/29307582456_c7d5659b89_b.jpg", 12],
    ["https://c3.staticflickr.com/9/8429/29307581586_b5813a1aa3_b.jpg", 10],
    ["https://c6.staticflickr.com/9/8309/29262437861_3b46d749e0_b.jpg", 8],
    ["https://c1.staticflickr.com/9/8420/29307581816_59eef2e6fd_b.jpg", 10],
    ["https://c8.staticflickr.com/9/8031/29262438031_56799c3070_b.jpg", 8],
    ["https://c2.staticflickr.com/8/7524/29262438361_b66a18507a_b.jpg", 10]
];

let image = document.createElement("img");
image.onload = () => {
    let img_dim = cwidth < image.width? cwidth : image.width;
    ctx.save();
    ctx.translate(cwidth/2, cheight/2);
    ctx.beginPath();
    ctx.arc(0, 0, img_dim/2, 0, 360);
    ctx.clip();
    ctx.drawImage(image, -img_dim/2, -img_dim/2, img_dim, img_dim);
    ctx.restore();
};

image.src = pictures[pic_pos][0];
let num_sec = pictures[pic_pos][1];

let framerate = 12;
let animation_id = 0;

function fill_background(color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, cwidth, cheight);
    ctx.restore();
}

function clear_background() {
    ctx.clearRect(0, 0, cwidth, cheight);
}

function draw(){
    degree = (degree - 360/num_sec) % 360;
    let img_dim = cwidth < image.width? cwidth : image.width;
    ctx.save();
    clear_background();
    ctx.translate(cwidth/2, cheight/2);
    ctx.rotate(degree * Math.PI/180);
    ctx.beginPath();
    ctx.arc(0, 0, img_dim/2, 0, 360);
    ctx.clip();
    ctx.drawImage(image, -img_dim/2, -img_dim/2, img_dim, img_dim);
    ctx.restore();
}

document.getElementById("prev_pic").onclick = () => {
    pic_pos -= 1;
    pic_pos = pic_pos < 0? pic_pos + pictures.length: pic_pos;
    image.src = pictures[pic_pos][0];
    num_sec = pictures[pic_pos][1];
};

document.getElementById("next_pic").onclick = () => {
    pic_pos = (pic_pos + 1) % pictures.length;
    image.src = pictures[pic_pos][0];
    num_sec = pictures[pic_pos][1];
};

document.getElementById("animate").onclick = () => {
    if (animation_id === 0)
        animation_id = window.setInterval(draw, 1000/framerate);
};

document.getElementById("pause").onclick = () => {
    if (animation_id !== 0) {
        clearInterval(animation_id);
        animation_id = 0;
    }
};