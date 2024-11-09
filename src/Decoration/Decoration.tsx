import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
// import eyeModel from '/model/eye.fbx';
import ValueSetting from './ValueSetting';
import { Button, ProgressBar, Form } from 'react-bootstrap';
// import SimpleOrientationTracker from './没/getDeviderotation';
// import { DeviceOrientationControls } from "three/examples/jsm/controls/DeviceOrientationControls";
import AddDecoration from './AddDecoration';
import * as Icon from 'react-bootstrap-icons';

// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };
const itemBase = {
	name: "aa",
	pitch: 45,
	roll: 90,
	rotate: 0,
	size: 100,
	colorIndex: 0,

	symmetry: true
}
// import Tooltip from 'react-bootstrap/Tooltip';
const Decoration = ({ sceneProps, decorationObjects, setDecorationObjects, symmetryType, colorList }: any) => {


	// const [objects, setObjects] = useState<any>([]);

	const [selectingId, setSelectingId] = useState<number>(0);

	// const modelFileNames = ["eye", "ear"]
	const selecting = selectingId >= 0 && selectingId < decorationObjects.length ? decorationObjects[selectingId] : null;


	const [newDecorationModalShow, setNewDecorationModalShow] = useState(false);



	useEffect(() => {
		if (!sceneProps) return
		console.log("sceneProps", sceneProps.scene)
		// sceneProps.scene.add(new THREE.AxesHelper(50))
		sceneProps.scene.add(new THREE.AxesHelper(50))
	}, [sceneProps]);


	const updateSelectiongItemProperty = (key: string, value: any) => {
		setDecorationObjects((prev: any) => {

			const updatedObjects = [...prev];

			updatedObjects[selectingId] = { ...prev[selectingId], [key]: value };
			return updatedObjects;
		});
	};

	function addDecorationObject(newDecorationObject: any) {
		console.log(newDecorationObject, "を追加")
		setDecorationObjects([
			...decorationObjects,
			{ ...JSON.parse(JSON.stringify(itemBase)), ...newDecorationObject, uuid: crypto.randomUUID() }
		]);
		console.log(decorationObjects.length)
		setSelectingId(decorationObjects.length)
		setNewDecorationModalShow(false)
		console.log(decorationObjects)

	}

	// useEffect(() => {
	// 	if (!sceneProps || !sceneProps.scene) return;

	// 	// シーン内のオブジェクトを走査
	// 	sceneProps.scene.traverse((child: any) => {
	// 		// userData.tagが指定されたタグと一致する場合に削除
	// 		if (child.userData.tag === "decoration") {
	// 			// シーンからオブジェクトを削除
	// 			sceneProps.scene.remove(child);

	// 			// マテリアルがあれば解放
	// 			if (child.material) {
	// 				child.material.dispose();
	// 			}

	// 			// もし geometry があれば、それも解放
	// 			if (child.geometry) {
	// 				child.geometry.dispose();
	// 			}
	// 		}
	// 	});
	// }, [sceneProps, decorationObjects.length]);


	return (<>
		<AddDecoration newDecorationModalShow={newDecorationModalShow} setNewDecorationModalShow={setNewDecorationModalShow} decorationObjects={decorationObjects} addDecorationObject={addDecorationObject}></AddDecoration>
		{/* デコレーション */}
		{/* {`${objects}`} */}
		{/* {newDecorationModalShow} */}
		<div className='row' >

			<div className="col-12 "
				style={{ display: "flex", flexWrap: "wrap", height: "2em", margin: '1px', width: "100%", borderBottom: `${decorationObjects.length > 0 ? 1 : 0}px solid black` }}>

				{decorationObjects.map((obj: any, i: number) => (
					<Item
						key={i}
						property={obj}
						sceneProps={sceneProps}
						selectingId={selectingId}
						setSelectingId={setSelectingId}
						id={i}
						symmetryType={symmetryType}
						colorList={colorList}
					/>
				))}
				<Button
					onClick={() => {
						setNewDecorationModalShow(true);
						console.log({ newDecorationModalShow })
					}}
					style={{
						// padding: 0,
						padding: 0, margin: 0,
						width: 32,
						height: 32,
						// width: "2em", aspectRatio: 1
						border: 'none',
					}}
					variant="outline-dark"
				>
					<Icon.Plus style={{

						width: "2em", aspectRatio: 1, padding: 0, margin: 0
					}}></Icon.Plus>
				</Button>
			</div>


			{/* 1.21.3 */}
			<div className="col-12" >
				{selecting != null && (
					<>
						{/* {
						modelFileNames.map((fileName: any) => (
							<Button onClick={() => { updateSelectiongItemProperty("model", `${fileName}`) }}	>
							{fileName}
							</Button>
							))
							} */}
						<br></br>
						{/* <Button onClick={() => { updateSelectiongItemProperty("x", decorationObjects[selectingId].x + 1) }}
					>
					x+=1
					</Button> */}
						{/* <Form.Label className="me-2">pitch</Form.Label> */}
						<div className="container">
							<div className="row">
								<div className="col-6 no-margin" >
									<div className="container">
										<div className="row">
											{colorList.map((color: any, index: any) => (
												<div className="col-3 col-md-3 no-margin" key={index}>
													<div
														style={{
															backgroundColor: color[0],
															width: '100%',
															aspectRatio: 1, // 高さと幅を1:1にすることで円形を維持
															borderRadius: '50%',
															textAlign: 'center',


															display: 'flex',
															justifyContent: 'center',
															alignItems: 'center',
															boxSizing: 'border-box',
															boxShadow: `0 4px 8px rgba(0, 0, 0, ${index == decorationObjects[selectingId].colorIndex ? 0.75 : 0.2})`,
														}}
														onClick={() => { updateSelectiongItemProperty("colorIndex", index); console.log("おされた", index) }}
													>
														{/* {index},{decorationObjects[selectingId].colorIndex} */}
													</div>
												</div>
											))}
										</div>
									</div>
								</div>

								<div className="col-6 no-margin" >
									<ValueSetting
										label={<>ピッチ位置</>}
										value={decorationObjects[selectingId].pitch}
										onChange={(e: any) => {
											console.log("value", parseInt(e.target.value, 10));
											updateSelectiongItemProperty("pitch", parseInt(e.target.value, 10));
										}}
										min={decorationObjects[selectingId].symmetry ? 0 : -90}
										max={decorationObjects[selectingId].symmetry ? 90 : 90}
										step={1}
									/>
									{/* <Form.Label className="me-2">roll</Form.Label> */}
									<ValueSetting
										label={<>ロール位置</>}
										value={decorationObjects[selectingId].roll}
										onChange={(e: any) => {
											console.log("value", parseInt(e.target.value, 10));
											updateSelectiongItemProperty("roll", parseInt(e.target.value, 10));
										}}
										min={0}
										max={360}
										step={1}
									/>

									<ValueSetting
										label={<>回転</>}
										value={decorationObjects[selectingId].rotate}
										onChange={(e: any) => {
											console.log("rotate", parseInt(e.target.value, 10));
											updateSelectiongItemProperty("rotate", parseInt(e.target.value, 10));
										}}
										min={0}
										max={360}
										step={1}
									/>

									<ValueSetting
										label={<>サイズ</>}
										value={decorationObjects[selectingId].size}
										onChange={(e: any) => {
											console.log("size", parseInt(e.target.value, 10));
											updateSelectiongItemProperty("size", parseInt(e.target.value, 10));
										}}
										min={0}
										max={200}
										step={1}
									/>


									<Form.Check
										type="checkbox"
										label="左右対称"
										checked={decorationObjects[selectingId].symmetry}
										onChange={(e: any) => { updateSelectiongItemProperty("symmetry", !decorationObjects[selectingId].symmetry) }}
									/>
									<Icon.Trash onClick={() => {
										const newItems = decorationObjects.filter((_: any, index: any) => index !== selectingId);
										setDecorationObjects(newItems);

									}}></Icon.Trash>



								</div>
							</div>
						</div>

					</>
				)}

			</div>
		</div >

	</>);
}

