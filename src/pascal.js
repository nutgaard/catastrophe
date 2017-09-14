import Webworker from './webworker';

function pascal(height) {
    const rows = new Array(height);
    rows[0] = [1];
    rows[1] = [1, 1];

    for (let i = 2; i < height; i++) {
        const prevRow = rows[i - 1];
        const currentRow = [1];
        for (let j = 1; j < prevRow.length; j++) {
            currentRow.push(prevRow[j - 1] + prevRow[j]);
        }
        currentRow.push(1);
        rows[i] = currentRow;
    }

    return rows;
}

export default (height) => Webworker.exec(pascal, height);