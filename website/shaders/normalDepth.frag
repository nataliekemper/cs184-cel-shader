varying vec4 v_normal;
varying vec4 v_position;
void main()	{
  float z = gl_FragCoord.z / gl_FragCoord.w;
  gl_FragColor = vec4(v_normal.xyz, z);
}
