import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import size_guide from '../img/size_guide.jpg';
import SizeSet from './sizeSet'
import { useNavigate } from "react-router-dom";
type NewProps = {

};
const New: React.FC<NewProps> = ({ }) => {
    const [rollWidth, setRollWidth] = useState(20);
    const [pitchWidth, setPitchWidth] = useState(20);
    const navigate = useNavigate();
    const newCreate = () => {
        navigate('/edit', {
            state: {
                rollWidth: rollWidth * 2,
                pitchWidth: pitchWidth,
                saveKeyName: `new-${new Date().toLocaleTimeString()}`
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
            {/* 新規作成 */}
            {/* <SizeSet></SizeSet> */}


            <div style={{
                display: "grid",
                gridTemplateColumns: "1.5fr 1fr",
                gridTemplateRows: "1fr 1fr",
                width: "100%",      // 親要素の幅に合わせる
                maxWidth: "100vw",  // 最大幅を画面幅に制限
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
            {/* {rollWidth}-{pitchWidth} */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: "5px" }}>

                <Button onClick={newCreate}>新規作成</Button>
            </div>
        </>
    )

};

export default New;
