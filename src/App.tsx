import React, { useEffect, useState } from 'react';

// import { Canvas, useFrame } from '@react-three/fiber';
// import { BufferGeometry, Float32BufferAttribute, Mesh, MeshBasicMaterial } from 'three';
// import { OrbitControls } from "@react-three/drei";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pompom from './components/Pompom'
import ColorPalette from './components/colorPalette'
// import Button from 'react-bootstrap/Button';




function App() {

  const [colorList, setColorList] = useState([
    "#FFFFFF", // white
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
  const [selectColor, setSelectColor] = useState(0);
  const [pattern, setPattern] = useState([]);


  return (

    <div style={{ width: '100vw', height: '100vh' }}>

      <Pompom pattern={pattern}
        colorList={colorList}
        rollWidth={20} pitchWidth={20}
        selectColor={selectColor}
        setPattern={setPattern}
      ></Pompom>

      <ColorPalette
        colorList={colorList}
        selectColor={selectColor}
        setSelectColor={setSelectColor}

        setColorList={setColorList}
      ></ColorPalette>


    </div>
  );
}

export default App;
