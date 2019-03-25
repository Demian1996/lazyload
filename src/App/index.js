import React, { Component } from 'react';
import './index.scss';
import lazyload from '../lazyload.js';
import imgList from './temp';

const Img = lazyload.generateComponent();

class App extends Component {
  componentDidMount() {
    lazyload.init(1000);

    console.log(lazyload);
  }
  render() {
    return (
      <ul className="container">
        {imgList.map(x => (
          <li className="item">
            <figure>
              <div />
              <img src="" alt="" />
              <img src="" alt="" />
              <canvas />
            </figure>
            <Img src={x} />
          </li>
        ))}
      </ul>
    );
  }
}

export default App;
