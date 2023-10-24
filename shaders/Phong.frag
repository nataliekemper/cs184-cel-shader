#version 330

uniform vec4 u_color;
uniform vec3 u_cam_pos;
uniform vec3 u_light_pos;
uniform vec3 u_light_intensity;

in vec4 v_position;
in vec4 v_normal;
in vec2 v_uv;

out vec4 out_color;

void main() {
    // shader attributes:
    vec4 ambient_color = u_color + 0.25;
    vec4 spec_color = u_color + 1;
    
    vec4 light_color = u_color;
    vec4 rimColor = u_color + 2;
    float rimAmount = 1.5;
    
    float rim_threshold = 0.5;
    float rimAmount = 1.0;
    vec4 rim_color = u_color + 2;
    
    vec3 ka = vec3(0.1);
    vec3 kd = vec3(1.0);
    vec3 ks = vec3(0.5);
    vec3 ia = vec3(1.0, 1.0, 1.0);
    float p = 10.0; // bigger p -> smaller specular amount

    vec3 l = normalize(u_light_pos - v_position.xyz);
    float l_magnitude = length(l);
    float l_mag_squared = pow(l_magnitude, 2);

    // illumination from directional light
    //float NdotL = dot(v_normal.xyz, l);
    float NdotL = dot(u_light_pos, v_normal.xyz);
    
    float r = distance(u_light_pos, v_position.xyz);
    float r_sq = r * r;

    vec3 illum = u_light_intensity / (r_sq);
    vec3 v_vect = normalize(u_cam_pos - v_position.xyz);

    // diffuse
    float light_intensity = smoothstep(0, 0.01, NdotL);
    vec3 diffuse = kd * illum * max(0.0, dot(v_normal.xyz, l));
    vec3 light = light_intensity * light_color.xyz;

    // ambient
    vec3 ambient = ambient_color.xyz;

    //specular reflection
    vec3 half_vec = v_vect + l;
    vec3 h = half_vec / length(half_vec);

    float specular_angle = dot(v_normal.xyz, h);
    float specularIntensity = pow(max(0.0, specular_angle), p * p);
    float specularIntensitySmooth = smoothstep(0.005, 0.01, specularIntensity);
    vec3 specular = specularIntensitySmooth * spec_color.xyz;

    // sparkle
//    float sparkleDot = dot(l, v_normal.xyz);
//    float sparkleIntensity = sparkleDot * pow(dot(l, v_normal.xyz), rim_threshold);
//    sparkleIntensity = smoothstep(rimAmount - 0.01, rimAmount + 0.01, sparkleIntensity);
//    vec3 sparkle = sparkleIntensity * rim_color.xyz;
    
    // rim
    float rimDot = 1 - dot(v_vect, v_normal.xyz);
    float rimIntensity = rimDot * pow(NdotL, rim_threshold);
    rimIntensity = smoothstep(rimAmount - 0.01, rimAmount + 0.01, rimIntensity);
    vec3 rim = rimIntensity * rim_color.xyz;

    vec3 L = ambient + light + specular + rim;// + sparkle;
    vec4 L_4 = vec4(L, 1.0);

    out_color = u_color * L_4;
}
