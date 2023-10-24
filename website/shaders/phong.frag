uniform vec3 u_light_pos;
uniform vec3 u_light_color;
uniform float u_light_intensity;
uniform vec3 u_diffuse_color;

varying vec4 v_normal;
varying vec4 v_position;
void main()	{

  vec4 kd = vec4(u_diffuse_color, 1);
  float ka = 0.1;
  float ks = 0.5;
  vec4 Ia = vec4(1, 1, 1, 1);
  float p = 100.0;

  vec4 r = vec4(u_light_pos, 0) - v_position;
  vec4 I = vec4(u_light_intensity * u_light_color, 1);
  vec4 l = r / length(r.xyz);
  vec4 v = vec4(cameraPosition, 0.0) - v_position;
  v = v / length(v.xyz);
  vec4 n = v_normal;
  vec4 h = (v + l) / length((v + l).xyz);

  vec4 ambient = ka * Ia;
  vec4 diffuse = kd * I / dot(r, r) * max(0.0, dot(n, l));
  vec4 specular = kd * I / dot(r, r) * pow(max(0.0, dot(n, h)), p);
  vec4 out_color = diffuse + ambient + specular;
  gl_FragColor = vec4(out_color.xyz, 1);
}
