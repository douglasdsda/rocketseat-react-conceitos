import React, {useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then( response => {
        setRepositories(response.data);
    }).catch ( error => {
      console.log('erro: ', error);
    });
  }, []);

  async function handleAddRepository() {
     const response = await api.post('repositories', {
      "title": "teste",
      "url": "http://github.com/...",
      "techs": ["Angular", "flutter", "docker"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {

    const response = await api.delete(`/repositories/${id}`);

    if(response.status === 204){
        const index = repositories.findIndex(repository => repository.id === id);

        const auxRepository = [...repositories];

        auxRepository.splice(index, 1);

        setRepositories([...auxRepository]);
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
         {repositories.map(repository => <li key={repository.id}>
          {/* Repositório 1 */}
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
         )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
