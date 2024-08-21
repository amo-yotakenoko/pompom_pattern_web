import React, { useEffect, useState } from 'react';
import { Slider, Sketch, Material, Colorful, Compact, Circle, Wheel, Block, Github, Chrome, } from '@uiw/react-color';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
// import { Alpha, Hue, ShadeSlider, Saturation, Interactive, hsvaToHslaString } from '@uiw/react-color';
import {
    AlphaPicker, BlockPicker, ChromePicker, CirclePicker, CompactPicker,
    GithubPicker, HuePicker, MaterialPicker, PhotoshopPicker, SketchPicker,
    SliderPicker, SwatchesPicker, TwitterPicker
} from 'react-color';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';
import menuIcon from '../img/designsystem-assets/icon/png/menu_fill24.png';
import ColorEdit from './colorEdit'
type colorPaletteProps = {

    colorList: any;
    selectColor: any;
    setSelectColor: any;
    setColorList: any;


};

const ColorPalette: React.FC<colorPaletteProps> = ({ colorList, selectColor, setSelectColor, setColorList }) => {
    // const colorChange = (color: any, selectColor: any, i: any) => {
    //     // console.log(color.hex)
    //     let newColorList = [...colorList]
    //     newColorList[selectColor][i] = color.hex;
    //     setColorList(newColorList);
    // };
    // const [editingParette, setEditingParette] = useState(0);
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

            <div style={{
                // position: 'relative',
                // display: 'inline-block',
                width: "100%",
                height: "100%",
            }}>


                <ToggleButton
                    key={idx}
                    id={`color-${idx}`}
                    type="radio"


                    value="color"
                    checked={isSelected}
                    onChange={(e) => setSelectColor(idx)}
                    style={{
                        background: `linear-gradient(150deg,${cssColor})`,
                        // position: 'absolute',
                        // top: 0,
                        // left: 0,
                        width: "100%",
                        height: "100%",

                        border: 'none',
                        borderRadius: isSelected ? '80% 80% 80% 80%' : '100%',

                        paddingTop: "100%",
                        boxShadow: `0 4px 8px rgba(0, 0, 0, ${isSelected ? 0.75 : 0.2})`,
                        position: "relative"
                    }}
                >
                    {/* <button style={{
                        position: "absolute",
                        top: "0px",
                        right: " 0px",
                    }}>aa</button> */}
                    {/* {isSelected &&
                        <img src={menuIcon} style={{
                            position: "absolute",
                            top: "2%",
                            right: " 2%",
                        }}
                            id={`paretteEdit-${idx}`} />} */}
                    {/* <Overlay target={document.getElementById(`color-${idx}`)} show={editingParette == idx} placement="right">
                        {(props) => (
                            <Tooltip id="overlay-example" >
                                {`color-${idx}`}
                            </Tooltip>
                        )}
                    </Overlay> */}

                </ToggleButton >
            </div >
        );
    }


    console.log({ color: colorList[selectColor] })
    return (
        <div >
            {/* {selectColor} */}



            <div className="container no-margin" style={{ margin: 0, padding: 0 }}>
                <div className="row no-margin" style={{ margin: 0, padding: 0 }} >
                    <div className="col-5 no-margin" style={{
                        maxHeight: "calc(100vh - 100vw - 2.5em)",
                        // height: "100%",
                        overflow: "auto",
                        // maxWidth: "100%",
                        margin: "0",
                        // maxHeight: "30vh",
                        padding: "0 1em 0 0",
                        // border: "1px solid #333333"
                    }}>

                        <ColorEdit colorList={colorList}
                            selectColor={selectColor}
                            setSelectColor={setSelectColor}
                            setColorList={setColorList}

                        ></ColorEdit>
                    </div>


                    <div className="col-7 no-margin"  >
                        <ButtonGroup className="no-margin" style={{
                            // position: "fixed",
                            // bottom: 0,
                            // // https://zero-plus.io/media/css-align-items-how-to-use/
                            // display: "flex",
                            // alignItems: "flex-end",
                            display: "grid",
                            gridTemplateColumns: 'repeat(auto-fit, minmax(12vw, 1fr))',

                            maxHeight: "calc(100vh - 100vw - 2.5em)",
                            // height: "100%",
                            overflow: "auto",
                            padding: "8px",
                            // border: "1px solid #333333"

                        }}>
                            {colorButtons}
                            <br></br>
                        </ButtonGroup>
                    </div>
                </div>
            </div >
            {/* {editingParette} */}
            {/* <br /><br /><br /><br /><br /><br /><br /><br /><br /> */}
        </div >


    );
}




export default ColorPalette;