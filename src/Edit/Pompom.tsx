import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../styles.css';

type PompomProps = {
    pattern: any;
    colorList: any;
    rollWidth: number;
    pitchWidth: number;
    selectColor: number;
    setPattern: any;
    activeMenu: any;
};

const Pompom: React.FC<PompomProps> = ({ pattern, colorList, rollWidth, pitchWidth, selectColor, setPattern, activeMenu }) => {
    // let tmpSelectId = selectColor;
    // useEffect(() => {
    //     tick();
    // }, [selectColor]);
    const meshList = useRef<THREE.Mesh[]>([]);
    const wireMeshList = useRef<any>([]);
    const propsRef = useRef({ pattern, colorList, selectColor });
    useEffect(() => {
        propsRef.current = { pattern, colorList, selectColor };
    }, [pattern, colorList, selectColor]);
    useEffect(() => {

        updateColor();

        // });
    }, [pattern, colorList]);
    useEffect(() => {
        console.log("mesh隠す", camera)
        // if (renderer !== null) {
        wireMeshList.current.forEach((m: any) => {
            m.visible = activeMenu == "pompom"
            console.log(m.visible)
        });
        // renderer.render(scene, camera);
        // }
    }, [activeMenu])

    let canvas: any = null;
    let renderer: any = null;
    let scene: any = null;
    let camera: any = null;

    function updateColor() {
        try {
            console.log("パレット更新", meshList)
            meshList.current.map((mesh: any) => {
                let patternPos = (mesh as any).patternPos;
                // console.log(patternPos)
                const p = patternPos.r + patternPos.p
                let colors = propsRef.current.colorList[pattern[patternPos.r][patternPos.p]]
                // console.log(colors)
                if (colors !== undefined) {

                    const i = p % colors.length;

                    let color = colors[i];
                    mesh.material.color.set(color);
                }
            });
        } catch (error) {
            console.log("updateColorでエラー", error)
        }
    }


    useEffect(() => {
        // console.log(name,  rollWidth, pitchWidth);


        canvas = document.querySelector("#edit3d") as HTMLCanvasElement;
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
        // window.addEventListener('resize', resize);
        // resize()
        function resize() {

            const size = Math.min(canvas.clientWidth, canvas.clientHeight);
            const width = size;
            const height = size;
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(width, height);
            console.log("resize", document.body.clientWidth)

        }


        scene = new THREE.Scene();


        camera = new THREE.PerspectiveCamera(15, 1 / 1);
        camera.position.set(0, 0, +800);
        let controls = new OrbitControls(camera, canvas);
        controls.enableZoom = false
        controls.enablePan = false


        // controls.autoRotate = true;
        // controls.autoRotateSpeed = 2.0; 


        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5).normalize();
        scene.add(directionalLight);

        for (let roll = 0; roll < rollWidth; roll++) {
            for (let pitch = 0; pitch < pitchWidth; pitch++) {
                // console.log({ yaw: roll, pitch })
                let yawMin = 2 * Math.PI * (roll / rollWidth);
                let yawMax = 2 * Math.PI * ((roll + 1) / rollWidth);




                // let pitchMin = Math.PI * (pitch / pitchWidth) / 2;
                // let pitchMax = Math.PI * ((pitch + 1) / pitchWidth) / 2;


                let pitchMin = Math.PI / 2 - Math.acos(1 - ((pitchWidth - pitch) / pitchWidth));
                let pitchMax = Math.PI / 2 - Math.acos(1 - ((pitchWidth - (pitch + 1)) / pitchWidth));



                // console.log({
                //     pitchMin: pitchMin * (180 / Math.PI),
                //     pitchMax: pitchMax * (180 / Math.PI)
                // });
                let radiusMin = Math.cos(pitchMin);
                let radiusMax = Math.cos(pitchMax);
                // let radiusMin = 1;
                // let radiusMax = 1;


                // const vertices = new Float32Array([
                //     Math.sin(yawMin) * radiusMin * 100, Math.sin(pitchMin) * 100, Math.cos(yawMin) * radiusMin * 100,
                //     Math.sin(yawMax) * radiusMin * 100, Math.sin(pitchMin) * 100, Math.cos(yawMax) * radiusMin * 100,
                //     Math.sin(yawMax) * radiusMax * 100, Math.sin(pitchMax) * 100, Math.cos(yawMax) * radiusMax * 100,
                //     Math.sin(yawMin) * radiusMax * 100, Math.sin(pitchMax) * 100, Math.cos(yawMin) * radiusMax * 100,
                // ]);

                let vertices = [
                    Math.sin(pitchMax) * 100, Math.sin(yawMin) * radiusMax * 100, Math.cos(yawMin) * radiusMax * 100,
                    Math.sin(pitchMax) * 100, Math.sin(yawMax) * radiusMax * 100, Math.cos(yawMax) * radiusMax * 100,
                    Math.sin(pitchMin) * 100, Math.sin(yawMax) * radiusMin * 100, Math.cos(yawMax) * radiusMin * 100,
                    Math.sin(pitchMin) * 100, Math.sin(yawMin) * radiusMin * 100, Math.cos(yawMin) * radiusMin * 100,

                    -Math.sin(pitchMin) * 100, Math.sin(yawMin) * radiusMin * 100, Math.cos(yawMin) * radiusMin * 100,
                    -Math.sin(pitchMin) * 100, Math.sin(yawMax) * radiusMin * 100, Math.cos(yawMax) * radiusMin * 100,
                    -Math.sin(pitchMax) * 100, Math.sin(yawMax) * radiusMax * 100, Math.cos(yawMax) * radiusMax * 100,
                    -Math.sin(pitchMax) * 100, Math.sin(yawMin) * radiusMax * 100, Math.cos(yawMin) * radiusMax * 100,
                ];

                const indices = new Uint16Array([
                    0, 1, 2, 0, 2, 3,
                    0 + 4, 1 + 4, 2 + 4, 0 + 4, 2 + 4, 3 + 4,
                ]);


                const geometry = new THREE.BufferGeometry();
                geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));

                geometry.setIndex(new THREE.BufferAttribute(indices, 1));
                geometry.computeVertexNormals();
                const material = new THREE.MeshBasicMaterial({ color: "#ffffff" });

                const mesh = new THREE.Mesh(geometry, material);
                (mesh as any).patternPos = { r: roll, p: pitch };
                meshList.current.push(mesh);
                scene.add(mesh);

                const Meshvertices: any = [];
                const bias = 1.01
                const pushMeshvertices = function (v: number) {

                    Meshvertices.push(vertices[v * 3] * bias, vertices[v * 3 + 1] * bias, vertices[v * 3 + 2] * bias);
                };
                pushMeshvertices(0)
                pushMeshvertices(1)
                pushMeshvertices(1)
                pushMeshvertices(2)
                pushMeshvertices(2)
                pushMeshvertices(3)
                pushMeshvertices(3)
                pushMeshvertices(0)

                pushMeshvertices(0 + 4)
                pushMeshvertices(1 + 4)
                pushMeshvertices(1 + 4)
                pushMeshvertices(2 + 4)
                pushMeshvertices(2 + 4)
                pushMeshvertices(3 + 4)
                pushMeshvertices(3 + 4)
                pushMeshvertices(0 + 4)
                // pushMeshvertices(3)
                // pushMeshvertices(1)

                const meshGeometry = new THREE.BufferGeometry();
                meshGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(Meshvertices), 3));

                // const edgesGeometry = new THREE.EdgesGeometry(geometry);
                const meshMaterial = new THREE.LineBasicMaterial({ color: "#111111", linewidth: 0 });
                const edges = new THREE.LineSegments(meshGeometry, meshMaterial);
                // if (roll == 5 && pitch == 5)
                wireMeshList.current.push(edges);
                scene.add(edges);


                // const wireframeGeometry = new THREE.WireframeGeometry(geometry);
                // const wireframeMaterial = new THREE.LineBasicMaterial({ color: "#ffffff", linewidth: 1, });
                // const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
                // const wireMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
                // (wireMesh as any).patternPos = { r: roll, p: pitch };
                // meshList.current.push(wireMesh);
                // scene.add(wireframe);




            }
        }
        updateColor()
        // https://ics.media/tutorial-three/raycast/
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        canvas.addEventListener('pointermove', (event: any) => {
            mouseUpdate(event)
        });
        function mouseUpdate(event: any) {
            // console.log(event.clientX)
            // const element = event.currentTarget;
            const element = canvas;
            // canvas要素上のXY座標
            const x = event.clientX - element.offsetLeft;
            const y = event.clientY - element.offsetTop;
            // canvas要素の幅・高さ
            const w = element.offsetWidth;
            const h = element.offsetHeight;

            // -1〜+1の範囲で現在のマウス座標を登録する
            mouse.x = (x / w) * 2 - 1;
            mouse.y = -(y / h) * 2 + 1;
        }


        let isDrwaing = false




        const handlePointerDown = (event: MouseEvent) => {
            mouseUpdate(event)
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);

            isDrwaing = intersects.length > 0
            // console.log({ isDrwaing, controls });

            controls.rotateSpeed = isDrwaing ? 0 : 1;
            // controls = new OrbitControls(camera, canvas);
            // controls.enableZoom = false
            // controls.enablePan = false
        };

        const handlePointerUp = () => {
            // controls.dispose();
            // console.log("pointerup")
            isDrwaing = false
        };

        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointerup', handlePointerUp);


        tick();

        function tick() {

            // box.rotation.y += 0.01;

            // console.log(propsRef)
            if (isDrwaing) {

                raycaster.setFromCamera(mouse, camera);


                const intersects = raycaster.intersectObjects(scene.children);

                meshList.current.map((mesh: any) => {

                    // console.log(intersects.length)
                    if (intersects.length > 0 && mesh === intersects[0].object) {

                        // console.log((mesh as any).patternPos)
                        let patternPos = (mesh as any).patternPos;

                        // pattern[patternPos.r, patternPos.p] = propsRef.current.selectColor
                        try {

                            if (propsRef.current.pattern[patternPos.r][patternPos.p] !== propsRef.current.selectColor) {
                                console.log("ぬる", isDrwaing)
                                console.log(propsRef.current.pattern[patternPos.r][patternPos.p], propsRef.current.selectColor, propsRef.current.pattern[patternPos.r][patternPos.p] !== propsRef.current.selectColor)

                                let newPatternList = [...propsRef.current.pattern]
                                newPatternList[patternPos.r][patternPos.p] = propsRef.current.selectColor;
                                setPattern(newPatternList);
                            }
                        } catch (e) {
                            console.log(e)
                        }


                        // meshList.current.map((mesh: any) => {
                        //     let patternPos = (mesh as any).patternPos;
                        //     console.log(patternPos)
                        //     let color = propsRef.current.colorList[pattern[patternPos.r][patternPos.p]];
                        //     mesh.material.color.set(color);
                        // });

                        // let color = propsRef.current.colorList[pattern[patternPos.r][patternPos.p]];
                        // mesh.material.color.set(color);
                    }

                });
            }
            controls.update();

            renderer.render(scene, camera);

            requestAnimationFrame(tick);
        }


        return () => {

            window.removeEventListener('resize', resize);
            canvas.removeEventListener('pointermove', mouseUpdate);
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointerup', handlePointerUp);


            meshList.current.forEach(mesh => {
                scene.remove(mesh);
                mesh.geometry.dispose();
                // mesh.material.dispose();
            });


            renderer.dispose();
        };

    }, [rollWidth, pitchWidth]);

    // const size = Math.min(canvas.clientWidth, canvas.clientHeight);
    return (
        <canvas id="edit3d" className="no-margin" width="1024" height="1024" style={{
            border: "1px solid black", width: "100%",
            aspectRatio: "1"
        }
        } />
    )
};

export default Pompom;