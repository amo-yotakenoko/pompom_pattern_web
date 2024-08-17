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
    const colorChange = (color: any) => {
        // console.log(color.hex)
        let newColorList = [...colorList]
        newColorList[selectColor] = color.hex;
        setColorList(newColorList);
    };

    // function setColorId(id: any) {
    //     console.log(id);
    // }
    let colorButtons = [];
    for (let idx = 0; idx < colorList.length; idx++) {
        let color = colorList[idx];
        let isSelected = selectColor === idx;

        colorButtons.push(
            <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                // variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                name="radio"
                value={color}
                checked={isSelected}
                onChange={(e) => setSelectColor(idx)}
                style={{
                    backgroundColor: color,
                    // color: '#000000',
                    // display: "flex",
                    width: "100%",
                    height: "100%",
                    border: 'none',
                    borderRadius: isSelected ? '10%' : '100%',
                    // height: isSelected ? '60px' : '50px',
                    paddingTop: "100%"

                }
                }
            >
                {/* {idx} */}
            </ToggleButton >
        );
    }

    return (
        <div>
            {/* {selectColor} */}



            <div className="container">
                <div className="row">
                    <div className="col">
                        <Sketch color={colorList[selectColor]} onChange={colorChange} disableAlpha={true} style={{
                            width: "100%",
                        }} />
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