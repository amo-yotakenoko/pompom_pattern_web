import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import * as Icon from 'react-bootstrap-icons';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import Camera from '../BluePrint/Camera';
import CameraSelect from '../BluePrint/CameraSelect';
import { Button, ProgressBar, Form } from 'react-bootstrap';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import chroma from "chroma-js";
// import SimpleOrientationTracker from './没/getDeviderotation';
// import { DeviceOrientationControls } from "three/examples/jsm/controls/DeviceOrientationControls";


// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };
import { Overlay, Tooltip } from 'react-bootstrap';
// import Tooltip from 'react-bootstrap/Tooltip';
const CameraScan = ({ sceneProps, activeMenu, drawDot, meshList, colorList, multiColorSelect, selectingPlate, setSelectingPlate }: any) => {


	const addMeshToScene = (pos: {
		x: number;
		y: number;
		z: number;
	}, rotate: number) => {
		const geometry2 = new THREE.PlaneGeometry(200, 200);



		const material2 = new THREE.MeshBasicMaterial({
			color: 0xffffff, transparent: true, opacity: 0.5
			, side: THREE.DoubleSide
		});


		const plane = new THREE.Mesh(geometry2, material2);



		plane.position.set(pos.x, pos.y, pos.z);

		const lookAtDirection = new THREE.Vector3(0, 0, 0).sub(plane.position).normalize();
		const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), lookAtDirection);
		plane.quaternion.copy(quaternion);

		plane.rotation.y += 180 / 360 * (2 * Math.PI);
		plane.rotation.z += rotate / 360 * (2 * Math.PI);

		sceneProps.scene.add(plane);
		(plane as any).isCameraScanPlate = true;
		(plane as any).isCaptured = false;
		// (plane as any).name = "ああああああああああああああああああ";
		(plane as any).scale.set(0, 0, 0);
		return { obj: plane };
	};

	const platesRef = useRef<any>([]);
	// const [plates, setPlates] = useState<any>([]);

	useEffect(() => {
		if (activeMenu != "cameraScan") return
		// console.log("platesRef.current", platesRef.current)
		if (platesRef.current.length === 0) {
			const destance = 250
			const _plates = [

				addMeshToScene({ x: 0, y: 0, z: destance }, 0),// 前
				addMeshToScene({ x: 0, y: 0, z: - destance }, 0),// 後ろ
				addMeshToScene({ x: destance, y: 0, z: 0 }, 0),//右
				addMeshToScene({ x: - destance, y: 0, z: 0 }, 0),// 左　
				addMeshToScene({ x: 0, y: destance, z: 0 }, 180),// 上
				addMeshToScene({ x: 0, y: - destance, z: 0 }, 0),// 下
			]
			const texture = new THREE.TextureLoader().load("cameraIcon.png");
			_plates.forEach((plate: any, i: number) => {
				plate.obj.material.map = texture;
				plate.obj.material.needsUpdate = true;
			});
			platesRef.current = _plates
			console.log("プレート生成")
		}


	}, [activeMenu]);








	const videoRef = useRef<HTMLVideoElement>(null);
	const [devices, setDevices] = useState<any[]>([]);
	const [selectedDeviceId, setSelectedDeviceId] = useState<string | undefined>(undefined);
	const [videoOk, setVideoOk] = useState<boolean>(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [clipSize, setClipSize] = useState<any>(1);
	// const [selectingPlate, setSelectingPlate] = useState<any>(-1);

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
		let timerId: NodeJS.Timeout;

		if (activeMenu === "cameraScan") {
			const intervalFunc = () => {
				camera();
				// plateAnimation();
			};

			timerId = setInterval(intervalFunc, 100);
		}

		return () => clearInterval(timerId);
	}, [videoOk, clipSize, selectingPlate, activeMenu, multiColorSelect]);

	useEffect(() => {
		let timerId: NodeJS.Timeout;
		const intervalFunc = () => {
			plateAnimation();
		};

		timerId = setInterval(intervalFunc, 1);
		return () => clearInterval(timerId);
	}, [videoOk, clipSize, selectingPlate, activeMenu]);




	useEffect(() => {
		if (!sceneProps || !sceneProps.canvas) return
		sceneProps.canvas.addEventListener('click', onMouseClick, false);
		return () => {
			sceneProps.canvas.removeEventListener('click', onMouseClick, false);
		};
	}, [clipSize, activeMenu, selectingPlate]);





	const [RepresentativeColors, setRepresentativeColors] = useState<any>([]);

	useEffect(() => {
		if (activeMenu == "cameraScan") {

			console.log("RepresentativeColors", "更新", getRepresentativeColors())
			setRepresentativeColors(getRepresentativeColors());
		}
	}, [colorList, activeMenu]);


	function getRepresentativeColors() {
		// console.log(colorList)
		let representativeColors: any = []
		colorList.forEach((colorCodes: any) => {

			let representativeColor = { r: 0, g: 0, b: 0, };
			colorCodes.forEach((color: any) => {
				representativeColor.r += parseInt(color.substring(1, 3), 16)
				representativeColor.g += parseInt(color.substring(3, 5), 16)
				representativeColor.b += parseInt(color.substring(5, 7), 16)
			});
			representativeColor.r /= colorCodes.length
			representativeColor.g /= colorCodes.length
			representativeColor.b /= colorCodes.length
			representativeColors.push(representativeColor)

		});
		return representativeColors;

	}

	useEffect(() => {
		if (activeMenu != "cameraScan") {
			// setSelectingPlate(-1)
			cancelSelectingPlate()
		}
	}, [activeMenu])

	const [isFlip, SetIsFlip] = useState(false);

	function onMouseClick(event: any) {
		const raycaster = new THREE.Raycaster();
		const mouse = new THREE.Vector2();

		mouse.x = (event.clientX / sceneProps.canvas.clientWidth) * 2 - 1;
		mouse.y = - (event.clientY / sceneProps.canvas.clientHeight) * 2 + 1;


		raycaster.setFromCamera(mouse, sceneProps.camera);


		const intersects = raycaster.intersectObjects(sceneProps.scene.children);

		// console.log("plate判定", intersects)
		let isCancel = true;
		if (selectingPlate < 0 && intersects.length > 0) {

			// console.log(intersects[0].object)
			platesRef.current.forEach((plate: any, i: number) => {
				// console.log("判定", intersects[0].object, plate.obj)
				if (intersects[0].object == plate.obj) {

					setSelectingPlate(i === 3 ? 2 : i)
					SetIsFlip(i === 3)
					isCancel = false
				}
			});

		}


		if (isCancel) cancelSelectingPlate();
	}

	function cancelSelectingPlate() {
		try {

			const texture = new THREE.TextureLoader().load("cameraIcon.png");
			const selectingPlateobj: any = platesRef.current[selectingPlate].obj
			console.log(selectingPlate, selectingPlateobj)
			selectingPlateobj.material.map = texture;
			selectingPlateobj.material.needsUpdate = true;

			if (selectingPlate == 2) {
				const selectingOtherPlateobj: any = platesRef.current[3].obj
				console.log(selectingPlate, selectingPlateobj)
				selectingOtherPlateobj.material.map = texture;
				selectingOtherPlateobj.material.needsUpdate = true;
			}

			document.getElementById("setCurrentState")?.click();

			// const undoButton = document.getElementById('undoButton');
			// console.log(undoButton)
			// if (undoButton)
			// 	undoButton.click();


		} catch {

		}

		setSelectingPlate(-1)
	}

	function takeScan() {
		setSelectingPlate(-1)
	}




	const mouse = new THREE.Vector2();
	if (sceneProps && sceneProps.canvas) {

		sceneProps.canvas.addEventListener('pointermove', (event: any) => {
			mouseUpdate(event)
		});
	}


	function mouseUpdate(event: any) {
		// console.log(event.clientX)
		// const element = event.currentTarget;
		const element = sceneProps.canvas;

		const x = event.clientX - element.offsetLeft;
		const y = event.clientY - element.offsetTop;

		const w = element.offsetWidth;
		const h = element.offsetHeight;


		mouse.x = (x / w) * 2 - 1;
		mouse.y = -(y / h) * 2 + 1;
	}


	// useEffect(() => {
	// 	if (activeMenu != "cameraScan") return
	// 	console.log("platesRef.current", platesRef.current)
	// 	if (platesRef.current.length === 0) {
	// 		const destance = 200
	// 		const _plates = [

	// 			addMeshToScene({ x: 0, y: 0, z: destance }, 0),// 前
	// 			addMeshToScene({ x: 0, y: 0, z: - destance }, 0),// 後ろ
	// 			addMeshToScene({ x: destance, y: 0, z: 0 }, 0),//右
	// 			addMeshToScene({ x: - destance, y: 0, z: 0 }, 0),// 左
	// 			addMeshToScene({ x: 0, y: destance, z: 0 }, 180),// 上
	// 			addMeshToScene({ x: 0, y: - destance, z: 0 }, 0),// 下
	// 		]
	// 		const texture = new THREE.TextureLoader().load("logo512.png");
	// 		_plates.forEach((plate: any, i: number) => {
	// 			plate.obj.material.map = texture;
	// 			plate.obj.material.needsUpdate = true; 
	// 		});
	// 		platesRef.current = _plates
	// 		console.log("プレート生成")
	// 	}


	// }, [activeMenu]); 


	function camera() {
		if (!canvasRef.current) return
		if (!videoRef.current) return;
		// console.log("テクスチャ作成", videoRef.current.width)
		const ctx = canvasRef.current.getContext('2d');
		if (!ctx) return
		let squareSize = Math.min(canvasRef.current.width, canvasRef.current.height);
		squareSize *= clipSize;
		let centerX = videoRef.current.videoWidth / 2
		let centerY = videoRef.current.videoHeight / 2
		const xOffset = centerX - squareSize / 2;
		const yOffset = centerY - squareSize / 2;
		// ctx.fillStyle = 'red'; 
		// ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
		// canvasRef.current.width = 256;
		// canvasRef.current.height = 256;
		ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

		if (isFlip) {
			ctx.save();
			ctx.scale(-1, 1);
			ctx.translate(-canvasRef.current.width, 0);
		}

		ctx.drawImage(
			videoRef.current,
			xOffset, yOffset,
			squareSize, squareSize,
			0, 0,
			canvasRef.current.width, canvasRef.current.height
		);
		if (isFlip) ctx.restore();

		ctx.beginPath();
		ctx.arc(canvasRef.current.width / 2, canvasRef.current.height / 2, canvasRef.current.width / 2, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.clip();

		if (0 > selectingPlate) return;
		const texture = new THREE.CanvasTexture(canvasRef.current as any);
		// if (isFlip) {
		// 	texture.wrapS = THREE.RepeatWrapping; 
		// 	texture.repeat.x = -1; 

		// }
		const selectingPlateobj = platesRef.current[selectingPlate].obj
		selectingPlateobj.material.map = texture;
		selectingPlateobj.material.needsUpdate = true;
		if (selectingPlate == 2) {
			const fripTexture = new THREE.CanvasTexture(canvasRef.current as any);
			// if (!isFlip) {
			fripTexture.wrapS = THREE.RepeatWrapping;
			fripTexture.repeat.x = -1;

			// }
			const rightSelectingPlateobj = platesRef.current[3].obj
			rightSelectingPlateobj.material.map = fripTexture;
			rightSelectingPlateobj.material.needsUpdate = true;
		}
		(selectingPlateobj as any).isCaptured = true
		// return
		try {


			// const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
			// const data = imageData.data; // RGBAデータ


			// bluePrintImg.src = "";

			// ctx.fillStyle = "#FFFFFF";
			meshList.current.forEach((mesh: any) => {



				// if (!patternPos) return
				let nearestPlate: any = getNearestPlate();
				const raycaster = new THREE.Raycaster();
				if (nearestPlate && 0 <= selectingPlate) {

					// console.log(nearestPlate.obj, platesRef.current[selectingPlate].obj)
					if (nearestPlate.obj == platesRef.current[selectingPlate].obj) {
						// console.log((nearestPlate.obj as any))
						// maketestobj(mesh.centerPos)




						const direction = nearestPlate.obj.position.clone().normalize();
						let origin = mesh.centerPos.clone();
						origin = origin.clone().add(direction.multiplyScalar(10))
						// console.log(origin, direction)
						// console.log(sceneProps.scene.children)
						// console.log(origin, direction)
						// maketestobj(origin)
						// const rightdirection = new THREE.Vector3(0, 0, 1).applyQuaternion(plate.quaternion).negate().normalize();


						raycaster.set(origin, direction);
						// visualizeRay(origin, direction)



						const intersects = raycaster.intersectObjects(sceneProps.scene.children, true);
						// console.log(intersects)
						if (intersects.length > 0) {
							// maketestobj(intersects[0].point)
							const intersect = intersects[0];
							// if (intersect.distance > 150) return
							// if (!patternPos) return
							// const mesh = intersect.object as any; 
							const uv = intersect.uv as any;
							// const material = mesh.material; 
							if (!uv) return
							const x = Math.floor(uv.x * ctx.canvas.width);
							const y = Math.floor((1 - uv.y) * ctx.canvas.height);
							const pixelData = ctx.getImageData(x, y, 1, 1).data;
							const color = {
								r: pixelData[0],
								g: pixelData[1],
								b: pixelData[2],

							};
							getNearestColor(color)
							// console.log(patternPos, color)
							// if (patternPos.r != 1)
							let patternPos = (mesh as any).patternPos;
							const meshPos = mesh.centerPos;
							// console.log(patternPos, meshPos)
							// addTextToScene(`${patternPos.r},${patternPos.p}`, meshPos, sceneProps.scene)
							drawDot(patternPos, getNearestColor(color))
							// if (color.r > 128) {
							// } else {
							// 	drawDot(patternPos, 3)
							// }
						}

					}
				}


				function getNearestPlate() {
					let nearestDistance = Infinity;
					let nearestPlate: any = null;
					platesRef.current.forEach((plate: any) => {
						const meshPos = mesh.centerPos;
						// const meshPos = getFirstVertexPosition(mesh)



						// console.log(meshPos, plate.obj.position)
						if (plate.obj.isCaptured) {

							const distance = meshPos.distanceTo(plate.obj.position);

							if (distance < 250 && distance < nearestDistance) {
								// maketestobj(mesh.centerPos)
								nearestDistance = distance;
								nearestPlate = plate;
							}
						}
					});
					return nearestPlate;
				}

				function getNearestColor(color: any) {

					// console.log(RepresentativeColors)
					let nearestColorId = null;
					let minDistance = Infinity;

					RepresentativeColors.forEach((repColor: any, i: number) => {
						if (multiColorSelect[i]) {

							// 色距離の計算部分、ユークリッド
							// const distance = Math.sqrt(
							// 	Math.pow(repColor.r - color.r, 2) +
							// 	Math.pow(repColor.g - color.g, 2) +
							// 	Math.pow(repColor.b - color.b, 2)
							// );
							// https://gomiba.co/archives/2018/02/1813/
							// chroma.deltaE
							const distance = chroma.deltaE(repColor, color);

							if (distance < minDistance) {
								minDistance = distance;
								nearestColorId = i;
							}
						}
					});

					// console.log("Nearest color:", nearestColorId);
					return nearestColorId;


				}
			});



			// convartDownloadble(bluePrintImg);
			// ctx.clearRect(0, 0, canvas.width, canvas.height);











			// 
			// for (let y = 0; y < canvasRef.current.height; y += 32) {
			// 	for (let x = 0; x < canvasRef.current.width; x += 32) {
			// 		
			// 		const index = (y * canvasRef.current.width + x) * 4;
			// 		const r = data[index];    
			// 		const g = data[index + 1];
			// 		const b = data[index + 2]; 
			// 		const a = data[index + 3];

			// 		console.log(`Coordinates: (${x}, ${y}) - Color: rgba(${r}, ${g}, ${b}, ${a / 255})`);
			// 		const raycaster = new THREE.Raycaster();

			// 		const direction = new THREE.Vector3(0, 0, 1).applyQuaternion(plate.quaternion).negate().normalize();



			// 		let origin = plate.position.clone();
			// 		const rightdirection = new THREE.Vector3(0, 0, 1).applyQuaternion(plate.quaternion).negate().normalize();
			// 		origin.add(rightdirection);

			// 		raycaster.set(origin, direction);
			// 		// raycaster.setFromCamera(origin, direction);

			// 		const intersects = raycaster.intersectObjects(sceneProps.scene.children);
			// 		console.log(intersects)

			// 		intersects.forEach(intersect => {
			// 			// maketestobj(intersect.point)
			// 			console.log(intersect.object)
			// 			const patternPos = (intersect.object as any).patternPos;
			// 			if (patternPos) {
			// 				console.log("pos餅発見")
			// 				drawDot(patternPos, 2)
			// 			}
			// 			// meshList.current.map((mesh: any) => {
			// 			// 	const object = intersect.object as any;
			// 			// 	if (object == intersect)
			// 			// 		console.log("当たった")
			// 			// 	console.log((object))
			// 			// 	// sceneProps.scene.remove(object);
			// 			// });
			// 		});
			// 	}
			// }



			// meshList.current.map((mesh: any) => {
			// 	intersects.map((intersect: any) => {
			// 		// console.log(intersects.length)
			// 		console.log(mesh, intersects[0].object)
			// 		if (intersects.length > 0 && mesh === intersect) {

			// 			console.log((mesh as any).patternPos)
			// 			let patternPos = (mesh as any).patternPos;
			// 			drawDot(patternPos, 5)
			// 			// pattern[patternPos.r, patternPos.p] = propsRef.current.selectColor
			// 			// let patternPos = (mesh as any).patternPos;

			// 			// meshList.current.map((mesh: any) => {
			// 			//     let patternPos = (mesh as any).patternPos;
			// 			//     console.log(patternPos)
			// 			//     let color = propsRef.current.colorList[pattern[patternPos.r][patternPos.p]];
			// 			//     mesh.material.color.set(color);
			// 			// });

			// 			// let color = propsRef.current.colorList[pattern[patternPos.r][patternPos.p]];
			// 			// mesh.material.color.set(color);
			// 		}
			// 	});
			// });
			// if (intersects.length > 0) {

			// 	for (let i = 0; i < 10; i++) {
			// 		const intersect = intersects[i];
			// 		if ((intersect as any).patternPos) {
			// 			const patternPos = (intersects[1] as any).patternPos;
			// 			if (patternPos) {

			// 				drawDot(patternPos, 2)
			// 				maketestobj(intersect.point);
			// 			}
			// 		}
			// 	}



			// }


		} catch (e) {
			console.log(e)
		}




	}

	function getFirstVertexPosition(mesh: any) {
		if (mesh.geometry instanceof THREE.BufferGeometry) {

			const positionAttribute = mesh.geometry.getAttribute('position');

			if (positionAttribute && positionAttribute.count > 0) {
				const x = positionAttribute.getX(0);
				const y = positionAttribute.getY(0);
				const z = positionAttribute.getZ(0);
				return new THREE.Vector3(x, y, z);
			} else {
				console.error("頂点が存在しません。");
				return null;
			}
		} else {
			console.error("指定したメッシュは BufferGeometry ではありません。");
			return null;
		}
	}





	// 2が右3が左
	function plateAnimation() {
		// console.log("plateAnimation", activeMenu)
		// console.log("plateanimation", activeMenuRef.current)
		platesRef.current.forEach((plate: any, i: number) => {
			let scale = plate.obj.scale.x;
			let target = (0 > selectingPlate) ? 0.5 : 0;
			if (i == selectingPlate) target = 1
			if (i == 3 && selectingPlate == 2) target = 1;

			if (activeMenu != "cameraScan") target = 0;

			scale += (target - scale) * 0.05;

			plate.obj.scale.set(scale, scale, scale);
			plate.obj.visible = scale > 0.1
		});
	}

	// if (activeMenu != "cameraScan") {
	// 	return (<></>)
	// }
	return (
		<>
			{/* {activeMenu == "cameraScan" && ( */}

			<div style={{}}>
				{/* カメラスキャン */}

				<video
					ref={videoRef}
					autoPlay
					style={{ width: '100%', border: '2px solid black', display: "none" }}
				/>





				<Camera
					videoRef={videoRef}
					devices={devices}
					setDevices={setDevices}
					setSelectedDeviceId={setSelectedDeviceId}
					selectedDeviceId={selectedDeviceId}
					setVideoOk={setVideoOk}
					isEnable={activeMenu == "cameraScan" && selectingPlate >= 0}

				/>
				{/* {activeMenu === "cameraScan" &&
						( */}

				<canvas
					ref={canvasRef}
					width={256}
					height={256}
					style={{
						border: '2px solid black', width: '100%', height: 'auto',
						display: "none"
					}}

				/>
				{/* )} */}
				{/* <Form.Label>ズーム</Form.Label> */}
				<div style={{ display: "flex", alignItems: "center" }}>
					<Icon.ZoomOut style={{ fontSize: "24px", marginLeft: "10px", marginRight: "5px" }} />
					<Form.Range
						onChange={(e) => {
							setClipSize(parseFloat(e.target.value));
						}}
						value={clipSize}
						min={0.1}
						max={1}
						step={0.01}
						style={{ direction: "rtl", margin: "0 10px" }}
					/>
					<Icon.ZoomIn style={{ fontSize: "24px", marginLeft: "5px", marginRight: "10px" }} />
				</div>
				{/* {selectingPlate} */}
				<CameraSelect devices={devices} setSelectedDeviceId={setSelectedDeviceId} selectedDeviceId={selectedDeviceId}></CameraSelect>
				{/* <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> */}


			</div>
			{/* )} */}
		</>
	);
}
export default CameraScan;