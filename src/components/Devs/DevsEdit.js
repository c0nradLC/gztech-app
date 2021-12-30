import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const DevsEdit = () => {
    let { devId } = useParams();
    const [niveis, setNiveis] = useState([{}]);
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
            await api.get(`/devs/${devId}`)
            .then((response) => {
                console.log(response.data)
                if (response.data) {
                    const date = new Date(response.data.datanascimento);

                    setNivel(response.data.nivel.id);
                    setNome(response.data.nome);
                    setSexo(response.data.sexo);
                    setDataNascimento(new Intl.DateTimeFormat('fr-CA').format(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)));
                    setIdade(response.data.idade);
                    setHobby(response.data.hobby);
                }
            });
        })
        ();
        (async () => {
            await api.get('/niveis/')
            .then((response) => {
                if (response.data) {
                    setNiveis(response.data);
                }
            });
        })
        ();
    }, []);

    const edit = async(event) => {
        event.preventDefault();

        const info = {
            id: devId,
            nivel: nivel,
            nome: nome,
            sexo: sexo,
            datanascimento: datanascimento,
            idade: idade,
            hobby: hobby
        };

        try {
            await api.put('devs/', info)
            .then((response) => {
                if (response.status == 200) {
                    Swal.fire(
                        'Edição de desenvolvedor',
                        'Desenvolvedor editado com sucesso!',
                        'success'
                    );
                }
            });
        } catch(err) {
            Swal.fire(
                'Edição de desenvolvedor',
                err.response.data,
                'error'
            );
        }
    }

    const handleDataNascimento = (birthDate) => {
        setDataNascimento(birthDate);

        const today = new Date();
        const birthdate = new Date(birthDate);
        const diff = today-birthdate;

        setIdade(Math.floor(diff/31557600000));
    }

    return(
        <>
            <h1>Edição de desenvolvedor</h1>
            <form className="form" onSubmit={(event) => edit(event)}>
            <div className="form-group">
                    <label>Nome</label>
                    <input type="text" id="nome" name="nome" className="form-control" onChange={(e) => setNome(e.target.value)} value={nome} />
                </div>
                <div className="form-group">
                    <label for="nivel">Nível</label>
                    <select id="nivel" name="nivel" className="form-control" onChange={(e) => setNivel(e.target.value)} value={nivel ?? ""}>
                        <option value="">Selecione um nível</option>
                        {niveis.map(nivel => (
                            <option key={nivel.id} value={nivel.id}>{nivel.nivel}</option>
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
                    <button className="btn btn-success" type="submit">Salvar edição</button>
                </div>
            </form>
        </>
    )
}

export default DevsEdit;