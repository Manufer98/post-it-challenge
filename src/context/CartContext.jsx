import { createContext, useState } from 'react';
export const MiContexto = createContext({});

const CartContext = ({ children }) => {
	const [postIts, setPostIts] = useState(
		JSON.parse(localStorage.getItem('listaNotas')) || [
			{ id: 1, note: 'nota 1' },
			{ id: 2, note: 'nota 2' },
			{ id: 3, note: 'nota 3' },
		]
	);

	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');
	const [id, setId] = useState(JSON.parse(localStorage.getItem('id')) || 4);
	const [trashPostIts, setTrashPostIts] = useState(JSON.parse(localStorage.getItem('listaPapelera')) || []);

	const addPostIt = (note) => {
		const postIt = { id, note };

		const copyPostIts = [...postIts];
		copyPostIts.push(postIt);
		setPostIts(copyPostIts);
		setId(id + 1);

		localStorage.setItem('id', id);
		localStorage.setItem('listaNotas', JSON.stringify(copyPostIts));
	};

	const editPostIt = (postIt) => {
		const { id, note } = postIt;
		const index = postIts.findIndex((i) => i.id === +id);
		postIts[index].note = note;
		localStorage.setItem('listaNotas', JSON.stringify(postIts));
	};

	const restorePostIt = (postIt) => {
		const { id } = postIt;
		const index = trashPostIts.findIndex((i) => i.id === id);
		if (index !== -1) {
			const copyPostIts = [...postIts];
			const copytrashPostIts = [...trashPostIts];
			copytrashPostIts.splice(index, 1);
			copyPostIts.push(postIt);
			setPostIts(copyPostIts);
			setTrashPostIts(copytrashPostIts);
			localStorage.setItem('listaNotas', JSON.stringify(copyPostIts));
			localStorage.setItem('listaPapelera', JSON.stringify(copytrashPostIts));
		}
	};

	const deletePostIt = (postIt) => {
		const { id } = postIt;
		const index = postIts.findIndex((i) => i.id === id);

		if (index !== -1) {
			const copytrashPostIts = [...trashPostIts];
			const copyPostIts = [...postIts];
			copyPostIts.splice(index, 1);
			setPostIts(copyPostIts);
			copytrashPostIts.push(postIt);
			setTrashPostIts(copytrashPostIts);
			localStorage.setItem('listaNotas', JSON.stringify(copyPostIts));
			localStorage.setItem('listaPapelera', JSON.stringify(copytrashPostIts));
		}
	};

	const permanentDeletePostIt = (postIt) => {
		const { id } = postIt;
		const index = trashPostIts.findIndex((i) => i.id === id);
		if (index !== -1) {
			const copytrashPostIts = [...trashPostIts];
			copytrashPostIts.splice(index, 1);
			setTrashPostIts(copytrashPostIts);
			localStorage.setItem('listaPapelera', JSON.stringify(copytrashPostIts));
		}
	};

	const emptyTrashCan = () => {
		setTrashPostIts([]);
		localStorage.setItem('listaPapelera', JSON.stringify([]));
	};

	return (
		<MiContexto.Provider value={{ message, setMessage, success, setSuccess, editPostIt, emptyTrashCan, permanentDeletePostIt, restorePostIt, addPostIt, postIts, deletePostIt, trashPostIts }}>
			{children}
		</MiContexto.Provider>
	);
};

export default CartContext;
