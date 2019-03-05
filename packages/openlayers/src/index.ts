class OlWindGL {

  // @ts-ignore
  render(gl: WebGLRenderingContext, matrix: any) {
    // if (this.wind) {
    //   this.wind.render(matrix);
    // }
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
    // this.wind && this.wind.setWind(data, image);
  }
}

export default OlWindGL;
