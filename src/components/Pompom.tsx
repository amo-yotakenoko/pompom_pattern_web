import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


type PompomProps = {
    pattern: any;
    colorList: any;
    rollWidth: number;
    pitchWidth: number;
    selectColor: number;
    setPattern: any;
};

const Pompom: React.FC<PompomProps> = ({ pattern, colorList, rollWidth, pitchWidth, selectColor, setPattern }) => {
    // let tmpSelectId = selectColor;
    // useEffect(() => {
    //     tick();
    // }, [selectColor]);
    const meshList = useRef<THREE.Mesh[]>([]);
    const propsRef = useRef({ pattern, colorList, selectColor });
    useEffect(() => {
        propsRef.current = { pattern, colorList, selectColor };
    }, [pattern, colorList, selectColor]);
    useEffect(() => {

        updateColor();

        // });
    }, [pattern, colorList]);

    let canvas: any = null;

    function updateColor() {
        console.log("パレット更新", meshList)
        meshList.current.map((mesh: any) => {
            let patternPos = (mesh as any).patternPos;
            // console.log(patternPos)
            const p = patternPos.r + patternPos.p
            const i = p % propsRef.current.colorList[pattern[patternPos.r][patternPos.p]].length;

            let color = propsRef.current.colorList[pattern[patternPos.r][patternPos.p]][i];
            mesh.material.color.set(color);
        });
    }


    useEffect(() => {
        // console.log(name,  rollWidth, pitchWidth);


        // サイズを指定
        const size = Math.min(window.innerWidth, window.innerHeight);
        const width = size;
        const height = size;

        // レンダラーを作成
        canvas = document.querySelector("#edit3d") as HTMLCanvasElement;
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        // シーンを作成
        const scene = new THREE.Scene();

        // カメラを作成
        const camera = new THREE.PerspectiveCamera(15, width / height);
        camera.position.set(0, 0, +1000);
        let controls = new OrbitControls(camera, canvas);
        controls.enableZoom = false
        controls.enablePan = false

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


                const geometry = new THREE.BufferGeometry();
                // const vertices = new Float32Array([
                //     Math.sin(yawMin) * radiusMin * 100, Math.sin(pitchMin) * 100, Math.cos(yawMin) * radiusMin * 100,
                //     Math.sin(yawMax) * radiusMin * 100, Math.sin(pitchMin) * 100, Math.cos(yawMax) * radiusMin * 100,
                //     Math.sin(yawMax) * radiusMax * 100, Math.sin(pitchMax) * 100, Math.cos(yawMax) * radiusMax * 100,
                //     Math.sin(yawMin) * radiusMax * 100, Math.sin(pitchMax) * 100, Math.cos(yawMin) * radiusMax * 100,
                // ]);
                const vertices = new Float32Array([
                    Math.sin(pitchMax) * 100, Math.sin(yawMin) * radiusMax * 100, Math.cos(yawMin) * radiusMax * 100,
                    Math.sin(pitchMax) * 100, Math.sin(yawMax) * radiusMax * 100, Math.cos(yawMax) * radiusMax * 100,
                    Math.sin(pitchMin) * 100, Math.sin(yawMax) * radiusMin * 100, Math.cos(yawMax) * radiusMin * 100,
                    Math.sin(pitchMin) * 100, Math.sin(yawMin) * radiusMin * 100, Math.cos(yawMin) * radiusMin * 100,

                    -Math.sin(pitchMin) * 100, Math.sin(yawMin) * radiusMin * 100, Math.cos(yawMin) * radiusMin * 100,
                    -Math.sin(pitchMin) * 100, Math.sin(yawMax) * radiusMin * 100, Math.cos(yawMax) * radiusMin * 100,
                    -Math.sin(pitchMax) * 100, Math.sin(yawMax) * radiusMax * 100, Math.cos(yawMax) * radiusMax * 100,
                    -Math.sin(pitchMax) * 100, Math.sin(yawMin) * radiusMax * 100, Math.cos(yawMin) * radiusMax * 100,
                ]);


                geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

                const indices = new Uint16Array([
                    0, 1, 2, 0, 2, 3,
                    0 + 4, 1 + 4, 2 + 4, 0 + 4, 2 + 4, 3 + 4,
                ]);
                geometry.setIndex(new THREE.BufferAttribute(indices, 1));
                geometry.computeVertexNormals();
                // var randomColor = "rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")";
                // const material = new THREE.MeshBasicMaterial({ color: randomColor });
                const material = new THREE.MeshBasicMaterial({ color: "#ffffff" });
                // const material = new THREE.MeshToonMaterial({ color: "#ffffff" });

                const mesh = new THREE.Mesh(geometry, material);
                (mesh as any).patternPos = { r: roll, p: pitch };



                meshList.current.push(mesh);
                // シーンに追加
                scene.add(mesh);

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

        // function cameraControlEnableSet() {
        //     raycaster.setFromCamera(mouse, camera);

        //     // レイキャスターがシーン内のオブジェクトと交差しているかをチェックする
        //     const intersects = raycaster.intersectObjects(scene.children);
        //     // console.log(intersects.length)
        //     if (intersects.length > 0) {
        //         // 交差があった場合、OrbitControlsを無効化する
        //         controls.enabled = false;
        //     } else {
        //         // 交差がなかった場合、OrbitControlsを有効化する
        //         controls.enabled = true;
        //     }
        // }
        // let isMouseDowning = false
        let isDrwaing = false

        window.addEventListener('pointerup', (event: any) => {
            // controls.dispose();
            // console.log("pointerup")
            isDrwaing = false
        });
        window.addEventListener('pointerdown', (event: any) => {
            mouseUpdate(event)
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);

            isDrwaing = intersects.length > 0
            // console.log({ isDrwaing, controls });

            controls.rotateSpeed = isDrwaing ? 0 : 1;
            // controls = new OrbitControls(camera, canvas);
            // controls.enableZoom = false
            // controls.enablePan = false

        });

        // 毎フレーム時に実行されるループイベントです
        tick();

        function tick() {
            // box.rotation.y += 0.01;
            // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
            // console.log(propsRef)
            if (isDrwaing) {

                raycaster.setFromCamera(mouse, camera);

                // その光線とぶつかったオブジェクトを得る
                const intersects = raycaster.intersectObjects(scene.children);

                meshList.current.map((mesh: any) => {
                    // 交差しているオブジェクトが1つ以上存在し、
                    // 交差しているオブジェクトの1番目(最前面)のものだったら
                    // console.log(intersects.length)
                    if (intersects.length > 0 && mesh === intersects[0].object) {
                        // 色を赤くする
                        // console.log((mesh as any).patternPos)
                        let patternPos = (mesh as any).patternPos;

                        // pattern[patternPos.r, patternPos.p] = propsRef.current.selectColor
                        if (propsRef.current.pattern[patternPos.r][patternPos.p] !== propsRef.current.selectColor) {
                            console.log("ぬる", isDrwaing)
                            console.log(propsRef.current.pattern[patternPos.r][patternPos.p], propsRef.current.selectColor, propsRef.current.pattern[patternPos.r][patternPos.p] !== propsRef.current.selectColor)

                            let newPatternList = [...propsRef.current.pattern]
                            newPatternList[patternPos.r][patternPos.p] = propsRef.current.selectColor;
                            setPattern(newPatternList);
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


            renderer.render(scene, camera); // レンダリング

            requestAnimationFrame(tick);
        }


    }, []);


    return <div>
        <canvas id="edit3d" />
        { }
    </div>;
};

export default Pompom;