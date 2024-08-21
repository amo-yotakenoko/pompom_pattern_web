import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, useAccordionButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// TestPage コンポーネントを定義
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
const TestPage = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedMultiColor, setSelectedMultiColor] = useState(0);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Nav justify variant="tabs" activeKey={selectedMultiColor}
                onSelect={(e: any) => { setSelectedMultiColor(e) }}>
                <Nav.Item>
                    <Nav.Link eventKey="1">1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="2">2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="3">3</Nav.Link>
                </Nav.Item>

            </Nav>
            {selectedMultiColor}
        </>
    );
};

// 他のファイルからインポートできるようにエクスポート
export default TestPage;