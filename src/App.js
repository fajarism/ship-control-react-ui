import './App.css';

import {  useRef, useState } from "react"
import anychart from "anychart"
import ReactNofitication from "react-notifications-component"

import 'react-notifications/lib/notifications.css';
import { StatefulContainer } from './component/StatefulContainer';
import CircularGaugeChart from './component/CircularGaugeChart';


function App() {
  let rudderCircularGaugeRef
  let rudderTextRef = useRef()
  let yawCircularGaugeRef
  let yawTextRef = useRef()
  let rudderCircularGaugeRef2
  let rudderTextRef2 = useRef()

  return (
    <div className="App">
      <ReactNofitication/>
      <p style={{
        fontWeight : 600,
        paddingTop : 16,
        paddingBottom: 16
      }}>LHI Ship Control User Interface</p>
      <header className="App-header">
        <div style={{
          display : "flex",
          flexDirection : "row",
          width : "100%",
          marginTop : 48,
        }}>
          <div style={{
            display : "flex",
            flexDirection : "column",
            flex : 1
          }}>
            <div style={{
              display : "flex",
              flexDirection : "row",
              flex : 1
            }}>
              <div style={{
                display : "flex",
                flexDirection: "column"
              }}>
                <CircularGaugeChart onChartReady={(chart) => rudderCircularGaugeRef = chart} title="Rudder 1"/>
                <p ref={rudderTextRef}></p>
              </div>
              <div style={{
                marginLeft : 16
              }}>
                <CircularGaugeChart onChartReady={(chart) => rudderCircularGaugeRef2 = chart} title="Rudder 2"/>
                <p ref={rudderTextRef2}></p>
              </div>
            </div>
            <div style={{
              display : "flex",
              flexDirection : "row",
              flex : 1
            }}>
              <div style={{
              }}>
                <CircularGaugeChart onChartReady={(chart) => yawCircularGaugeRef = chart} title="Yaw"/>
                <p ref={yawTextRef}></p>
              </div>
            </div>
            
          </div>
          <StatefulContainer onShipStreamed={(data) => {
              // console.log(data)
              if(rudderCircularGaugeRef != null) {
                let { rudder, yaw, rudder2 } = data

                let newRudder = rudder
                var newYaw = yaw
                let newRudder2 = rudder2
              
                if(rudder < 0) {
                  newRudder = 360 + rudder
                }

                if(yaw < 0) {
                  newYaw = 360 + yaw
                }

                if(rudder2 < 0) {
                  newRudder2 = 360 + rudder2
                }

                rudderTextRef.current.innerHTML = newRudder.toFixed(3)
                yawTextRef.current.innerHTML = newYaw.toFixed(3)
                rudderTextRef2.current.innerHTML = newRudder2.toFixed(3)
                
                rudderCircularGaugeRef.data([
                  { value : newRudder }
                ])
                
                rudderCircularGaugeRef2.data([
                  { value : newRudder2 }
                ])
              }
                
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
