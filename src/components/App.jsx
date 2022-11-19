import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import GraphArea from "./GraphArea";

function App() {
  const nbNodes =10 ;
  return (
    <div>
      <Header onSolve={() => { }} value={"Résoudre"} />
      <div className="container" >
      <CreateArea onAdd={() => { }} />
      <GraphArea nbNodes={nbNodes}></GraphArea>
      </div>
      
      {
        true && (
          <div>
            {/* <div style={{ width: '500px', margin: 'auto', textAlign: 'center', opacity: '50%' }}>
              <img src='box.png' style={{ width: '100px', marginTop: '100px' }} />
              <h3 style={{ marginTop: '30px', color: '#000' }} >Il n'y a aucun élèment pour l'instant.</h3>
            </div> */}
          </div>
        )
      }
      <Footer />
    </div>
  );
}

export default App;
