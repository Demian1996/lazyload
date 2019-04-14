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

  constructor(className = '.lazyload', delay = 1000, rootMargin = 0) {
    this.className = className;
    this.delay = delay;
    this.rootMargin = rootMargin;
    this._lazyImageList = document.querySelectorAll(className) || [];
    this._init(className, delay, rootMargin);
  }

  _throttle(fn, delay) {
    let startTime = 0;
    return () => {
      const currentTime = Date.now();
      if (currentTime - startTime > delay) {
        setTimeout(() => {
          fn.call(this);
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
  _commonLazyLoad(rootMargin) {
    this._lazyImageList.forEach(lazyImage => {
      console.log(lazyImage);
    });
  }

  // 观察者api实现懒加载事件
  _observerLazyLoad(className, rootMargin) {
    const options = {
      root: null,
      rootMargin: `${rootMargin}px 0px`
    };
    this._lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove(className);
          this._lazyImageObserver.unobserve(lazyImage);
        }
      });
    }, options);

    this._lazyImageList.forEach(lazyImage => {
      this._lazyImageObserver.observe(lazyImage);
    });
  }

  _init(className, delay, rootMargin) {
    if ('IntersectionObserver' in window) {
      this._lazyLoadMode = mode.OBSERVER;
      this._lazyLoadListener = (className, rootMargin) => this._observerLazyLoad(className, rootMargin);
      document.addEventListener('DOMContentLoaded', this._lazyLoadListener(className, rootMargin));
    } else {
      this._lazyLoadMode = mode.COMMON;
      this._lazyLoadListener = this._throttle(this._commonLazyLoad, 1000);
      document.addEventListener('scroll', this._lazyLoadListener);
      document.addEventListener('DOMContentLoaded', this._lazyLoadListener);
      window.addEventListener('resize', this._lazyLoadListener);
      window.addEventListener('orientationchange', this._lazyLoadListener);
    }
  }
}

export default LazyLoad;
