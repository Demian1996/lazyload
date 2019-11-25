import React from 'react';
import classnames from 'classnames';
import './index.css';

export default class extends React.Component {
  static defaultProps = {
    largeSrc: '', // 原图链接
    smallSrc: '', // 小图链接
    largeClassNames: {}, // 原图样式
    smallClassNames: {}, // 小图样式
    figureProps: {}, // 容器属性
    largeProps: {}, // 大图属性
    smallProps: {} // 小图属性
  };
  constructor(props) {
    super(props);
    this.state = {
      _isLargeLoaded: false,
      _isSmallLoaded: false
    };
    this._largeRef = React.createRef();
    this._smallRef = React.createRef();
    this._onLargeLoad = this._onLargeLoad.bind(this);
    this._onSmallLoad = this._onSmallLoad.bind(this);
  }
  _onLargeLoad() {
    this.setState({
      _isLargeLoaded: true
    });
  }

  _onSmallLoad = () => {
    this.setState({
      _isSmallLoaded: true
    });
  };

  render() {
    const { largeSrc, smallSrc, smallClassNames, largeClassNames, figureProps, smallProps, largeProps } = this.props;
    const { _isSmallLoaded, _isLargeLoaded } = this.state;
    return (
      <div className='pl-container' {...figureProps}>
        <img
          className={classnames({
            'pl-img': true,
            'pl-small': true,
            'pl-loaded': _isSmallLoaded,
            ...smallClassNames
          })}
          src={smallSrc}
          onLoad={this._onSmallLoad}
          ref={this._smallRef}
          alt='缩略图'
          {...smallProps}
        />
        <img
          className={classnames({
            'pl-img': true,
            'pl-loaded': _isLargeLoaded,
            ...largeClassNames
          })}
          src={largeSrc}
          onLoad={this._onLargeLoad}
          ref={this._largeRef}
          alt='原图'
          {...largeProps}
        />
      </div>
    );
  }
}
