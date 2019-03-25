import React from 'react';
class LazyLoad {
  // static instance;

  // constructor() {
  //   if (!LazyLoad.instance) {
  //     LazyLoad.instance = this;
  //   }
  //   return LazyLoad.instance;
  // }

  _throttle(fn, delay) {
    let startTime = 0;
    return (...args) => {
      const currentTime = new Date().getTime();
      if (currentTime - startTime > delay) {
        setTimeout(fn, delay, ...args);
        startTime = currentTime;
      }
    };
  }

  // 懒加载事件
  _lazyLoad(className) {
    return () => {
      const lazyImages = document.querySelectorAll(className);
      const options = {
        root: null,
        rootMargin: '400px 0px'
      }
      if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              let lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              // lazyImage.srcset = lazyImage.dataset.srcset;
              lazyImage.classList.remove(className);
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        }, options);

        lazyImages.forEach(lazyImage => {
          lazyImageObserver.observe(lazyImage);
        });
      } else {
        // Possibly fall back to a more compatible method here
      }
    };
  }

  generateComponent() {
    return ({ src }) => (
      <figure>
        <div className="place-holder" />
        <img className="img lazyload" src="" data-src={src} alt=""/>
      </figure>
    );
  }

  init(delay, className = '.lazyload') {
    const lazyLoad = this._throttle(this._lazyLoad(className), delay);
    document.addEventListener('scroll', lazyLoad);
    document.addEventListener('DOMContentLoaded', lazyLoad);
    window.addEventListener('resize', lazyLoad);
    window.addEventListener('orientationchange', lazyLoad);
  }
}

export default new LazyLoad();
