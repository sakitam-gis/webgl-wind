import '../assets/style/native.less';
import * as React from 'react';
import { getJSON } from '../helper';
// @ts-ignore
import mapboxGl from 'mapbox-gl';
import { Props, Context } from '../interface/common';
// @ts-ignore
import MapBoxWindGL from '@sakitam-gis/mapbox-windgl';
import { GUI } from 'dat.gui';

const config = {
  numParticles: 65536,
  fadeOpacity: 0.996,
  speedFactor: 0.25,
  dropRate: 0.003,
  dropRateBump: 0.01,
  colorRamp: {
    0.0: '#3288bd',
    0.1: '#66c2a5',
    0.2: '#abdda4',
    0.3: '#e6f598',
    0.4: '#fee08b',
    0.5: '#fdae61',
    0.6: '#f46d43',
    1.0: '#d53e4f',
  },
  time: '2016112000',
  composite: false,
};

const windFiles = {
  0: '2016112000',
  6: '2016112006',
  12: '2016112012',
  18: '2016112018',
  24: '2016112100',
  30: '2016112106',
  36: '2016112112',
  42: '2016112118',
  48: '2016112200',
};

class MapBox extends React.Component {
  public map: any;
  private container: HTMLCanvasElement | null;
  private layer: any;
  constructor (props: Props, context: Context) {
    super(props, context);
    this.state = {};

    this.container = null;

    this.layer = null;

    this.map = null;

    this.updateWind = this.updateWind.bind(this);
  }

  creatGuiControl () {
    if (!this.layer) { return; }

    const meta = {
      '2016-11-20+h': 0,
    };
    const gui = new GUI();
    gui.add(config, 'numParticles', 1024, 589824).onChange(() => {
      this.layer.setOptions(config);
    });
    gui.add(config, 'fadeOpacity', 0.96, 0.999, 0.001).updateDisplay().onChange(() => {
      this.layer.setOptions(config);
    });
    gui.add(config, 'speedFactor', 0.05, 1.0).onChange(() => {
      this.layer.setOptions(config);
    });
    gui.add(config, 'dropRate', 0, 0.1).onChange(() => {
      this.layer.setOptions(config);
    });
    gui.add(config, 'dropRateBump', 0, 0.2).onChange(() => {
      this.layer.setOptions(config);
    });
    gui.add(config, 'composite').onFinishChange(() => {
      this.layer.setOptions(config);
    });

    gui.add(meta, '2016-11-20+h', 0, 48, 6).onFinishChange(this.updateWind);

    this.updateWind(0);
  }

  componentDidMount () {
    mapboxGl.accessToken = 'pk.eyJ1Ijoic21pbGVmZGQiLCJhIjoiY2owbDBkb2RwMDJyMTMycWRoeDE4d21sZSJ9.dWlPeAWsgnhUKdv1dCLTnw';

    this.map = new mapboxGl.Map({
      container: this.container, // container id
      style: 'mapbox://styles/mapbox/dark-v9', // stylesheet location
      center: [-74.50, 40], // starting position [lng, lat]
      zoom: 2, // starting zoom
    });

    this.map.on('load', () => {
      this.handleMapLoaded();
    });
  }

  handleMapLoaded () {
    this.layer = new MapBoxWindGL('custom');

    this.map.addLayer(this.layer);

    this.creatGuiControl();
  }

  updateWind(name: string | number) {
    getJSON(`./static/wind/${windFiles[name]}.json`, (windData: any) => {
      const windImage = new Image();
      windImage.src = `./static/wind/${windFiles[name]}.png`;
      windImage.onload = () => {
        this.layer.setWind(windData, windImage);
        this.layer.resize();
      };
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
    return (<div ref={this.setRef} className="render-content"/>);
  }
}

export default MapBox;
