const utils = {};

utils.styles = {
    car: {color:'grey',text:'🚗'},
    fish:{color: 'red',text:'🐟'},
    house:{color: 'yellow',text:'🏠'},
    tree:{color: 'green',text:'🌳'},
    bicycle:{color: 'cyan',text:'🚲'},
    guitar:{color: 'blue',text:'🎸'},
    pencil:{color: 'magenta',text:'✏️ '},
    clock:{color: 'lightgrey',text:'⏰'}
}
    utils.formatPercent = (n)=>{
    return (n*100).toFixed(2)+"%";
}
utils.printProgress=(count,max)=>{
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const percent = utils.formatPercent(count/max);
    process.stdout.write(count + '/' + max + ' (' + percent + ')');
}

utils.groupBy = (objArray,key) =>{
    const groups = {};
    for(const obj of objArray){
        const value = obj[key];
        if(groups[value] == null){
            groups[value] = [];
        }
        groups[value].push(obj);
    }
    return groups
}

if(typeof module !== "undefined"){
    module.exports = utils
}