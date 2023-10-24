uniform vec3 u_light_pos;
uniform vec3 u_light_color;
uniform float u_light_intensity;
uniform vec3 u_ambient_color;
uniform vec3 u_diffuse_color;
uniform vec3 u_specular_color;

varying vec4 v_normal;
varying vec4 v_position;
varying vec2 v_uv;
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

  float diffuse = max(0.0, dot(n, l));

  // map between diffuse and specular
  // vec3 diffuse_color;
  // if (diffuse < 0.5) {
    // diffuse_color= mix(u_ambient_color, u_diffuse_color, diffuse*2.0);
  // } else {
    // diffuse_color= mix(u_diffuse_color, u_specular_color, diffuse*2.0-1.0);
  // }
  vec3 diffuse_color = mix(u_specular_color, u_light_color, diffuse);

  vec4 specular = kd * I / dot(r, r) * pow(max(0.0, dot(n, h)), p);
  vec3 out_color = diffuse_color;
  gl_FragColor = vec4(out_color.xyz, 1);
}
