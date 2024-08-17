import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
type MenuProps = {
    activeMenu: any;
    setActiveMenu: any;

};

const Menu: React.FC<MenuProps> = ({ activeMenu, setActiveMenu }) => {

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
            <Item displayName={"編集"} tabId={"pompom"} activeMenu={activeMenu} setActiveMenu={setActiveMenu}></Item>
            <Item displayName={"設計図"} tabId={"bluePrint"} activeMenu={activeMenu} setActiveMenu={setActiveMenu}></Item>
        </ButtonGroup>
    )
}
type ItemProps = {
    displayName: any;
    tabId: any;
    activeMenu: any;
    setActiveMenu: any;

};

const Item: React.FC<ItemProps> = ({ displayName, tabId, activeMenu, setActiveMenu }) => {

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
            style={{

                height: isSelected ? '60px' : '50px',
                width: "100%"

            }}
        >
            {displayName}
        </ToggleButton >

    )
}



export default Menu;