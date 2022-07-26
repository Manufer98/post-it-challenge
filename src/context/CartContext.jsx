import { createContext, useState } from 'react';
export const MiContexto = createContext({});

const CartContext = ({ children }) => {
	const [postIts, setPostIts] = useState([
		{ id: 1, note: 'nota 1' },
		{ id: 2, note: 'nota 2' },
		{ id: 3, note: 'nota 3' },
	]);
	const [id, setId] = useState(4);
	const [trashPostIts, setTrashPostIts] = useState([]);

	const addPostIt = (note) => {
		const postIt = { id, note };

		const copyPostIts = [...postIts];
		copyPostIts.push(postIt);
		setPostIts(copyPostIts);
		setId(id + 1);
	};

	const restorePostIt = (id) => {
		const findtrashPostIt = trashPostIts.find((i) => i.id === id);
		const copyPostIts = [...postIts];
		copyPostIts.push(findtrashPostIt);
		const filtertrashPostIts = trashPostIts.filter((i) => i.id !== id);
		setTrashPostIts(filtertrashPostIts);
		setPostIts(copyPostIts);
	};

	const deletePostIt = (id) => {
		const filterpostIts = postIts.filter((i) => i.id !== id);
		setPostIts(filterpostIts);
		const copytrashPostIts = [...trashPostIts];
		const post = postIts.find((i) => i.id === id);
		copytrashPostIts.push(post);
		setTrashPostIts(copytrashPostIts);
	};

	const permanentDeletePostIt = (id) => {
		const filtertrashPostIts = trashPostIts.filter((i) => i.id !== id);
		setTrashPostIts(filtertrashPostIts);
	};

	const emptyTrashCan = () => {
		setTrashPostIts([]);
	};

	return <MiContexto.Provider value={{ emptyTrashCan, permanentDeletePostIt, restorePostIt, addPostIt, postIts, deletePostIt, trashPostIts }}>{children}</MiContexto.Provider>;
};

export default CartContext;
