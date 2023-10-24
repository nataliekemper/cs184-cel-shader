// Inspired by https://github.com/OmarShehata/webgl-outlines/blob/main/threejs/src/CustomOutlinePass.js

import * as THREE from 'https://unpkg.com/three@0.108.0/build/three.module.js';
import { Pass } from 'https://unpkg.com/three@0.108.0/examples/jsm/postprocessing/Pass.js';

class OutlinePass extends Pass {

	constructor(scene, camera, uniforms) {
        super();

        this.normalDepthTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        this.fsQuad = new Pass.FullScreenQuad(null);
        this.scene = scene;
        this.camera = camera;
        this.extraUniforms = uniforms;
    }

    async loadMaterials(fragmentName) {
        this.normalDepthMaterial = new THREE.ShaderMaterial({
            uniforms: {},
            vertexShader: await (await fetch('shaders/default.vert')).text(),
            fragmentShader: await (await fetch(`shaders/normalDepth.frag`)).text()
        });

        this.outlineMaterial = new THREE.ShaderMaterial({
            uniforms: {
                ...this.extraUniforms,
                'u_normalDepth': { value: this.normalDepthTarget.texture },
                'u_color': { value: null },
            },
            vertexShader: await (await fetch('shaders/default.vert')).text(),
            fragmentShader: await (await fetch(`shaders/${fragmentName}.frag`)).text()
        });
	}

    setSize( size ) {
        this.normalDepthTarget.setSize(size.x, size.y);
    }

	render( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {
		this.outlineMaterial.uniforms['u_color'].value = readBuffer.texture;
		this.fsQuad.material = this.outlineMaterial;

        // First pass: render to the normal depth map
        const clearAlpha = renderer.getClearAlpha();
        const clearColor = renderer.getClearColor().clone();
        renderer.setClearColor(0, 0);

        this.scene.overrideMaterial = this.normalDepthMaterial;
        renderer.setRenderTarget( this.normalDepthTarget );
        renderer.render( this.scene, this.camera );
        this.scene.overrideMaterial = null;

        // Second pass: render with normal depth map and the original image
        renderer.setClearColor( clearColor, clearAlpha );
		if ( this.renderToScreen ) {
			renderer.setRenderTarget( null );
			this.fsQuad.render( renderer );
		} else {
			renderer.setRenderTarget( writeBuffer );
			this.fsQuad.render( renderer );
		}
	}
}

export { OutlinePass };
