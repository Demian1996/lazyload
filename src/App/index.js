import React, { Component } from 'react';
import './index.scss';
import LazyLoad from '../lazyLoad.js';
import { progressiveLoad } from '../progressiveLoad.js';
import { demo, imgList } from './temp';

class App extends Component {
  componentDidMount() {
    const object = new LazyLoad('.lazyload', 1000, 300);
    progressiveLoad();
    console.log(object);
  }
  render() {
    return (
      <div>
        <figure className="header" data-large={demo.large}>
          <img className="img small lazyload" data-src={demo.small} alt="" />
        </figure>
        <ul className="container">
          {imgList.map(x => (
            <li className="item">
              <figure>
                <img className="img lazyload" data-src={x} alt="" />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
