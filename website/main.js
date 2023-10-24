import * as THREE from 'https://unpkg.com/three@0.108.0/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js';
import {OBJLoader} from 'https://unpkg.com/three@0.108.0/examples/jsm/loaders/OBJLoader.js';
import {GLTFLoader} from 'https://unpkg.com/three@0.108.0/examples/jsm/loaders/GLTFLoader.js';
import {FBXLoader} from 'https://unpkg.com/three@0.108.0/examples/jsm/loaders/FBXLoader.js';

import {EffectComposer} from 'https://unpkg.com/three@0.108.0/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'https://unpkg.com/three@0.108.0/examples/jsm/postprocessing/RenderPass.js';
import {ShaderPass} from 'https://unpkg.com/three@0.108.0/examples/jsm/postprocessing/ShaderPass.js';
import * as dat from 'https://unpkg.com/dat.gui@0.7.9/build/dat.gui.module.js';

import {OutlinePass} from './OutlinePass.js';

class ColorGUIHelper { // https://threejs.org/manual/en/lights.html
    constructor(object, prop) {
        this.object = object;
        this.prop = prop;
    }
    get value() {
        return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
        this.object[this.prop].set(hexString);
    }
}

function resizeRendererToDisplaySize(composer, renderer) { // https://threejs.org/manual/#en/responsive
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width  = canvas.clientWidth  * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        composer.setSize(width, height, false);
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function handleErrors(err) { // Log errors to the page
    console.error(err);
    const log = document.createElement('pre');
    log.className = 'log';
    log.textContent = err.message;
    document.body.appendChild(log);
}

async function loadMaterial(fragName, uniforms) { // Create a material with a given fragment shader
    return new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: await (await fetch('shaders/default.vert')).text(),
        fragmentShader: await (await fetch(`shaders/${fragName}.frag`)).text()
    });
}

async function loadModel(model, material) { // Return a mesh given an object name (Sphere, Llama, etc)
    if (model == 'Sphere') return new THREE.Mesh(new THREE.SphereGeometry(3, 128, 64), material);
    if (model == 'Box') return new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), material);

    if (model == 'Llama') {
        const loader = new FBXLoader();
        const llama = await new Promise(r => loader.load('llama.fbx', r));
        const mesh = llama.children[0];
        mesh.rotation.z = 3.14 / 2;
        mesh.scale.set(1, 1, 1);
        mesh.traverse(child => {
            if (child instanceof THREE.Mesh) child.material = material;
        });
        return mesh;
    } else if (model == 'Rose') {
        const loader = new GLTFLoader();
        const gltf = await new Promise(r => loader.load('rose.glb', r));
        const mesh = gltf.scene.children[0];
        mesh.position.y = -10;
        mesh.scale.set(.5, .5, .5);
        mesh.traverse(child => {
            if (child instanceof THREE.Mesh) child.material = material;
        });
        return mesh;
    } else if (model == 'Boy') {
        const loader = new FBXLoader();
        const boy = await new Promise(r => loader.load('boyFinal.fbx', r));
        const mesh = boy.children[0];
        mesh.position.y = -5;
        mesh.traverse(child => {
            if (child instanceof THREE.Mesh) child.material = material;
        });
        return mesh;
    }
}

