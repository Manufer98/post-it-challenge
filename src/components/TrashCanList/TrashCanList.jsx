import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MiContexto } from '../../context/CartContext';
import './TrashCanList.css';

function TrashCanList() {
	const { permanentDeletePostIt, restorePostIt, postIts, deletePostIt, trashPostIts } = useContext(MiContexto);
	const navigate = useNavigate();

	const restorePostItButton = (id) => {
		try {
			restorePostIt(id);

			if (trashPostIts.length === 1) {
				navigate('/');
			}
		} catch (error) {
			//addToast('Ups, Algo salió mal', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 1500 });
		}
	};

	const permanentDeletePostItButton = (id) => {
		let ask = window.confirm('Estas seguro que quieres eliminarla de forma permanente?');

		if (ask === true) {
			try {
				permanentDeletePostIt(id);
				//addToast('PostIt eliminado con éxito!', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 1500 });
				if (trashPostIts.length === 1) {
					navigate('/');
				}
			} catch (error) {
				//addToast('Ups, Algo salió mal', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 1500 });
			}
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
							<button className="btn btnTrashCanList" onClick={() => restorePostItButton(element.id)}>
								Restaurar
							</button>
							<button className="btn btnTrashCanList" onClick={() => permanentDeletePostItButton(element.id)}>
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
