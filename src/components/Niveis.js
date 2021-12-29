import React from 'react';
import {Link} from 'react-router-dom';

const Niveis = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to='register'>Cadastrar nível</Link>
                </li>
                <li>
                    <Link to='list'>Listagem de níveis</Link>
                </li>
            </ul>
        </div>
    )
};

export default Niveis;