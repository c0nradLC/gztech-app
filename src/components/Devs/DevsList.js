import React, { useState, useMemo, useEffect } from 'react';
import Pagination from "@material-ui/lab/Pagination";
import api from '../../services/api';
import Swal from 'sweetalert2';
import { Table } from '../Table';
import { useNavigate } from 'react-router-dom';

const DevsList = () => {
    const [devs, setDevs] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);

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

    const pageSizes = [10, 20, 30];


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

    const onChangeSearch = (e) => {
        const search = e.target.value;
        setSearch(search);
    };

    const getRequestParams = (search, page, pageSize) => {
        let params = {};
    
        if (search) {
          params["search"] = search;
        }
    
        if (page) {
          params["page"] = page;
        }
    
        if (pageSize) {
          params["size"] = pageSize;
        }
    
        return params;
    };

    const getDevs = async() => {
        const params = getRequestParams(search, page, pageSize);

        api.get('/devs/', {
            params
        })
        .then((response) => {
            const { devs, total } = response.data;

            setDevs(devs);
            setCount(total);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    useEffect(getDevs, [page, pageSize, loading]);

    const findBySearch = () => {
        setPage(1);
        getDevs();
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    return(
        <div className="form-control">
            <h1>Listagem de desenvolvedores</h1>
            <Table
                columns={columns}
                data={devs}
                filter={{
                    placeholder: "Pesquise um desenvolvedor",
                    value: search,
                    onChange: onChangeSearch,
                    searchOnClick: findBySearch
                }}
            />
            <div className="tablePagination">
                <div className="tablePagination__pageSize">
                    <span>
                        Quantidade de desenvolvedores
                    </span>
                    <select className="form-control" onChange={handlePageSizeChange} value={pageSize}>
                        {pageSizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
                <Pagination
                    className="tablePagination__page"
                    count={Math.ceil(count/pageSize)}
                    page={page}
                    siblingCount={0}
                    boundaryCount={0}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default DevsList;