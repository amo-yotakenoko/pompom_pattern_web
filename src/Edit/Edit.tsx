import React, { useEffect, useState, createContext, useContext, useRef } from 'react';
import { useLocation } from "react-router-dom"
import * as THREE from 'three';
import { Overlay, Tooltip, Button } from 'react-bootstrap';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { BufferGeometry, Float32BufferAttribute, Mesh, MeshBasicMaterial } from 'three';
// import { OrbitControls } from "@react-three/drei";
import 'bootstrap/dist/css/bootstrap.min.css';
import LocalStrageSave from './LocalStrageSave';
import Pompom from './Pompom'
import ColorPalette from './colorPalette'
import BluePrint from '../BluePrint/BluePrint'
import Menu from '../Menu'
import VerticalMenu from './VerticalMenu';
import UndoRedo from './undoRedu'
import ColorEdit from './colorEdit'
import HelpButton from './HelpButton';
import CameraScan from '../CameraScaan/CameraScan';
import { Camera } from 'react-bootstrap-icons';
import * as Icon from 'react-bootstrap-icons';
import Help from "../Help"
import Decoration from '../Decoration/Decoration';
// import CameraScan from '../CameraScaan/CameraScan';
// import Button from 'react-bootstrap/Button';
// import '../index.css';

const enableHelpContext = createContext<any>(null);
function Edit() {
  const location = useLocation()




  const [colorList, setColorList] = useState([
    ["#FFFFFF"],
    ["#FF5733"],
    ["#FFBD33", "#FF0033"],
    ["#FFFF33"],
    ["#B6FF33"],
    ["#33FF57"],
    ["#33FFBD"],
    ["#33FFFF"],
    ["#33B6FF"],
    ["#3357FF"],
    ["#BD33FF"],
    ["#FF33FF"],

  ]);

  const [multiColorSelect, setMultiColorSelect] = useState([
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,

  ]);



  const [rollWidth, setRollWidth] = useState(0);
  const [pitchWidth, setPitchWidth] = useState(0);

  // const rollWidth = 10
  // const pitchWidth = 9
  const [selectColor, setSelectColor] = useState(1);

  const [activeMenu, setActiveMenu] = useState("pompom");

  const [enableHelp, setEnableHelp] = useState(false);
  const meshList = useRef<THREE.Mesh[]>([]);
  const [sceneProps, setSceneProps] = useState(undefined);
  const [pattern, setPattern] = useState(brankPattern(rollWidth, pitchWidth));
  const [symmetryType, setSymmetryType] = useState(0);
  const [decorationObjects, setDecorationObjects] = useState<any>([]);

  function brankPattern(rollWidth: any, pitchWidth: any) {
    console.log("Pattern書き直し", rollWidth, pitchWidth)
    const _pattern: any = []
    for (let i = 0; i < rollWidth; i++) {
      _pattern[i] = [];
      for (let j = 0; j < pitchWidth; j++) {
        _pattern[i][j] = 0;
      }
    }
    return _pattern

  }


  useEffect(() => {
    console.log({ 読込: location.state })
    if (location.state) {

      if (location.state.colorList !== undefined) {
        console.log("カラーリストを読み込み")
        setColorList(location.state.colorList);
      }


      let sizeChange = false

      if (location.state.pitchWidth !== undefined && location.state.rollWidth !== undefined) {
        console.log("rollWidthを読み込み")
        setRollWidth(location.state.rollWidth)
        setPitchWidth(location.state.pitchWidth)
        setPattern(brankPattern(location.state.rollWidth, location.state.pitchWidth))
      }

      if (location.state.pattern !== undefined) {
        console.log("Patternを読み込み")
        console.log({ pattern: location.state.pattern })
        setPattern(location.state.pattern);
      }
      if (location.state.symmetryType !== undefined) {

        setSymmetryType(location.state.symmetryType);
        // setSymmetryType(2);
      }

      if (location.state.decorationObjects !== undefined) {

        setDecorationObjects(location.state.decorationObjects);
      }



    }
  }, [location.state]);



  function drawDot(patternPos: any, selectColor: any) {

    // try {
    if (pattern[patternPos.r][patternPos.p] !== selectColor) {
      // console.log("ぬる", isDrwaing)
      console.log(pattern[patternPos.r][patternPos.p], selectColor, pattern[patternPos.r][patternPos.p] !== selectColor)

      let newPatternList = [...pattern]
      newPatternList[patternPos.r][patternPos.p] = selectColor;
      setPattern(newPatternList);
    }
    // } catch (e) {
    //   console.log(e)
    // }
  }


  const [selectingPlate, setSelectingPlate] = useState<any>(-1);

  // const cameraScanRef = useRef(null);
  // useEffect(() => {
  //   setPattern(brankPattern(rollWidth, pitchWidth))
  // }, [rollWidth, pitchWidth]);
  // <div className="row">
  //   <div className="col-12 col-md-6">
  return (
    <>
      <enableHelpContext.Provider value={{ enableHelp, setEnableHelp }}>
        <LocalStrageSave data={{ pattern, colorList, rollWidth, pitchWidth, symmetryType, decorationObjects }} activeMenu={activeMenu} />
        <div style={{ position: 'fixed', top: "5px", right: "5px", display: 'flex', flexDirection: 'row-reverse', gap: '10px', zIndex: 1000 }}>

          <HelpButton activeMenu={activeMenu}></HelpButton>
          {/* {activeMenu == "pompom" && (

            <Icon.Camera style={{ fontSize: "2.5em" }}
              onClick={() => setActiveMenu("cameraScan")}

            />
          )} */}
          {activeMenu == "cameraScan" && (

            <div style={{
              fontSize: "1em", alignItems: 'center',
              justifyContent: 'center'
            }}
              onClick={() => setActiveMenu("pompom")}

            ><Button variant="outline-dark" style={{ borderWidth: '2px', paddingLeft: '5px' }}><Icon.CaretLeft style={{ fontSize: "1.5em", }}></Icon.CaretLeft>戻る</Button></div>
          )}

          {/* <Icon.Camera style={{ fontSize: "2em" }}
            onClick={() => setEnableHelp((prev: any) => !prev)}

          /> */}
        </div>
        {/* <div style={{ position: 'fixed', top: "2em", left: "5px", display: 'flex', flexDirection: 'column', zIndex: 1000 }}>

          <Icon.Camera style={{ fontSize: "2.5em" }}
            onClick={() => setEnableHelp((prev: any) => !prev)}

          />
        </div> */}

        <div className="container-fluid" style={{ padding: 0, margin: 0 }}>
          <div className="row no-margin" id="editing" style={{
            // display: (activeMenu === "pompom" || activeMenu === "cameraScan" || activeMenu === "decoration") ? "flex" : "none",
            // backgroundColor: "#f0f0ff",
            position: "fixed",
            top: "0",

            width: "100%",
          }}>
            <div className={`${window.innerHeight > window.innerWidth ? "col-12" : "col-4"} no-margin`}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1",
                  border: "1px solid black",
                  display: (activeMenu === "pompom" || activeMenu === "cameraScan" || activeMenu === "decoration") ? "flex" : "none",
                }}
              >
                <Pompom
                  sceneProps={sceneProps}
                  setSceneProps={setSceneProps}
                  pattern={pattern}
                  colorList={colorList}
                  rollWidth={rollWidth}
                  pitchWidth={pitchWidth}
                  selectColor={selectColor}
                  setPattern={setPattern}
                  activeMenu={activeMenu}
                  drawDot={drawDot}
                  meshList={meshList}
                  symmetryType={symmetryType}
                />


                <Icon.ArrowsMove
                  // ref={moveRef}
                  id="ArrowsMove"
                  className="position-absolute"
                  style={{
                    bottom: "2%",
                    right: "2%",
                    position: "absolute",
                    width: "15%",
                    height: "15%",
                    pointerEvents: "none",
                    transform: selectingPlate < 0 ? "scale(1)" : "scale(0)",
                    transition: "transform 0.3s ease",
                  }}
                />
                {/* {selectingPlate}{selectingPlate >= 0&&(<>カメラ <Help id="RecordCircle">撮影{selectingPlate}</Help></>)} */}
                {/* <div style={{ display: selectingPlate < 0 ? "display" : "none" }}> */}
                {selectingPlate < 0 && (

                  <Help id="ArrowsMove">{`スワイプして回転`}</Help>
                )}
                {selectingPlate >= 0 && (

                  <Help id="RecordCircle">{`撮影`}</Help>
                )}
                {/* </div> */}

                {/* <div style={{ display: selectingPlate >= 0 ? "display" : "none" }}>
                  
                  <Help id="RecordCircle">撮影{selectingPlate}</Help>
                </div> */}



                <Icon.RecordCircle
                  // ref={moveRef}
                  id="RecordCircle"
                  className="position-absolute"
                  style={{
                    bottom: "2%",
                    right: "2%",
                    position: "absolute",
                    width: "15%",
                    height: "15%",
                    // pointerEvents: "none",
                    transform: selectingPlate >= 0 ? "scale(1)" : "scale(0)",
                    transition: "transform 0.3s ease",
                  }}
                  onClick={() => {
                    // console.log("スキャン", cameraScanRef.current)
                    // if (cameraScanRef.current)
                    //   (cameraScanRef.current as any).takeScan();
                    document.getElementById("addHistory")?.click();
                    setSelectingPlate(-1)
                  }}
                />
                {/* {selectingPlate} */}
                {/* <Help id="RecordCircle">撮影</Help> */}

              </div >

              {activeMenu === "bluePrint" && (

                <BluePrint
                  pattern={pattern}
                  colorList={colorList}
                  rollWidth={rollWidth}
                  pitchWidth={pitchWidth}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                />


              )}
            </div>

            <div className="row no-margin" style={{
              overflowY: "auto", height: `${window.innerHeight < window.innerWidth ? "calc(100dvh - 100vw )" : "100dvh "} no-margin`, width: "calc(100vw - 2em)",
              // backgroundColor: "#f0f0f0",
              // display: (activeMenu === "pompom" || activeMenu === "cameraScan" || activeMenu === "decoration") ? "flex" : "none",
            }}>




              {activeMenu === "pompom" && (

                <div className="col-6 col-md-3 col-xl-4 no-margin " style={{ display: activeMenu === "pompom" ? "flex" : "none", }}>
                  <ColorEdit
                    colorList={colorList}
                    selectColor={selectColor}
                    setSelectColor={setSelectColor}
                    setColorList={setColorList}
                  />
                </div>
              )}

              <div className="col-6 col-xl-4 no-margin " style={{ display: activeMenu === "cameraScan" ? "flex" : "none", }}>
                <CameraScan
                  sceneProps={sceneProps}
                  activeMenu={activeMenu}
                  drawDot={drawDot}
                  meshList={meshList}
                  colorList={colorList}
                  multiColorSelect={multiColorSelect}
                  selectingPlate={selectingPlate} setSelectingPlate={setSelectingPlate}
                // ref={cameraScanRef}
                ></CameraScan>
                <br />
                <br /> <br /> <br /> <br /> <br /> <br />
              </div>


              <div className="col-12 " style={{ display: activeMenu === "decoration" ? "flex" : "none", }}>
                <Decoration sceneProps={sceneProps}
                  decorationObjects={decorationObjects}
                  setDecorationObjects={setDecorationObjects}
                  symmetryType={symmetryType}
                  colorList={colorList}
                ></Decoration>
                <br />
                <br /> <br /> <br /> <br /> <br /> <br />
              </div>
              {(activeMenu === "pompom" || activeMenu === "cameraScan") &&
                <div className="col-6 col-md-9  col-xl-4 no-margin" >
                  <ColorPalette
                    colorList={colorList}
                    selectColor={selectColor}
                    setSelectColor={setSelectColor}
                    setColorList={setColorList}
                    multiColorSelect={multiColorSelect}
                    setMultiColorSelect={setMultiColorSelect}
                    enableMultiColorSelect={activeMenu === "cameraScan"}
                  />
                </div>
              }

              {activeMenu !== "bluePrint" && (
                <VerticalMenu activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                ></VerticalMenu>
              )}

            </div>



            {/* 
            <div className="row no-margin" style={{
              overflowY: "auto", height: "calc(100vh - 100vw - 1em)",
              // backgroundColor: "#f0f0f0",
              display: activeMenu === "cameraScan" ? "flex" : "none",
            }}>

              <div className="col-6 col-xl-4 no-margin ">
                <CameraScan
                  sceneProps={sceneProps}
                  activeMenu={activeMenu}
                  drawDot={drawDot}
                  meshList={meshList}
                  colorList={colorList}
                ></CameraScan>
              </div>

            </div> */}







          </div>


          {/* <div style={{ display: activeMenu === "bluePrint" ? "block" : "none" }}> */}

        </div>
        {/* <Menu
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          pattern={pattern}
          setPattern={setPattern}
          colorList={colorList}
          setColorList={setColorList}
          selectColor={selectColor}
          setSelectColor={setSelectColor}
        /> */}

        <UndoRedo
          enable={activeMenu == "pompom" || activeMenu == "cameraScan"} registerEnable={activeMenu == "pompom"} pattern={pattern} setPattern={setPattern} colorList={colorList} setColorList={setColorList} selectColor={selectColor} setSelectColor={setSelectColor}></UndoRedo>

      </enableHelpContext.Provider >

    </>
  );
}

export default Edit;
export { enableHelpContext };