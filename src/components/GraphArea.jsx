import React, { useEffect, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

const GraphArea = (props) => {
  useEffect(() => { createNodes(); setLayout(initLayout);}, []);
  const [nodes, setNodes] = useState([]);
  const initLayout = 
    {
      name: "random",
      animate : true
    };
  const [layout, setLayout] = useState({name:"random"});

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

  return (
    <div className="graphArea">
      <CytoscapeComponent
      
      elements={nodes}
      layout ={layout}
      style={{ width: '800  px', height: '470px',  }}
      stylesheet={[
        {
      selector: 'node',
      style: {
        backgroundColor: '#f1982e',
        label: 'data(id)',
        color:'#1746A2'
      }
    },
    {
      selector: 'edge',
      style: {
        width: 15
      }
    }
      ]}
        />
    </div>
  )
}

export default GraphArea