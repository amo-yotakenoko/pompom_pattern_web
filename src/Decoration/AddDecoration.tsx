import React, { useState, createContext, useContext, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
// import eyeModel from '/model/eye.fbx';
import ValueSetting from './ValueSetting';
import { Button, ProgressBar, Form } from 'react-bootstrap';
// import SimpleOrientationTracker from './没/getDeviderotation';
// import { DeviceOrientationControls } from "three/examples/jsm/controls/DeviceOrientationControls";
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';

// type SelectRollingHandProps = {
//     rollingHand: string;
//     setRollingHand: React.Dispatch<React.SetStateAction<string>>;
// };

// import Tooltip from 'react-bootstrap/Tooltip';




const AddDecoration = ({ newDecorationModalShow, setNewDecorationModalShow, decorationObjects, addDecorationObject }: any) => {
    const items = [
        {
            model: "eye",
            pitch: 45,
            roll: 90,
            rotate: 0,
        },
        {
            model: "ear",
            pitch: 45,
            roll: 180,
            rotate: -90,
        },
        { model: "nose" },
    ];

    return (<>
        {/* <Button variant="primary" onClick={() => { setNewDecorationModalShow(true) }}>
            Launch static backdrop modal
        </Button> */}

        <Modal
            show={newDecorationModalShow}
            onHide={() => { setNewDecorationModalShow(false) }}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>装飾を追加</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        {items.map((item, index) => (
                            <Col key={index} xs={6} md={4} style={{
                                border: '2px solid black',

                                borderRadius: '4px'
                            }}>
                                <Button onClick={() => {


                                    addDecorationObject(item)
                                }}>

                                    {item.model}
                                </Button>
                            </Col>
                        ))}

                    </Row>
                </Container>
            </Modal.Body>
            {/* <Modal.Footer>
                {/* <Button variant="secondary" onClick={Add}>
                    Close
                </Button>
                <Button variant="primary">Understood</Button> 
        </Modal.Footer>*/}
        </Modal >
    </>);
}


export default AddDecoration;