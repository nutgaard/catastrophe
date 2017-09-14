import Webworker from './webworker';

function damage({ T, c, p, pascal }) {
    let sum = 0;
    for (let k = 0; k <= T; k++) {
        for (let a = 1; a <= k; a++) {
            sum += pascal[T][k] * c * Math.pow(p, a);
        }
    }

    return sum;
}

export default ({T, c, p, pascal}) => Webworker.exec(damage, {T, c, p, pascal});
