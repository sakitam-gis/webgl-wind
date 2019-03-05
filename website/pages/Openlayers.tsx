import '../assets/style/native.scss';
import * as React from 'react';

// @ts-ignore
import Map from 'ol/WebGLMap.js';
// @ts-ignore
import View from 'ol/View.js';
// @ts-ignore
import TileLayer from 'ol/layer/Tile.js';
// @ts-ignore
import OSM from 'ol/source/OSM.js';

// import { getJSON } from '../helper';
import { Props, Context } from '../interface/common';
import * as dat from 'dat.gui';

class Openlayers extends React.Component {
  private container: HTMLCanvasElement | null;
  private gui: dat.GUI;
  public map: Map|null;
  constructor (props: Props, context: Context) {
    super(props, context);
    this.state = {};

    this.container = null;

    this.gui = new dat.GUI();

    this.map = null;
  }

  creatGuiControl () {
    // this.gui.add(this.layer.wind, 'numParticles', 1024, 589824);
    // this.gui.add(this.layer.wind, 'fadeOpacity', 0.96, 0.999).step(0.001).updateDisplay();
    // this.gui.add(this.layer.wind, 'speedFactor', 0.05, 1.0);
    // this.gui.add(this.layer.wind, 'dropRate', 0, 0.1);
    // this.gui.add(this.layer.wind, 'dropRateBump', 0, 0.2);
    console.log(this.gui);
  }

  componentDidMount () {
    var osm = new TileLayer({
      source: new OSM()
    });

    var map = new Map({
      layers: [osm],
      target: this.container,
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    console.log(map);

    var fragmentShaderSource = [
      'precision mediump float;',
      'void main() {',
      '}'
    ].join('');

    var vertexShaderSource = [
      'attribute vec2 a_position;',
      'void main() {',
      '  gl_Position = vec4(a_position, 0, 1);',
      '}'
    ].join('');

    osm.on('precompose', function(event: any) {
      console.log(event);
      var context = event.glContext;

      var gl = context.getGL();
      var program = gl.createProgram();

      var vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, vertexShaderSource);
      gl.compileShader(vertexShader);
      gl.attachShader(program, vertexShader);

      var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fragmentShaderSource);
      gl.compileShader(fragmentShader);
      gl.attachShader(program, fragmentShader);

      gl.linkProgram(program);
      context.useProgram(program);

      var positionLocation = gl.getAttribLocation(program, 'a_position');

      gl.enable(gl.STENCIL_TEST);
      gl.colorMask(false, false, false, false);
      gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
      gl.stencilFunc(gl.ALWAYS, 1, 0xff);

      var buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        // first band
        -1.0, -1.0, -0.75, -1.0, -1.0, 1.0,
        -1.0, 1.0, -0.75, -1.0, -0.75, 1.0,
        // second band
        -0.5, -1.0, -0.25, -1.0, -0.5, 1.0,
        -0.5, 1.0, -0.25, -1.0, -0.25, 1.0,
        // third band
        0.0, -1.0, 0.25, -1.0, 0.0, 1.0,
        0.0, 1.0, 0.25, -1.0, 0.25, 1.0,
        // forth band
        0.5, -1.0, 0.75, -1.0, 0.5, 1.0,
        0.5, 1.0, 0.75, -1.0, 0.75, 1.0
      ]), gl.STATIC_DRAW);

      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 24);

      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.deleteBuffer(buffer);

      gl.colorMask(true, true, true, true);
      gl.stencilFunc(gl.NOTEQUAL, 0, 0xff);
      gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
    });

    osm.on('postcompose', function(event: any) {
      var context = event.glContext;
      var gl = context.getGL();
      gl.disable(gl.STENCIL_TEST);
    });
  }

  // handleMapLoaded () {
  //   this.layer = new MapBoxWindGL('custom');
  //
  //   this.map.addLayer(this.layer);
  //
  //   this.creatGuiControl();
  //
  //   getJSON('static/wind/2016112000.json', (windData: any) => {
  //     const windImage = new Image();
  //     windImage.src = 'static/wind/2016112000.png';
  //     windImage.onload = () => {
  //       this.layer && this.layer.setWind(windData, windImage);
  //     };
  //   });
  // }

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

export default Openlayers;
