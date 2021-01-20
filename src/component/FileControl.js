import React from "react"
import { FileControlSingleFileItem } from "./FileControlSingleFileItem"
import { FlexColumn } from "./FlexColumn"
import { FlexRow } from "./FlexRow"

export function FileControl({
    isRecording,
    filename,
    onRecordButtonPress,
    onFilenameChanged,
    files = []
}){
    return(
        <FlexColumn style={style.filecontrolcontainer}>
            <p style={style.filenametitle}>Filename</p>
            <FlexRow style={style.inputfilecontainer}>
                <input style={style.filename} onChange={(event) => onFilenameChanged(event.target.value)} value={filename}/>
                <button onClick={() => onRecordButtonPress()}>{isRecording ? `Stop recording` : `Record`}</button>
            </FlexRow>

            <p style={style.directorytitle}>File Directory</p>
            <FlexColumn style={style.filedirectorycontainer}>
                {files.map((item, index) => {
                    return <FileControlSingleFileItem file={item} key={`file-${index}`}/>
                })}
            </FlexColumn>
        </FlexColumn>
    )
}

let style = {
    filecontrolcontainer : {
        width: '70%'
    },

    filedirectorycontainer : {
        overflow: 'scroll',
        height: '100%'
    },

    inputfilecontainer : {
        marginTop : 8
    },

    filenametitle : {
        padding: 0,
        margin: 0,
        alignSelf : 'flex-start',
        fontSize: 18,
        textAlign : 'left'
    },

    directorytitle : {
        padding: 0,
        margin: 0,
        marginTop : 24,
        marginBottom : 16,
        alignSelf : 'flex-start',
        fontSize: 18,
        textAlign : 'left'
    },

    filename : {
        marginRight : 8,
        width: '100%'
    }
}