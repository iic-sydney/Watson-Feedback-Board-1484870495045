Vue.component('feedback-chart', {
    props: ['messages', 'canvasId'],
    data: function() {
        return {
            chart: undefined,
            chartData: {}, 
        }
    },
    methods: {
        initChart: function() {
            var ctx = document.getElementById(this.canvasId).getContext('2d')
            this.chart = new Chart(ctx, this.chartData)
        },
        updateChart: function() {
            this.chartData.data.datasets[0].data[0] = this.messages.filter((msg) => {
                return msg.css == "success";
            }).length;

            this.chartData.data.datasets[0].data[1] = this.messages.filter((msg) => {
                return msg.css == "info";
            }).length;

            this.chartData.data.datasets[0].data[2] = this.messages.filter((msg) => {
                return msg.css == "default";
            }).length;

            this.chartData.data.datasets[0].data[3] = this.messages.filter((msg) => {
                return msg.css == "warning";
            }).length;
    
            this.chartData.data.datasets[0].data[4] = this.messages.filter((msg) => {
                return msg.css == "danger";
            }).length;
                
            this.chart.update() 
        }
    },
    mounted: function() {
        this.chartData["type"] = "doughnut"

        this.chartData["data"] = {
            labels: ["Very Positive", "Positive", "Neutral", "Negative", "Very Negative"],
            datasets: [{
                label: "Proportion of Sentiments",
                data: [0, 0, 0, 0, 0],
                backgroundColor: [
                    "#5cb85c",
                    "#5bc0de",
                    "#ffffff",
                    "#f0ad4e",
                    "#d9534f"
                ]
            }]
        }

        this.chartData["options"] = {
            maintainAspectRatio: false,
            response: true
        }

        this.initChart();
        window.setInterval(() => {
            this.updateChart()
        }, 1000);
    },
    template: "<canvas :id='canvasId' width='400' height='400'></canvas>"
});
