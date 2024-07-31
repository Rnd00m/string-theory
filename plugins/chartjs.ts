import {Chart, Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement} from 'chart.js'
export default defineNuxtPlugin(() => {
  Chart.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  )
})