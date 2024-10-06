import React, { useState, createContext, useContext, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



// import SimpleOrientationTracker from './没/getDeviderotation';
// import { DeviceOrientationControls } from "three/examples/jsm/controls/DeviceOrientationControls";


// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };
import { Overlay, Tooltip } from 'react-bootstrap';
// import Tooltip from 'react-bootstrap/Tooltip';
const CameraScan = ({ sceneProps }: any) => {


	// メッシュを追加する関数を外に定義
	const addMeshToScene = () => {
		const geometry2 = new THREE.PlaneGeometry(200, 200);
		const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide }); // 赤色に設定

		// Boxのメッシュを作成
		const plane = new THREE.Mesh(geometry2, material2);
		plane.rotation.y = Math.PI / 2;
		// 位置を (120, 0, 0) に設定
		plane.position.set(200, 0, 0);

		// シーンに追加
		sceneProps.scene.add(plane);

	};

	useEffect(() => {
		addMeshToScene();

	}, []); // シーンの変更に反応



	return (
		<div>
			カメラスキャン
			{/* <h2>カメラの回転</h2>
			{/* {`{${JSON.stringify(deviceQt)}}`} */}
			{/* {`${sceneProps}`} */}
			{/* <button onClick={() => addMeshToScene()}>aa</button> */}
			{/* <p>Alpha (Z軸): {orientation.alpha.toFixed(2)}°</p>
            <p>Beta (X軸): {orientation.beta.toFixed(2)}°</p>
            <p>Gamma (Y軸): {orientation.gamma.toFixed(2)}°</p> */}
		</div>
	);
}
export default CameraScan;