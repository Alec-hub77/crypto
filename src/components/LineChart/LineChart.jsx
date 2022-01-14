import './lineChart.scss';
import { Line, Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    // coinTimestamp.push(
    //   new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()
    // );
  }
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    let time = coinHistory?.data?.history[i].timestamp;
    coinTimestamp.push(
      new Date(time * 1000).toLocaleDateString()
    );
    
  }

 

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

//   const options = {
//     scale: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   };

  return (
    <div className="line-chart">
      <div className="chart_header">
        <h2>{coinName} price Chart</h2>
        <div className="price_container">
          <h4 className="price_change">{coinHistory?.data?.change}%</h4>
          <h4 className="current_price">
            Current {coinName} price: <span>${currentPrice}</span> 
          </h4>
        </div>
      </div>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
