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
            size: 150,
        },
        {
            model: "ear",
            pitch: 45,
            roll: 180,
            rotate: -90,
        },
        {
            model: "nose",
            symmetry: false,
            pitch: 0,
            roll: 70,
            // rotate: -90,
        },
        {
            model: "tail",
            symmetry: false,
            pitch: 0,
            roll: 289,
            // rotate: -90,
        },
        {
            model: "mouse",
            symmetry: false,
            pitch: 0,
            roll: 70,
            // rotate: -90,
        }, {
            model: "longear",
            pitch: 25,
            roll: 180,
            rotate: -90,
        },
        {
            model: "ribbon",
            pitch: 45,
            roll: 180 - 35,
            rotate: 0,
            symmetry: false,
            size: 150,
        },
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
                            <Col
                                key={index}
                                xs={6}
                                md={4}
                                style={{
                                    border: '2px solid black',
                                    aspectRatio: 1,
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    position: 'relative', // これにより、文字の位置指定が可能になる
                                }}
                                onClick={() => {
                                    addDecorationObject(item)
                                }}
                            >
                                <img
                                    src={`${process.env.PUBLIC_URL}/model/${item.model}.jpg`}
                                    alt="icon"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        margin: 0,
                                        padding: 0,
                                        mixBlendMode: "multiply",
                                    }}
                                />
                                <span
                                    style={{
                                        position: 'absolute',
                                        bottom: '2px',

                                        left: '50%',             // 左右中央に揃えるためにleftを50%
                                        transform: 'translateX(-50%)', // 中央揃えにするためにX軸方向に移動

                                        fontWeight: 'bold'
                                    }}
                                >
                                    {({
                                        ear: "耳",
                                        tail: "しっぽ",
                                        eye: "目",
                                        nose: "鼻",
                                        longear: "うさ耳",
                                        mouse: "口",
                                        ribbon: "リボン",
                                    }[item.model] || item.model)}
                                </span>
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