import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import AddPostIt from "./components/AddPostIt/AddPostIt";
import ListPostIts from "./components/ListPostIts/ListPostIts";
import TrashCan from "./components/TrashCan/TrashCan";
import TrashCanList from "./components/TrashCanList/TrashCanList";
import CartContext from "./context/CartContext";

function App() {
  return (
    <div className="App">

    <CartContext>
      <BrowserRouter>
         <TrashCan/>
        <Routes>

        <Route path="/" element={<ListPostIts />} />
        <Route path="/deletedPostIts" element={<TrashCanList />} />
        <Route path="/addPostIt" element={<AddPostIt />} />
        {/* <Route path="editPostIt" element={<EditPostIt />} /> */}
        </Routes>

        </BrowserRouter>

        </CartContext>
      
    </div>
  );
}

export default App;
