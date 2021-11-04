import React, { useEffect, useState } from "react"
import ReactNofitication, { store } from "react-notifications-component"
import { io } from "socket.io-client"
import 'react-notifications-component/dist/theme.css'

import { FileControl } from "./FileControl"
import Utils from "../utilities/Utils"

let socket

export function StatefulContainer({
    onShipStreamed = (data) => {} 
}){
    let [filename, setFilename] = useState("")
    let [isRecording, setIsRecording] = useState(false)
    let [files, setFiles] = useState([])

    let address = localStorage.getItem(Utils.VALUE.ADDRESSKEY) || '192.168.0.2'
    let [httpAddress, setAddress] = useState(`http://${address}`)
    let [tempAddress, setTempAddress] = useState(address)

    useEffect(() => {
        socket = (io.connect(httpAddress))
        socket.on("ship_control_stream", (data) => {
            onShipStreamed(data)
            console.log(data)
        })

        socket.on("ship_control_file_list", (data) => {
            setFiles(data.files)
        })

        socket.on("ship_control_stream_recording_started", (data) => {
            setIsRecording(true)
        })
  
        socket.on("ship_control_stream_recording_stopped", (data) => {

            store.addNotification({
                type : "success",
                container : "top-right",
                title : "Perekaman sukses",
                message : `${data.filename} tersimpan`,
                animationIn: ['animate__animated animate__fadeIn'],
                animationOut: ['animate__animated animate__fadeOut'],
                dismiss : {
                    duration : 3000
                }
            })
            setIsRecording(false)
        })

        socket.on("ship_control_stream_recording_stopped_file_exists", (data) => {

            store.addNotification({
                type : "danger",
                container : "top-right",
                title : "File sudah tersedia",
                message : `File dengan nama ${data.filename} sudah ada. Silahkan ganti nama file`,
                animationIn: ['animate__animated animate__fadeIn'],
                animationOut: ['animate__animated animate__fadeOut'],
                dismiss : {
                    duration : 3000
                }
            })
        })
    },[])

    useEffect(() => {
        if(!socket.hasOwnProperty("on")) return

        
    },[socket])

    let onRecordButtonPress = () => {

        if(!isRecording) {
            socket.emit("ship_control_stream_recording_start", {
                filename
            })
        } else {
            socket.emit("ship_control_stream_recording_stop", {
                filename
            })
        }
    }

    let onAddressSaved = () => {
        localStorage.setItem(Utils.VALUE.ADDRESSKEY, tempAddress)
        setAddress(tempAddress)
        store.addNotification({
            type : "success",
            container : "top-right",
            message : "IP address berhasil disimpan",
            animationIn: ['animate__animated animate__fadeIn'],
            animationOut: ['animate__animated animate__fadeOut'],
            dismiss : {
                duration : 3000
            }
        })

        window.location.reload()
    }

    let onAddressChanged = (newAddress) => {
        setTempAddress(newAddress)
    }

    return(
        <div style={{
            flex : 1,
            display : 'flex',
            flexDirection: 'column',
            alignItems : 'flex-start'
        }}>
            <FileControl 
                address={tempAddress}
                ipAddress={httpAddress}
                onAddressChanged={(newAddress) => onAddressChanged(newAddress)}
                onAddressSaved={(newAddress) => onAddressSaved(newAddress)}
                files={files}
                isRecording={isRecording}
                onRecordButtonPress={() => onRecordButtonPress()}
                filename={filename} 
                onFilenameChanged={(newFilename) => setFilename(newFilename)}/>
        </div>
    )
}