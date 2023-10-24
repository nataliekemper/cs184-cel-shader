varying vec4 v_normal;
varying vec4 v_position;
varying vec2 v_uv;
void main()	{
  vec3 worldNormal = normalize ( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );

  v_normal = vec4(normalize(worldNormal), 1.0); // I think normal is in world space
  v_position = modelMatrix * vec4(position, 0);
  v_uv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
