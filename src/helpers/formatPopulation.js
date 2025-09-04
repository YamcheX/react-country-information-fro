

function formatPopulation (number){
    const numberToMillions = Math.round(number / 1000000);
    return `${numberToMillions} million`

}

export default formatPopulation;