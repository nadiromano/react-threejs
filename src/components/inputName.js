import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function NameInput() {
  const [name, setName] = useState('');
  const redirectToCanvas = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameSelected = name;
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
