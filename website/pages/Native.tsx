import '../assets/style/native.scss';
import * as React from 'react';
import { getJSON } from '../helper';
import { Props, Context } from '../interface/common';
import WindGL from '@sakitam-gis/webgl-wind';

const createContext = function (canvas: HTMLCanvasElement, glOptions: object = {}):WebGLRenderingContext {
  function onContextCreationError (error: any) {
    console.log(error.statusMessage);
  }

  canvas.addEventListener('webglcontextcreationerror', onContextCreationError, false);
  let gl = canvas.getContext('webgl', glOptions);
  gl = gl || canvas.getContext('experimental-webgl', glOptions);
  if (!gl) {
    gl = canvas.getContext('webgl2', glOptions);
    gl = gl || canvas.getContext('experimental-webgl2', glOptions);
  }

  canvas.removeEventListener('webglcontextcreationerror', onContextCreationError, false);
  // @ts-ignore
  return gl;
};

class Native extends React.Component {
  private container: HTMLCanvasElement | null;
  constructor (props: Props, context: Context) {
    super(props, context);
    this.state = {};

    this.container = null;
  }

  componentDidMount () {
    // @ts-ignore
    const context = createContext(this.container, {
      // 'alpha': true,
      // 'antialias': true,
      // 'preserveDrawingBuffer': true
    });

    const wind = new WindGL(context);

    function draw () {
      wind.render(JSON.parse("[3770.804809734272,0,0,0,0,-14685.487291460046,0,0,0,0,-4908.288037791965,-4895.162430486682,-2994.5333865497773,5668.44799568952,739.480171471856,739.5]"))
      requestAnimationFrame(draw);
    }

    getJSON('static/wind/2016112000.json', function (windData: any) {
      const windImage = new Image();
      windImage.src = 'static/wind/2016112000.png';
      windImage.onload = function () {
        wind.setWind(windData, windImage);
        draw();
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
    return (<canvas ref={this.setRef} className="render-content"/>);
  }
}

export default Native;
