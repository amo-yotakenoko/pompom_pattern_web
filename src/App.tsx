import React, { useEffect, useState } from 'react';

// import { Canvas, useFrame } from '@react-three/fiber';
// import { BufferGeometry, Float32BufferAttribute, Mesh, MeshBasicMaterial } from 'three';
// import { OrbitControls } from "@react-three/drei";
import 'bootstrap/dist/css/bootstrap.min.css';

import Pompom from './components/Pompom'
import ColorPalette from './components/colorPalette'
import BluePrint from './components/bluePrint'
import Menu from './components/menu'
import UndoRedo from './components/undoRedu'
// import Button from 'react-bootstrap/Button';



function App() {

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
    // "#FF33B6"  // Pink
  ]);
  const rollWidth = 8 * 12
  const pitchWidth = 9
  // const rollWidth = 10
  // const pitchWidth = 9
  const [selectColor, setSelectColor] = useState(1);

  const [activeMenu, setActiveMenu] = useState("pompom");


  const [pattern, setPattern] = useState(resetPattern());


  function resetPattern() {

    const _pattern: any = []
    for (let i = 0; i < rollWidth; i++) {
      _pattern[i] = [];
      for (let j = 0; j < pitchWidth; j++) {
        _pattern[i][j] = 0;
      }
    }
    return _pattern

  }


  // useEffect(() => {
  //   patternRef = pattern;
  // }, [pattern]);



  return (

    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{ display: activeMenu === "pompom" ? "block" : "none" }}>
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

    </div >
  );
}

export default App;
