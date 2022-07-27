import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { MiContexto } from '../../context/CartContext';
import './AddPostIt.css';

const AddPostIt = () => {
	const [note, setNote] = useState();
	const [load, setLoad] = useState(false);

	const { setMessage, setSuccess, addPostIt } = useContext(MiContexto);
	const navigate = useNavigate();
	const NewNote = (e) => {
		if (note) {
			addPostIt(note);
			navigate('/');
			setSuccess(true);
			setMessage('Post it creado!');
			toast.dismiss();
		} else {
			e.preventDefault();
			setLoad(true);
			toast.error('Ups, Debes de completar el campo nota');
		}
	};

	const handleChange = (e) => {
		setNote(e.target.value);
	};
	return (
		<div className="editContainer">
			<div className="editForm">
				{load ? <Toaster /> : ''}
				<h1>Agrega tu post it!</h1>
				<textarea maxLength="200" onChange={handleChange} value={note}></textarea>
				<Link to="/" className="btnEdit linkBtn">
					Cancelar
				</Link>
				<button className="btnEdit linkBtn" onClick={NewNote}>
					Guardar
				</button>
			</div>
		</div>
	);
};

export default AddPostIt;
