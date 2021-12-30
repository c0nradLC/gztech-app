import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
import { Table } from '../Table';
import { useNavigate } from 'react-router-dom';

const DevsList = () => {
    const [devs, setDevs] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const columns = useMemo(
        () => [
            {
                Header: "Ações",
                textAlign: 'center',
                maxWidth: 1,
                width: '1%',
                columns: [
                    {
                        Header: "Remover",
                        Cell: ({ cell: { row } }) => {
                            return(
                                <>
                                    <button className="btn btn-table fa fa-trash" value={row.original.id} onClick={(event) => removeDev(event)}>
                                    </button>
                                </>
                            )
                        },
                        maxWidth: 1,
                        width: '8%',
                        overflow: 'auto'
                    },
                    {
                        Header: "Editar",
                        Cell: ({ cell: { row } }) => {
                            return(
                                <>
                                    <button className="btn btn-table fa fa-pencil" value={row.original.id} onClick={(event) => editDev(event)}>
                                    </button>
                                </>
                            )
                        },
                        maxWidth: 1,
                        width: '8%',
                        overflow: 'auto'
                    }
                ],
            },
            {
                Header: "Desenvolvedor",
                textAlign: "center",
                columns: [
                    {
                        Header: "Id",
                        accessor: "id",
                        maxWidth: 1,
                        width: '5%',
                        cursor: 'pointer'
                    },
                    {
                        Header: "Nome",
                        accessor: "nome",
                        cursor: "pointer"
                    },
                    {
                        Header: "Nível",
                        accessor: "nivel.nivel",
                        cursor: 'pointer',
                        Cell: ({ cell: { value } }) => {
                            return(
                                <span>{value}</span>
                            )
                        }
                    },
                    {
                        Header: "Sexo",
                        accessor: "sexo",
                        cursor: "pointer",
                        Cell: ({ cell: { value } }) => {
                            return(
                                <span>{value == 'M' ? 'Masculino' : value == 'F' ? 'Feminino' : 'Outros'}</span>
                            )
                        }
                    },
                    {
                        Header: "Data de nascimento",
                        accessor: "datanascimento",
                        cursor: "pointer",
                        Cell: ({ cell: { value } }) => {
                            const birthDateFormatted = new Intl.DateTimeFormat('pt-BR').format(new Date(value.toString().substring(0, 4), Number(value.toString().substring(5, 7)) - 1, value.toString().substring(8, 10)));

                            return(
                                <span>{birthDateFormatted.toString()}</span>
                            )
                        }
                    },
                    {
                        Header: "Idade",
                        accessor: "idade",
                        cursor: "pointer"
                    },
                    {
                        Header: "Hobby",
                        accessor: "hobby",
                        cursor: "pointer"
                    }
                ],
            }
        ]
    );

    useEffect(() => {
          (async () => {
          const response = await api.get("/devs/");
          setDevs(response.data);
        })
        
        ();
    }, [loading]);

    const removeDev = async(event) => {
        event.preventDefault();
        setLoading(true);

        Swal.fire({
            title: "Remover desenvolvedor",
            text: `Você tem certeza que deseja remover o desenvolvedor de id: ${event.target.value}?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: "Sim, tenho certeza!",
            cancelButtonText: "Não, cancelar!"
        }).then(async({isConfirmed}) => {
            if (isConfirmed) {
                    await api.delete(`devs/${event.target.value}`)
                    .then(() => {
                        Swal.fire(
                            'Exclusão de desenvolvedor',
                            'Desenvolvedor excluído com sucesso!',
                            'success'
                        )
                    setLoading(false);
                })
                .catch((err) => {
                    Swal.fire(
                        'Exclusão de desenvolvedor',
                        err.response.data,
                        'error'
                    );
                    setLoading(false);
                })
            }
        });
    }

    const editDev = async(event) => {
        navigate(`/devs/edit/${event.target.value}`, { replace: true });
    }

    return(
        <div>
            <h1>Listagem de desenvolvedores</h1>
            <Table columns={columns} data={devs} />
        </div>
    );
}

export default DevsList;