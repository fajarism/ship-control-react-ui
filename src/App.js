import './App.css';

import { useEffect, useState } from "react"
import { io } from "socket.io-client"

import { NotificationContainer, NotificationManager} from "react-notifications"
import 'react-notifications/lib/notifications.css';

function App() {
  var socket = io.connect("http://127.0.0.1:4000")

  let [isRecording, setIsRecording] = useState(false)
  let [filename, setFilename] = useState("")
  
  useEffect(() => {
    socket.on("ship_control_stream", (data) => {
      console.log(data)
    })

    socket.on("ship_control_stream_recording_started", (data) => {
      setIsRecording(true)
    })

    socket.on("ship_control_stream_recording_stopped", (data) => {
      console.log("socket received")
      setIsRecording(false)
    })

    socket.on("ship_control_stream_recording_stopped_file_exists", (data) => {
      NotificationManager.error(`File dengan nama ${data.filename} sudah ada. Silahkan ganti nama file`, "File sudah tersedia", 3000)
    })
  }, [])

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

  return (
    <div className="App">
      <header className="App-header">
        <input onChange={(event) => setFilename(event.target.value)} value={filename}/>
        <button onClick={() => onRecordButtonPress()}>{isRecording ? `Stop recording` : `Record`}</button>
      </header>
      <NotificationContainer/>
    </div>
  );
}

export default App;
