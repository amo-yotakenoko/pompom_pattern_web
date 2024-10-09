import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import * as Icon from 'react-bootstrap-icons';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Camera from '../BluePrint/Camera';
import CameraSelect from '../BluePrint/CameraSelect';
import { Button, ProgressBar, Form } from 'react-bootstrap';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
// import SimpleOrientationTracker from './没/getDeviderotation';
// import { DeviceOrientationControls } from "three/examples/jsm/controls/DeviceOrientationControls";


// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };
import { Overlay, Tooltip } from 'react-bootstrap';
// import Tooltip from 'react-bootstrap/Tooltip';
const CameraScan = ({ sceneProps, activeMenu, drawDot, meshList, colorList, multiColorSelect, selectingPlate, setSelectingPlate }: any) => {


	// メッシュを追加する関数を外に定義
	const addMeshToScene = (pos: {
		x: number;
		y: number;
		z: number;
	}, rotate: number) => {
		const geometry2 = new THREE.PlaneGeometry(200, 200);



		const material2 = new THREE.MeshBasicMaterial({
			color: 0xffffff, transparent: true, opacity: 0.5
			, side: THREE.DoubleSide
		}); // 赤色に設定

		// Planeのメッシュを作成
		const plane = new THREE.Mesh(geometry2, material2);


		// 位置を (pos.x, pos.y, pos.z) に設定
		plane.position.set(pos.x, pos.y, pos.z);

		const lookAtDirection = new THREE.Vector3(0, 0, 0).sub(plane.position).normalize();
		const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), lookAtDirection);
		plane.quaternion.copy(quaternion);

		plane.rotation.y += 180 / 360 * (2 * Math.PI);
		plane.rotation.z += rotate / 360 * (2 * Math.PI);
		// シーンに追加
		sceneProps.scene.add(plane);
		(plane as any).isCameraScanPlate = true;
		(plane as any).isCaptured = false;
		(plane as any).name = "ああああああああああああああああああ";
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

			// 0.5秒ごとに関数を呼び出す
			timerId = setInterval(intervalFunc, 100); // 500ミリ秒
		}

		// クリーンアップ関数
		return () => clearInterval(timerId);
	}, [videoOk, clipSize, selectingPlate, activeMenu, multiColorSelect]); // 依存配列

	useEffect(() => {
		let timerId: NodeJS.Timeout;
		const intervalFunc = () => {
			plateAnimation();
		};

		timerId = setInterval(intervalFunc, 1); // 500ミリ秒
		return () => clearInterval(timerId);
	}, [videoOk, clipSize, selectingPlate, activeMenu]); // 依存配列


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
		// マウスの位置を正規化
		mouse.x = (event.clientX / sceneProps.canvas.clientWidth) * 2 - 1;
		mouse.y = - (event.clientY / sceneProps.canvas.clientHeight) * 2 + 1;

		// レイキャストを更新
		raycaster.setFromCamera(mouse, sceneProps.camera);

		// オブジェクトを取得
		const intersects = raycaster.intersectObjects(sceneProps.scene.children);

		// console.log("plate判定", intersects)
		let isCancel = true;
		if (selectingPlate<0&&intersects.length > 0) {
			// オブジェクトがタップされた場合
			// console.log(intersects[0].object)
			platesRef.current.forEach((plate: any, i: number) => {
				// console.log("判定", intersects[0].object, plate.obj)
				if (intersects[0].object == plate.obj) {
					
					setSelectingPlate(i === 3 ? 2 : i)
					SetIsFlip(i === 3)
					isCancel = false
				}
			});
			// ここでタップされたオブジェクトに対して何か処理を行う
		}


		if (isCancel) cancelSelectingPlate();
	}

	function cancelSelectingPlate() {
		try {

			const texture = new THREE.TextureLoader().load("cameraIcon.png");
			const selectingPlateobj: any = platesRef.current[selectingPlate].obj
			console.log(selectingPlate, selectingPlateobj)
			selectingPlateobj.material.map = texture; // 各 plate にテクスチャを適用
			selectingPlateobj.material.needsUpdate = true;  // マテリアルを更新

			if (selectingPlate == 2) {
				const selectingOtherPlateobj: any = platesRef.current[3].obj
				console.log(selectingPlate, selectingPlateobj)
				selectingOtherPlateobj.material.map = texture; // 各 plate にテクスチャを適用
				selectingOtherPlateobj.material.needsUpdate = true;  // マテリアルを更新
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
	// 			plate.obj.material.map = texture; // 各 plate にテクスチャを適用
	// 			plate.obj.material.needsUpdate = true;  // マテリアルを更新
	// 		});
	// 		platesRef.current = _plates
	// 		console.log("プレート生成")
	// 	}


	// }, [activeMenu]); // シーンの変更に反応


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
		// ctx.fillStyle = 'red'; // 塗りつぶす色を赤に設定
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
			videoRef.current, // 描画元の画像（ビデオなど）
			xOffset, yOffset, // 描画元の開始位置
			squareSize, squareSize, // 切り抜く幅と高さ
			0, 0, // キャンバス上の描画開始位置
			canvasRef.current.width, canvasRef.current.height // キャンバス上に描画するサイズ
		);
		if (isFlip) ctx.restore();

		ctx.beginPath();
		ctx.arc(canvasRef.current.width / 2, canvasRef.current.height / 2, canvasRef.current.width / 2, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.clip(); // クリッピングを適用

		if (0 > selectingPlate) return;
		const texture = new THREE.CanvasTexture(canvasRef.current as any);
		// if (isFlip) {
		// 	texture.wrapS = THREE.RepeatWrapping; // テクスチャの繰り返しを有効にする
		// 	texture.repeat.x = -1; // x方向に左右反転

		// }
		const selectingPlateobj = platesRef.current[selectingPlate].obj
		selectingPlateobj.material.map = texture; // マテリアルのテクスチャを更新
		selectingPlateobj.material.needsUpdate = true; // マテリアルの更新を促す
		if (selectingPlate == 2) {
			const fripTexture = new THREE.CanvasTexture(canvasRef.current as any);
			// if (!isFlip) {
			fripTexture.wrapS = THREE.RepeatWrapping; // テクスチャの繰り返しを有効にする
			fripTexture.repeat.x = -1; // x方向に左右反転

			// }
			const rightSelectingPlateobj = platesRef.current[3].obj
			rightSelectingPlateobj.material.map = fripTexture; // マテリアルのテクスチャを更新
			rightSelectingPlateobj.material.needsUpdate = true; // マテリアルの更新を促す
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
							// const mesh = intersect.object as any;  // 当たったオブジェクト
							const uv = intersect.uv as any;  // UV座標を取得
							// const material = mesh.material;  // オブジェクトのマテリアル
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
					let minDistance = Infinity; // 初期値は無限大

					RepresentativeColors.forEach((repColor: any, i: number) => {
						if (multiColorSelect[i]) {

							// RGB間のユークリッド距離を計算
							const distance = Math.sqrt(
								Math.pow(repColor.r - color.r, 2) +
								Math.pow(repColor.g - color.g, 2) +
								Math.pow(repColor.b - color.b, 2)
							);

							// 現在の最小距離と比較
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











			// // 2重のfor文で全画素を取得
			// for (let y = 0; y < canvasRef.current.height; y += 32) {
			// 	for (let x = 0; x < canvasRef.current.width; x += 32) {
			// 		// 各画素のインデックスを計算
			// 		const index = (y * canvasRef.current.width + x) * 4;
			// 		const r = data[index];     // 赤成分
			// 		const g = data[index + 1]; // 緑成分
			// 		const b = data[index + 2]; // 青成分
			// 		const a = data[index + 3]; // アルファ成分

			// 		console.log(`Coordinates: (${x}, ${y}) - Color: rgba(${r}, ${g}, ${b}, ${a / 255})`);
			// 		const raycaster = new THREE.Raycaster();
			// 		// オブジェクトの前方向を取得（ローカル空間からワールド空間に変換）
			// 		const direction = new THREE.Vector3(0, 0, 1).applyQuaternion(plate.quaternion).negate().normalize();



			// 		let origin = plate.position.clone();
			// 		const rightdirection = new THREE.Vector3(0, 0, 1).applyQuaternion(plate.quaternion).negate().normalize();
			// 		origin.add(rightdirection); // 右向きベクトルを加算

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
			// 			// 	// シーンからオブジェクトを削除
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
			// 交差しているオブジェクトを表示
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
			// 頂点の位置を取得
			const positionAttribute = mesh.geometry.getAttribute('position');

			// 0 番目の頂点の座標を取得
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
	const addTextToScene = (text: any, position: any, scene: any) => {
		// フォントローダーのインスタンスを作成
		const fontLoader = new FontLoader();

		// フォントを読み込む
		fontLoader.load('https://threejs.org/examples/fonts/droid_sans_regular.typeface.json', (font) => {
			// テキストジオメトリを作成
			const textGeometry = new TextGeometry(text, {
				font: font,
				size: 1, // テキストのサイズ
				height: 0.1, // テキストの厚み
				curveSegments: 12, // 曲線の分割数
				bevelEnabled: true, // ベベルを有効にするか
				bevelThickness: 0.1, // ベベルの厚さ
				bevelSize: 0.1, // ベベルのサイズ
				bevelOffset: 0, // ベベルのオフセット
				bevelSegments: 5, // ベベルのセグメント数
			});

			// マテリアルを作成
			const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // テキストの色を設定

			// メッシュを作成
			const textMesh = new THREE.Mesh(textGeometry, textMaterial);

			// テキストの位置を設定
			textMesh.position.copy(position);

			// シーンにテキストを追加
			scene.add(textMesh);
		});
	};
	function maketestobj(point: any) {
		// 新しいオブジェクトを作成（ここでは球体を作成）
		const newGeometry = new THREE.SphereGeometry(5, 32, 32);
		const newMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
		const newSphere = new THREE.Mesh(newGeometry, newMaterial);

		newSphere.position.copy(point);

		sceneProps.scene.add(newSphere);

	}

	function visualizeRay(origin: any, direction: any, length = 100) {
		// 線の始点と終点を計算
		const end = origin.clone().add(direction.clone().normalize().multiplyScalar(length));

		// 線のジオメトリを作成
		const geometry = new THREE.BufferGeometry().setFromPoints([origin, end]);

		// 線のマテリアルを作成
		const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

		// 線を作成
		const line = new THREE.Line(geometry, material);

		// シーンに追加
		sceneProps.scene.add(line);
	}


	// 2が右3が左
	function plateAnimation() {
		// console.log("plateanimation", activeMenuRef.current)
		platesRef.current.forEach((plate: any, i: number) => {
			let scale = plate.obj.scale.x;
			let target = (i == selectingPlate) ? 1 : 0.5;
			if (i == 3 && selectingPlate == 2) target = 1;

			if (activeMenu != "cameraScan") target = 0;

			scale += (target - scale) * 0.05;
			plate.obj.scale.set(scale, scale, scale);
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
				{/* {!videoOk && <p>カメラを開いています...</p>}
					{videoOk && <p>カメラが開きました！</p>} */}




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
					width={256} // キャンバスの幅を指定
					height={256} // キャンバスの高さを指定
					style={{
						border: '2px solid black', width: '100%', height: 'auto',
						display: "none"
					}}

				/>
				{/* )} */}
				{/* <Form.Label>ズーム</Form.Label> */}
				<div style={{ display: "flex", alignItems: "center" }}>
    <Icon.ZoomOut style={{ fontSize: "24px",  marginLeft: "10px",marginRight: "5px"}} />
    <Form.Range
        onChange={(e) => {
            setClipSize(parseFloat(e.target.value));
        }}
        value={clipSize}
        min={0.1}
        max={1}
        step={0.01}
        style={{ direction: "rtl", margin: "0 10px" }} // rangeの左右に隙間を追加
    />
    <Icon.ZoomIn style={{ fontSize: "24px", marginLeft: "5px",marginRight: "10px" }} />
</div>
				{/* {selectingPlate} */}
				<CameraSelect devices={devices} setSelectedDeviceId={setSelectedDeviceId} selectedDeviceId={selectedDeviceId}></CameraSelect>
				<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

				{/* <h2>カメラの回転</h2>
			{/* {`{${JSON.stringify(deviceQt)}}`} */}
				{/* {`${sceneProps}`} */}
				{/* <button onClick={() => addMeshToScene()}>aa</button> */}
				{/* <p>Alpha (Z軸): {orientation.alpha.toFixed(2)}°</p>
            <p>Beta (X軸): {orientation.beta.toFixed(2)}°</p>
            <p>Gamma (Y軸): {orientation.gamma.toFixed(2)}°</p> */}
			</div>
			{/* )} */}
		</>
	);
}
export default CameraScan;