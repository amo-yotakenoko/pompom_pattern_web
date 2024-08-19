import React, { useEffect, useState } from 'react';
import { Slider, Sketch, Material, Colorful, Compact, Circle, Wheel, Block, Github, Chrome, } from '@uiw/react-color';
// import { Alpha, Hue, ShadeSlider, Saturation, Interactive, hsvaToHslaString } from '@uiw/react-color';
import { EditableInput, EditableInputRGBA, EditableInputHSLA } from '@uiw/react-color';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import 'bootstrap/dist/css/bootstrap.min.css';
type colorPaletteProps = {

    colorList: any;
    selectColor: any;
    setSelectColor: any;
    setColorList: any;


};

const ColorPalette: React.FC<colorPaletteProps> = ({ colorList, selectColor, setSelectColor, setColorList }) => {
    const colorChange = (color: any, selectColor: any, i: any) => {
        // console.log(color.hex)
        let newColorList = [...colorList]
        newColorList[selectColor][i] = color.hex;
        setColorList(newColorList);
    };

    // function setColorId(id: any) {
    //     console.log(id);
    // }
    let colorButtons = [];
    for (let idx = 0; idx < colorList.length; idx++) {
        // let color = colorList[idx][0];
        let isSelected = selectColor === idx;
        let cssColor = [];
        for (let ci = 0; ci < colorList[idx].length; ci++) {
            const color = colorList[idx][ci];
            cssColor.push(`${color} ${ci / colorList[idx].length * 100}% , ${color} ${(ci + 1) / colorList[idx].length * 100}%`)
        }
        // console.log(cssColor.join(', '))
        colorButtons.push(
            <>

                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    // variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                    name="radio"
                    value="color"
                    checked={isSelected}
                    onChange={(e) => setSelectColor(idx)}
                    style={{
                        background: `linear-gradient(150deg,${cssColor})`,
                        // color: '#000000',
                        // display: "flex",
                        width: "100%",
                        height: "100%",
                        border: 'none',
                        borderRadius: isSelected ? '90%' : '100%',
                        // height: isSelected ? '60px' : '50px',
                        paddingTop: "100%",
                        boxShadow: `0 4px 8px rgba(0, 0, 0, ${isSelected ? 0.75 : 0.2})`,

                    }}
                >  </ToggleButton >

            </>
        );
    }


    console.log({ color: colorList[selectColor] })
    return (
        <div>
            {/* {selectColor} */}



            <div className="container">
                <div className="row">
                    <div className="col" style={{
                        height: "30vh",
                        overflow: "auto",
                        border: "1px solid #333333"
                    }}>


                        {colorList[selectColor].map((color: any, i: any) => (
                            // <div >{i}_{color}</div>

                            <div style={{
                                backgroundColor: color,
                                // border: '2px solid #333',
                                borderRadius: '10px',
                                // padding: '1px',
                                margin: '20px 0',
                                // display: 'flex',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',

                            }}>
                                {/* <div>{i}_{color}</div> */}


                                <button
                                    className="btn btn-outline-primary"
                                    style={{
                                        visibility: colorList[selectColor].length < 2 ? 'hidden' : 'visible',
                                    }}
                                    onClick={() => {
                                        console.log("削除");
                                        let newColorList = [...colorList]
                                        colorList[selectColor].splice(i, 1);

                                        setColorList(newColorList);
                                        // 他の処理をここに追加
                                    }}
                                    disabled={colorList[selectColor].length < 2}
                                >x </button>
                                {/* {colorList[selectColor].length} */}
                                <Sketch color={color} onChange={(color) => colorChange(color, selectColor, i)} disableAlpha={true} style={{
                                    width: "100%",
                                }} />
                            </div>
                        ))}
                        <button className="btn btn-primary"
                            onClick={() => {
                                let newColorList = [...colorList]
                                colorList[selectColor].push("#FF2233")
                                setColorList(newColorList);
                            }}>追加</button>

                    </div>
                    <div className="col">
                        <ButtonGroup style={{
                            // position: "fixed",
                            // bottom: 0,
                            // // https://zero-plus.io/media/css-align-items-how-to-use/
                            // display: "flex",
                            // alignItems: "flex-end",
                            display: "grid",
                            gridTemplateColumns: 'repeat(auto-fit, minmax(12vw, 1fr))',

                        }}>
                            {colorButtons}

                        </ButtonGroup>
                    </div>
                </div>
            </div>

            {/* <br /><br /><br /><br /><br /><br /><br /><br /><br /> */}
        </div >


    );
}




export default ColorPalette;