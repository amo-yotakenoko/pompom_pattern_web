import React, { useEffect, useState } from 'react';

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
import addIcon from '../img/designsystem-assets/icon/png/add_fill24.png';
import Help from "../Help"

type colorPaletteProps = {

    colorList: any;
    selectColor: any;
    setSelectColor: any;
    setColorList: any;


};

const ColorEdit: React.FC<colorPaletteProps> = ({ colorList, selectColor, setSelectColor, setColorList }) => {
    const [selectedMultiColor, setSelectedMultiColor] = useState(0);
    const colorChange = (color: any, selectColor: any, i: any) => {
        // console.log(color.hex)
        let newColorList = [...colorList]
        newColorList[selectColor][i] = color.hex;
        setColorList(newColorList);
    };
    useEffect(() => {
        setSelectedMultiColor(0)
    }, [selectColor]);
    return (

        <div style={{ width: "100%" }}>
            <Nav justify variant="tabs" activeKey={selectedMultiColor}
                onSelect={(e: any) => { try{ setSelectedMultiColor(parseInt(e)) }catch(e:any){console.log(e)} }}>


                {colorList[selectColor].map((color: any, i: any) => (
                    // <div >{i}_{color}</div>
                    // <Nav.Item >
                    <Nav.Link eventKey={`${i}`} style={{
                        backgroundColor: color,
                        borderTop: selectedMultiColor === i ? '1px solid black' : '0.5px solid black',
                        borderRight: selectedMultiColor === i ? '1px solid black' : '0.5px solid black',
                        borderBottom: 'none',
                        borderLeft: selectedMultiColor === i ? '1px solid black' : '0.5px solid black',
                        transform: selectedMultiColor === i ? 'translateY(1px)' : 'translateY(7px)',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        justifyContent: 'flex-end',


                    }}>
                        {colorList[selectColor].length > 1 && selectedMultiColor === i &&
                            (<img src={addIcon} style={{
                                // width: '100%',
                                transform: 'rotate(45deg) ',


                            }}
                                onClick={() => {
                                    let newColorList = [...colorList]
                                    colorList[selectColor].splice(selectedMultiColor, 1);
                                    setColorList(newColorList);
                                    setSelectedMultiColor(0)
                                }}></img>)}
                    </Nav.Link>
                    // </Nav.Item>

                ))}

                <img src={addIcon} style={{
                    // width: '100%',
                    height: '100%',
                    border: '1px solid black',
                    borderRadius: '5px 5px 0 0',
                    transform: 'translateY(2px)',
                }}
                    id="coloradd"
                    onClick={() => {

                        let newColorList = [...colorList]
                        colorList[selectColor].push(colorList[selectColor][0])
                        setColorList(newColorList);
                        setSelectedMultiColor(colorList[selectColor].length - 1)
                    }
                    }
                ></img>
                <Help id="coloradd">{colorList[selectColor].length + 1}本取り用の糸を追加</Help>




                {/* <Nav.Item style={{ width: '40px' }}>
                </Nav.Item> */}
            </Nav >
            {/* {PhotoshopPicker} */}
            <div style={{ height: "10vw", backgroundColor: "red" }} id="picker">
                <ChromePicker color={colorList[selectColor][selectedMultiColor]}
                    onChange={(color) => colorChange(color, selectColor, selectedMultiColor)}
                    disableAlpha={true}
                    styles={{
                        default: {
                            picker: {
                                width: '100%',
                                height: "100%",
                            },
                            body: {
                                padding: '3px 3px 3px',

                            },
                            //                             saturation: {

                            //                                 paddingBottom: '55%',
                            // height

                            //                             },
                        },
                    }}
                />
                <Help id="picker" placement="right">色を編集</Help>
            </div>



        </div >
    )
}

export default ColorEdit;