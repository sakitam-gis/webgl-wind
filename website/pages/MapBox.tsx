import '../assets/style/native.scss';
import * as React from 'react';
import { getJSON } from '../helper';
// @ts-ignore
import mapboxgl from 'mapbox-gl';
import { Props, Context } from '../interface/common';
// @ts-ignore
import MapBoxWindGL from '@sakitam-gis/mapbox-windgl';
import * as dat from 'dat.gui';

class MapBox extends React.Component {
  private container: HTMLCanvasElement | null;
  private gui: dat.GUI;
  private layer: MapBoxWindGL|null;
  public map: mapboxgl.Map|null;
  constructor (props: Props, context: Context) {
    super(props, context);
    this.state = {};

    this.container = null;

    this.gui = new dat.GUI();

    this.layer = null;

    this.map = null;
  }

  creatGuiControl () {
    if (!this.layer) return;
    // this.gui.add(this.layer.wind, 'numParticles', 1024, 589824);
    // this.gui.add(this.layer.wind, 'fadeOpacity', 0.96, 0.999).step(0.001).updateDisplay();
    // this.gui.add(this.layer.wind, 'speedFactor', 0.05, 1.0);
    // this.gui.add(this.layer.wind, 'dropRate', 0, 0.1);
    // this.gui.add(this.layer.wind, 'dropRateBump', 0, 0.2);
    console.log(this.gui);
  }

  componentDidMount () {
    console.log(mapboxgl);

    mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

    this.map = new mapboxgl.Map({
      container: this.container, // container id
      style: 'mapbox://styles/mapbox/dark-v9', // stylesheet location
      center: [-74.50, 40], // starting position [lng, lat]
      zoom: 2 // starting zoom
    });

    this.map.on('load', () => {
      this.handleMapLoaded();
    });
  }

  handleMapLoaded () {
    this.layer = new MapBoxWindGL('custom');

    this.map.addLayer(this.layer);

    this.creatGuiControl();

    getJSON('static/wind/2016112000.json', (windData: any) => {
      const windImage = new Image();
      windImage.src = 'static/wind/2016112000.png';
      windImage.onload = () => {
        this.layer && this.layer.setWind(windData, windImage);
      };
    });
  }

  componentWillUnmount () {
    // this.map.remove()
  }

  setRef = (x = null) => {
    this.container = x;
  };

  render () {
    // @ts-ignore
    return (<div ref={this.setRef} className="render-content"/>);
  }
}

export default MapBox;
