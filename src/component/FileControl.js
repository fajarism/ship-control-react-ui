import React from "react"

export function FileControl({
    isRecording,
    filename,
    onRecordButtonPress,
    onFilenameChanged
}){
   

    return(
        <div>
            <input onChange={(event) => onFilenameChanged(event.target.value)} value={filename}/>
            <button onClick={() => onRecordButtonPress()}>{isRecording ? `Stop recording` : `Record`}</button>
        </div>
    )
}

let style = {

}