import React, { useEffect, useState } from "react"
import ReactNofitication, { store } from "react-notifications-component"
import { io } from "socket.io-client"
import 'react-notifications-component/dist/theme.css'

import { FileControl } from "./FileControl"

let socket

export function StatefulContainer({
    onShipStreamed = (data) => {} 
}){
    let [filename, setFilename] = useState("")
    let [isRecording, setIsRecording] = useState(false)

    useEffect(() => {
        socket = (io.connect("http://127.0.0.1:4000"))
        socket.on("ship_control_stream", (data) => {
            onShipStreamed(data)
            // console.log(data)
        })

        socket.on("ship_control_stream_recording_started", (data) => {
            setIsRecording(true)
        })
  
        socket.on("ship_control_stream_recording_stopped", (data) => {
            console.log("socket received")
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
        console.log(`clicked ${isRecording}`)
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

    return(
        <div>
            <FileControl 
                isRecording={isRecording}
                onRecordButtonPress={() => onRecordButtonPress()}
                filename={filename} 
                onFilenameChanged={(newFilename) => setFilename(newFilename)}/>
        </div>
    )
}

let style = {

}