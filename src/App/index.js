import React, { Component } from 'react';
import LazyLoad from '../lazyload.js';
import { demo, imgList } from './temp';
import ProgressiveLoad from '../ProgressiveLoad';
import './index.scss';

class App extends Component {
  componentDidMount() {
    const object = new LazyLoad('.lazyload', 1000, 300);
    console.log(object);
  }
  render() {
    return (
      <div>
        <div style={{ width: '100%', height: '100vh' }}>
          <ProgressiveLoad largeSrc={demo.large} smallSrc={demo.small}></ProgressiveLoad>
        </div>
        <ul className='container'>
          {imgList.map(x => (
            <li className='item'>
              <figure>
                <img className='img lazyload' data-src={x} alt='' />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
