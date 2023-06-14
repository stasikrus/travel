import AbstractView from "./abstract";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { makeItemsUniq, countPointsByType, countPointsByPrice, calculateDurationByType, calculateDurationByTypeMs } from "../utils/statistics";

const renderMoneyChart = (moneyCtx, points) => {
    const pointTypes = points.map(point => point.type);
    const uniqTypes = makeItemsUniq(pointTypes);
    const pointByPriceCounts = uniqTypes.map((type) => countPointsByPrice(points, type));

    return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: uniqTypes.map(type => type.toUpperCase()),
      datasets: [{
        data: pointByPriceCounts,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val, context) => {
            const index = context.dataIndex;
            const value = context.dataset.data[index];
            return `${value} €`;
          },
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTypeChart = (typeCtx, points) => {
    const pointTypes = points.map(point => point.type);
    const uniqTypes = makeItemsUniq(pointTypes);
    const pointByTypesCounts = uniqTypes.map((type) => countPointsByType(points, type));

    return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: uniqTypes.map(type => type.toUpperCase()),
      datasets: [{
        data: pointByTypesCounts,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val, context) => {
            const index = context.dataIndex;
            const value = context.dataset.data[index];
            return `${value}`;
          },
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx, points) => {
  const pointTypes = points.map(point => point.type);
  const uniqTypes = makeItemsUniq(pointTypes);
  const pointByTimeCounts = uniqTypes.map(type => calculateDurationByType(points, type));
  const pointByTimeCountsMs = uniqTypes.map(type => calculateDurationByTypeMs(points, type));


  console.log(pointByTimeCounts);
  console.log(points);

  return new Chart(timeCtx, {
  plugins: [ChartDataLabels],
  type: 'horizontalBar',
  data: {
    labels: uniqTypes.map(type => type.toUpperCase()),
    datasets: [{
      data: pointByTimeCountsMs,
      backgroundColor: '#ffffff',
      hoverBackgroundColor: '#ffffff',
      anchor: 'start',
    }],
  },
  options: {
    plugins: {
      datalabels: {
        display: 'auto',
        font: {
          size: 13,
        },
        color: '#000000',
        anchor: 'end',
        align: 'start',
        formatter: (val, context) => {
          const index = context.dataIndex;
          const value = pointByTimeCounts[index];
          return value;
        },
      },
    },
    title: {
      display: true,
      text: 'TIME',
      fontColor: '#000000',
      fontSize: 23,
      position: 'left',
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: '#000000',
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        barThickness: 44,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
        minBarLength: 50,
      }],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  },
});
};


const createStatisticsTemplate = () => {
    return `<section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item">
            <canvas class="statistics__chart--money" id="money" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart--transport" id="type" width="900"></canvas>
          </div>

          <div class="statistics__item">
            <canvas class="statistics__chart--time" id="time-spend" width="900"></canvas>
          </div>
        </section>`
}

export default class Statistics extends AbstractView {
    constructor(points) {
        super();

        this._data = points;
        this._moneyChart = null;
        this._typeChart = null;
        this._timeChart = null;       
    }

    getTemplate() {
        return createStatisticsTemplate();
    }

    _setCharts() {
        if (this._moneyChart !== null || this._typeChart !== null) {
            this._moneyChart = null;
            this._typeChart = null;
        }

        const moneyCtx = document.querySelector('.statistics__chart--money');
        const typeCtx = document.querySelector('.statistics__chart--transport');
        const timeCtx = document.querySelector('.statistics__chart--time');

        this._moneyChart = renderMoneyChart(moneyCtx, this._data);
        this._typeChart = renderTypeChart(typeCtx, this._data);
        this._timeChart = renderTimeChart(timeCtx, this._data);
    }
}