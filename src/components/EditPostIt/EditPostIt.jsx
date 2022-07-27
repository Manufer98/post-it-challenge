import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MiContexto } from '../../context/CartContext';
import './EditPostIt.css';

const EditPostIt = () => {
	const { id } = useParams();
	const { setMessage, setSuccess, postIts, editPostIt } = useContext(MiContexto);
	const [note, setNote] = useState(postIts.find((i) => i.id === +id).note);
	const [load, setLoad] = useState(false);

	const navigate = useNavigate();
	const formNote = () => {
		const postItDispatch = {
			id,
			note,
		};

		if (note) {
			try {
				editPostIt(postItDispatch);
				toast.dismiss();
				setLoad(false);
				setSuccess(true);
				setMessage('Post it editado con exito!');

				navigate('/');
			} catch (error) {
				//addToast('Ups, Algo salió mal', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 });
			}
		} else {
			//e.preventDefault();
			setLoad(true);
			toast.error('Ups, Debes de completar el campo nota');
			//addToast('Ups, Debes de completar el campo nota', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 });
		}
	};

	const handleChange = (e) => {
		setNote(e.target.value);
	};

	return (
		<div className="editContainer">
			<div className="editForm">
				{load ? <Toaster /> : ''}

				<h1>Edita tu Post it</h1>
				<textarea maxLength="200" onChange={handleChange} value={note}></textarea>
				<Link to="/" className="btnEdit linkBtn">
					Cancelar
				</Link>
				<button className="btnEdit linkBtn" onClick={formNote}>
					Guardar
				</button>
			</div>
		</div>
	);
};

export default EditPostIt;
