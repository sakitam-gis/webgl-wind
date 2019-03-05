// @ts-ignore
import mapboxgl from 'mapbox-gl';
import WindGL from '../../core/src/index';
declare class MapBoxWindGL {
    id: string;
    type: string;
    renderingMode: string;
    map: mapboxgl.Map | null;
    wind: WindGL | null;
    options: any | null;
    constructor(id: string, options?: object);
    resize(): void;
    onAdd(map: any, gl: WebGLRenderingContext): void;
    onRemove(): void;
    render(gl: WebGLRenderingContext, matrix: any): void;
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
}
export default MapBoxWindGL;
