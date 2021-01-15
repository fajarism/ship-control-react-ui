import { useEffect, useState } from "react"
import AnyChart from "anychart-react/dist/anychart-react"
import anychart from "anychart"

import 'react-notifications/lib/notifications.css';

let renderCircularGauge

function CircularGaugeChart({onChartReady, title}) {
  const useConstructor = (callBack = () => {}) => {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    if (hasBeenCalled) return;
    callBack();
    setHasBeenCalled(true);
  }
  
  let initCircularGauge = () => {
    let circularGauge = anychart.gauges.circular()
    let dataSet = anychart.data.set([0])
  
    // console.log(circularGauge)
    circularGauge.data(dataSet)
    circularGauge.background().fill("#282c34")
    circularGauge.title().fontColor("white")

    // axis settings
    var axis = circularGauge.axis();
    axis.radius(95);
    axis.width(1);
    axis.labels().fontSize(10)
  
    // scale settings
    var scale = circularGauge.axis().scale();
    scale.minimum(0);
    scale.maximum(360);
    var ticks = circularGauge.axis().scale().ticks();
    ticks.interval(30);
  
    // ticks settings
    var axisTicks = circularGauge.axis().ticks();
    axisTicks.enabled(true);
    axisTicks.type("trapezium");
    axisTicks.length(8);
    
    // marker
    var marker = circularGauge.marker();
    marker.position("outside");
    marker.size(7);
    // console.log(circularGauge)

    return circularGauge
  }

  useConstructor(() => {
    renderCircularGauge = initCircularGauge()
    onChartReady(renderCircularGauge)
  })
  
  return (
    <AnyChart id={title.toLowerCase()} width={300} height={300} instance={renderCircularGauge} title={title}/>
  );
}

export default CircularGaugeChart;
