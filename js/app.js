"use strict";var container=document.getElementsByClassName("container")[0];container.style.width="".concat(.8*window.innerHeight,"px");var canvas=document.getElementById("my_canvas"),cwidth=canvas.width,cheight=canvas.height,ctx=canvas.getContext("2d"),degree=0,pic_pos=0,pictures=[["https://c8.staticflickr.com/9/8551/29262438391_2c96de7cac_b.jpg",10],["https://c6.staticflickr.com/9/8113/29262438261_3c73867edd_b.jpg",10],["https://c8.staticflickr.com/9/8306/29262437711_7a36736efa_b.jpg",10],["https://c1.staticflickr.com/9/8370/29307582096_cfd2c118c2_b.jpg",10],["https://c2.staticflickr.com/9/8427/29262438121_ceca2249be_b.jpg",10],["https://c1.staticflickr.com/8/7555/29307582456_c7d5659b89_b.jpg",12],["https://c3.staticflickr.com/9/8429/29307581586_b5813a1aa3_b.jpg",10],["https://c6.staticflickr.com/9/8309/29262437861_3b46d749e0_b.jpg",8],["https://c1.staticflickr.com/9/8420/29307581816_59eef2e6fd_b.jpg",10],["https://c8.staticflickr.com/9/8031/29262438031_56799c3070_b.jpg",8],["https://c2.staticflickr.com/8/7524/29262438361_b66a18507a_b.jpg",10]],image=document.createElement("img");image.onload=function(){var c=cwidth<image.width?cwidth:image.width;ctx.save(),ctx.translate(cwidth/2,cheight/2),ctx.beginPath(),ctx.arc(0,0,c/2,0,360),ctx.clip(),ctx.drawImage(image,-c/2,-c/2,c,c),ctx.restore()},image.src=pictures[pic_pos][0];var num_sec=pictures[pic_pos][1],framerate=12,animation_id=0;function fill_background(c){ctx.save(),ctx.fillStyle=c,ctx.fillRect(0,0,cwidth,cheight),ctx.restore()}function clear_background(){ctx.clearRect(0,0,cwidth,cheight)}function draw(){degree=(degree-360/num_sec)%360;var c=cwidth<image.width?cwidth:image.width;ctx.save(),clear_background(),ctx.translate(cwidth/2,cheight/2),ctx.rotate(degree*Math.PI/180),ctx.beginPath(),ctx.arc(0,0,c/2,0,360),ctx.clip(),ctx.drawImage(image,-c/2,-c/2,c,c),ctx.restore()}document.getElementById("prev_pic").onclick=function(){pic_pos=(pic_pos-=1)<0?pic_pos+pictures.length:pic_pos,image.src=pictures[pic_pos][0],num_sec=pictures[pic_pos][1]},document.getElementById("next_pic").onclick=function(){pic_pos=(pic_pos+1)%pictures.length,image.src=pictures[pic_pos][0],num_sec=pictures[pic_pos][1]},document.getElementById("animate").onclick=function(){0===animation_id&&(animation_id=window.setInterval(draw,1e3/framerate))},document.getElementById("pause").onclick=function(){0!==animation_id&&(clearInterval(animation_id),animation_id=0)};