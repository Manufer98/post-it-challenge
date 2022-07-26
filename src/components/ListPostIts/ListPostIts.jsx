import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MiContexto } from '../../context/CartContext';
import './ListPostIts.css';

const ListPostIts = () => {
	const { postIts, deletePostIt, trashPostIts } = useContext(MiContexto);

	const deletePostItButton = (id) => {
		deletePostIt(id);
	};

	const numeroDeNotas = () => {
		return (
			<h4>
				Tienes {postIts.length} nota{postIts.length === 1 ? '' : 's'}
			</h4>
		);
	};

	if (postIts.length !== 0) {
		return (
			<div className="postItContainer">
				<div>{numeroDeNotas()}</div>
				<h1>Notas</h1>

				<div to="/editPostIt" className="postItWrap">
					{postIts.map((element) => (
						<div id="noteContainer" key={element.id}>
							<div className="postIt">{element.note}</div>
							<div className="btnContainer">
								<Link to={{ pathname: '/editPostIt', state: { id: element.id, listNote: element.note } }} className="btn btnLinkList">
									Editar
								</Link>
								<button className="btn" onClick={() => deletePostItButton(element.id)}>
									Borrar
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	} else {
		return (
			<div className="postItContainer">
				<h1>Notas</h1>
				<div to="/editPostIt" className="postItWrap">
					<h3>Lista vacía</h3>
				</div>
			</div>
		);
	}
};

export default ListPostIts;