(async () => {
    const canvas = document.getElementById('canvas');
    const renderer = new THREE.WebGLRenderer({ canvas });

    const scene = new THREE.Scene();
    const resolution = new THREE.Vector2();

    const loader = new THREE.TextureLoader();
    const texture = await new Promise(r => loader.load('paper-texture.jpg', r));

    texture.needsUpdate = true;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3,3); // repeat 3 times

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000); // fov, aspect, near, far
    camera.position.z = 20;

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const controls = new OrbitControls(camera, renderer.domElement);

    const light = new THREE.PointLight(0xffffff, 200);
    light.position.set(-9, 5, 2);
    scene.add(light);

    const materialOpts = { ambient: new THREE.Color(0x6e0d13),
                           diffuse: new THREE.Color(0xfc1414),
                           specular: new THREE.Color(0xff8f8f),
                           outline: new THREE.Color(0xffffff),
                           background: new THREE.Color(0x000000),
                           rim: new THREE.Color(0xff5557),
                           model: 'Llama',
                           shader: 'toon',
                           outliner: 'outline',
                           thickness: 3,
                         };
    let hashOpts = window.location.hash.substring(1);
    hashOpts = hashOpts ? JSON.parse(atob(hashOpts)) : {};
    Object.keys(hashOpts).forEach(k => {
        if (materialOpts[k] instanceof THREE.Color) hashOpts[k] = new THREE.Color(hashOpts[k]);
        materialOpts[k] = hashOpts[k];
    });

    const updateLocation = () => window.location.hash = btoa(JSON.stringify(materialOpts));

    const uniforms = { // Stuff that's passed to the shader!
        u_ambient_color: { type: "v3", value: materialOpts.ambient },
        u_diffuse_color: { type: "v3", value: materialOpts.diffuse },
        u_specular_color: { type: "v3", value: materialOpts.specular },
        u_rim_color: { type: "v3", value: materialOpts.rim },
        u_light_pos: { type: "v3", value: light.position },
        u_light_color: { type: "v3", value: light.color },
        u_outline_color: { type: "v3", value: materialOpts.outline },
        u_light_intensity: { type: "f", value: light.intensity },
        u_paper_texture: { type: 's', value: texture },
        u_outline_thickness: { type: "f", value: materialOpts.thickness },

        // extra stuff
        u_resolution: { type: "v2", value: resolution },
        u_time: { type: "f", value: 0 },
    };

    let material = await loadMaterial(materialOpts.shader, uniforms);
    let mesh = await loadModel(materialOpts.model, material);
    scene.add(mesh);

    const outlinePass = new OutlinePass(scene, camera, uniforms);
    await outlinePass.loadMaterials(materialOpts.outliner);
    composer.addPass(outlinePass);

    // Set up the GUI
    const gui = new dat.GUI({name: 'My GUI'});
    gui.addColor(new ColorGUIHelper(materialOpts, 'ambient'), 'value').onFinishChange(updateLocation).name('Ambient Color');
    gui.addColor(new ColorGUIHelper(materialOpts, 'diffuse'), 'value').onFinishChange(updateLocation).name('Diffuse Color');
    gui.addColor(new ColorGUIHelper(materialOpts, 'specular'), 'value').onFinishChange(updateLocation).name('Specular Color');
    gui.addColor(new ColorGUIHelper(materialOpts, 'rim'), 'value').onFinishChange(updateLocation).name('Rim Color');
    gui.addColor(new ColorGUIHelper(light, 'color'), 'value').name('Light Color');
    gui.addColor(new ColorGUIHelper(materialOpts, 'outline'), 'value').onFinishChange(updateLocation).name('Outline Color');
    gui.addColor(new ColorGUIHelper(materialOpts, 'background'), 'value').onFinishChange(updateLocation).name('Background');
    const lightFolder = gui.addFolder('Light Position');
    lightFolder.add(light.position, 'x');
    lightFolder.add(light.position, 'y');
    lightFolder.add(light.position, 'z');

    gui.add(materialOpts, 'model', ['Llama', 'Rose', 'Sphere', 'Box', 'Boy']).onChange(model => (async () => {
        scene.remove(mesh);
        mesh = await loadModel(model, material);
        scene.add(mesh);
        updateLocation(materialOpts);
    })().catch(handleErrors));

    gui.add(materialOpts, 'shader', { 'Toon': 'toon', 'Blinn-Phong': 'phong', 'Normals': 'normal', 'Irridescent': 'irridescent', 'Weird': 'weird', 'Watercolor': 'watercolor' }).onChange(shader => (async () => {
        material = await loadMaterial(materialOpts.shader, uniforms);
        mesh.traverse(child => {
            if (child instanceof THREE.Mesh) child.material = material;
        });
        updateLocation(materialOpts);
    })().catch(handleErrors));
    gui.add(materialOpts, 'outliner', { 'Outline': 'outline', 'Outline Norms': 'outline_normals', 'Watercolor': 'outline_watercolor' }).onChange(shader => (async () => {
        await outlinePass.loadMaterials(materialOpts.outliner);
        updateLocation(materialOpts);
    })().catch(handleErrors));

    gui.add(materialOpts, 'thickness').onFinishChange(updateLocation).name('Outline Width');
    gui.add(outlinePass, 'enabled').name('Enable Outline');

    // Test render and check for errors
    renderer.render(scene, camera);
    if (material.program.diagnostics && !material.program.diagnostics.runnable) {
        throw new Error(material.program.diagnostics.programLog);
    }

    const beginning = Date.now();
    function animate() {
        requestAnimationFrame(animate);
        if (resizeRendererToDisplaySize(composer, renderer)) {
            renderer.getSize(resolution);
            outlinePass.setSize(resolution);
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        renderer.setClearColor(materialOpts.background);
        uniforms.u_time.value = (Date.now() - beginning) / 1000;
        uniforms.u_outline_thickness.value = materialOpts.thickness;

        composer.render();
    }

    animate();
})().catch(handleErrors);
