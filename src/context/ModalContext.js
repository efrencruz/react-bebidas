import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = props => {
    const [idreceta, guardarIdreceta] = useState(null);
    const [recetaInfo, guardarReceta] = useState({});

    useEffect(() => {
        if (!idreceta) return;

        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
        const fun = async () => {
            const resultado = await axios(url);
            guardarReceta(resultado.data.drinks[0]);
        };
        fun();
    }, [idreceta]);

    return (
        <ModalContext.Provider value={{ recetaInfo, guardarIdreceta, guardarReceta }}>
            {props.children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
