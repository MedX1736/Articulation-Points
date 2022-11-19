import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { Button } from "@material-ui/core";
import TimelineIcon from '@mui/icons-material/Timeline';

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [item, setItem] = useState({
    name: "",
    weight: "",
    value: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setItem(prevItem => {
      return {
        ...prevItem,
        [name]: name == 'name' ? value : Number(value)
      };
    });
  }

  function submitItem(event) {
    props.onAdd(item);
    setItem({
      name: "",
      weight: "",
      value: "",
    });
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div className="Input">
      <form className="create-graph">
        <h2>Configuration de graphe</h2>

        <div className="sommet-input">
          <h3>Nombre de sommets:</h3>
          <input
            id="nbNode"
            min="1"
            max="20"
            type="number"
            className="number"
            required
          />
        </div>
        <Zoom in={true}>
          <Fab onClick={submitItem}>
            <AddIcon />
          </Fab>
        </Zoom>
        <Zoom in={true}>
          <Fab onClick={submitItem} id="transition" >
            <TimelineIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
