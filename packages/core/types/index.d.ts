interface optionsTypes {
    fadeOpacity?: number;
    speedFactor?: number;
    dropRate?: number;
    dropRateBump?: number;
    colorRamp?: {};
    numParticles?: number;
    composite?: boolean;
}
declare class WindGL {
    numParticles: any;
    matrix: any;
    gl: WebGLRenderingContext;
    fadeOpacity: number;
    speedFactor: number;
    dropRate: number;
    dropRateBump: number;
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
    _numParticles: number;
    options: optionsTypes;
    private drawProgram;
    private screenProgram;
    private updateProgram;
    private quadBuffer;
    private framebuffer;
    private screenTexture;
    private colorRampTexture;
    private backgroundTexture;
    private particleStateResolution;
    private particleIndexBuffer;
    private particleStateTexture1;
    private particleStateTexture0;
    private windTexture;
    constructor(gl: WebGLRenderingContext, options: optionsTypes);
    setOptions(options: optionsTypes): void;
    resize(): void;
    setColorRamp(colors: object): void;
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
    render(map: any, matrix: number[], dateLineOffset: number): void;
    drawScreen(matrix: number[], dateLineOffset: number): void;
    drawTexture(texture: WebGLTexture | null, opacity: number): void;
    drawParticles(matrix: number[], dateLineOffset: number): void;
    updateParticles(map: any): void;
}
export default WindGL;
