
// Precision - could it be midp?
precision lowp float;

varying lowp vec2 vUV;

uniform sampler2D texture;
uniform float multiplier;

void main(void) {
	gl_FragColor = multiplier * texture2D(texture, vUV);
//	gl_FragColor[3] = 1.0;
}