const Item = ({ property, sceneProps, id, setSelectingId, selectingId, symmetryType, colorList }: any) => {

	const [objects, setObjects] = useState<any>([]);

	console.log("レンダリング変更")



	useEffect(() => {
		return () => {
			console.log("削除")
			removeObject()
		};

	}, []);


	const loadObjects = async (file: string) => {
		// https://notetoself-dy.com/fbx-animaition-three-js/#outline__3
		const loader = new FBXLoader();
		// const file = `${process.env.PUBLIC_URL}/model/${property.model}.fbx`;
		console.log({ file })
		const tmpobjects: any[] = [];
		let color = colorList[property.colorIndex][0]
		for (let i = 0; i < (property.symmetry ? 2 : 1); i++) {
			const obj = await new Promise((resolve, reject) => {
				loader.load(
					file,
					(obj) => {
						obj.scale.set(0.1, 0.1, 0.1);
						obj.traverse((child: any) => {
							if (child.isMesh) {
								child.material = new THREE.MeshToonMaterial({ color: color });
							}
						});
						obj.userData.tag = 'decoration';

						resolve(obj);
					},
					undefined,
					// (error) => reject(error)
				);
			});


			sceneProps.scene.add(obj);
			tmpobjects.push(obj);
		}
		setObjects(tmpobjects);
	}

	useEffect(() => {
		console.log("モデル名変更")

		deleteObjects();
		const file = `${process.env.PUBLIC_URL}/model/${property.model}.fbx`;
		loadObjects(file)

		// const loader = new FBXLoader();
		// // console.log(`${process.env.PUBLIC_URL}/model/${property.model}.fbx`)
		// const file = `${process.env.PUBLIC_URL}/model/${property.model}.fbx`

		// let tmpobjects: any = []
		// for (let i = 0; i < (property.symmetry?2:1); i++) {

		// 	loader.load( file, function (obj) {
		// 		obj.scale.set(0.1, 0.1, 0.1)

		// 		obj.traverse(function (child: any) {
		// 			if (child.isMesh) {
		// 				child.material.color.set(0xff0000); // 赤色に変更
		// 			}
		// 		});
		// 		// console.log("object", object)

		// 		sceneProps.scene.add(obj);
		// 		tmpobjects.push(obj)
		// 	})
		// }

		// console.log({ tmpobjects })
		// setObjects(tmpobjects);
		// requestAnimationFrame(positionUpdate);

		return () => {

			// if (objects) {
			console.log("今のを削除", objects)
			removeObject()
			// }
		};


	}, [property.model, property.symmetry,]);


	useEffect(() => {
		console.log({ objects })
	}, [objects]);



	useEffect(() => {
		let color = colorList[property.colorIndex][0]
		// console.log({ color })



		objects.forEach((object: any) => {
			console.log(object)
			object.traverse((child: any) => {
				if (child.isMesh) {
					// child.material = new THREE.MeshToonMaterial({ color: 0x6699FF });
					child.material.color.set(color); // 新しい色を設定
				}
			});

			// sceneProps.scene.remove(object);
		});
	}, [property.colorIndex, colorList]);




	function removeObject() {
		objects.forEach((object: any) => {

			sceneProps.scene.remove(object);
		});
		setObjects([]);
	}

	useEffect(() => {
		console.log("uuidが変更")
		// removeObject()
	}, [property.uuid]);

	// useEffect(() => {
	// 	console.log("今のを削除", objects)
	// 	objects.forEach((object: any) => {

	// 		sceneProps.scene.remove(object);
	// 	});
	// 	setObjects([]);

	// }, [property]);


	function deleteObjects() {
		console.log("今のを削除", objects);
		objects.forEach((object: any) => {

			sceneProps.scene.remove(object);
		});
		setObjects([]);
	}

	// useEffect(() => {
	// 	console.log("モデル名変更")
	// }, [property.model])


	useEffect(() => {
		positionUpdate()
	}, [property, objects]);

	// 		useEffect(() => {
	// setTimeout(() => positionUpdate(), 1000);
	// 	}, [ property.symmetry]);

	function positionUpdate() {
		console.log("座標変更", objects)
		if (!objects) return
		objects.forEach((object: any, index: number) => {
			// 度をラジアンに変換
			object.layers.set(10);
			const pitch = (property.pitch + 0) * (Math.PI / 180);
			const roll = (property.roll - 90) * (Math.PI / 180);
			const rotate = (property.rotate) * (Math.PI / 180);

			const sizex = property.size / 1000;
			const sizey = property.size / 1000;
			const sizez = property.size / 1000;



			let x = Math.sin(pitch) * 100;
			let y = Math.sin(roll) * Math.cos(pitch) * 100;
			let z = Math.cos(roll) * Math.cos(pitch) * 100;

			console.log({ index })
			console.log({ symmetryType })
			if (index == 1) {
				if (symmetryType == 1) {

					y *= -1
				} else if (symmetryType == 2) {

					z *= -1
				} else {
					x *= -1
				}
			}

			object.position.set(x, y, z);
			object.scale.set(sizex, sizey, sizez);
			object.lookAt(0, 0, 0);
			object.rotateX(-Math.PI / 2);


			object.rotateY(index == 0 ? rotate : -rotate);

		});

	}

	const isSelected = id == selectingId;
	return (<>
		<div style={{
			// background: "#FF0000",
			aspectRatio: "1",
			// paddingBottom: 10,
		}}>
			<Button onClick={() => { setSelectingId(id) }} style={{

				paddingBottom: isSelected ? "1px" : "0px",
				// height: "100%", aspectRatio: 1,
				padding: 0,
				width: "2em", aspectRatio: 1, margin: 0,
				borderBottomLeftRadius: isSelected ? "0px" : "8px",
				borderBottomRightRadius: isSelected ? "0px" : "8px",
				borderBottom: isSelected ? 'none' : '1px solid #000000',
				backgroundColor: "#ffffff",
				// borderColor: "#ff0000"
			}}
				variant="outline-dark">

				<img src={`${process.env.PUBLIC_URL}/model/${property.model}.jpg`} alt="icon" style={{ width: "2em", aspectRatio: 1, mixBlendMode: "multiply" }} />
				{/* {id}{property.model ?? null} */}
			</Button>
		</div >

	</>);
}


export default Decoration;