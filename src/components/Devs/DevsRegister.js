import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';

const DevsRegister = () => {
    const [niveis, setNiveis] = useState([null]);
    const [nivel, setNivel] = useState(0);
    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');
    const [datanascimento, setDataNascimento] = useState('');
    const [idade, setIdade] = useState(0);
    const [hobby, setHobby] = useState('');

    const sexoOptions = [
        {
            name: 'Masculino',
            value: 'M'
        },
        {
            name: 'Feminino',
            value: 'F'
        },
        {
            name: 'Outros',
            value: 'O'
        }
    ];

    useEffect(() => {
        (async () => {
            await api.get('/niveis/')
            .then((response) => {
                if (response.data) {
                    setNiveis(response.data.niveis);
                }
            });
        })
      ();
    }, []);

    const register = async(event) => {
        event.preventDefault();
        const info = {
            nome: nome,
            nivelId: nivel,
            sexo: sexo,
            datanascimento: datanascimento,
            idade: idade,
            hobby: hobby
        };

        await api.post('devs/', info)
        .then((response) => {
            if (response.status == 201) {
                Swal.fire(
                    'Cadastro de desenvolvedor',
                    'Desenvolvedor cadastrado com sucesso!',
                    'success'
                );
            }
        })
        .catch((err) => {
            if (err?.response?.status == 400) {
                Swal.fire(
                    'Cadastro de desenvolvedor',
                    err.response.data,
                    'error'
                );
            } else {
                Swal.fire(
                    'Cadastro de desenvolvedor',
                    'Aconteceu um erro ao tentar cadastrar este desenvolvedor!',
                    'error'
                );
            }
        });
    }

    const handleDataNascimento = (birthDate) => {
        setDataNascimento(birthDate);

        const today = new Date();
        const birthdate = new Date(birthDate);
        const diff = today-birthdate;

        setIdade(Math.floor(diff/31557600000));
    }

    return (
        <div>
            <h1>Cadastro de desenvolvedor</h1>
            <form className="form" onSubmit={(event) => register(event)}>
                <div className="form-group">
                    <label>Nome</label>
                    <input type="text" id="nome" name="nome" className="form-control" onChange={(e) => setNome(e.target.value)} value={nome} />
                </div>
                <div className="form-group">
                    <label for="nivel">Nível</label>
                    <select id="nivel" name="nivel" className="form-control" onChange={(e) => setNivel(e.target.value)} value={nivel}>
                        <option value="">Selecione um nível</option>
                        {niveis.map(nivel => (
                            <option key={nivel?.id} value={nivel?.id}>{nivel?.nivel}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Sexo</label>
                    <select id="sexo" name="sexo" className="form-control" onChange={(e) => setSexo(e.target.value)} value={sexo}>
                        <option value="">Selecione um sexo</option>
                        {sexoOptions.map(sexo => (
                            <option key={sexo.value} value={sexo.value}>{sexo.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Data de nascimento</label>
                    <input type="date" id="datanascimento" name="datanascimento" className="form-control" onChange={(e) => handleDataNascimento(e.target.value)} value={datanascimento} />
                </div>
                <div className="form-group">
                    <label>Hobby</label>
                    <input type="text" id="hobby" name="hobby" className="form-control" onChange={(e) => setHobby(e.target.value)} value={hobby} />
                </div>
                <div className="form__button">
                    <button className="btn btn-success" type="submit">Cadastrar desenvolvedor</button>
                </div>
            </form>
        </div>
    )
};

export default DevsRegister;