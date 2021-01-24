import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import {Chart} from '@antv/g2';
import './App.css';

export default () => {
  const [data, setData] = useState(null);
  const [R, setR] = useState(3.49);
  const [initX, setInitX] = useState(0.2);
  const containerRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [times, setTimes] = useState(100);

  const fomular = R => x => R * x * (1 - x);
  const calcuF = fomular(R);

  const caclcuDatas = () => {
    const initArry = [];
    let x = 1 * initX;
    for (let i = 0; i <= 1 * times; i++) {
      initArry.push({t: i, value: x});
      x = calcuF(x);
    }
    setData(initArry);
  };

  useEffect(() => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500
    });

    setChart(chart);
  }, []);

  useEffect(() => {
    if (!data || !chart) return;
    chart.clear();
    chart.scale({
      value: {
        min: 0,
        max: 1,
        nice: true
      }
    });

    chart.line().position('t*value');
    chart.data(data);
    chart.render();
  }, [data]);

  return (
    <div className="wrapper">
      <div id="container" ref={containerRef}></div>
      <div className="footer">
        <div className="handlers">
          <label htmlFor="rNumber">
            设置 R 参数：
            <input
              id="rNumber"
              type="number"
              value={R}
              onChange={evt => setR(evt.target.value)}
            />
          </label>

          <label htmlFor="xNumber">
            设置初始 X<sub>0</sub>：
            <input
              id="xNumber"
              type="number"
              value={initX}
              onChange={evt => setInitX(evt.target.value)}
            />
          </label>

          <label htmlFor="xTimes">
            设置迭代次：
            <input
              id="xTimes"
              type="number"
              value={times}
              onChange={evt => setTimes(evt.target.value)}
            />
          </label>

          <button onClick={() => caclcuDatas()}>开始计算</button>
        </div>
        <h1>
          x<sub>t+1</sub> = Rx<sub>t</sub>(1-x<sub>t</sub>)
        </h1>
      </div>
    </div>
  );
};
