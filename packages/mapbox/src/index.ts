// @ts-ignore
import mapboxgl from 'mapbox-gl';
import WindGL from '../../core/src/index';

const uuid = () => {
  function b(a?: number) {
    // @ts-ignore
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -[1e3] + -4e3 + -8e3 + -1e11).replace(/[018]/g, b)
  }
  return b()
};

class MapBoxWindGL {
  public id: string;
  public type: string;
  public renderingMode: string;

  // @ts-ignore
  public map: mapboxgl.Map|null;

  public wind: WindGL|null;
  public options: any|null;
  constructor(id: string, options?: object) {
    this.id = id || uuid();
    this.type = 'custom';
    this.renderingMode = '2d';

    /**
     * define
     */
    this.wind = null;

    /**
     * options
     */
    this.options = options || {};

    /**
     * map
     */
    this.map = null;

    /**
     * bind context
     */
    this.resize = this.resize.bind(this);
  }

  resize () {
    this.wind && this.wind.resize()
  }

  // @ts-ignore
  onAdd(map, gl: WebGLRenderingContext) {
    console.log(map, gl);
    this.map = map;

    this.wind = new WindGL(gl, this.options);

    map.on('resize', this.resize);
  }

  onRemove() {
    this.map && this.map.off('resize', this.resize);
    delete this.map;
  }

  // @ts-ignore
  render(gl: WebGLRenderingContext, matrix: any) {
    if (this.wind) {
      this.wind.render(matrix);
    }
    this.map.triggerRepaint()
  }

  /**
   * set wind data
   * @param data
   * @param image
   */
  setWind(data: {
    source: string;
    date: Date;
    width: number;
    height: number;
    uMin: number;
    uMax: number;
    vMin: number;
    vMax: number;
  }, image: any) {
    this.wind && this.wind.setWind(data, image);
  }
}

export default MapBoxWindGL;
