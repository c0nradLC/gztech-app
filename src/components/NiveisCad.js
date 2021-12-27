import React, {useState} from 'react';
import api from '../services/api';

const NiveisCad = () => {
    const [nivel, setNivel] = useState('');

    const cadastrar = async(event) => {
        event.preventDefault();

        const info = {
            nivel
        };

        await api.post('niveis/', info)
        .then((response) => console.log(response));
    }

    return (
        <div>
            <h1>Cadastro de nível</h1>
            <form onSubmit={(event) => cadastrar(event)}>
                <label>Nível:</label>
                <input type="text" id="nivel" name="nivel" value={nivel} onChange={(e) => setNivel(e.target.value)} />
                <button type="submit">Cadastrar Nível</button>
            </form>
        </div>
    )
};

export default NiveisCad;