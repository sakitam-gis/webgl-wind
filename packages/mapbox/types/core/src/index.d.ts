declare class WindGL {
    matrix: any;
    gl: WebGLRenderingContext;
    fadeOpacity: number;
    speedFactor: number;
    dropRate: number;
    dropRateBump: number;
    drawProgram: any;
    screenProgram: any;
    updateProgram: any;
    quadBuffer: WebGLBuffer | null;
    framebuffer: WebGLFramebuffer | null;
    windData: {
        source: string;
        date: Date;
        width: number;
        height: number;
        uMin: number;
        uMax: number;
        vMin: number;
        vMax: number;
    };
    screenTexture: WebGLTexture | null;
    colorRampTexture: WebGLTexture | null;
    backgroundTexture: WebGLTexture | null;
    _numParticles: number;
    particleStateResolution: number;
    particleIndexBuffer: WebGLBuffer | null;
    particleStateTexture1: WebGLTexture | null;
    particleStateTexture0: WebGLTexture | null;
    windTexture: WebGLTexture | null;
    constructor(gl: WebGLRenderingContext, options?: {
        fadeOpacity: number | undefined;
        speedFactor: number | undefined;
        dropRate: number | undefined;
        dropRateBump: number | undefined;
        colorRamp: number | undefined;
        numParticles: number | undefined;
    });
    resize(): void;
    setColorRamp(colors: object): void;
    numParticles: any;
    setWind(data: {
        source: string;
        date: Date;
        width: number;
        height: number;
        uMin: number;
        uMax: number;
        vMin: number;
        vMax: number;
    }, image: any): void;
    render(matrix: any): void;
    drawScreen(): void;
    drawTexture(texture: WebGLTexture | null, opacity: number): void;
    drawParticles(): void;
    updateParticles(): void;
}
export default WindGL;
