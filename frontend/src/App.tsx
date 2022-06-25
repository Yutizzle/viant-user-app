import './App.css';
import { List } from './List';
import { AddUser } from './AddUser';
import { EditUser } from './EditUser';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="add" element={<AddUser />} />
        <Route path="edit" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
