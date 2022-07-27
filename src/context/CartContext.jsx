import { createContext, useState } from 'react';
export const MiContexto = createContext({});

const CartContext = ({ children }) => {
	const [postIts, setPostIts] = useState(
		JSON.parse(localStorage.getItem('listaNotas')) ?? [
			{ id: 1, note: 'nota 1' },
			{ id: 2, note: 'nota 2' },
			{ id: 3, note: 'nota 3' },
		]
	);

	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');
	const [id, setId] = useState(JSON.parse(localStorage.getItem('id')) ?? 4);
	const [trashPostIts, setTrashPostIts] = useState(JSON.parse(localStorage.getItem('listaPapelera')) ?? []);

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

	const restorePostIt = (id) => {
		const findtrashPostIt = trashPostIts.find((i) => i.id === id);
		const copyPostIts = [...postIts];
		copyPostIts.push(findtrashPostIt);
		const filtertrashPostIts = trashPostIts.filter((i) => i.id !== id);
		setTrashPostIts(filtertrashPostIts);
		setPostIts(copyPostIts);
		localStorage.setItem('listaNotas', JSON.stringify(copyPostIts));
		localStorage.setItem('listaPapelera', JSON.stringify(filtertrashPostIts));
	};

	const deletePostIt = (id) => {
		const filterpostIts = postIts.filter((i) => i.id !== id);
		setPostIts(filterpostIts);
		const copytrashPostIts = [...trashPostIts];
		const post = postIts.find((i) => i.id === id);
		copytrashPostIts.push(post);
		setTrashPostIts(copytrashPostIts);

		localStorage.setItem('listaNotas', JSON.stringify(filterpostIts));
		localStorage.setItem('listaPapelera', JSON.stringify(copytrashPostIts));
	};

	const permanentDeletePostIt = (id) => {
		const filtertrashPostIts = trashPostIts.filter((i) => i.id !== id);
		setTrashPostIts(filtertrashPostIts);
		localStorage.setItem('listaPapelera', JSON.stringify(filtertrashPostIts));
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
