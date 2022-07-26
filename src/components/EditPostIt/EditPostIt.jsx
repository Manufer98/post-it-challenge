import React, { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import './EditPostIt.css';

const EditPostIt = () => {
	//const dispatch = useDispatch();
	const location = useLocation();
	//const { id, listNote } = location.state || { id: '', listNote: '' };
	const [note, setNote] = useState(listNote);
	//const { addToast } = useToasts();

	const formNote = (e) => {
		const postItDispatch = {
			id,
			note,
		};

		if (note) {
			try {
				//dispatch(editPostIt(postItDispatch));
				//addToast('PostIt editado con éxito!', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 });
			} catch (error) {
				//addToast('Ups, Algo salió mal', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 });
			}
		} else {
			//e.preventDefault();
			//addToast('Ups, Debes de completar el campo nota', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 });
		}
	};

	const handleChange = (e) => {
		setNote(e.target.value);
	};

	return (
		<div className="editContainer">
			<div className="editForm">
				<h1>Edita tu Post it</h1>
				<textarea maxLength="200" onChange={handleChange} value={note}></textarea>
				<Link to="/" className="btnEdit linkBtn">
					Cancelar
				</Link>
				<Link to="/" className="btnEdit linkBtn" onClick={formNote}>
					Guardar
				</Link>
			</div>
		</div>
	);
};

export default EditPostIt;
