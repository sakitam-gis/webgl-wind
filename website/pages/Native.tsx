import '../assets/style/native.less';
import * as React from 'react';
import { getJSON } from '../helper';
import { Props, Context } from '../interface/common';
import WindGL from '@sakitam-gis/webgl-wind';
import * as dat from 'dat.gui';

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
  private gui: dat.GUI;
  private wind: WindGL|null;
  constructor (props: Props, context: Context) {
    super(props, context);
    this.state = {};

    this.container = null;

    this.gui = new dat.GUI();

    this.wind = null;
  }

  creatGuiControl () {
    if (!this.wind) return;
    this.gui.add(this.wind, 'numParticles', 1024, 589824);
    this.gui.add(this.wind, 'fadeOpacity', 0.96, 0.999).step(0.001).updateDisplay();
    this.gui.add(this.wind, 'speedFactor', 0.05, 1.0);
    this.gui.add(this.wind, 'dropRate', 0, 0.1);
    this.gui.add(this.wind, 'dropRateBump', 0, 0.2);
  }

  componentDidMount () {
    const that = this;
    // @ts-ignore
    this.container.width = this.container.clientWidth;
    // @ts-ignore
    this.container.height = this.container.clientHeight;
    // @ts-ignore
    const context = createContext(this.container, {
      // 'alpha': true,
      // 'antialias': true,
      // 'preserveDrawingBuffer': true
    });

    this.wind = new WindGL(context, {});

    that.creatGuiControl();

    function draw () {
      // @ts-ignore
      that.wind && that.wind.render(JSON.parse("[3770.804809734272,0,0,0,0,-14685.487291460046,0,0,0,0,-4908.288037791965,-4895.162430486682,-2994.5333865497773,5668.44799568952,739.480171471856,739.5]"))
      requestAnimationFrame(draw);
    }

    getJSON('static/wind/2016112000.json', function (windData: any) {
      const windImage = new Image();
      windImage.src = 'static/wind/2016112000.png';
      windImage.onload = function () {
        that.wind && that.wind.setWind(windData, windImage);
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
