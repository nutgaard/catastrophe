const workerjs = URL.createObjectURL(new Blob([`
function getFunc(funcStr) {
	//Get the name of the argument. We know there is a single argument
	//in the worker function, between the first '(' and the first ')'.
	var argName = funcStr.substring(funcStr.indexOf("(") + 1, funcStr.indexOf(")"));

	//Now get the function body - between the first '{' and the last '}'.
	funcStr = funcStr.substring(funcStr.indexOf("{") + 1, funcStr.lastIndexOf("}"));

	//Construct the new Function
	return new Function(argName, funcStr);
}

onmessage = (event) => {
  const fn = getFunc(event.data.action);
  postMessage(fn(event.data.args));
};
`]));

class Webworker {
    static exec(fn, data) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(workerjs);
            worker.onmessage = (event) => resolve(event.data);
            worker.onerror = reject;

            worker.postMessage({ action: fn.toString(), args: data })
        });
    }


}

export default Webworker;