import React, { useContext, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}
const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

const Receta = ({ receta }) => {
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { recetaInfo, guardarIdreceta, guardarReceta } = useContext(ModalContext);

    const { strDrink, strDrinkThumb, idDrink } = receta;

    const mostrarIngredientes = recetaInfo => {
        let ingredientes = [];
        for (let i = 1; i < 16; i++) {
            if (recetaInfo[`strIngredient${i}`]) {
                ingredientes.push(
                    <li key={i}>
                        {recetaInfo[`strIngredient${i}`]} {recetaInfo[`strMeasure${i}`]}
                    </li>
                );
            }
        }
        return ingredientes;
    };

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{strDrink}</h2>
                <img className="card-img-top" src={strDrinkThumb} alt={strDrink} />
                <div className="card-body">
                    <button
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            guardarIdreceta(idDrink);
                            handleOpen();
                        }}
                    >
                        Ver receta
                    </button>
                    <Modal
                        open={open}
                        onClose={() => {
                            guardarIdreceta(null);
                            guardarReceta({});
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{recetaInfo.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>{recetaInfo.strInstructions}</p>
                            <img className="img-fluid my-4" src={recetaInfo.strDrinkThumb} alt={recetaInfo.strDrink} />
                            <h3>Ingredientes y cantidades</h3>
                            <ul>{mostrarIngredientes(recetaInfo)}</ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Receta;
