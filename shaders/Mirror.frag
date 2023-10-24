#version 330


uniform vec3 u_cam_pos;

uniform samplerCube u_texture_cubemap;

in vec4 v_position;
in vec4 v_normal;
in vec4 v_tangent;

out vec4 out_color;

void main() {
  // YOUR CODE HERE
    vec4 wo = vec4(u_cam_pos, 1.0) - v_position;
    vec4 wi = -reflect(wo, v_normal);
    vec3 wi_dir = vec3(wi);
    out_color = texture(u_texture_cubemap, wi_dir);
    //out_color = (vec4(1, 1, 1, 0) + v_normal) / 2;
    out_color.a = 1;
}
