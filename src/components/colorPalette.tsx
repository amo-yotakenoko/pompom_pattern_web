import React, { useEffect, useState } from 'react';
import { Slider, Sketch, Material, Colorful, Compact, Circle, Wheel, Block, Github, Chrome, } from '@uiw/react-color';
// import { Alpha, Hue, ShadeSlider, Saturation, Interactive, hsvaToHslaString } from '@uiw/react-color';
import { EditableInput, EditableInputRGBA, EditableInputHSLA } from '@uiw/react-color';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
type colorPaletteProps = {

    colorList: any;
    selectColor: number;
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
                    color: '#000000',
                    height: isSelected ? '60px' : '50px',


                }}
            >
                {idx}
            </ToggleButton >
        );
    }

    return (
        <div>
            {/* {selectColor} */}
            <Sketch color={colorList[selectColor]} onChange={colorChange} disableAlpha={true} />

            <ButtonGroup style={{
                position: "fixed",
                bottom: 0,
                // https://zero-plus.io/media/css-align-items-how-to-use/
                display: "flex",
                alignItems: "flex-end",
                width: "100%"
            }}>
                {colorButtons}
            </ButtonGroup>
        </div >


    );
}




export default ColorPalette;