import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MiContexto } from '../../context/CartContext';
import './EditPostIt.css';

const EditPostIt = () => {
	const { id } = useParams();
	const { postIts, editPostIt } = useContext(MiContexto);

	const [note, setNote] = useState(postIts.find((i) => i.id === +id).note);

	const navigate = useNavigate();

	const formNote = () => {
		const postItDispatch = {
			id,
			note,
		};

		if (note) {
			try {
				editPostIt(postItDispatch);
				toast.success('Nota editada con éxito!');
				/*
				setLoad(false);
				setSuccess(true);
				setMessage('Nota editada con éxito!');
				*/

				navigate('/');
			} catch (error) {}
		} else {
			/* setLoad(true); */
			toast.error('Ups, Debes de completar el campo nota');
		}
	};

	const handleChange = (e) => {
		setNote(e.target.value);
	};

	return (
		<div className="editContainer">
			<div className="editForm">
				{/* {load ? <Toaster /> : ''} */}

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
