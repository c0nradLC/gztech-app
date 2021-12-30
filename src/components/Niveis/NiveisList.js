import React, { useState, useMemo, useEffect } from 'react';
import Pagination from "@material-ui/lab/Pagination";
import api from '../../services/api';
import Swal from 'sweetalert2';
import { Table } from '../Table';
import { useNavigate } from 'react-router-dom';

const NiveisList = () => {
    const [niveis, setNiveis] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);

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
                        cursor: 'pointer'
                    },
                    {
                        Header: "Nível",
                        accessor: "nivel",
                        cursor: 'pointer'
                    },
                    {
                        Header: "Quantidade de desenvolvedores",
                        accessor: "qtdDevs",
                        cursor: "pointer"
                    }
                ],
            }
        ]
    );

    const pageSizes = [3, 6, 9];

    const removeNivel = async(event) => {
        event.preventDefault();
        setLoading(true);

        Swal.fire({
            title: "Remover nível",
            text: `Você tem certeza que deseja remover o nível de id: ${event.target.value}?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: "Sim, tenho certeza!",
            cancelButtonText: "Não, cancelar!"
        }).then(async({isConfirmed}) => {
            if (isConfirmed) {
                await api.delete(`niveis/${event.target.value}`)
                .then((response) => {
                    if (response.status == 204) {
                        Swal.fire(
                            'Exclusão de nível',
                            'Nível excluído com sucesso!',
                            'success'
                        )
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    Swal.fire(
                        'Exclusão de nível',
                        err.response.data,
                        'warning'
                    );
                    setLoading(false);
                });
            }
        });
    }

    const editNivel = async(event) => {
        navigate(`/niveis/edit/${event.target.value}`, { replace: true });
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

    const getNiveis = async() => {
        const params = getRequestParams(search, page, pageSize);

        api.get('/niveis/', {
            params
        })
        .then((response) => {
            const { niveis, total } = response.data;

            setNiveis(niveis);
            setCount(total);

            console.log(response.data);
        })
        .catch((e) => {
            console.log(e);
        });
    }

    useEffect(getNiveis, [page, pageSize, loading]);

    const findBySearch = () => {
        setPage(1);
        getNiveis();
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
    };

    return(
        <div>
            <h1>Listagem de níveis</h1>
            <Table
                columns={columns}
                data={niveis}
                filter={{
                    columnName: "nivel",
                    placeholder: "Pesquise um nível",
                    value: search,
                    onChange: onChangeSearch,
                    searchOnClick: findBySearch
                }}
            />
            <select onChange={handlePageSizeChange} value={pageSize}>
                {pageSizes.map((size) => (
                <option key={size} value={size}>
                    {size}
                </option>
                ))}
            </select>
            <Pagination
                count={Math.ceil(count/pageSize)}
                page={page}
                siblingCount={0}
                boundaryCount={0}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
            />
        </div>
    );
}

export default NiveisList;