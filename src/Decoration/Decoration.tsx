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
const Decoration = ({ sceneProps, decorationObjects, setDecorationObjects }: any) => {


	// const [objects, setObjects] = useState<any>([]);

	const [selectingId, setSelectingId] = useState<number>(0);

	const modelFileNames = ["eye", "ear"]
	const selecting = selectingId >= 0 && selectingId < decorationObjects.length ? decorationObjects[selectingId] : null;

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

	function addDecorationObjects() {
		setDecorationObjects([...decorationObjects, {
			name: "aa",
			pitch: 0,
			yaw: 0,
			symmetry:true
		}]);
	}

	return (<>
		{/* デコレーション */}
		{/* {`${objects}`} */}

		<div className="col-2 col-md-2  col-xl-2 no-margin" >

			{decorationObjects.map((obj: any, i: number) => (
				<Item property={obj}
					sceneProps={sceneProps}
					selectingId={selectingId}
					setSelectingId={setSelectingId}
					id={i}
				></Item>
			))}
			<Button onClick={() => { addDecorationObjects() }}
				style={{
					// background: "#FF0000",
					width: "90%",
					aspectRatio: "1"
				}}>
				+
			</Button>
		</div >


		<div className="col-10 no-margin" >
			{selecting != null && (
				<>
					{
						modelFileNames.map((fileName: any) => (
							<Button onClick={() => { updateSelectiongItemProperty("model", `${fileName}`) }}	>
								{fileName}
							</Button>
						))
					}

					<Button onClick={() => { updateSelectiongItemProperty("x", decorationObjects[selectingId].x + 1) }}
					>
						x+=1
					</Button>
					<Form.Range
						value={decorationObjects[selectingId].pitch}
						onChange={(e: any) => {
							console.log("value", parseInt(e.target.value, 10));
							updateSelectiongItemProperty("pitch", parseInt(e.target.value, 10));
						}}
						min={0}
						max={180}
						step={1}
					/>
					<Form.Range
						value={decorationObjects[selectingId].yaw}
						onChange={(e: any) => {
							console.log("value", parseInt(e.target.value, 10));
							updateSelectiongItemProperty("yaw", parseInt(e.target.value, 10));
						}}
						min={0}
						max={360}
						step={1}
					/>

					  <Form.Check
						type="checkbox"
						label="Enable feature"
						checked={decorationObjects[selectingId].symmetry} 
						onChange={(e: any) => { updateSelectiongItemProperty("symmetry", !decorationObjects[selectingId].symmetry) }} 
      />


				</>
			)}

		</div>

	</>);
}

const Item = ({ property, sceneProps, id, setSelectingId, selectingId }: any) => {
	
	const [objects, setObjects] = useState<any>([]);

	const loadObjects = async (file:string) => {
		// https://notetoself-dy.com/fbx-animaition-three-js/#outline__3
		const loader = new FBXLoader();
		// const file = `${process.env.PUBLIC_URL}/model/${property.model}.fbx`;
		console.log({ file })
		const tmpobjects: any[] = [];
		for (let i = 0; i < (property.symmetry ? 2 : 1); i++) {
			const obj = await new Promise((resolve, reject) => {
				loader.load(
					file,
					(obj) => {
						obj.scale.set(0.1, 0.1, 0.1);

						obj.traverse((child: any) => {
							if (child.isMesh) {
								child.material.color.set(0xff0000);
							}
						});

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
				console.log("今のを削除",objects)
				objects.forEach((object: any) => {
					
					sceneProps.scene.remove(object);
				});
				setObjects([]);
			// }
		};
		

	}, [property.model, property.symmetry]);
	

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
	}, [property.model, property.pitch, property.yaw, property.symmetry,objects]);

// 		useEffect(() => {
// setTimeout(() => positionUpdate(), 1000);
// 	}, [ property.symmetry]);
	
	function positionUpdate() {
		console.log("座標変更", objects)
		if (!objects) return
		objects.forEach((object: any,index:number) => {
			// 度をラジアンに変換
			const pitch = property.pitch * (Math.PI / 180);
			const yaw = property.yaw * (Math.PI / 180);


			let x = Math.sin(pitch) * 100;
			let y = Math.sin(yaw) * Math.cos(pitch) * 100;
			let z = Math.cos(yaw) * Math.cos(pitch) * 100;

			console.log({ index })
			if (index == 1) {
				x*=-1
			}

			object.position.set(x, y, z);
			object.lookAt(0, 0, 0);
			object.rotateX(-Math.PI / 2);
		});

	}

	const isSelected = id == selectingId;
	return (<>
		<div style={{
			// background: "#FF0000",
			width: isSelected ? "100%" : "90%"
			, aspectRatio: "1"
		}}>
			<Button onClick={() => { setSelectingId(id) }} style={{

				width: "100%", height: "100%", right: 0
			}}>
				{id}{property.model ?? null}
			</Button>
		</div>

		{/* {item} */}
	</>);
}


export default Decoration;