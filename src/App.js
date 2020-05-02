import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositório Num${Date.now()}`,
      url: "http://gostack2-0.net.br",
      techs: ["nodejs", "reactJS", `${Date.now()}`]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`repositories/${id}`);
      
      if (response.status === 400) {
        alert(`Ops... ${response.data.error}`);
      } else {
        // excluiu com sucesso!
        setRepositories(repositories.filter(repository => repository.id !== id));
      }
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
