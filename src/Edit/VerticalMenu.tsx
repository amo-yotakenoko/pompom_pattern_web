import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import UndoRedo from './undoRedu';
import * as Icon from 'react-bootstrap-icons';
import Help from "../Help"
import { Overlay, Tooltip, Button } from 'react-bootstrap';

const VerticalMenu = ({ activeMenu, setActiveMenu, pattern, colorList, selectColor, setPattern, setColorList, setSelectColor, isConfirmation }: any) => {
    console.log({ activeMenu })

    return (
        <>
            {/* {activeMenu} */}

            <div style={{
                position: 'absolute',
                right: '0px',
                height: "100%",
                width: "1.5em",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                // justifyContent: 'center',
                // flexDirection: 'column',
                // alignItems: 'center',
                // justifyContent: 'center',
                // background: "#ff0000",
                padding: 0,
                zIndex: 1000
            }}>

                < Item displayName={<div id={"editMenu"} style={{ textAlign: "center" }}> <Icon.PencilSquare />編集  </div>} tabId={"pompom"} isConfirmation={isConfirmation} activeMenu={activeMenu} setActiveMenu={setActiveMenu} ></Item >
                <Item displayName={<div id={"cameraScanMenu"} style={{ textAlign: "center" }}>  <Icon.Camera />カメラ  </div>} tabId={"cameraScan"} isConfirmation={isConfirmation} activeMenu={activeMenu} setActiveMenu={setActiveMenu} isDisabled={activeMenu == "cameraScan"}></Item>
                <Item displayName={<div id={"decorationMenu"} style={{ textAlign: "center" }}>  <Icon.Stars />装飾  </div>} tabId={"decoration"} isConfirmation={isConfirmation} activeMenu={activeMenu} setActiveMenu={setActiveMenu} isDisabled={activeMenu == "cameraScan"}></Item>
                <Item displayName={<div id={"blueprintMenu"} style={{ textAlign: "center" }}>   <Icon.FileEarmarkPost />設計図 </div>} tabId={"bluePrint"} isConfirmation={isConfirmation} activeMenu={activeMenu} setActiveMenu={setActiveMenu} isDisabled={activeMenu == "cameraScan"}></Item>



                {activeMenu != "pompom" && <Help id="editMenu" placement="left">ペンモード</Help>}
                 {activeMenu != "cameraScan" && <Help id="cameraScanMenu" placement="left">カメラモード</Help>}
                    {activeMenu != "decoration" && <Help id="decorationMenu" placement="left">装飾</Help>}
 {activeMenu != "bluePrint" && <Help id="blueprintMenu" placement="left">完成したらこちら</Help>}
                
                {/* < Item displayName={<div id={"cameraScan"}>カメラ   <Icon.Camera /></div>} tabId={"cameraScan"} activeMenu={activeMenu} setActiveMenu={setActiveMenu} ></Item > */}


                {/* <Button variant="outline-primary" style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'upright',
                    padding: '1px',
                    borderRadius: '5px 0 0 5px'

                }}>
                    ペイント
                </Button>
                <Button variant="outline-primary" style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'upright',
                    padding: '1px',
                    borderRadius: '5px 0 0 5px'
                }}>
                    装飾
                </Button>
                <Button variant="outline-primary" style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'upright',
                    padding: '1px',
                    borderRadius: '5px 0 0 5px'
                }}>
                    カメラ
                </Button>
                <Button variant="outline-primary" style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'upright',
                    padding: '1px',
                    borderRadius: '5px 0 0 5px'
                }}>
                    設計図
                </Button> */}
            </div>

        </>
    )
}

const Item = ({ id, displayName, tabId, activeMenu, setActiveMenu, isDisabled, isConfirmation }: any) => {

    function tabSet(tabId: any) {
        if (isConfirmation && isConfirmation == true) {
            if (!window.confirm("進捗がリセットされます!")) return;
        }
        setActiveMenu(tabId);
    }

    let isSelected = tabId === activeMenu;
    return (
        <Button variant={"outline-dark"} style={{
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
            padding: '1px',
            borderRadius: '5px 0 0 5px',
            width: isSelected ? "120%" : "100%",
            // color: "#000000"
        }

        } onClick={(e) => tabSet(tabId)}>
            {displayName}
            {/* {`${isSelected}`} */}
        </Button >
        // <ToggleButton
        //     key={tabId}
        //     id={`radio-${tabId}`}
        //     type="radio"
        //     // variant={idx % 2 ? 'outline-success' : 'outline-danger'}
        //     name="radio"
        //     value={tabId}
        //     checked={isSelected}
        //     onChange={(e) => tabSet(tabId)}
        //     disabled={isDisabled}
        //     style={{

        //         height: isSelected ? '2.5em' : '2em',
        //         width: "100%",
        //         borderBottomLeftRadius: '0px',
        //         borderBottomRightRadius: '0px',
        //     }}
        // >
        //     {displayName}
        // </ToggleButton >

    )
}



export default VerticalMenu;