const gjs = geneticjs;
const { Subject } = rxjs;

const chromosome = new gjs.FloatingPointChromosome([0, 0, 0, 0], [998, 680, 998, 680], true);

const displayValues = (chromosome) => {
    //const c = chromosome as gjs.FloatingPointChromosome;
    return chromosome.expand().toString();
}


const fitnessFunction = (chromosome) => {
    const c = chromosome;
    const values = c.expand();

    const x1 = values[0];
    const y1 = values[1];
    const x2 = values[2];
    const y2 = values[3];

    if (x1 < c.minValue[0] || x1 > c.maxValue[0])
        return -1;
    if (y1 < c.minValue[1] || y1 > c.maxValue[1])
        return -1;
    if (x2 < c.minValue[2] || x2 > c.maxValue[2])
        return -1;
    if (y2 < c.minValue[3] || y2 > c.maxValue[3])
        return -1;

    const result = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return (result);
}

const fitness = new gjs.FuncFitness(fitnessFunction);

// Running the GA
const selection = new gjs.EliteSelection();
const crossover = new gjs.UniformCrossover(0.5);
const mutation = new gjs.FlipBitMutation();
const population = new gjs.Population(500, 1000, chromosome);
const termination = new gjs.GenerationNumberTermination(100);

const reinsertion = new gjs.ElitistReinsertion();

const ga = new gjs.GeneticAlgorithm(
    population,
    fitness,
    selection,
    crossover,
    mutation,
    reinsertion,
    termination
);

const data = [];



var ctx = document.getElementById('myChart').getContext('2d');

function start(payload) {
    const subject = new Subject();
    let data = [];
    
    subject.subscribe((best) => {
        //addData(ctx, "", data);
        //data.push(best);
        //console.log(best);
        payload.labels.push(data.length);
        payload.datasets[0].data.push(fitnessFunction(best));
        //payload.datasets[0].data.push(value);
        myChart.update();
    });
   

    ga.start(subject);
}




const payload =  {
    labels: [],
    datasets: [{
        label: '# of Votes',
        data: [],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
};

var myChart = new Chart(ctx, {
    type: 'line',
    data: payload,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }]
        }
    }
});


//start(payload);