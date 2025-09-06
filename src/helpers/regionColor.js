

function regionColor (regionName){
    let regionColorValue = '';

    switch (regionName) {
        case 'Africa':
            regionColorValue = 'blue';
            break;
        case 'Americas':
            regionColorValue = 'green';
            break;
        case 'Asia':
            regionColorValue = 'red';
            break;
        case 'Europe':
            regionColorValue = 'yellow';
            break;
        case 'Oceania':
            regionColorValue = 'purple';
            break;
        default:
            regionColorValue = 'default';

    }
    return regionColorValue;
}

export default regionColor;
