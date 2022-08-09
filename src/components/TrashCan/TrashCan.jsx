import { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import empty_bin from '../../assets/trashCan/recycle_bin_empty_small.png';
import { MiContexto } from '../../context/CartContext';

import full_bin from '../../assets/trashCan/recycle_bin_full_small.png';
import './TrashCan.css';

import { React, useState } from 'react';
import toast from 'react-hot-toast';

function TrashCan() {
	const { emptyTrashCan, trashPostIts } = useContext(MiContexto);
	const location = useLocation();
	const navigate = useNavigate();
	const [button, setButton] = useState('Crear Post It');
	const [clearTrashCanDisplay, setClearTrashCan] = useState(false);

	useEffect(() => {
		if (location.pathname === '/') {
			setButton('Crear Post It');
			setClearTrashCan(false);
		} else if (location.pathname === '/deletedPostIts') {
			setClearTrashCan(true);
			setButton('Atras');
		} else {
			setClearTrashCan(false);
			setButton('Atras');
		}
	}, [location]);

	const goToTrashCan = (e) => {
		if (trashPostIts.length === 0) {
			e.preventDefault();
		}
	};

	const switchBackAdd = (e) => {
		if (button === 'Atras') {
			e.preventDefault();
			navigate('/');
		}
	};

	const clearTrashCanButton = () => {
		let ask = window.confirm('Estas seguro que quieres vaciar la papelera de forma permanente?');
		if (ask) {
			try {
				emptyTrashCan();

				navigate('/');
				toast.success('Papelera vaciada con éxito!');
			} catch (error) {}
		}
	};
	return (
		<div className="trashCanContainer">
			<Link to="/addPostIt" onClick={switchBackAdd} className="btnAdd btnEdit linkBtn ">
				{button}
			</Link>
			{clearTrashCanDisplay ? (
				<button className="btn" onClick={clearTrashCanButton}>
					Vaciar Papelera
				</button>
			) : null}
			<Link to="/deletedPostIts" className="TrashCan" onClick={goToTrashCan}>
				<img src={trashPostIts.length === 0 ? empty_bin : full_bin} alt="trash_bin" />
			</Link>
		</div>
	);
}
export default TrashCan;
