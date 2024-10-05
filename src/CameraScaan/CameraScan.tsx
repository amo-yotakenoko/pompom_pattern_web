import React, { useState, createContext, useContext, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



import SimpleOrientationTracker from './没/getDeviderotation';
// import { DeviceOrientationControls } from "three/examples/jsm/controls/DeviceOrientationControls";


// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };
import { Overlay, Tooltip } from 'react-bootstrap';
// import Tooltip from 'react-bootstrap/Tooltip';
const CameraScan = ({ sceneProps }: any) => {


	return (
		<div>
			<h2>カメラの回転</h2>
			{/* {`{${JSON.stringify(deviceQt)}}`} */}
			{/* {`${sceneProps}`} */}
			{/* <button onClick={() => test()}>aa</button> */}
			{/* <p>Alpha (Z軸): {orientation.alpha.toFixed(2)}°</p>
            <p>Beta (X軸): {orientation.beta.toFixed(2)}°</p>
            <p>Gamma (Y軸): {orientation.gamma.toFixed(2)}°</p> */}
		</div>
	);
}
export default CameraScan;