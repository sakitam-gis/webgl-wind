declare function createProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string): object;
declare function createTexture(gl: WebGLRenderingContext, filter: GLint, data: Uint8Array, width?: number, height?: number): WebGLTexture | null;
declare function bindTexture(gl: WebGLRenderingContext, texture: WebGLTexture | null, unit: number): void;
declare function createBuffer(gl: WebGLRenderingContext, data: Float32Array): WebGLBuffer | null;
declare function bindAttribute(gl: WebGLRenderingContext, buffer: WebGLBuffer | null, attribute: GLuint, numComponents: GLint): void;
declare function bindFramebuffer(gl: WebGLRenderingContext, framebuffer: WebGLBuffer | null, texture?: WebGLTexture | null): void;
export { createBuffer, createProgram, bindAttribute, bindFramebuffer, bindTexture, createTexture, };
