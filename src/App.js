import './App.css';

import {  useRef, useState } from "react"
import anychart from "anychart"
import ReactNofitication from "react-notifications-component"

import 'react-notifications/lib/notifications.css';
import { StatefulContainer } from './component/StatefulContainer';
import CircularGaugeChart from './component/CircularGaugeChart';


function App() {
  let rudderCircularGaugeRef
  let yawCircularGaugeRef

  return (
    <div className="App">
      <ReactNofitication/>
      <header className="App-header">
        <div style={{
          display : "flex",
          flexDirection : "column"
        }}>
          <div style={{
            display : "flex",
            flexDirection : "row"
          }}>
            <div style={{
              display : "flex"
            }}>
              <CircularGaugeChart onChartReady={(chart) => rudderCircularGaugeRef = chart} title="Rudder"/>
            </div>
            <div style={{
              marginLeft : 16
            }}>
              <CircularGaugeChart onChartReady={(chart) => yawCircularGaugeRef = chart} title="Yaw"/>
            </div>
          </div>
          <StatefulContainer onShipStreamed={(data) => {
              // console.log(data)
              if(rudderCircularGaugeRef != null) {
                let { rudder, yaw } = data

                let newRudder = rudder
                var newYaw = yaw
              
                if(rudder < 0) {
                  newRudder = 360 + rudder
                }

                if(yaw < 0) {
                  newYaw = 360 + yaw
                }

                rudderCircularGaugeRef.data([
                  { value : newRudder }
                ])}

              if(yawCircularGaugeRef != null) {
                yawCircularGaugeRef.data([
                  { value : newYaw }
                ])}
              }
          }/>
        </div>
      </header>
    </div>
  );
}

export default App;
