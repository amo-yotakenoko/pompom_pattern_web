import React, { useState, createContext, useContext, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };
import { Overlay, Tooltip } from 'react-bootstrap';
// import Tooltip from 'react-bootstrap/Tooltip';
const CameraScan = ({ sceneProps }: any) => {


    const [deviceQt, setdeviceQt] = useState(new THREE.Quaternion());

    useEffect(() => {
        requestDeviceOrientationPermission()
    }, []);



    // https://qiita.com/okumura_daiki/items/16a09c9c0d0b2509d261
    function requestDeviceOrientationPermission() {
        if (
            (window as any).DeviceOrientationEvent &&
            typeof (window as any).DeviceOrientationEvent.requestPermission === 'function'
        ) {
            // iOS 13+ の Safari
            (window as any).DeviceOrientationEvent.requestPermission()
                .then((permissionState: any) => {
                    if (permissionState === 'granted') {
                        // 許可を得られた場合、deviceorientationをイベントリスナーに追加
                        window.addEventListener('deviceorientation', handleOrientation);
                    }
                })
                .catch(console.error);
        } else {
            // Androidやその他ブラウザの場合、イベントリスナーを直接追加
            window.addEventListener('deviceorientation', handleOrientation);
        }
    }



    const handleOrientation = (e: DeviceOrientationEvent) => {

        const beta = THREE.MathUtils.degToRad(e.beta as number);
        const alpha = THREE.MathUtils.degToRad(e.alpha as number);
        const gamma = THREE.MathUtils.degToRad(-(e.gamma as number));
        const _euler = new THREE.Euler();
        _euler.set(beta, alpha, -gamma, "ZXY"); // 仕様で決まってる順番
        const _qt = new THREE.Quaternion();
        _qt.setFromEuler(_euler);

        const _q1 = new THREE.Quaternion().setFromAxisAngle(
            new THREE.Vector3(1, 0, 0),
            -Math.PI / 2
        );

        _qt.multiply(_q1);




        setdeviceQt(_qt);
    };


    useEffect(() => {
        console.log("deviceQt", deviceQt, sceneProps.camera, sceneProps.controls);
        if (!deviceQt) return;

        // 補間の速度を調整

        sceneProps.camera.quaternion.slerp(deviceQt, 0.05); // より小さい値に変更


        const direction = new THREE.Vector3(1, 0, 0); // X軸方向
        direction.applyQuaternion(deviceQt); // カメラのクオータニオンで回転
        sceneProps.camera.position.copy(direction.multiplyScalar(800)); // 半径に基づいて位置を更新

        // 注視点をカメラの新しい位置に基づいて設定
        sceneProps.camera.lookAt(0, 0, 0); // 中心を見つめる
        sceneProps.controls.update();
    }, [deviceQt]);


    function test() {
        console.log(sceneProps.controls, sceneProps.controls.getAzimuthalAngle())
        // sceneProps.controls.setAzimuthalAngle(sceneProps.controls.getAzimuthalAngle() + Math.PI / 10);
        const time = Date.now() * 0.001; // 時間を取得

        sceneProps.camera.lookAt(0, 0, 0); // 注視点
        sceneProps.controls.update();
    }
    return (
        <div>
            <h2>カメラの回転</h2>
            {`{${JSON.stringify(deviceQt)}}`}
            {`${sceneProps}`}
            <button onClick={() => test()}>aa</button>
            {/* <p>Alpha (Z軸): {orientation.alpha.toFixed(2)}°</p>
            <p>Beta (X軸): {orientation.beta.toFixed(2)}°</p>
            <p>Gamma (Y軸): {orientation.gamma.toFixed(2)}°</p> */}
        </div>
    );
}
export default CameraScan;