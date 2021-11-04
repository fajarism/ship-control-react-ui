import React from 'react'
import ReactNofitication, { store } from "react-notifications-component"
import { FlexColumn } from './FlexColumn'
import { FlexRow } from './FlexRow'
import moment from 'moment'
import axios from 'axios'
 
import DownloadButton from "../../src/assets/images/download.svg"

export function FileControlSingleFileItem({file, address}) {

    let onDownloadButtonClick = async () => {
        window.location.href = `${address}/download/${encodeURI(file.filename)}`
        // let response = await axios.get(`http://192.168.31.150:4000/${encodeURI(file.filename)}/download`)
        // if(response.status === 404) {
        //     store.addNotification({
        //         type : "danger",
        //         container : "top-right",
        //         title : "File tidak ditemukan",
        //         message : `File dengan nama ${file.filename} tidak ditemukan.`,
        //         animationIn: ['animate__animated animate__fadeIn'],
        //         animationOut: ['animate__animated animate__fadeOut'],
        //         dismiss : {
        //             duration : 3000
        //         }
        //     })
        // } else {
        //     store.addNotification({
        //         type : "success",
        //         container : "top-right",
        //         title : "Unduh berhasil",
        //         message : `File dengan nama ${file.filename} berhasil diunduh.`,
        //         animationIn: ['animate__animated animate__fadeIn'],
        //         animationOut: ['animate__animated animate__fadeOut'],
        //         dismiss : {
        //             duration : 3000
        //         }
        //     })
        // }
    }

    return(
        <FlexRow style={style.container}>
            <FlexColumn>
                <p style={style.filename}>{file.filename}</p>
                <p style={style.filedate}>{moment(file.date).format("YYYY-MM-DD HH:mm")}</p>
            </FlexColumn>
            
            <FlexColumn className="downloadbtn" style={style.downloadcontainer} onClick={() => onDownloadButtonClick()}>
                <img width={24} height={24} style={style.downloadbutton} src={DownloadButton}/>
            </FlexColumn>
        </FlexRow>
    )
}

let style = {
    container : {
        border: '1px solid white',
        borderRadius : 8,
        padding : 16,
        marginBottom : 8
    },

    downloadbutton : {
        fill : 'orange',
        alignSelf : 'center',
    },

    filename : {
        textAlign : 'left',
        margin: 0,
        fontSize : 14
    },

    filedate : {
        textAlign: 'left',
        margin: 0,
        fontSize : 10,
        color: 'orange'
    },

    downloadcontainer : {
        cursor : 'pointer',
        borderRadius : 24,
        border : '1px solid white',
        height : 36,
        width : 36,
        display : 'flex',
        justifyContent : 'center',
        flex : '0 auto'
    }
}