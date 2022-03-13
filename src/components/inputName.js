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
    <div className="form-name-container">
      <form className="form-name" onSubmit={handleSubmit}>
        <label className="label-name">Scegli il nome del tuo personaggio</label>
        <input
          className="input-name"
          type="text"
          placeholder="Your Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="form-name-button">Invia</button>
      </form>
    </div>
  );
}

export default NameInput;
