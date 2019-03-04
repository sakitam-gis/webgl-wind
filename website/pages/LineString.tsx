import * as React from 'react';
// @ts-ignore
import { Map, View } from 'ol';
// @ts-ignore
import { Tile } from 'ol/layer';
// @ts-ignore
import { OSM } from 'ol/source';
import { Props, Context } from '../interface/common';
import { getJSON } from '../helper';

// @ts-ignore
import { Layer } from '../../dist/ol-viz';

class LineString extends React.Component <Props, Context> {
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

    getJSON('./static/json/line.json', (data: Array<object>) => {
      const options = {
        draw: 'LineString',
        strokeStyle: 'rgba(255, 250, 0, 0.8)',
        lineWidth: 2,
        _size: 20,
        context: 'webgl',
      };

      const layer = new Layer(this.map, {
        data,
        ...options,
        projection: 'EPSG:4326',
      });

      this.map.addLayer(layer);
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

export default LineString;
