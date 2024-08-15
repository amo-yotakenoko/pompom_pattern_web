import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


type PompomInitProps = {
    name: string;
    rollWidth: number;
    pitchWidth: number;
};
let colorPalette = [
    "#FFFFFF", // white
    "#FF5733", // Red-Orange
    "#FFBD33", // Orange-Yellow
    "#FFFF33", // Yellow
    "#B6FF33", // Yellow-Green
    "#33FF57", // Green
    "#33FFBD", // Green-Cyan
    "#33FFFF", // Cyan
    "#33B6FF", // Cyan-Blue
    "#3357FF", // Blue
    "#BD33FF", // Purple
    "#FF33FF", // Magenta
    "#FF33B6"  // Pink
];
let pattern: any;
const PompomInit: React.FC<PompomInitProps> = ({ name, rollWidth, pitchWidth }) => {
    useEffect(() => {
        // console.log(name,  rollWidth, pitchWidth);

        pattern = [];
        for (let i = 0; i < rollWidth; i++) {
            pattern[i] = [];
            for (let j = 0; j < pitchWidth; j++) {
                pattern[i][j] = 0;
            }
        }

        // サイズを指定
        const size = Math.min(window.innerWidth, window.innerHeight);
        const width = size;
        const height = size;

        // レンダラーを作成
        const canvas = document.querySelector("#edit3d") as HTMLCanvasElement;
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        // シーンを作成
        const scene = new THREE.Scene();

        // カメラを作成
        const camera = new THREE.PerspectiveCamera(15, width / height);
        camera.position.set(0, 0, +1000);
        const controls = new OrbitControls(camera, document.body);
        controls.enableZoom = false
        controls.enablePan = false
        const meshList: any = [];
        for (let roll = 0; roll < rollWidth; roll++) {
            for (let pitch = 0; pitch < pitchWidth; pitch++) {
                console.log({ yaw: roll, pitch })
                let yawMin = 2 * Math.PI * (roll / rollWidth);
                let yawMax = 2 * Math.PI * ((roll + 1) / rollWidth);

                let pitchMin = Math.PI * (pitch / pitchWidth) / 2;
                let pitchMax = Math.PI * ((pitch + 1) / pitchWidth) / 2;
                console.log({
                    pitchMin: pitchMin * (180 / Math.PI),
                    pitchMax: pitchMax * (180 / Math.PI)
                });
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
                ]);


                geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

                const indices = new Uint16Array([
                    0, 1, 2, 0, 2, 3
                ]);
                geometry.setIndex(new THREE.BufferAttribute(indices, 1));
                geometry.computeVertexNormals();
                var randomColor = "rgb(" + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ", " + (~~(256 * Math.random())) + ")";
                // マテリアル（材質）を作成
                const material = new THREE.MeshBasicMaterial({ color: randomColor });
                // const material = new THREE.MeshNormalMaterial();

                const mesh = new THREE.Mesh(geometry, material);
                (mesh as any).patternPos = { r: roll, p: pitch };



                meshList.push(mesh);
                // シーンに追加
                scene.add(mesh);

            }
        }
        // https://ics.media/tutorial-three/raycast/
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        canvas.addEventListener('mousemove', (event: any) => {
            const element = event.currentTarget;
            // canvas要素上のXY座標
            const x = event.clientX - element.offsetLeft;
            const y = event.clientY - element.offsetTop;
            // canvas要素の幅・高さ
            const w = element.offsetWidth;
            const h = element.offsetHeight;

            // -1〜+1の範囲で現在のマウス座標を登録する
            mouse.x = (x / w) * 2 - 1;
            mouse.y = -(y / h) * 2 + 1;
        });
        // 毎フレーム時に実行されるループイベントです
        tick();
        function tick() {
            // box.rotation.y += 0.01;
            // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成



            raycaster.setFromCamera(mouse, camera);

            // その光線とぶつかったオブジェクトを得る
            const intersects = raycaster.intersectObjects(scene.children);

            meshList.map((mesh: any) => {
                // 交差しているオブジェクトが1つ以上存在し、
                // 交差しているオブジェクトの1番目(最前面)のものだったら
                if (intersects.length > 0 && mesh === intersects[0].object) {
                    // 色を赤くする
                    // console.log((mesh as any).patternPos)
                    let patternPos = (mesh as any).patternPos;
                    pattern[patternPos.r, patternPos.p] = 1
                    let color = colorPalette[pattern[patternPos.r, patternPos.p]];
                    mesh.material.color.set(color);
                } else {
                    // それ以外は元の色にする
                    // mesh.material.color.set(colorPalette[0]);
                }

            });


            renderer.render(scene, camera); // レンダリング

            requestAnimationFrame(tick);
        }


    }, []);

    return <canvas id="edit3d" />;
};

export default PompomInit;