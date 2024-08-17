import React, { useEffect, useState } from 'react';

// import { Canvas, useFrame } from '@react-three/fiber';
// import { BufferGeometry, Float32BufferAttribute, Mesh, MeshBasicMaterial } from 'three';
// import { OrbitControls } from "@react-three/drei";
import 'bootstrap/dist/css/bootstrap.min.css';

import Pompom from './components/Pompom'
import ColorPalette from './components/colorPalette'
import BluePrint from './components/bluePrint'
import Menu from './components/menu'
// import Button from 'react-bootstrap/Button';




function App() {

  const [colorList, setColorList] = useState([
    "#FFAFFF", // white
    "#FF5733", // Red-Orange
    "#FFBD33", // Orange-Yellow
    "#FFFF33", // Yellow
    "#B6FF33", // Yellow-Green
    "#33FF57", // Green
    "#33FFBD", // Green-Cyan
    "#33FFFF", // Cyan
    "#33B6FF", // Cyan-Blue
    "#3357FF", // Blue
    "#BD33FF", // Purple
    "#FF33FF", // Magenta
    "#FF33B6"  // Pink
  ]);
  const rollWidth = 10
  const pitchWidth = 10
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
      aaaa
      <Menu
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      ></Menu>

    </div >
  );
}

export default App;
