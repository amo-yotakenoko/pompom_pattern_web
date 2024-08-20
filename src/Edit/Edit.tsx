import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom"

// import { Canvas, useFrame } from '@react-three/fiber';
// import { BufferGeometry, Float32BufferAttribute, Mesh, MeshBasicMaterial } from 'three';
// import { OrbitControls } from "@react-three/drei";
import 'bootstrap/dist/css/bootstrap.min.css';

import Pompom from './Pompom'
import ColorPalette from './colorPalette'
import BluePrint from './bluePrint'
import Menu from './menu'
import UndoRedo from './undoRedu'
// import Button from 'react-bootstrap/Button';



function Edit() {
  const location = useLocation()




  const [colorList, setColorList] = useState([
    ["#FFFFFF"], // white
    ["#FF5733",], // Red-Orange
    ["#FFBD33", "#FF0033"], // Orange-Yellow
    ["#FFFF33"], // Yellow
    ["#B6FF33"], // Yellow-Green
    ["#33FF57"], // Green
    ["#33FFBD"], // Green-Cyan
    ["#33FFFF"], // Cyan
    ["#33B6FF"], // Cyan-Blue
    ["#3357FF"], // Blue
    ["#BD33FF"], // Purple
    ["#FF33FF"], // Magenta

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

  return (

    <>
      <div style={{
        display: activeMenu === "pompom" ? "block" : "none",
        height: "100%"
      }}>
        <Pompom
          pattern={pattern}
          colorList={colorList}
          rollWidth={rollWidth}
          pitchWidth={pitchWidth}
          selectColor={selectColor}
          setPattern={setPattern}
        />
        <ColorPalette
          colorList={colorList}
          selectColor={selectColor}
          setSelectColor={setSelectColor}
          setColorList={setColorList}
        />
      </div>

      <div style={{ display: activeMenu === "bluePrint" ? "block" : "none" }}>

        <BluePrint
          pattern={pattern}
          colorList={colorList}
          rollWidth={rollWidth}
          pitchWidth={pitchWidth}
          activeMenu={activeMenu}
        ></BluePrint>
      </div>

      {/* {`${pattern}`}
      {`${selectColor}`} */}

      <Menu
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        pattern={pattern} setPattern={setPattern} colorList={colorList} setColorList={setColorList} selectColor={selectColor} setSelectColor={setSelectColor}
      ></Menu>

    </ >
  );
}

export default Edit;
