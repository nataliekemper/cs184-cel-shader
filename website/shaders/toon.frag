uniform vec3 u_light_pos;
uniform vec3 u_light_color;
uniform float u_light_intensity;
uniform vec3 u_ambient_color;
uniform vec3 u_diffuse_color;
uniform vec3 u_specular_color;
uniform vec3 u_rim_color;

varying vec4 v_normal;
varying vec4 v_position;

void main()	{
  float rim_threshold = 0.5;
  float rimAmount = 1.0;

  //TOON PHONG:
  vec3 ka = vec3(0.1);
  vec3 kd = vec3(1.0);
  vec3 ks = vec3(0.5);
  vec3 ia = vec3(1.0, 1.0, 1.0);
  float p = 10.0; // bigger p -> smaller specular amount

  vec3 l = normalize(u_light_pos - v_position.xyz);
  float l_magnitude = length(l);
  float l_mag_squared = pow(l_magnitude, 2.0);

  // illumination from directional light
  //float NdotL = dot(v_normal.xyz, l);
  float NdotL = dot(u_light_pos, v_normal.xyz);

  float r = distance(u_light_pos, v_position.xyz);
  float r_sq = r * r;

  vec3 illum = u_light_intensity * u_light_color / (r_sq);
  vec3 v_vect = normalize(cameraPosition - v_position.xyz);

  // diffuse
  float light_intensity = smoothstep(0.0, 0.01, NdotL);
  vec3 diffuse = kd * illum * max(0.0, dot(v_normal.xyz, l));
  vec3 light = light_intensity * u_diffuse_color.xyz;

  // ambient
  vec3 ambient = u_ambient_color.xyz;

  //specular reflection
  vec3 half_vec = v_vect + l;
  vec3 h = half_vec / length(half_vec);

  float specular_angle = dot(v_normal.xyz, h);
  float specularIntensity = pow(max(0.0, specular_angle), p * p);
  float specularIntensitySmooth = smoothstep(0.005, 0.01, specularIntensity);
  vec3 specular = specularIntensitySmooth * u_specular_color.xyz;

  // sparkle
  //    float sparkleDot = dot(l, v_normal.xyz);
  //    float sparkleIntensity = sparkleDot * pow(dot(l, v_normal.xyz), rim_threshold);
  //    sparkleIntensity = smoothstep(rimAmount - 0.01, rimAmount + 0.01, sparkleIntensity);
  //    vec3 sparkle = sparkleIntensity * rim_color.xyz;

  //float specular_angle = dot(v_normal, h_vect);
  //vec3 specular = ks * illum * pow(max(0.0, specular_angle), p);

  //out_color = vec4(ambient + light + specular, 1) * u_specular_color;

  // rim
  float rimDot = 1.0 - dot(v_vect, v_normal.xyz);
  float rimIntensity = rimDot * pow(NdotL, rim_threshold);
  rimIntensity = smoothstep(rimAmount - 0.01, rimAmount + 0.01, rimIntensity);
  vec3 rim = rimIntensity * u_rim_color.xyz;

  vec3 L = ambient + light + specular + rim;// + sparkle;
  vec3 out_color = L;

  gl_FragColor = vec4(out_color, 1);
}
