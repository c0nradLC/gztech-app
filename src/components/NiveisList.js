import React, { useState, useMemo, useEffect } from 'react';
import api from '../services/api';
import Swal from 'sweetalert2';
import { Table } from '../components/Table';
import { useNavigate } from 'react-router-dom';

const NiveisList = () => {
    const [niveis, setNiveis] = useState([]);
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
                                    <button className="btn btn-table fa fa-trash" value={row.original.id} onClick={(event) => removeNivel(event)}>
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
                                    <button className="btn btn-table fa fa-pencil" value={row.original.id} onClick={(event) => editNivel(event)}>
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
                Header: "Nível",
                textAlign: "center",
                columns: [
                    {
                        Header: "Id",
                        accessor: "id",
                        maxWidth: 1,
                        width: '5%',
                    },
                    {
                        Header: "Nível",
                        accessor: "nivel"
                    },
                ],
            }
        ]
    );

    useEffect(() => {
          (async () => {
          const response = await api.get("/niveis/");
          setNiveis(response.data);
        })
        
        ();
    }, [loading]);

    const removeNivel = async(event) => {
        event.preventDefault();
        setLoading(true);

        try {
            Swal.fire({
                title: "Remover nível",
                text: `Você tem certeza que deseja remover o nível de id: ${event.target.value}?`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: "Sim, tenho certeza!",
                cancelButtonText: "Não, cancelar!"
            }).then(({isConfirmed}) => {
                if (isConfirmed) {
                    Swal.fire(
                        'Exclusão de nível',
                        'Nível excluído com sucesso!',
                        'success'
                    ).then(async() => {
                        console.log("teste2");
                        await api.delete(`niveis/${event.target.value}`);
                        setLoading(false);
                    });
                }
            });

        } catch(err) {
            if (err.response.status == 400) {
                Swal.fire(
                    'Exclusão de nível',
                    err.response.data,
                    'error'
                );
            }
            setLoading(false);
        }
    }

    const editNivel = async(event) => {
        navigate(`/niveis/edit/${event.target.value}`, { replace: true });
    }

    return(
        <div>
            <h1>Listagem de níveis</h1>
            <Table columns={columns} data={niveis} />
        </div>
    );
}

export default NiveisList;