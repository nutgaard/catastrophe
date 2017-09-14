import React, {Component} from "react";
import "./graph.css";

function SvgNode({x, y}) {
    return (
        <circle cx={x} cy={y} r="4" fill="black"/>
    );
}
function SvgEdge({coors}) {
    return (
        <line x1={coors[0]} y1={coors[1]} x2={coors[2]} y2={coors[3]} stroke="black" strokeWidth={2}/>
    );
}
function SvgText({text, x, y}) {
    return <text x={x} y={y} fontFamily="monospace" fontSize={16}>{text}</text>;
}

class Node {
    constructor(x, y, left, right) {
        this.x = x;
        this.y = y;
        this.children = left && right ? [right, left] : [];
    }
}
function avg(a, b) {
    return (a + b) / 2;
}

function generateTree2(depth) {
    const reversedLevels = new Array(depth).fill(0).map(() => []);

    reversedLevels[0] = new Array(Math.pow(2, depth)).fill(0).map((_, i) => new Node(10 + i * 20, 10 + depth * 40));

    for (let level = 1; level <= depth; level++) {
        const base = reversedLevels[level - 1];
        const thisLevel = [];
        for (let i = 0; i < base.length; i += 2) {
            const left = base[i];
            const right = base[i + 1];
            thisLevel.push(new Node(
                avg(left.x, right.x),
                left.y - 40,
                left,
                right
            ));
        }
        reversedLevels[level] = thisLevel;
    }

    return reversedLevels[depth][0];
}

function treeMap(tree, fn) {
    let stack = [tree];
    const output = [];
    while (stack.length > 0) {
        const element = stack.pop();
        output.push(fn(element));
        stack = [...stack, ...element.children];
    }

    return output;
}

class Graph extends Component {
    state = {
        scale: 1,
        translateX: 0,
        translateY: 0,
        baseTranslateX: 0,
        baseTranslateY: 0,

        isDragging: false,
        dragX: null,
        dragY: null
    };
    onWheel = ({deltaY}) => {
        this.setState({scale: Math.max(this.state.scale + (deltaY > 0 ? -0.1 : 0.1), 0.3)});
    };
    onMouseDown = ({clientX, clientY}) => this.setState({isDragging: true, dragX: clientX, dragY: clientY});
    onMouseUp = (e) => this.setState({
        isDragging: false,
        dragX: null,
        dragY: null,
        baseTranslateX: this.state.translateX,
        baseTranslatey: this.state.translateY
    });
    onMouseMove = ({clientX, clientY}) => {
        if (this.state.isDragging) {
            const dragDiffX = this.state.dragX - clientX;
            const dragDiffY = this.state.dragY - clientY;

            this.setState({
                translateX: this.state.baseTranslateX - 1.5 * dragDiffX,
                translateY: this.state.baseTranslateY - 1.5 * dragDiffY
            })
        }
    };

    reset = (e) => {
        e.preventDefault();
        this.setState({
            scale: 1,
            translateX: 0,
            translateY: 0,
            baseTranslateX: 0,
            baseTranslateY: 0,

            isDragging: false,
            dragX: null,
            dragY: null
        });
    } ;

    render() {
        if (this.props.T > 10) {
            return (
                <div className="graphcontainer">
                    <svg viewBox="0 0 100 100" className="graph">
                        <text x="50" y="40" textAnchor="middle" fontSize={12}>This isn't the graph</text>
                        <text x="50" y="60" textAnchor="middle" fontSize={12}>you're looking for...</text>
                    </svg>
                </div>
            );
        }
        const {T} = this.props;
        const leafNodeCount = Math.pow(2, T);
        const xSize = (leafNodeCount * 20);
        const ySize = (T * 40) + 20;
        const viewBox = `0 0 ${xSize} ${ySize}`;
        const tree = generateTree2(T);

        const nodes = treeMap(tree, ({x, y}) => <SvgNode x={x} y={y} key={`${x}-${y}`}/>);
        const edges = treeMap(tree, (node) => {
            if (node.children.length !== 2) {
                return [];
            }

            return [
                <SvgEdge coors={[node.x, node.y, node.children[0].x, node.children[0].y]} key={`${node.x}-${node.y}-edge1`} />,
                <SvgEdge coors={[node.x, node.y, node.children[1].x, node.children[1].y]} key={`${node.x}-${node.y}-edge2`} />,
                <SvgText text="K" x={avg(node.x, node.children[0].x)+2} y={avg(node.y, node.children[0].y)+2} key={`${node.x}-${node.y}-text1`} />,
                <SvgText text="N" x={avg(node.x, node.children[1].x)-10} y={avg(node.y, node.children[1].y)+2} key={`${node.x}-${node.y}-text2`} />
            ]
        }).reduce((list, edges) => [...list, ...edges], []);

        return (
            <div className="graphcontainer">
                <button onClick={this.reset} className="graph__reset">reset</button>
                <svg
                    viewBox={viewBox}
                    className="graph"
                    onWheel={this.onWheel}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onMouseMove={this.onMouseMove}
                >
                    <g transform={`scale(${this.state.scale}) translate(${this.state.translateX} ${this.state.translateY})`}>
                        {nodes}
                        {edges}
                    </g>
                </svg>
            </div>
        );
    }
}

export default Graph;