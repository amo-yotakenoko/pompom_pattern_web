import * as THREE from 'three';

class SimpleOrientationTracker {
    private deviceOrientation: DeviceOrientationEvent;
    private screenOrientation: number;
    private _zee: THREE.Vector3;
    private _euler: THREE.Euler;
    private _q0: THREE.Quaternion;
    private _q1: THREE.Quaternion;
    private quaternion: THREE.Quaternion;

    constructor() {
        this.deviceOrientation = {} as DeviceOrientationEvent; // 初期値を空オブジェクトとして設定
        this.screenOrientation = 0;

        this._zee = new THREE.Vector3(0, 0, 1);
        this._euler = new THREE.Euler();
        this._q0 = new THREE.Quaternion();
        this._q1 = new THREE.Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5)); // - PI/2 around the x-axis
        this.quaternion = new THREE.Quaternion();

        // センサーの許可を要求
        this.requestPermission();
    }

    private requestPermission() {
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            (DeviceOrientationEvent as any).requestPermission()
                .then((response: any) => { // responseをany型に設定
                    if (response === 'granted') {
                        this.connect();
                    } else {
                        console.error('Device orientation permission denied.');
                    }
                })
                .catch((error: any) => { // errorをany型に設定
                    console.error('Unable to request device orientation permission:', error);
                });
        } else {
            // iOS 13未満、またはその他のブラウザの場合は、直接接続
            this.connect();
        }
    }

    private connect() {
        window.addEventListener('deviceorientation', this.onDeviceOrientationChange.bind(this));
        window.addEventListener('orientationchange', this.onScreenOrientationChange.bind(this));
        this.onScreenOrientationChange(); // 初回呼び出し
    }

    private onDeviceOrientationChange(event: DeviceOrientationEvent) {
        this.deviceOrientation = event;
        this.updateQuaternion();
    }

    private onScreenOrientationChange() {
        this.screenOrientation = window.orientation || 0;
    }

    private updateQuaternion() {
        if (this.deviceOrientation.alpha !== null && this.deviceOrientation.beta !== null && this.deviceOrientation.gamma !== null) {
            const alpha = THREE.MathUtils.degToRad(this.deviceOrientation.alpha);
            const beta = THREE.MathUtils.degToRad(this.deviceOrientation.beta);
            const gamma = THREE.MathUtils.degToRad(this.deviceOrientation.gamma);
            const orient = THREE.MathUtils.degToRad(this.screenOrientation);

            this._euler.set(beta, alpha, -gamma, 'YXZ'); // 'ZXY' for the device, but 'YXZ' for us
            this.quaternion.setFromEuler(this._euler); // orient the device
            this.quaternion.multiply(this._q1); // camera looks out the back of the device, not the top
            this.quaternion.multiply(this._q0.setFromAxisAngle(this._zee, -orient)); // adjust for screen orientation
        }
    }

    public getQuaternion(): THREE.Quaternion {
        return this.quaternion; // 現在のクオータニオンを返す
    }

    public dispose() {
        window.removeEventListener('deviceorientation', this.onDeviceOrientationChange.bind(this));
        window.removeEventListener('orientationchange', this.onScreenOrientationChange.bind(this));
    }
}
export default SimpleOrientationTracker;
// // 使用例
// const orientationTracker = new SimpleOrientationTracker();
// setInterval(() => {
//     console.log(orientationTracker.getQuaternion());
// }, 1000); // 1秒ごとに現在のクオータニオンをログ出力
