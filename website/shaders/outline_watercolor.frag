// Sobel shader
// Inspired by https://github.com/mrdoob/three.js/blob/master/examples/js/shaders/SobelOperatorShader.js

uniform sampler2D u_normalDepth;
uniform sampler2D u_color;
uniform sampler2D u_paper_texture;
uniform vec2 u_resolution;
varying vec2 v_uv;
void main() {
  vec2 texel = vec2( 1.0 / u_resolution.x, 1.0 / u_resolution.y );
  // kernel definition (in glsl matrices are filled in column-major order)
  const mat3 Gx = mat3( -1, -2, -1, 0, 0, 0, 1, 2, 1 ); // x direction kernel
  const mat3 Gy = mat3( -1, 0, 1, -2, 0, 2, -1, 0, 1 ); // y direction kernel
  // fetch the 3x3 neighbourhood of a fragment
  // first column
  float tx0y0 = texture2D( u_normalDepth, v_uv + texel * vec2( -1, -1 ) ).a;
  float tx0y1 = texture2D( u_normalDepth, v_uv + texel * vec2( -1,  0 ) ).a;
  float tx0y2 = texture2D( u_normalDepth, v_uv + texel * vec2( -1,  1 ) ).a;
  // second column
  float tx1y0 = texture2D( u_normalDepth, v_uv + texel * vec2(  0, -1 ) ).a;
  float tx1y1 = texture2D( u_normalDepth, v_uv + texel * vec2(  0,  0 ) ).a;
  float tx1y2 = texture2D( u_normalDepth, v_uv + texel * vec2(  0,  1 ) ).a;
  // third column
  float tx2y0 = texture2D( u_normalDepth, v_uv + texel * vec2(  1, -1 ) ).a;
  float tx2y1 = texture2D( u_normalDepth, v_uv + texel * vec2(  1,  0 ) ).a;
  float tx2y2 = texture2D( u_normalDepth, v_uv + texel * vec2(  1,  1 ) ).a;
  // gradient value in x direction
  float valueGx = Gx[0][0] * tx0y0 + Gx[1][0] * tx1y0 + Gx[2][0] * tx2y0 +
    Gx[0][1] * tx0y1 + Gx[1][1] * tx1y1 + Gx[2][1] * tx2y1 +
    Gx[0][2] * tx0y2 + Gx[1][2] * tx1y2 + Gx[2][2] * tx2y2;
  // gradient value in y direction
  float valueGy = Gy[0][0] * tx0y0 + Gy[1][0] * tx1y0 + Gy[2][0] * tx2y0 +
    Gy[0][1] * tx0y1 + Gy[1][1] * tx1y1 + Gy[2][1] * tx2y1 +
    Gy[0][2] * tx0y2 + Gy[1][2] * tx1y2 + Gy[2][2] * tx2y2;
  // magnitute of the total gradient
  float G = sqrt( ( valueGx * valueGx ) + ( valueGy * valueGy ) );
  gl_FragColor = texture2D( u_color, v_uv) * texture2D( u_paper_texture, v_uv);
}
