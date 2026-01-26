<template>
  <div class="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Analitik Penjualan</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Ringkasan pendapatan
        </p>
      </div>
      <div class="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
        <button
          @click="period = 'daily'"
          :class="buttonClass(period === 'daily')"
        >
          Harian
        </button>
        <button
          @click="period = 'weekly'"
          :class="buttonClass(period === 'weekly')"
        >
          Mingguan
        </button>
        <button
          @click="period = 'monthly'"
          :class="buttonClass(period === 'monthly')"
        >
          Bulanan
        </button>
      </div>
    </div>

    <div v-if="loading" class="h-64 flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin text-2xl mb-2">⏳</div>
        <p class="text-slate-500 dark:text-slate-400 text-sm">Loading chart...</p>
      </div>
    </div>

    <Line v-else :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js'
import { ref, computed, watch, onMounted } from 'vue'
import useSaleStore from '@/stores/saleStore'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const saleStore = useSaleStore()
const period = ref('daily')
const loading = computed(() => saleStore.loading)

const chartData = computed(() => {
  let labels = []
  let data = []

  if (period.value === 'daily') {
    labels = saleStore.dailyAnalytics.map(item => {
      const date = new Date(item.date)
      return date.getDate() + ' ' + getMonthName(date.getMonth())
    })
    data = saleStore.dailyAnalytics.map(item => item.total_revenue)
  } else if (period.value === 'weekly') {
    labels = saleStore.weeklyAnalytics.map(item => {
      return `Minggu ${item.week}`
    })
    data = saleStore.weeklyAnalytics.map(item => item.total_revenue)
  } else if (period.value === 'monthly') {
    labels = saleStore.monthlyAnalytics.map(item => {
      return getMonthName(item.month - 1)
    })
    data = saleStore.monthlyAnalytics.map(item => item.total_revenue)
  }

  return {
    labels,
    datasets: [{
      label: 'Pendapatan',
      data,
      borderColor: '#13ec80',
      backgroundColor: 'rgba(19, 236, 128, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 6,
      pointBackgroundColor: '#13ec80',
      pointBorderColor: 'white',
      pointBorderWidth: 2,
      pointHoverRadius: 8
    }]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: '#64748b',
        font: { size: 12 },
        usePointStyle: true,
        padding: 15
      }
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#13ec80',
      borderWidth: 1,
      padding: 12,
      displayColors: false,
      callbacks: {
        label: (context) => {
          const value = context.parsed.y
          return `Rp ${formatCurrency(value)}`
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => `Rp ${(value / 1000000).toFixed(1)}jt`,
        color: '#64748b'
      },
      grid: {
        color: '#e2e8f0',
        drawBorder: false
      }
    },
    x: {
      ticks: {
        color: '#64748b'
      },
      grid: {
        display: false,
        drawBorder: false
      }
    }
  }
}

const getMonthName = (monthIndex) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months[monthIndex]
}

const formatCurrency = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(2).replace('.', ',') + 'jt'
  } else if (value >= 1000) {
    return (value / 1000).toFixed(0).replace('.', ',') + 'rb'
  }
  return value.toString()
}

const buttonClass = (active) => {
  return `px-3 py-1 text-xs font-medium rounded-md transition-colors ${
    active
      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
  }`
}

watch(period, () => {
  loadChartData()
})

const loadChartData = async () => {
  const now = new Date()
  const month = now.getMonth() + 1
  const year = now.getFullYear()

  if (period.value === 'daily') {
    await saleStore.fetchDailyAnalytics({ month, year })
  } else if (period.value === 'weekly') {
    await saleStore.fetchWeeklyAnalytics({ month, year })
  } else if (period.value === 'monthly') {
    await saleStore.fetchMonthlyAnalytics({ year })
  }
}

onMounted(() => {
  loadChartData()
})
</script>