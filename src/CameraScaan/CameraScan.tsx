import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import * as Icon from 'react-bootstrap-icons';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Camera from '../BluePrint/Camera';
import { Button, ProgressBar, Form } from 'react-bootstrap';

// import SimpleOrientationTracker from './没/getDeviderotation';
// import { DeviceOrientationControls } from "three/examples/jsm/controls/DeviceOrientationControls";


// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };
import { Overlay, Tooltip } from 'react-bootstrap';
// import Tooltip from 'react-bootstrap/Tooltip';
const CameraScan = ({ sceneProps, activeMenu }: any) => {


	// メッシュを追加する関数を外に定義
	const addMeshToScene = (pos: {
		x: number;
		y: number;
		z: number;
	}, rotate: number) => {
		const geometry2 = new THREE.PlaneGeometry(200, 200);



		const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, side: THREE.DoubleSide }); // 赤色に設定

		// Planeのメッシュを作成
		const plane = new THREE.Mesh(geometry2, material2);


		// 位置を (pos.x, pos.y, pos.z) に設定
		plane.position.set(pos.x, pos.y, pos.z);

		const lookAtDirection = new THREE.Vector3(0, 0, 0).sub(plane.position).normalize();
		const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), lookAtDirection);
		plane.quaternion.copy(quaternion);


		plane.rotation.z += rotate / 360 * (2 * Math.PI);
		// シーンに追加
		sceneProps.scene.add(plane);
		(plane as any).isCameraScanPlate = true;
		return { obj: plane };
	};

	const platesRef = useRef<any>([]);
	// const [plates, setPlates] = useState<any>([]);

	useEffect(() => {
		if (activeMenu != "cameraScan") return
		console.log("platesRef.current", platesRef.current)
		if (platesRef.current.length === 0) {
			const _plates = [

				addMeshToScene({ x: 0, y: 0, z: 200 }, 0),// 前
				addMeshToScene({ x: 0, y: 0, z: -200 }, 0),// 後ろ
				addMeshToScene({ x: 200, y: 0, z: 0 }, 0),//右
				addMeshToScene({ x: -200, y: 0, z: 0 }, 0),// 左
				addMeshToScene({ x: 0, y: 200, z: 0 }, 180),// 上
				addMeshToScene({ x: 0, y: -200, z: 0 }, 0),// 下
			]
			const texture = new THREE.TextureLoader().load("logo512.png");
			_plates.forEach((plate: any, i: number) => {
				plate.obj.material.map = texture; // 各 plate にテクスチャを適用
				plate.obj.material.needsUpdate = true;  // マテリアルを更新
			});
			platesRef.current = _plates
			console.log("プレート生成")
		}


	}, [activeMenu]); // シーンの変更に反応








	const videoRef = useRef<HTMLVideoElement>(null);
	const [devices, setDevices] = useState<any[]>([]);
	const [selectedDeviceId, setSelectedDeviceId] = useState<string | undefined>(undefined);
	const [videoOk, setVideoOk] = useState<boolean>(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [clipSize, setClipSize] = useState<any>(1);
	const [selectingPlate, setSelectingPlate] = useState<any>(0);

	// const activeMenuRef = useRef<any>("");
	// useEffect(() => {
	// 	let frameId: number;

	// 	const frameCountFunc = () => {

	// 		plateAnimation()

	// 		frameId = requestAnimationFrame(frameCountFunc);
	// 	};
	// 	frameId = requestAnimationFrame(frameCountFunc);

	// }, [acti]);

	useEffect(() => {


		let frameId: number;

		const frameCountFunc = () => {
			// selectPlate()
			// setFrameCount(prevCount => prevCount + 1);
			if (activeMenu == "cameraScan") {
				camera();
			}
			plateAnimation()

			frameId = requestAnimationFrame(frameCountFunc); // 次のフレームで実行
		};
		frameId = requestAnimationFrame(frameCountFunc); // 初回の呼び出し

		// クリーンアップ関数
		return () => cancelAnimationFrame(frameId);
	}, [videoOk, clipSize, selectingPlate, activeMenu]); // [] でマウント時に一度だけ実行


	// useEffect(() => {
	// 	// コンポーネントがアンマウントされるときに実行されるクリーンアップ関数
	// 	plates.forEach((plate: any, i: number) => {
	// 		plate.obj.scale.set(0, 0, 0); // 新しいスケールを設定
	// 	});
	// 	return () => {
	// 		console.log("アンマウント");

	// 		// (async function () {
	// 		console.log("隠す");

	// 		// })();
	// 	};
	// }, []);
	// function selectPlate() {

	// }

	useEffect(() => {
		if (!sceneProps.canvas) return
		sceneProps.canvas.addEventListener('click', onMouseClick, false);
		return () => {
			sceneProps.canvas.removeEventListener('click', onMouseClick, false);
		};
	}, [clipSize]); // plates に依存する useEffect


	function onMouseClick(event: any) {
		const raycaster = new THREE.Raycaster();
		const mouse = new THREE.Vector2();
		// マウスの位置を正規化
		mouse.x = (event.clientX / sceneProps.canvas.clientWidth) * 2 - 1;
		mouse.y = - (event.clientY / sceneProps.canvas.clientHeight) * 2 + 1;

		// レイキャストを更新
		raycaster.setFromCamera(mouse, sceneProps.camera);

		// オブジェクトを取得
		const intersects = raycaster.intersectObjects(sceneProps.scene.children);
		console.log("plate判定", intersects)
		if (intersects.length > 0) {
			// オブジェクトがタップされた場合
			console.log(intersects[0].object)
			platesRef.current.forEach((plate: any, i: number) => {
				console.log("判定", intersects[0].object, plate.obj)
				if (intersects[0].object == plate.obj) {
					setSelectingPlate(i)
				}
			});
			// ここでタップされたオブジェクトに対して何か処理を行う
		}
	}


	function camera() {
		if (!canvasRef.current) return
		if (!videoRef.current) return;
		// console.log("テクスチャ作成", videoRef.current.width)
		const ctx = canvasRef.current.getContext('2d');
		if (!ctx) return
		let squareSize = Math.min(canvasRef.current.width, canvasRef.current.height); // 正方形のサイズ
		squareSize *= clipSize;
		let centerX = videoRef.current.videoWidth / 2
		let centerY = videoRef.current.videoHeight / 2
		const xOffset = centerX - squareSize / 2; // X方向のオフセット
		const yOffset = centerY - squareSize / 2; // Y方向のオフセット
		ctx.drawImage(
			videoRef.current, // 描画元の画像（ビデオなど）
			xOffset, yOffset, // 描画元の開始位置
			squareSize, squareSize, // 切り抜く幅と高さ
			0, 0, // キャンバス上の描画開始位置
			canvasRef.current.width, canvasRef.current.height // キャンバス上に描画するサイズ
		);
		ctx.beginPath();
		ctx.arc(canvasRef.current.width / 2, canvasRef.current.height / 2, canvasRef.current.width / 2, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.clip(); // クリッピングを適用


		try {

			const texture = new THREE.CanvasTexture(canvasRef.current as any);
			platesRef.current[selectingPlate].obj.material.map = texture; // マテリアルのテクスチャを更新
			platesRef.current[selectingPlate].obj.material.needsUpdate = true; // マテリアルの更新を促す
		} catch (e) {
			console.log(e)
		}




	}
	function plateAnimation() {
		// console.log("plateanimation", activeMenuRef.current)
		platesRef.current.forEach((plate: any, i: number) => {
			let scale = plate.obj.scale.x;
			let target = (i === selectingPlate) ? 1 : 0.5;
			if (activeMenu != "cameraScan") target = 0;

			scale += (target - scale) * 0.1;
			plate.obj.scale.set(scale, scale, scale);
		});
	}

	// if (activeMenu != "cameraScan") {
	// 	return (<></>)
	// }
	return (
		<>
			{activeMenu == "cameraScan" && (

				<div style={{ background: "#F2356F" }}>
					カメラスキャン

					<video
						ref={videoRef}
						autoPlay
						style={{ width: '100%', border: '2px solid black' }}
					/>
					{!videoOk && <p>カメラを開いています...</p>}
					{videoOk && <p>カメラが開きました！</p>}




					<Camera
						videoRef={videoRef}
						devices={devices}
						setDevices={setDevices}
						setSelectedDeviceId={setSelectedDeviceId}
						selectedDeviceId={selectedDeviceId}
						setVideoOk={setVideoOk}
					/>

					<canvas
						ref={canvasRef}
						width={256} // キャンバスの幅を指定
						height={256} // キャンバスの高さを指定
						style={{ border: '2px solid black', width: '100%', height: 'auto' }}

					/>
					<Form.Range
						// value={clipSizeRef.current} // 内部状態を使用
						onChange={(e) => {
							setClipSize(parseFloat(e.target.value));
						}}
						value={clipSize}
						min={0.1}    // 最小値を0に設定
						max={1}    // 最大値を1に設定
						step={0.01}


					/>
					{selectingPlate}
					<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

					{/* <h2>カメラの回転</h2>
			{/* {`{${JSON.stringify(deviceQt)}}`} */}
					{/* {`${sceneProps}`} */}
					{/* <button onClick={() => addMeshToScene()}>aa</button> */}
					{/* <p>Alpha (Z軸): {orientation.alpha.toFixed(2)}°</p>
            <p>Beta (X軸): {orientation.beta.toFixed(2)}°</p>
            <p>Gamma (Y軸): {orientation.gamma.toFixed(2)}°</p> */}
				</div>
			)}
		</>
	);
}
export default CameraScan;