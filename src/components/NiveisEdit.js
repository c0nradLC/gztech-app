import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const NiveisEdit = () => {
    let { nivelId } = useParams();
    const [nivel, setNivel] = useState({});

    useEffect(() => {
        (async () => {
            const response = await api.get(`/niveis/${nivelId}`);
            console.log(response);
            setNivel(response.data);
        })
      ();
    }, []);

    return(
        <>
            <h1>Edição de nível</h1>
        </>
    )
}

export default NiveisEdit;