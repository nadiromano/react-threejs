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
        <h4 className="label-span">
          Una donna del 1460 sta per essere catapultata nel futuro
        </h4>

        <input
          className="input-name"
          type="text"
          placeholder="Scegli il nome del tuo personaggio"
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
