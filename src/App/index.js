import React, { Component } from 'react';
import './index.scss';
import LazyLoad from '../lazyload.js';
import imgList from './temp';

class App extends Component {
  componentDidMount() {
    const object = new LazyLoad('.lazyload', 1000, 300);
    console.log(object);
  }
  render() {
    return (
      <ul className="container">
        {imgList.map(x => (
          <li className="item">
            <figure>
              <div />
              <img className="img lazyload" data-src={x} alt="" />
              <img src="" alt="" />
              <canvas />
            </figure>
            {/* <Img src={x} /> */}
          </li>
        ))}
      </ul>
    );
  }
}

export default App;
