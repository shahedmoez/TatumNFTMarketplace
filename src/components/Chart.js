//------- this copmonent is installed by npm i Cardjs -------

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
export default function Chart(props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  return (<>
    {props.data ? <Line data={props.data} options={props.options} /> 
    : <div className='d-flex justify-content-center align-items-center flex-column'>
        <span className='icon px-3 py-0 m-3' style={{ fontSize: "6em", border: "1px solid var(--borderGray)", borderRadius: "8px", color: "var(--textDark)" }}>area_chart</span>
        <p  className='m-0'>No History Price</p>
      </div>}
  </>
  )
}