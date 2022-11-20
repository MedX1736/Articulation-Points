import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { articulationSolve, initMatrix } from '../articulationPoints';

const GraphArea = (props) => {
  var cyglob;
  useEffect(() => {
    const $matrixadj = initMatrix(props.nbNodes);
    setMatrixAdj($matrixadj);
    createNodes();
    setLayout(initLayout);
  },
    []);
  const [nodes, setNodes] = useState([]);
  const [matrixadj,setMatrixAdj] = useState([]);

  const initLayout =
  {
    name: "random",
    animate: true
  };
  const [layout, setLayout] = useState({ name: "random" });

  function createNodes() {
    const $Nodes = []; //Initialize Nodes Matrix
    for (var i = 0; i < props.nbNodes; i++) {
      $Nodes.push({
        data: {
          id: i + 1,
          name: i + 1,
        },
      });
      setLayout(initLayout);
    }
    setNodes($Nodes);
  }
  function updateEdges(FirstNode, SecondNode) {
    const $matrixAdj = matrixadj ;
    var i,j;
    i= FirstNode;
    j= SecondNode;
    console.log($matrixAdj);
    $matrixAdj[i-1][j-1]=1;
    $matrixAdj[j-1][i-1]=1;
    setMatrixAdj($matrixAdj);
    cyglob.add({
      group: "edges",
      data: {
        source: FirstNode,
        target: SecondNode
      },
    });
    setNodes(prev =>
      [
        ...prev,
        {
          group: "edges",
          data: {
            source: FirstNode,
            target: SecondNode
          },
        }
      ]
    );
  }
  const [source, setSource] = useState(null);

  function addEdge() {
    // cyglob.on('tap', 'node', function(evt){
    //   var node = evt.target;
    //   console.log( 'tapped ' + node.id() );
    // });
    var nodeselected = cyglob.$(':selected').json()['data']['id'];
    if (source === null) {
      cyglob.nodes()[nodeselected - 1].css({
        'background-color': '#5F9DF7'
      });
      setSource(nodeselected);
    } else {
      if (source != nodeselected) {
        updateEdges(source, nodeselected);
      }
      cyglob.nodes()[nodeselected - 1].css({
        'background-color': '#f1982e'
      });
      cyglob.nodes()[source - 1].css({
        'background-color': '#f1982e'
      });
      setSource(null);
      nodeselected = null;
    }
  }

  function resolve() {
    const $matrixadj = initMatrix(props.nbNodes);
    setMatrixAdj($matrixadj);
    console.log(articulationSolve(cyglob,matrixadj));
  }

  return (
    <div className="graphArea">
      <Button color='primary' onClick={addEdge}> TEST</Button>
      <Button color='primary' onClick={resolve}> Resolve</Button>

      <CytoscapeComponent
        cy={(cy) => { cyglob = cy }}
        elements={nodes}
        layout={layout}
        style={{ width: '800  px', height: '470px', }}
        stylesheet={[
          {
            selector: 'node',
            style: {
              backgroundColor: '#f1982e',
              label: 'data(id)',
              color: '#1746A2'
            }
          },
          {
            selector: 'edge',
            style: {
              width: 3,
              lineColor: "#5F9DF7"
            }
          }
        ]}
      />
    </div>
  )
}

export default GraphArea