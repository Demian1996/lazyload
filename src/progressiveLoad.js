//  渐近增强式加载图片
export const progressiveLoad = () => {
    var placeholder = document.querySelector('.header'),
      imgSmall = placeholder.querySelector('.small');

    // 1: load small image and show it
    var img = new Image();
    img.src = imgSmall.dataset.src;
    img.onload = function() {
      imgSmall.classList.add('loaded');
      console.log(imgSmall.classList);
    };

    // 2: load large image
    var imgLarge = new Image();
    imgLarge.src = placeholder.dataset.large;
    imgLarge.onload = function() {
      imgLarge.classList.add('loaded');
    };
    placeholder.appendChild(imgLarge);
  }