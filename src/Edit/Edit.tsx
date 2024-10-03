import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom"

// import { Canvas, useFrame } from '@react-three/fiber';
// import { BufferGeometry, Float32BufferAttribute, Mesh, MeshBasicMaterial } from 'three';
// import { OrbitControls } from "@react-three/drei";
import 'bootstrap/dist/css/bootstrap.min.css';
import LocalStrageSave from './LocalStrageSave';
import Pompom from './Pompom'
import ColorPalette from './colorPalette'
import BluePrint from '../BluePrint/BluePrint'
import Menu from './menu'
import UndoRedo from './undoRedu'
import ColorEdit from './colorEdit'
// import Button from 'react-bootstrap/Button';
// import '../index.css';


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



  const [rollWidth, setRollWidth] = useState(3);
  const [pitchWidth, setPitchWidth] = useState(3);

  // const rollWidth = 10
  // const pitchWidth = 9
  const [selectColor, setSelectColor] = useState(1);

  const [activeMenu, setActiveMenu] = useState("pompom");




  const [pattern, setPattern] = useState(brankPattern(rollWidth, pitchWidth));
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



    }
  }, [location.state]);


  // useEffect(() => {
  //   setPattern(brankPattern(rollWidth, pitchWidth))
  // }, [rollWidth, pitchWidth]);
  // <div className="row">
  //   <div className="col-12 col-md-6">
  return (
    <>
      <LocalStrageSave data={{ pattern, colorList, rollWidth, pitchWidth }} activeMenu={activeMenu} />

      <div className="container-fluid" style={{ padding: 0, margin: 0 }}>
        <div className="row no-margin" style={{
          display: activeMenu === "pompom" ? "flex" : "none",
          // backgroundColor: "#f0f0ff",
        }}>
          <div className="col-12 col-xl-4 no-margin">
            <Pompom
              pattern={pattern}
              colorList={colorList}
              rollWidth={rollWidth}
              pitchWidth={pitchWidth}
              selectColor={selectColor}
              setPattern={setPattern}
              activeMenu={activeMenu}
            />
          </div>

          <div className="row no-margin" style={{
            overflowY: "auto", height: "calc(100vh - 100vw - 1em)",
            // backgroundColor: "#f0f0f0",
          }}>

            <div className="col-6 col-xl-4 no-margin ">
              <ColorEdit
                colorList={colorList}
                selectColor={selectColor}
                setSelectColor={setSelectColor}
                setColorList={setColorList}
              />
            </div>

            <div className="col-6 col-xl-4 no-margin">
              <ColorPalette
                colorList={colorList}
                selectColor={selectColor}
                setSelectColor={setSelectColor}
                setColorList={setColorList}
              />
            </div>
          </div>
        </div>


        {/* <div style={{ display: activeMenu === "bluePrint" ? "block" : "none" }}> */}
        {activeMenu === "bluePrint" && (

          <BluePrint
            pattern={pattern}
            colorList={colorList}
            rollWidth={rollWidth}
            pitchWidth={pitchWidth}
            activeMenu={activeMenu}
          />


        )}
      </div>
      <Menu
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        pattern={pattern}
        setPattern={setPattern}
        colorList={colorList}
        setColorList={setColorList}
        selectColor={selectColor}
        setSelectColor={setSelectColor}
      />
    </>
  );
}

export default Edit;
