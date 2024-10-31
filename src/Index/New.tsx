import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


import Button from 'react-bootstrap/Button';
import size_guide from '../img/size_guide.jpg';
import horizontalSymmetry from '../img/horizontalSymmetry.jpg';
import horizontalSymmetry2 from '../img/horizontalSymmetry2.jpg';
// import horizontalSymmetry2 from '../img/horizontalSymmetry2.jpg';
import SizeSet from './sizeSet'
import { useNavigate } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';
type NewProps = {

};
const New: React.FC<NewProps> = ({ }) => {
    const [rollWidth, setRollWidth] = useState(20);
    const [pitchWidth, setPitchWidth] = useState(8);
    const [symmetryType, setSymmetryType] = useState(0);
    const navigate = useNavigate();
    const newCreate = () => {
        navigate('/edit', {
            state: {
                rollWidth: rollWidth * 2,
                pitchWidth: pitchWidth,
                saveKeyName: `new-${new Date().toLocaleTimeString()}`,
                symmetryType: symmetryType
                // colorList: [
                //     ["#FF33FF"], // Magenta
                //     ["#FFFFFF"], // white
                //     ["#FF5733",], // Red-Orange
                //     ["#FFBD33", "#FF0033"], // Orange-Yellow
                //     ["#FFFF33"], // Yellow
                //     ["#B6FF33"], // Yellow-Green
                //     ["#33FF57"], // Green
                //     ["#33FFBD"], // Green-Cyan
                //     ["#33FFFF"], // Cyan
                //     ["#33B6FF"], // Cyan-Blue
                //     ["#3357FF"], // Blue
                //     ["#BD33FF"], // Purple
                // ],
                // pattern: testPattern(20, 20)
            }
        });
    };

    return (
        <>



            <div style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 1fr",
                gridTemplateRows: "1fr 1fr",
                width: "100%",
                maxWidth: "100vw",
                boxSizing: "border-box",
            }}>
                <div style={{
                    gridRow: "1 / 3",
                    gridColumn: "1",
                    // backgroundColor: "#ff0000",
                }}>
                    <img src={size_guide} style={{
                        width: "100%"
                    }}></img>
                </div>
                <div style={{
                    gridRow: "1",
                    gridColumn: "2",
                    // backgroundColor: "#00ff00",
                }}>
                    <SizeSet
                        value={rollWidth}
                        valueSet={setRollWidth}></SizeSet>
                </div>
                <div style={{
                    gridRow: "2",
                    gridColumn: "2",
                    // backgroundColor: "#0000ff",
                }}>
                    <SizeSet
                        value={pitchWidth}
                        valueSet={setPitchWidth}></SizeSet>
                </div>
            </div>


            <ButtonGroup style={{ width: "100%", margin: "1em 0" }}>

                {[
                    <>
                        <img src={horizontalSymmetry} style={{ mixBlendMode: "multiply", width: "2em", transform: "rotate(0deg)" }}></img >
                     <div style={{whiteSpace: 'nowrap'}}>左右対称</div>   
                    </>
                    ,
                    <>
                        <img src={horizontalSymmetry} style={{ mixBlendMode: "multiply", width: "2em", transform: "rotate(-90deg)" }}></img >
                        <div style={{whiteSpace: 'nowrap'}}>上下対称</div>   
                    </>,
                     <>
                        <img src={horizontalSymmetry2} style={{ mixBlendMode: "multiply", width: "2em", transform: "rotate(-90deg)" }}></img >
                         <div style={{whiteSpace: 'nowrap'}}>前後対称</div>  
                    </>
                ].map((content, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant="secondary-light"
                        name="radio"
                        value={idx}
                        checked={symmetryType === idx}
                        onChange={(e) => setSymmetryType(idx)}
                        style={{
                            backgroundColor: "#f5f5f5",
                            color: "#555555"
                        }}
                    >
                        <div style={{ opacity: symmetryType === idx ? 1 : 0.5 }}>
                            {content}
                        </div>
                    </ToggleButton>
                ))}
            </ButtonGroup >





            {/* <img src={horizontalSymmetry2} style={{ width: "100px", transform: "rotate(-90deg)" }}></img >
            <img src={horizontalSymmetry2} style={{ width: "100px", transform: "rotate(0deg)" }}></img > */}

            {/* <img src={horizontalSymmetry} style={{ width: "100px", transform: "rotate(0deg)" }}></img >
            <img src={horizontalSymmetry} style={{ width: "100px", transform: "rotate(90deg)" }}></img > */}

            {/* {rollWidth}-{pitchWidth} */}
            < div style={{ display: 'flex', justifyContent: 'flex-end', margin: "5px" }
            }>

                <Button onClick={newCreate}>新規作成<Icon.PencilSquare style={{
                    marginLeft: '8px',
                    fontSize: '20px'
                }} /></Button>
            </div >
        </>
    )

};

export default New;
