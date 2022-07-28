import React, { useEffect, useState } from 'react';
import backgroundImage from './assets/lYEyZs.png';
import Header from './components/Header';
import api from './services/api';

export default function App(){
  const [ usuarios, setusuarios ] = useState([]);
  const [ newname, setNewname ] = useState('');
  const [ newemail, setNewemail ] = useState('');

  useEffect(() => {
    api.get('usuarios').then(response => {
      setusuarios(response.data);
    });
  }, []);

function handleInputChangeNewname(e) {
  setNewname(e.target.value);
}

function handleInputChangeNewemail(e) {
  setNewemail(e.target.value);
} 

async function addNewusuario(e) {
  e.preventDefault( );
  setNewname(newname);
  setNewemail(newemail);
  const response = await api.post('usuarios', {
    name: `${newname}`,
    email: `${newemail}`
});

    const usuario = response.data;

    console.log(usuario);

    setusuarios([...usuarios, usuario]); 
    setNewname(' ');
    setNewemail(' ');
  }

  return (
    <form>
      <img width={350} src={backgroundImage} />
      <br/>
      <input
           type="text"
           placeholder="Informe o nome do usuario"
           value={newname}
           onChange={handleInputChangeNewname}
           />
      <br/>
      <input
            type="text"
            placeholder="Informe o email do usuario"
            value={newemail}
            onChange={handleInputChangeNewemail}
            />
      <br/>
      <Header title="usuarios">
        <ul>
          {usuarios.map(usuario =>
         <li key={usuario.id}>
           <span>{`Nome: `+usuario.name}</span>
           <span>{` -  email: `+usuario.email}</span>
           </li>)}
        </ul>
      </Header>
      <br/>
      <button type="button" 
                    onClick={addNewusuario}>Adicionar usuario</button>
     </form> 
  );
}