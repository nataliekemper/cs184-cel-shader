varying vec4 v_normal;
varying vec4 v_position;

// https://www.alanzucconi.com/2017/07/15/improving-the-rainbow/
vec3 rainbow_jet(float x) {
  vec3 c;
  if (x < 0.25)
    c = vec3(0.0, 4.0 * x, 1.0);
  else if (x < 0.5)
    c = vec3(0.0, 1.0, 1.0 + 4.0 * (0.25 - x));
  else if (x < 0.75)
    c = vec3(4.0 * (x - 0.5), 1.0, 0.0);
  else
    c = vec3(1.0, 1.0 + 4.0 * (0.75 - x), 0.0);
  return saturate(c);
}

void main()	{
  vec4 v = vec4(cameraPosition, 0.0) - v_position;
  v = v / length(v.xyz);

  vec3 color = rainbow_jet(dot(v_normal, v));
  gl_FragColor = vec4(color, 1.0);
}
