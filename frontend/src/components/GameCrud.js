import axios from "axios";
import { useEffect, useState } from "react";
import validator from 'validator';
import './style.css';

const GameCrud = () => {
  const [_id, setId] = useState("");
  const [name, setGame] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [games, setListOfGame] = useState([]);

  const loadGames = () => {
    axios.get("http://localhost:8080/game/getAll")
      .then(result => {
        setListOfGame(result.data.data);
        console.log(result.data);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    loadGames();
  }, []);

  const save = (event) => {
    event.preventDefault();
    try {
      const gameExists = games.some(game => game.name === name && game.date === date && game.description === description);
      if (gameExists) {
        throw new Error('Game already exists');
      }
  
      axios.post("http://localhost:8080/game/create", {
        name: name,
        date: date,
        description: description,
      })
        .then(() => {
          setId("");
          setGame("");
          setDate("");
          setDescription("");
          loadGames();
        })
        .catch(error => alert(error.message));
    } catch (error) {
      alert(error.message);
    }
  };

  const editGame = (game) => {
    setGame(game.name);
    setDate(game.date);
    setDescription(game.description);
    setId(game._id);
  };

  const deleteGame = (_id) => {
    axios.delete("http://localhost:8080/game/delete/" + _id)
      .then(() => loadGames())
      .catch(error => console.error(error));
  };

  const update = (event) => {
    event.preventDefault();
    try {
      const dateIsValid = validator.isDate(date);
      if (!dateIsValid) {
        throw new Error('Invalid date');
      }

      if (!_id || !name || !date || !description) {
        throw new Error('All fields are required');
      }
  
      let gameToUpdateId = _id;
      for (let i = 0; i < games.length; i++) {
        if (games[i]._id === _id) {
          gameToUpdateId = _id;
          break;// This code searches game in the games array with an _id property that matches the _id stored in the gameToUpdateId variable. 
        }
      }
      
      axios.patch(`http://localhost:8080/game/update/${gameToUpdateId}`, {
        _id: _id,
        name: name,
        date: date,
        description: description,
      })
        .then(() => {
          setId('');
          setGame('');
          setDate('');
          setDescription('');
          loadGames();
        })
        .catch(error => alert(error.message));
    } catch (error) {
      alert(error.message);
    }
  }


return (
  <div style={{ textAlign: "center" }}>
    <h1 className="my-h1">GAME WISHLIST</h1>
    <div>
      <form>
        <div className="form">
          <input type="text" className="formInput" id="_id" hidden value={_id} 
          onChange={(event) => {
              setId(event.target.value);
          }}
          style={{ backgroundColor: "black", color: "white" }}
          />
          <label style={{ color: "white" }}>Game Name</label>
          <input type="text" className="formInput" id="name" value={name} maxLength="100" //max the limit of name
            onChange={(event) => {
              setGame(event.target.value);
            }} 
            style={{ backgroundColor: "#444", color: "white" }}
          />
        </div>
        <div className="form">
          <label style={{ color: "white" }}>Release Date</label>
          <input
            type="text"
            className="formInput"
            id="date"
            value={date}
            maxLength="10"
            onChange={(event) => {
              setDate(event.target.value);
            }}
            style={{ backgroundColor: "#444", color: "white" }}
          />
        </div>

        <div className="form">
          <label style={{ color: "white" }}>Description</label>
          <input
            type="text"
            className="formInput"
            id="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            style={{ backgroundColor: "#444", color: "white" }}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <button className="btn add-btn" onClick={save}>
            Add
          </button>
          <button className="btn update-btn" onClick={update}>
            Update
          </button>
        </div>
      </form>
    </div>

    <table className="table table-dark" align="center">
      <thead>
        <tr>
          <th scope="column">Game Name</th>
          <th scope="column">Release Date</th>
          <th scope="column">Description</th>
          <th scope="column">Option</th>
        </tr>
      </thead>
      {games.map((game) => (
        <tbody key={game._id}>
          <tr>
            <td>{game.name}</td>
            <td>{game.date}</td>
            <td>{game.description}</td>
            <td>
              <button
                type="button"
                className="btn btn-edit"
                onClick={() => editGame(game)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-delete"
                onClick={() => deleteGame(game._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  </div>
  )}
export default GameCrud;

