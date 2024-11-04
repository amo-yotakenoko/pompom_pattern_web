
import { Navbar, Nav, NavDropdown, Form, Button, FormControl, Container, Offcanvas } from 'react-bootstrap';
import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
import appIcon from '../img/icon_wide.jpg';
import licenseFile from './lisences.json';
const IndexNavBar = ({ }: any) => {


  const [enableMenu, setEnableMenu] = useState(false);
  const [enableLicense, setEnableLicense] = useState(false);
  const license: any = enableLicense ? licenseFile : null
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
              height: '30px',
              mixBlendMode: 'multiply',
            }}
          />
          <Icon.List
            onClick={() => setEnableMenu(true)}
            style={{ position: 'absolute', right: '2px', fontSize: '24px', transform: 'translate(-50%, -50%)', top: '50%', }} />
        </Container>
      </Navbar>


      <Offcanvas show={enableMenu} placement="end" onHide={() => setEnableMenu(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav.Link href="https://amo-yotakenoko.github.io/" target="_blank" >
            <Icon.Boxes />  他のアプリ(作者ホームページ)
          </Nav.Link>

          <Nav.Link href="https://twitter.com/takenok58914745" target="_blank" >
            <Icon.Twitter /> 作者Twitter(バグ報告などはこちらにお願いします)
          </Nav.Link>
          <div onClick={() => setEnableLicense((prev) => !prev)}>

            <Nav.Link  >
              <Icon.FileEarmarkText /> ライセンス表記
            </Nav.Link>
          </div>

          {enableLicense &&
            <div style={{ borderLeft: "3px solid", marginLeft: "5px", paddingLeft: "3px" }}>
              以下はlicense-checkerによります。
              {Object.keys(license).map((key) => {
                const packageInfo = license[key]; // license[key] で直接アクセス

                return (
                  <div>
                    {key}
                    <ul >
                      {/* <li > {packageInfo.licenses}</li> */}
                      <li >license:{packageInfo.licenses}</li>
                      {packageInfo.publisher && (
                        <li >{packageInfo.publisher}</li>
                      )}
                      <li >{packageInfo.repository}</li>
                    </ul>

                  </div>
                );

              })}
            </div>
          }


        </Offcanvas.Body>
      </Offcanvas >

    </>
  )
}
export default IndexNavBar;