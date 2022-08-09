import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MiContexto } from '../../context/CartContext';
import './TrashCanList.css';

function TrashCanList() {
	const { permanentDeletePostIt, restorePostIt, trashPostIts } = useContext(MiContexto);
	const navigate = useNavigate();

	const restorePostItButton = (postIt) => {
		try {
			restorePostIt(postIt);

			toast.success('Nota Recuperada');

			if (trashPostIts.length === 1) {
				navigate('/');
			}
		} catch (error) {}
	};

	const permanentDeletePostItButton = (postIt) => {
		let ask = window.confirm('Estas seguro que quieres eliminarla de forma permanente?');

		if (ask === true) {
			try {
				permanentDeletePostIt(postIt);

				toast.success('Nota eliminada');

				if (trashPostIts.length === 1) {
					navigate('/');
				}
			} catch (error) {}
		}
	};

	const numeroDeNotas = () => {
		if (trashPostIts.length === 1) {
			return <h4>Tienes {trashPostIts.length} nota en la papelera</h4>;
		} else {
			return <h4>Tienes {trashPostIts.length} notas en la papelera</h4>;
		}
	};
	return (
		<div className="postItContainer">
			<div>{numeroDeNotas()}</div>

			<h1>Papelera</h1>
			<div to="/editPostIt" className="postItWrap">
				{trashPostIts.map((element) => (
					<div id="noteContainer" key={element.id}>
						<div className="postIt">{element.note}</div>
						<div className="btnContainer">
							<button className="btn btnTrashCanList" onClick={() => restorePostItButton(element)}>
								Restaurar
							</button>
							<button className="btn btnTrashCanList" onClick={() => permanentDeletePostItButton(element)}>
								Borrar
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default TrashCanList;
