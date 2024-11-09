import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
// import eyeModel from '/model/eye.fbx';

import { Button, ProgressBar, Form } from 'react-bootstrap';
// import SimpleOrientationTracker from './没/getDeviderotation';
// import { DeviceOrientationControls } from "three/examples/jsm/controls/DeviceOrientationControls";


// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };

// import Tooltip from 'react-bootstrap/Tooltip';
const ValueSetting = ({ value, onChange, min, max, step, label }: any) => {

	return (<>

		{label}
		<Form.Range

			value={value}
			onChange={onChange}
			min={min}
			max={max}
			step={0.01}
		/>

	</>);
}


export default ValueSetting;