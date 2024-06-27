

async function createChart(){
    const { xlabels, ytemps, globalTemps, noHem:north, soHem:south } = await getData()
    const ctx = document.getElementById('chart');
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: xlabels,
        datasets: [{
          label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in °C',
          data: ytemps,
          borderWidth: 1,
          color: '#00ff00'
        },
        {
            label: 'Global Temperatures',
            data: globalTemps,
            borderWidth: 1
        },{
            label: 'Northen Hemisphere',
            data: north,
            borderWidth: 1
        },{
            label: 'Southern Hemisphere',
            data: south,
            borderWidth: 1
        }]
      },
        options: {
        scales: {
            y: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        return value+'°';
                    }
                }
            }
        }
    }
    });
}



async function getData(){
    const xlabels = []
    const ytemps = []
    const globalTemps = []
    const noHem = []
    const soHem = []

    const response = await fetch('ZonAnn.Ts+dSST.csv')
    const data = await response.text()
    // console.log(data)

    //splitting the data into arrays rowwise and not considering the first row(slice)
    const table = data.split('\n').slice(1)
    table.forEach(row => {
        const columns = row.split(',')
        const year = columns[0]
        xlabels.push(year)
        const temp = columns[1]
        ytemps.push(parseFloat(temp) + 14)
        const globl = columns[2]
        globalTemps.push(parseFloat(globl) + 14)
        const north = columns[3]
        const south = columns[4]
        noHem.push(parseFloat(north) + 14)
        soHem.push(parseFloat(south) + 14)
        console.log(year, temp)
    })
    // console.log(rows)

    return { xlabels, ytemps, globalTemps, noHem, soHem }
}


createChart()

