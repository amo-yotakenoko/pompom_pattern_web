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

        <div style={{ maxHeight: "calc(100vh - 100vw - 2.5em)", }}>
            <Nav justify variant="tabs" activeKey={selectedMultiColor}
                onSelect={(e: any) => { setSelectedMultiColor(parseInt(e)) }}>


                {colorList[selectColor].map((color: any, i: any) => (
                    // <div >{i}_{color}</div>
                    // <Nav.Item >
                    <Nav.Link eventKey={`${i}`} style={{
                        backgroundColor: color,
                        borderTop: selectedMultiColor === i ? '1px solid black' : '0.5px solid black',
                        borderRight: selectedMultiColor === i ? '1px solid black' : '0.5px solid black',
                        borderBottom: 'none', // 下側のボーダーを無効にする
                        borderLeft: selectedMultiColor === i ? '1px solid black' : '0.5px solid black',
                        transform: selectedMultiColor === i ? 'translateY(1px)' : 'translateY(7px)',
                        padding: 0, // パディングを0に
                        margin: 0, // マージンを0に
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
                    onClick={() => {

                        let newColorList = [...colorList]
                        colorList[selectColor].push(colorList[selectColor][0])
                        setColorList(newColorList);
                        setSelectedMultiColor(colorList[selectColor].length - 1)
                    }
                    }
                ></img>




                {/* <Nav.Item style={{ width: '40px' }}>
                </Nav.Item> */}
            </Nav >
            {/* {PhotoshopPicker} */}
            <div style={{ height: "10vw", backgroundColor: "red" }}>
                <ChromePicker color={colorList[selectColor][selectedMultiColor]}
                    onChange={(color) => colorChange(color, selectColor, selectedMultiColor)}
                    disableAlpha={true}
                    styles={{
                        default: {
                            picker: {
                                width: '100%', // ピッカーの幅を親要素に合わせる
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
            </div>


            {/* <div style={{
                backgroundColor: color,
                // border: '2px solid #333',
                borderRadius: '10px',
                // padding: '1px',
                margin: '0.1em 0',
                // display: 'flex',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',

            }}>
                {/* <div>{i}_{color}</div> */}


            {/* <button
                className="btn btn-outline-primary"
                style={{
                    visibility: colorList[selectColor].length < 2 ? 'hidden' : 'visible',
                    // width: '1ch',
                    // height: '1em',
                    // lineHeight: '1em',
                }}
                onClick={() => {
                    console.log("削除");
                    let newColorList = [...colorList]
                    colorList[selectColor].splice(i, 1);

                    setColorList(newColorList);
                    // 他の処理をここに追加
                }}
                disabled={colorList[selectColor].length < 2}
            >x </button> */}
            {/* {colorList[selectColor].length} */}
            {/* <ChromePicker color={color} onChange={(color) => colorChange(color, selectColor, i)} disableAlpha={true} /> */}


            {/* 

            <button className="btn btn-primary"
                style={{
                    width: "100%"
                }}
                onClick={() => {
                    let newColorList = [...colorList]
                    colorList[selectColor].push(selectColor[0])
                    setColorList(newColorList);
                }}>追加</button> */}

        </div>
    )
}

export default ColorEdit;