import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const NiveisEdit = () => {
    let { nivelId } = useParams();
    const [nivel, setNivel] = useState('');

    useEffect(() => {
        (async () => {
            await api.get(`/niveis/${nivelId}`)
            .then((response) => {
                if (response.data?.nivel) {
                    setNivel(response.data.nivel);
                }
            });
        })
      ();
    }, []);

    const edit = async(event) => {
        event.preventDefault();

        const info = {
            id: nivelId,
            nivel: nivel
        };

        await api.put('niveis/', info)
        .then((response) => {
            if (response.status == 200) {
                Swal.fire(
                    'Edição de nível',
                    'Nível editado com sucesso!',
                    'success'
                );
            }
        })
        .catch((err) => {
            if (err?.response?.status == 400) {
                Swal.fire(
                    'Edição de nível',
                    err.response.data,
                    'error'
                );
            } else {
                Swal.fire(
                    'Edição de nível',
                    'Aconteceu um erro ao tentar editar este nível!',
                    'error'
                );
            }
        });
    }

    return(
        <>
            <h1>Edição de nível</h1>
            <form className="form" onSubmit={(event) => edit(event)}>
                <div className="form-group">
                    <label>Nível</label>
                    <input type="text" id="nivel" className="form-control" name="nivel" value={nivel} onChange={(e) => setNivel(e.target.value)} />
                </div>
                <div className="form__button">
                    <button className="btn btn-success" type="submit">Salvar edição</button>
                </div>
            </form>
        </>
    )
}

export default NiveisEdit;