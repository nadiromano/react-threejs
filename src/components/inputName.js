import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../state/userSlice';

function NameInput() {
  const [name, setName] = useState('');
  const redirectToCanvas = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(name));
    redirectToCanvas.push('/canvas3d');
    console.log(name);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Scegli il nome del tuo personaggio</label>
        <input
          type="text"
          placeholder="Your Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button>Invia</button>
        <p>{name}</p>
      </form>
    </div>
  );
}

export default NameInput;
