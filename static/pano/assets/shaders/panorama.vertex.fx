
attribute vec3 position;
attribute vec2 uv;

uniform mat4 worldViewProjection;

varying lowp vec2 vUV;

void main(void) {
	gl_Position = worldViewProjection * vec4(position, 1.0);
	vUV = vec2(uv[0], uv[1]);
}


