// Sobel shader
// Inspired by https://github.com/mrdoob/three.js/blob/master/examples/js/shaders/SobelOperatorShader.js

// This shader incorporates both depth and norm information.
// Both depth and norm info are multiplied under the convolution filter.
// However, while Gx and Gy are scalar values for depth info, Gx and Gy are vectors for the normals.
// For depth, G = sqrt( Gx^2 + Gy^2 )
// For norms, G = sqrt( |Gx|^2 + |Gy|^2 )

uniform sampler2D u_normalDepth;
uniform sampler2D u_color;
uniform sampler2D u_paper_texture;
uniform vec2 u_resolution;

uniform vec3 u_outline_color;
uniform float u_outline_thickness;
varying vec2 v_uv;
void main() {
  vec2 texel = vec2( u_outline_thickness / u_resolution.x, u_outline_thickness / u_resolution.y );
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

  vec3 tnx0y0 = texture2D( u_normalDepth, v_uv + texel * vec2( -1, -1 ) ).rgb;
  vec3 tnx0y1 = texture2D( u_normalDepth, v_uv + texel * vec2( -1,  0 ) ).rgb;
  vec3 tnx0y2 = texture2D( u_normalDepth, v_uv + texel * vec2( -1,  1 ) ).rgb;
  // second column
  vec3 tnx1y0 = texture2D( u_normalDepth, v_uv + texel * vec2(  0, -1 ) ).rgb;
  vec3 tnx1y1 = texture2D( u_normalDepth, v_uv + texel * vec2(  0,  0 ) ).rgb;
  vec3 tnx1y2 = texture2D( u_normalDepth, v_uv + texel * vec2(  0,  1 ) ).rgb;
  // third column
  vec3 tnx2y0 = texture2D( u_normalDepth, v_uv + texel * vec2(  1, -1 ) ).rgb;
  vec3 tnx2y1 = texture2D( u_normalDepth, v_uv + texel * vec2(  1,  0 ) ).rgb;
  vec3 tnx2y2 = texture2D( u_normalDepth, v_uv + texel * vec2(  1,  1 ) ).rgb;
  // gradient value in x direction
  vec3 valueGNx = Gx[0][0] * tnx0y0 + Gx[1][0] * tnx1y0 + Gx[2][0] * tnx2y0 +
    Gx[0][1] * tnx0y1 + Gx[1][1] * tnx1y1 + Gx[2][1] * tnx2y1 +
    Gx[0][2] * tnx0y2 + Gx[1][2] * tnx1y2 + Gx[2][2] * tnx2y2;
  // gradient value in y direction
  vec3 valueGNy = Gy[0][0] * tnx0y0 + Gy[1][0] * tnx1y0 + Gy[2][0] * tnx2y0 +
    Gy[0][1] * tnx0y1 + Gy[1][1] * tnx1y1 + Gy[2][1] * tnx2y1 +
    Gy[0][2] * tnx0y2 + Gy[1][2] * tnx1y2 + Gy[2][2] * tnx2y2;
  // magnitute of the total gradient
  float GN = sqrt( dot( valueGNx, valueGNx ) + dot( valueGNy, valueGNy ) );

  float GTotal = smoothstep(0.45, 0.6, (GN+G)/2.0);

  vec4 color = vec4(u_outline_color, 1.0);
  gl_FragColor = mix(texture2D( u_color, v_uv), color, GTotal);
}
