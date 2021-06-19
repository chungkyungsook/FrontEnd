export const URL = 'http://184.73.45.24';
export const Local = 'http://localhost:3000/';

// chartjs dataset
export const setChartjsDataset = (date, temp, humi, growth) => {
    let chartdata = {
        labels: date,
        datasets: [
            {
                label: 'Temperature',
                data: temp,
                fill: false,
                borderColor: 'rgba(255,0,0,0.3)'
            },
            {
                label: 'Humidity',
                data: humi,
                fill: false,
                borderColor: 'rgba(0,0,255,0.3)'
            },
            {
                label: 'GrowthRate',
                data: growth,
                fill: false,
                borderColor: 'gray'
            },
        ]
    };

    return chartdata;
}