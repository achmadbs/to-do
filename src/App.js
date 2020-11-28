import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestAPI } from '../src/redux/actions/actions';
import './App.css';

export default function App() {
  const [show, setShow] = useState(false);
  const [todo, setTodo] = useState({
    name: '',
    description: '',
  });
  const [todoList, setTodoList] = useState([]);
  const [complete, setComplete] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((s) => s);
  console.log(data);

  useEffect(() => {
    dispatch(requestAPI());
  }, []);

  const handleInputChange = (name) => (e) => {
    const { value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleAddTodo = () => {
    setTodoList([...todoList, todo]);
    setTodo({ name: '', description: '' });
    setShow(false);
  };

  const handleDeleteList = (index) => () => {
    const newList = todoList;
    newList.splice(index, 1);
    setTodoList([...newList]);
  };

  const handleStatusChange = () => setComplete(true);

  const handleShowModal = () => setShow(true);

  return isLoading ? (
    <p>...Loading</p>
  ) : (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <h2 onClick={handleShowModal}>+</h2>
      </header>
      <p>{data.quote}</p>
      <Modal
        show={show}
        onClose={() => setShow(false)}
        handleChange={(name) => handleInputChange(name)}
        handleSubmit={handleAddTodo}
        val={todoList}
      />
      <TodoList
        list={todoList}
        status={complete}
        show={handleShowModal}
        handleDelete={(index) => handleDeleteList(index)}
        handleStatus={handleStatusChange}
      />
    </div>
  );
}

const Modal = ({ show, onClose, handleChange, handleSubmit, val }) => {
  return (
    show && (
      <div className="Modal">
        <div className="Modal-Content">
          <label onClick={onClose}>x</label>
          <p>Name</p>
          <input onChange={handleChange('name')} value={val.name} />
          <p>Description</p>
          <textarea
            onChange={handleChange('description')}
            value={val.description}
          />
          <div className="button">
            <button onClick={handleSubmit}>Add todo</button>
          </div>
        </div>
      </div>
    )
  );
};

const TodoList = ({ list, handleDelete, status, handleStatus }) => {
  const classes = status ? 'list'.concat(' complete') : 'list';
  return list?.map((val, i) => (
    <div className={classes} key={i}>
      <div>
        <p>{val.name}</p>
        <div>
          <button onClick={handleDelete(i)}>delete</button>
          <button onClick={handleStatus}>done</button>
        </div>
      </div>
    </div>
  ));
};
