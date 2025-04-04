// PaymentChart.jsx
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, BarElement, LinearScale, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const PaymentChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Payments',
        data: [4500, 3000, 3500, 2000, 5000, 4000],
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
      },
      {
        label: 'Refunds',
        data: [0, 0, 1200, 0, 800, 0],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return '₹' + value
          }
        }
      }
    }
  }

  return <Bar data={data} options={options} />
}

export default PaymentChart