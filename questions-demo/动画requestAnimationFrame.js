// 要想动画流畅，更新频率要60帧/s，即16.67ms更新一次视图
// 3s 把宽度从 100px 变为 640px ，即增加 540px
// 60帧/s ，3s 180帧（变化180次），每次变化 3px

const $div1 = $("#div1");
let curWidth = 100;
const maxWidth = 640;

// // setTimeout
// function animate() {
//     curWidth = curWidth + 3
//     $div1.css('width', curWidth)
//     if (curWidth < maxWidth) {
//         setTimeout(animate, 16.7) // 需要自己控制时间
//     }
// }
// animate()

// RAF
function animate() {
  curWidth = curWidth + 5;
  $div1.css("width", curWidth);
  if (curWidth < maxWidth) {
    window.requestAnimationFrame(animate); // 时间不用自己控制
  }
}
animate();
