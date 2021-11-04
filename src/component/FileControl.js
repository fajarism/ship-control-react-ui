import React, { useState } from "react"
import { FileControlSingleFileItem } from "./FileControlSingleFileItem"
import { FlexColumn } from "./FlexColumn"
import { FlexRow } from "./FlexRow"

export function FileControl({
    isRecording,
    filename,
    onRecordButtonPress,
    onFilenameChanged,
    onAddressSaved,
    onAddressChanged,
    address,
    ipAddress,
    files = []
}){
    return(
        <FlexColumn style={style.filecontrolcontainer}>
            <p style={style.filenametitle}>IP Address</p>
            <FlexRow style={style.addresscontainer}>
                <input style={style.filename} onChange={(event) => onAddressChanged(event.target.value)} value={address}/>
                <button style={{minWidth: 125}} onClick={() => onAddressSaved()}>{`Save Address`}</button>
            </FlexRow>

            <p style={style.filenametitle}>Filename</p>
            <FlexRow style={style.inputfilecontainer}>
                <input style={style.filename} onChange={(event) => onFilenameChanged(event.target.value)} value={filename}/>
                <button onClick={() => onRecordButtonPress()}>{isRecording ? `Stop` : `Record`}</button>
            </FlexRow>

            <p style={style.directorytitle}>File Directory</p>
            <FlexColumn style={style.filedirectorycontainer}>
                {files.map((item, index) => {
                    return <FileControlSingleFileItem address={ipAddress} file={item} key={`file-${index}`}/>
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
        height: '100%'
    },

    inputfilecontainer : {
        marginTop : 8
    },

    addresscontainer : {
        marginBottom : 8
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