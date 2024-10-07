import React, { useState, useRef, createContext, useContext, useEffect } from 'react';
import { Button, ProgressBar, Dropdown, Accordion, Card, Form, Modal, Spinner } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import Camera from './Camera';
import CameraSelect from './CameraSelect';
import HandTracker from './HandTracker';
import KalmanFilter from './KalmanFilter';
import RollHandSelect from './RollHandSelect';
import TrakerConfig from './TrackerConfig';
import KalmanConfig from './KalmanConfig';
import { enableHelpContext } from '../Edit/Edit';
import Alert from 'react-bootstrap/Alert';
import Help from "../Help"

const SoundVolume = ({ audiosRef, soundVolume, setSoundVolume }: any) => {
    useEffect(() => {
        audiosRef.current = {
            rolls: [
                new Audio('電子ルーレット停止ボタンを押す.mp3'),
                new Audio('電子ルーレット停止ボタンを押す.mp3'),
                new Audio('電子ルーレット停止ボタンを押す.mp3')
            ],
            ends: [
                new Audio('決定ボタンを押す40.mp3'),
                new Audio('決定ボタンを押す40.mp3'),
                new Audio('決定ボタンを押す40.mp3')
            ]
        }
    }, [])


    function click() {
        console.log("クリック")
        const nextvolume = (soundVolume + 1) % 3
        // audiosRef.current.rolls.volume = nextvolume / 2;

        playsounds(audiosRef.current.rolls, nextvolume / 2)
        playsounds(audiosRef.current.ends, nextvolume / 2)

        // audiosRef.current.roll.play()
        setSoundVolume(nextvolume)

    }
    function playsounds(audioList: any, nextvolume: any) {
        console.log(audioList)
        audioList.forEach((audio: any) => {
            audio.volume = 0;
            audio.play()
            audio.volume = nextvolume;

        });
    }

    return (
        <>
            {soundVolume == 0 && (
                <Icon.VolumeMuteFill
                    onClick={click}
                    style={{ fontSize: "2rem" }} // アイコンを大きくして位置を調整
                />
            )}
            {soundVolume == 1 && (
                <Icon.VolumeDownFill
                    onClick={click}
                    style={{ fontSize: "2rem" }} // アイコンを大きくして位置を調整
                />
            )}
            {soundVolume == 2 && (
                <Icon.VolumeUpFill
                    onClick={click}
                    style={{ fontSize: "2rem" }} // アイコンを大きくして位置を調整
                />
            )}

        </>
    )
}


export default SoundVolume;