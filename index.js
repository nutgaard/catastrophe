function naturalNumbers(n) {
    return new Array(n)
        .fill(0)
        .map((_, i) => i);
}

function groupBy(property, postProcessor = (a) => a) {
    return (groups, value) => {
        const key = property ? value[property] : value;
        const group = groups[key] || [];
        group.push(postProcessor(value));
        groups[key] = group;
        return groups;
    }
}

function countBy(property) {
    return (groups, value) => {
        const key = property ? value[property] : value;
        let count = groups[key] || 0;
        count++;
        groups[key] = count;
        return groups;
    }
}

function calulateKsForT(T) {
    return naturalNumbers(Math.pow(2, T))
        .map((i) => ({
            i,
            k: i.toString(2).split('').reduce((sum, part) => part === '1' ? sum + 1 : sum, 0)
        }))
        .reduce(countBy('k', ({i}) => i), {});
}

for (let T = 0; T < 10; T++) {
    console.log(Object.values(calulateKsForT(T)));
}