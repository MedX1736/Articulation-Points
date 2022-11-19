import React, { useState } from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import { Button } from "@material-ui/core";

function Header(props) {
  
  return (
    <header>
      <h1>
        <img src="flowchart.png" style={{width : '40px'}} />
        Points d'articulation 
      </h1>
      <Button style={{backgroundColor : '#5F9DF7', color : '#fff'}} onClick ={props.onSolve}>{props.value}</Button>
      <div className="inputSlider">
      </div>
    </header>
  );
}

export default Header;
