import * as React from 'react';
// @ts-ignore
import { Map, View } from 'ol';
// @ts-ignore
import { Tile } from 'ol/layer';
// @ts-ignore
import { OSM } from 'ol/source';
import { random } from 'lodash';
import { Props, Context } from '../interface/common';

// @ts-ignore
import { Layer } from '../../dist/ol-viz';

function randomData(num: number, wight: number) {
  let i = 0;
  const arr = [];
  // @ts-ignore
  for (; i < num; i++) {
    arr.push({
      geometry: {
        type: 'Point',
        coordinates: [
          random(71.34700137499999, 155.722001375),
          random(13.610967125000002, 55.271123375),
          wight,
        ],
      },
    });
  }
  return arr;
}

class Points extends React.Component <Props, Context> {
  private container: any;
  // @ts-ignore
  private map: Map | undefined;
  constructor (props: Props, context: Context) {
    super(props, context);
    this.state = {
      zoom: 5,
    };
  }

  componentDidMount () {
    // @ts-ignore
    const { zoom } = this.state;
    this.map = new Map({
      target: this.container,
      layers: [
        new Tile({
          preload: 4,
          source: new OSM({
            url: 'https://cartodb-basemaps-{a-d}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
          }),
        }),
      ],
      loadTilesWhileAnimating: true,
      view: new View({
        zoom,
        projection: 'EPSG:4326',
        center: [116.4066765, 39.9079326],
      }),
    });

    const data = randomData(200000, 2);
    const options = {
      draw: 'Point',
      fillStyle: 'rgba(255, 250, 0, 0.8)',
      size: 2,
      symbol: 'point',
      context: 'webgl',
    };

    const layer = new Layer(this.map, {
      data,
      ...options,
      projection: 'EPSG:4326',
    });

    this.map.addLayer(layer);
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

export default Points;
