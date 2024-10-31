import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import UndoRedo from './undoRedu';
import * as Icon from 'react-bootstrap-icons';
import Help from "../Help"
type MenuProps = {
    activeMenu: any;
    setActiveMenu: any;

    pattern: any;
    colorList: any;
    selectColor: number;
    setPattern: any;
    setColorList: any;
    setSelectColor: any;
};

const Menu: React.FC<MenuProps> = ({ activeMenu, setActiveMenu, pattern, colorList, selectColor, setPattern, setColorList, setSelectColor }) => {

    return (
        <ButtonGroup style={{
            position: "fixed",
            bottom: 0,
            // https://zero-plus.io/media/css-align-items-how-to-use/
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
            zIndex: 1000,

        }}>


            {/* <div style={{ display: activeMenu == "pompom" ? 'block' : 'none' }}> */}

            <UndoRedo
                enable={activeMenu == "pompom" || activeMenu == "cameraScan"} registerEnable={activeMenu == "pompom"} pattern={pattern} setPattern={setPattern} colorList={colorList} setColorList={setColorList} selectColor={selectColor} setSelectColor={setSelectColor}></UndoRedo>
            {/* </div> */}




            {/* < Item displayName={<div id={"editMenu"}>編集   <Icon.PencilSquare /></div>} tabId={"pompom"} activeMenu={activeMenu} setActiveMenu={setActiveMenu} ></Item > */}


            {/* < Item displayName={<div id={"cameraScan"}>カメラ   <Icon.Camera /></div>} tabId={"cameraScan"} activeMenu={activeMenu} setActiveMenu={setActiveMenu} ></Item > */}


            {/* <Item displayName={<div id={"blueprintMenu"} >設計図    <Icon.FileEarmarkPost /></div>} tabId={"bluePrint"} activeMenu={activeMenu} setActiveMenu={setActiveMenu} isDisabled={activeMenu == "cameraScan"}></Item> */}

            {/* {activeMenu != "bluePrint" && <Help id="blueprintMenu">完成したらこちら</Help>}
            {activeMenu != "pompom" && <Help id="editMenu">編集に戻る(進捗状況が削除されます)</Help>} */}

            
        </ButtonGroup >
    )
}
type ItemProps = {
    displayName: any;
    tabId: any;
    activeMenu: any;
    setActiveMenu: any;

};

const Item = ({ id, displayName, tabId, activeMenu, setActiveMenu, isDisabled }: any) => {

    function tabSet(tabId: any) {
        setActiveMenu(tabId);
    }

    let isSelected = tabId === activeMenu;
    return (

        <ToggleButton
            key={tabId}
            id={`radio-${tabId}`}
            type="radio"
            // variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={tabId}
            checked={isSelected}
            onChange={(e) => tabSet(tabId)}
            disabled={isDisabled}
            style={{

                height: isSelected ? '2.5em' : '2em',
                width: "100%",
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
            }}
        >
            {displayName}
        </ToggleButton >

    )
}



export default Menu;