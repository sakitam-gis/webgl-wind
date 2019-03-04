import * as React from 'react';
import { getJSON } from '../helper';
import { Props, Context } from '../interface/common';

class Native extends React.Component {
  private container: HTMLElement | null;
  constructor (props: Props, context: Context) {
    super(props, context);
    this.state = {};

    this.container = null;
  }

  componentDidMount () {
    // @ts-ignore
    const { zoom } = this.state;

    getJSON('./static/json/line.json', () => {
      console.log(this.container, zoom)
    });
  }

  componentWillUnmount () {
    // this.map.remove()
  }

  setRef = (x = null) => {
    this.container = x;
  }

  render () {
    // @ts-ignore
    return (<div ref={this.setRef} className="map-content"/>);
  }
}

export default Native;
