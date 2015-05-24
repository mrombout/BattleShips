uniform sampler2D texture;
varying vec2 vUV;

void main() {
  vec4 test = texture2D(texture, vUV);
  gl_FragColor = vec4(test.xyz, test.w);
}