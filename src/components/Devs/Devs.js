import React from 'react';
import {Link} from 'react-router-dom';

const Devs = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to='register'>Cadastrar desenvolvedor</Link>
                </li>
                <li>
                    <Link to='list'>Listagem de desenvolvedores</Link>
                </li>
            </ul>
        </div>
    )
};

export default Devs;