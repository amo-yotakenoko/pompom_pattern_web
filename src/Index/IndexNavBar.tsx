
import { Navbar, Nav, NavDropdown, Form, Button, FormControl, Container ,Offcanvas} from 'react-bootstrap';
import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
import appIcon from '../img/icon_wide.png';

const IndexNavBar = ({ }: any) => {
   

 const [enableMenu, setEnableMenu] = useState(false);
    return (
        <>
         <Navbar bg="light" expand="lg" fixed="top">
         <Container style={{ position: 'relative', height: '30px' }}>
      <img
        src={appIcon}
        alt="App Icon"
        style={{
          position: 'absolute',
          left: '50%', 
          top: '50%', 
          transform: 'translate(-50%, -50%)', 
          height: '30px'
        }}
      />
            <Icon.List
              onClick={()=>setEnableMenu(true)}
              style={{ position: 'absolute', right: '2px', fontSize: '24px', transform: 'translate(-50%, -50%)', top: '50%', }} />
    </Container>
        </Navbar>
        

        <Offcanvas show={enableMenu} onHide={()=>setEnableMenu(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <a href="https://amo-yotakenoko.github.io/" className="text-primary">
       他のアプリ(作者ホームページ)
      </a>
        </Offcanvas.Body>
      </Offcanvas>
        
        </>
    )
}
export default IndexNavBar;