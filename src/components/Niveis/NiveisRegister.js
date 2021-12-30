import React, {useState} from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

const NiveisRegister = () => {
    const [nivel, setNivel] = useState('');

    const register = async(event) => {
        event.preventDefault();
        const info = {
            nivel
        };

        try {
            const response = await api.post('niveis/', info);
            
            if (response.status == 201) {
                Swal.fire(
                    'Cadastro de nível',
                    'Nível cadastrado com sucesso!',
                    'success'
                );
            }
        } catch(err) {
            if (err.response.status == 400) {
                Swal.fire(
                    'Cadastro de nível',
                    err.response.data,
                    'error'
                );
            }
        }
    }

    return (
        <div>
            <h1>Cadastro de nível</h1>
            <form className="form" onSubmit={(event) => register(event)}>
                <div className="form-group">
                    <label>Nível</label>
                    <input type="text" className="form-control" id="nivel" name="nivel" value={nivel} onChange={(e) => setNivel(e.target.value)} />
                </div>
                <div className="form__button">
                    <button className="btn btn-success" type="submit">Cadastrar nível</button>
                </div>
            </form>
        </div>
    )
};

export default NiveisRegister;