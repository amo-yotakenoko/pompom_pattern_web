import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../styles.css';
import * as Icon from 'react-bootstrap-icons';
import Help from "../Help"
import CameraScan from '../CameraScaan/CameraScan';


const Pompom = ({ meshList, sceneProps, setSceneProps, pattern, colorList, rollWidth, pitchWidth, selectColor, setPattern, activeMenu, drawDot, symmetryType }: any) => {
    // let tmpSelectId = selectColor;
    // useEffect(() => {
    //     tick();
    // }, [selectColor]);
    // const meshList = useRef<THREE.Mesh[]>([]);
    const wireMeshList = useRef<any>([]);
    const propsRef = useRef({ pattern, colorList, selectColor });
    useEffect(() => {
        propsRef.current = { pattern, colorList, selectColor };
    }, [pattern, colorList, selectColor]);
    useEffect(() => {

        updateColor();

        // });
    }, [pattern, colorList]);
    // const activeMenuRef = useRef("");
    useEffect(() => {
        console.log("mesh隠す", camera)
        // activeMenuRef.current = activeMenu;
        // if (renderer !== null) {
        wireMeshList.current.forEach((m: any) => {
            m.visible = activeMenu == "pompom" || activeMenu == "cameraScan" || activeMenu == "decoration"
            console.log(m.visible)
        });
        // renderer.render(scene, camera);
        // }
    }, [activeMenu])


    // カメラプレート隠す奴没
    // useEffect(() => {

    //     // if (activeMenu != "cameraScan") {
    //     console.log("オブジェクト")
    //     let cameraScanPlates: any = []
    //     if (sceneProps.scene) {
    //         console.log("オブジェクト2")
    //         sceneProps.scene.children.forEach((object: any) => {
    //             // console.log("オブジェクト", object)
    //             if (object.isCameraScanPlate) {
    //                 cameraScanPlates.push(object)
    //             }
    //         });
    //     }
    //     console.log(" cameraScanPlates ", cameraScanPlates);
    //     (async function () {
    //         for (let i = 0; i < 100; i++) {

    //             cameraScanPlates.forEach((obj: any) => {
    //                 let scale = obj.scale.x;
    //                 scale *= 0.9
    //                 obj.scale.set(scale, scale, scale)
    //                 obj.rotation.z += 0.1;
    //             });
    //             await new Promise(resolve => setTimeout(resolve, 1))

    //         }

    //     })();
    //     // }

    // }, [activeMenu])


    let canvas: any = null;
    let renderer: any = null;
    let scene: any = null;
    let camera: any = null;
    let controls: any;
    // const [sceneProps, setSceneProps] = useState({ canvas, renderer, scene, camera, controls });
    const cameraDistanceRef = useRef(800);
    const cameraPotitioinRef = useRef<any>(null);

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


        camera = new THREE.PerspectiveCamera(15, 1 / 1, 0.1, 10000);
        if (cameraPotitioinRef.current) {
            camera.position.set(cameraPotitioinRef.current.x, cameraPotitioinRef.current.y, cameraPotitioinRef.current.z);
        } else {

            camera.position.set(0, 0, cameraDistanceRef.current);
        }
        controls = new OrbitControls(camera, canvas);
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
                if (symmetryType == 1) {

                    for (let i = 0; i < vertices.length; i += 3) {
                        let tmp = vertices[i + 0];
                        vertices[i + 0] = vertices[i + 1];
                        vertices[i + 1] = tmp;

                        let tmp2 = vertices[i + 0];
                        vertices[i + 0] = vertices[i + 2];
                        vertices[i + 2] = tmp2;

                    }
                }

                let radiusCenter = Math.cos((pitchMin + pitchMax) / 2);

                let yawCenter = 2 * Math.PI * ((roll + 0.5) / rollWidth);
                let pitchCenter = Math.PI / 2 - Math.acos(1 - ((pitchWidth - (pitch + 0.5)) / pitchWidth));
                const centerPos = new THREE.Vector3(Math.sin(pitchCenter) * 100, Math.sin(yawCenter) * radiusCenter * 100, Math.cos(yawCenter) * radiusCenter * 100,);

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
                (mesh as any).centerPos = centerPos;
                meshList.current.push(mesh);
                console.log("mesh追加")
                mesh.name = "mesh" + `${{ r: roll, p: pitch }}`
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


        console.log("set", { canvas, renderer, scene, camera, controls })
        setSceneProps({ canvas, renderer, scene, camera, controls });


        // const geometry = new THREE.BoxGeometry(10, 10, 10);
        // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); 
        // const cube = new THREE.Mesh(geometry, material); 
        // scene.add(cube);


        renderer.render(scene, camera);

        // function drawDot(patternPos: any, selectColor: any) {

        //     try {
        //         if (propsRef.current.pattern[patternPos.r][patternPos.p] !== propsRef.current.selectColor) {
        //             console.log("ぬる", isDrwaing)
        //             console.log(propsRef.current.pattern[patternPos.r][patternPos.p], propsRef.current.selectColor, propsRef.current.pattern[patternPos.r][patternPos.p] !== propsRef.current.selectColor)

        //             let newPatternList = [...propsRef.current.pattern]
        //             newPatternList[patternPos.r][patternPos.p] = selectColor;
        //             setPattern(newPatternList);
        //         }
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }


        return () => {
            // cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
            // canvas.removeEventListener('pointermove', mouseUpdate);
            // window.removeEventListener('pointerdown', handlePointerDown);
            // window.removeEventListener('pointerup', handlePointerUp);
            console.log("ぽんぽん初期化")

            meshList.current.forEach((mesh: any) => {
                scene.remove(mesh);
                mesh.geometry.dispose();
                // mesh.material.dispose();
            });


            // renderer.dispose();
        };

    }, [rollWidth, pitchWidth]);


    const isDrwaing = useRef(false);
    useEffect(() => {

        let animationId: number;

        // isDrwaing.current = false

        // https://ics.media/tutorial-three/raycast/
        const raycaster = new THREE.Raycaster();

        console.log("sceneProps", sceneProps)
        if (!sceneProps) return



        // let isDrwaing = false




        // let mouse: any = new THREE.Vector2();
        function getMouse(event: any) {
            // console.log(event.clientX)
            // const element = event.currentTarget;
            const element = sceneProps.canvas;

            const x = event.clientX - element.offsetLeft;
            const y = event.clientY - element.offsetTop;

            const w = element.offsetWidth;
            const h = element.offsetHeight;
            let _mouse = new THREE.Vector2();

            _mouse.x = (x / w) * 2 - 1;
            _mouse.y = -(y / h) * 2 + 1;
            return _mouse
        }
        let intersects: any = []
        const handlePointerDown = (event: MouseEvent) => {
            console.log("event", event)
            const mouse = getMouse(event)
            raycaster.setFromCamera(mouse, sceneProps.camera);
            intersects = raycaster.intersectObjects(sceneProps.scene.children);

            isDrwaing.current = intersects.length > 0
            // console.log({ isDrwaing, controls });

            sceneProps.controls.rotateSpeed = isDrwaing.current ? 0 : 1;
            if (activeMenu != "pompom")
                controls.rotateSpeed = 1;

            // controls = new OrbitControls(camera, canvas);
            // controls.enableZoom = false
            // controls.enablePan = false
        };

        const handlePointerMove = (event: MouseEvent) => {
            const mouse = getMouse(event)
            raycaster.setFromCamera(mouse, sceneProps.camera);
            intersects = raycaster.intersectObjects(sceneProps.scene.children);
        };

        const handlePointerUp = () => {
            // controls.dispose();
            // console.log("pointerup")
            isDrwaing.current = false
        };

        if (activeMenu == "pompom") {

            sceneProps.canvas.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerdown', handlePointerDown);
            window.addEventListener('pointerup', handlePointerUp);
        }


        // tick();

        function tick() {
            if (activeMenu == "pompom" || activeMenu == "cameraScan" || activeMenu == "decoration") {
                console.log("tick");

                sceneProps.renderer.render(sceneProps.scene, sceneProps.camera);
                sceneProps.controls.update();
            } else {
                return
            }
            if (activeMenu == "pompom" && isDrwaing.current) {

                // raycaster.setFromCamera(mouse, sceneProps.camera);


                // const intersects = raycaster.intersectObjects(sceneProps.scene.children);
                console.log(intersects)
                meshList.current.map((mesh: any) => {

                    // console.log(intersects.length)
                    if (intersects.length > 0 && mesh === intersects[0].object) {

                        let patternPos = (mesh as any).patternPos;
                        drawDot(patternPos, propsRef.current.selectColor)

                    }
                });
            }
            // console.log(isDrwaing.current)


            animationId = requestAnimationFrame(tick);
        }

        tick();


        return () => {
            cancelAnimationFrame(animationId);
            sceneProps.canvas.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointerup', handlePointerUp);
        };


    }, [rollWidth, pitchWidth, pattern, colorList, selectColor, activeMenu, sceneProps])







    useEffect(() => {
        if (!sceneProps) return
        let counter = 0;
        const intervalId = setInterval(() => {

            const camera = sceneProps.camera;
            if (activeMenu == "pompom" || activeMenu == "decoration") {
                cameraDistanceRef.current -= Math.abs(cameraDistanceRef.current - 800) / 10 + 1;
            } else if (activeMenu == "cameraScan") {
                cameraDistanceRef.current += Math.abs(cameraDistanceRef.current - 2000) / 10 + 1;
                console.log("他の画面");
            } else if (activeMenu == "bluePrint") {
                cameraDistanceRef.current = 800;
            }

            cameraDistanceRef.current = Math.max(800, Math.min(2000, cameraDistanceRef.current));
            cameraPotitioinRef.current = camera.position;

            const newPosition = camera.position.clone().normalize().multiplyScalar(cameraDistanceRef.current);
            camera.position.set(newPosition.x, newPosition.y, newPosition.z);

            counter++;
            if (counter >= 100) {
                clearInterval(intervalId);
            }
        }, 16);


        return () => clearInterval(intervalId);
    }, [activeMenu]);



    // const size = Math.min(canvas.clientWidth, canvas.clientHeight);
    // const moveRef = useRef(null);
    return (

        // <div
        //     style={{
        //         position: "relative",
        //         width: "100%",
        //         aspectRatio: "1",
        //         border: "1px solid black",
        //     }}
        // >
        <canvas
            id="edit3d"
            className="no-margin"
            width="1024"
            height="1024"
            style={{ width: "100%", height: "100%" }}
        />





    )
};

export default Pompom;