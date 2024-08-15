import React from 'react';

// import { Canvas, useFrame } from '@react-three/fiber';
// import { BufferGeometry, Float32BufferAttribute, Mesh, MeshBasicMaterial } from 'three';
// import { OrbitControls } from "@react-three/drei";
import 'bootstrap/dist/css/bootstrap.min.css';
import PompomInit from './components/Pompom'
// import Button from 'react-bootstrap/Button';




function App() {
  const boxes = [];
  for (let x = 0; x < 10; x++) {

    boxes.push(<div>box</div >)
  }

  return (

    <div style={{ width: '100vw', height: '100vh' }}>

      <PompomInit name="Pompom Box" rollWidth={20} pitchWidth={20} ></PompomInit>
      {boxes}



    </div>
  );
}

export default App;
