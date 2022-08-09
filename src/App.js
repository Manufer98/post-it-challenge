import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import AddPostIt from "./components/AddPostIt/AddPostIt";
import EditPostIt from "./components/EditPostIt/EditPostIt";
import ListPostIts from "./components/ListPostIts/ListPostIts";
import TrashCan from "./components/TrashCan/TrashCan";
import TrashCanList from "./components/TrashCanList/TrashCanList";
import CartContext from "./context/CartContext";
function App() {
  return (
    <div className="App">

      <CartContext>
        <BrowserRouter>
        <Toaster /> 
         <TrashCan/>
        <Routes>
          <Route path="/" element={<ListPostIts />} />
          <Route path="/deletedPostIts" element={<TrashCanList />} />
          <Route path="/addPostIt" element={<AddPostIt />} />
          <Route path="/editPostIt/:id" element={<EditPostIt />} /> 
          </Routes>
        </BrowserRouter>
      </CartContext>
    </div>
  );
}

export default App;
