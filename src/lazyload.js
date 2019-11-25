const mode = {
  OBSERVER: Symbol('OBSERVER'),
  COMMON: Symbol('COMMON')
};

class LazyLoad {
  // global
  _lazyImageList = [];
  _lazyLoadMode = null;
  _lazyImageObserver = null;
  _lazyLoadListener = null;

  constructor({ selector = '.lazy-load', className = 'lazy-load', delay = 1000, vMargin = 0, hMargin = 0 }) {
    this._selector = selector;
    this._className = className;
    this._delay = delay;
    this._vMargin = vMargin;
    this._hMargin = hMargin;
    this._lazyImageList = [].slice.call(document.querySelectorAll(selector)) || [];
    this._init();
  }

  _throttle(fn, delay) {
    let startTime = 0;
    return (...args) => {
      const currentTime = Date.now();
      if (currentTime - startTime > delay) {
        setTimeout(() => {
          fn.call(this, ...args);
        }, delay);
        startTime = currentTime;
      }
    };
  }

  destroy() {
    switch (this._lazyLoadMode) {
      case mode.OBSERVER:
        this._lazyImageObserver.disconnect();
        document.removeEventListener('DOMContentLoaded', this._lazyLoadListener);
        break;
      case mode.COMMON:
        break;
      default:
    }
  }

  // 监听滚动条，计算高度
  _commonLazyLoad() {
    this._lazyImageList.forEach((lazyImage, index) => {
      if (this._isInViewPort(lazyImage)) {
        this._show(lazyImage);
        lazyImage.isInViewPort = true;
      }
    });
    this._lazyImageList = this._lazyImageList.filter(x => x.isInViewPort !== true);
  }

  // 观察者api实现懒加载事件
  _observerLazyLoad() {
    console.log(this._vMargin, this._hMargin);
    const options = {
      root: null,
      rootMargin: `${this._vMargin}px ${this._hMargin}px`
    };
    this._lazyImageObserver = new IntersectionObserver((entries, observer) => {
      Array.prototype.forEach.call(entries, entry => {
        if (entry.isIntersecting) {
          this._show(entry.target);
          this._lazyImageObserver.unobserve(entry.target);
        }
      });
    }, options);

    Array.prototype.forEach.call(this._lazyImageList, lazyImage => {
      this._lazyImageObserver.observe(lazyImage);
    });
  }

  _show(el) {
    el.src = el.dataset.src;
    el.classList.remove(this._className);
  }

  _isInViewPort(el) {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const viewPortWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const offsetTop = el.offsetTop;
    const offsetLeft = el.offsetLeft;
    const scrollTop = document.documentElement.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft;
    const top = offsetTop - scrollTop;
    const left = offsetLeft - scrollLeft;
    return top <= viewPortHeight + this._vMargin && left <= viewPortWidth + this._hMargin;
  }

  _init() {
    if ('IntersectionObserver' in window) {
      this._lazyLoadMode = mode.OBSERVER;
      this._lazyLoadListener = this._observerLazyLoad;
      document.addEventListener('DOMContentLoaded', this._lazyLoadListener.bind(this));
    } else {
      this._lazyLoadMode = mode.COMMON;
      this._lazyLoadListener = this._throttle(this._commonLazyLoad, 500);
      document.addEventListener('scroll', this._lazyLoadListener.bind(this));
      document.addEventListener('DOMContentLoaded', this._lazyLoadListener.bind(this));
      window.addEventListener('resize', this._lazyLoadListener.bind(this));
      window.addEventListener('orientationchange', this._lazyLoadListener.bind(this));
    }
  }
}

export default LazyLoad;
