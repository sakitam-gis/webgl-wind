import WindGL from '../../core/src/index';

const uuid = () => {
  // tslint:disable-next-line:function-name
  function b(a?: number) {
    // @ts-ignore
    return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -[1e3] + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
  }
  return b();
};

class MapBoxWindGL {
  public id: string;
  public type: string;
  public renderingMode: string;
  public map: any;
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
    if (this.wind) {
      this.wind.resize();
    }
  }

  // @ts-ignore
  onAdd(map, gl: WebGLRenderingContext) {
    this.map = map;

    this.wind = new WindGL(gl, this.options);

    map.on('resize', this.resize);
  }

  onRemove() {
    if (this.map) {
      this.map.off('resize', this.resize);
    }
    delete this.map;
  }

  // @ts-ignore
  render(gl: WebGLRenderingContext, matrix: number[]) {
    if (this.wind) {
      // from https://github.com/astrosat/windgl/blob/3ad0ae3bdd/src/layer.js#L157
      const bounds = this.map.getBounds();
      const eastIter = Math.max(0, Math.ceil((bounds.getEast() - 180) / 360));
      const westIter = Math.max(0, Math.ceil((bounds.getWest() + 180) / -360));
      this.wind.render(this.map, matrix, 0);
      // tslint:disable-next-line:no-increment-decrement
      for (let i = 1; i <= eastIter; i++) {
        this.wind.render(this.map, matrix, i);
      }
      // tslint:disable-next-line:no-increment-decrement
      for (let i = 1; i <= westIter; i++) {
        this.wind.render(this.map, matrix, -i);
      }
    }
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
  },      image: any) {
    if (this.wind) {
      this.wind.setWind(data, image);
    }
  }

  setOptions(options = {}) {
    this.options = Object.assign(this.options, options);
    if (this.wind) {
      this.wind.setOptions(this.options);
    }
  }
}

export default MapBoxWindGL;
