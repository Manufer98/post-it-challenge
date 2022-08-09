import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { MiContexto } from '../../context/CartContext';
import './AddPostIt.css';

const AddPostIt = () => {
	const [note, setNote] = useState();

	const { addPostIt } = useContext(MiContexto);
	const navigate = useNavigate();
	const NewNote = (e) => {
		if (note) {
			addPostIt(note);
			navigate('/');
			toast.success('Nota creada!');
		} else {
			e.preventDefault();
			toast.error('Ups, Debes de completar el campo nota');
		}
	};

	const handleChange = (e) => {
		setNote(e.target.value);
	};
	return (
		<div className="editContainer">
			<div className="editForm">
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
