import React from "react";
import "./Todos.css";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { nanoid } from "nanoid";

const todos = [
  { id: nanoid(), content: "rent", isChecked: false },
  { id: nanoid(), content: "car", isChecked: false },
  { id: nanoid(), content: "house", isChecked: false },
];
const Todos = () => {
  const [data, setData] = useState(todos);
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(0);
  let count = 0;

  data.forEach((item) => {
    if (item.isChecked) {
      count++;
    }
  });

  const deleteItem = (id) => {
    const newTodo = data.filter((item) => item.id !== id);
    setData(newTodo);
  };
  const editItem = (id) => {
    setIsEditing(true);
    const getValue = data.find((item) => item.id === id).content;
    setValue(getValue);
    setEditId(id);
  };

  const removeList = () => {
    const newData = data.filter((item) => item.isChecked === false);
    setData(newData);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setValue("");
    const newData = data.map((item) => {
      if (item.id === editId) {
        return { ...item, content: value };
      }
      return item;
    });
    setData(newData);
    setIsEditing(false);
    setEditId(0);
  };

  const handleChecked = (id) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });
    setData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      setData([{ id: nanoid(), content: value, isChecked: false }, ...data]);
      setValue("");
    }
  };

  return (
    <div className="Todos">
      <form className="todo-form">
        <input
          type="text"
          name="content"
          className="todo-input"
          placeholder="Write your todo"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        {isEditing ? (
          <button type="submit" className="todo-btn" onClick={handleEdit}>
            edit
          </button>
        ) : (
          <button type="submit" className="todo-btn" onClick={handleSubmit}>
            add
          </button>
        )}
      </form>
      <ul className="todo-list">
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <li className="todo-item" key={nanoid()}>
                <div>
                  <input
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => handleChecked(item.id)}
                  />
                  <label
                    className={
                      item.isChecked ? "todo-content edContent" : "todo-content  "
                    }
                  >
                    {item.content}
                  </label>
                </div>

                <div className="btn-box">
                  <button className="btn edit-btn" onClick={() => editItem(item.id)}>
                    <FaPencilAlt color="gray" />
                  </button>
                  <button className="btn del-btn" onClick={() => deleteItem(item.id)}>
                    <AiOutlineClose color="gray" />
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <h3 className="message">Hali todo qo'shilmagan</h3>
        )}
      </ul>
      <div className="todos-bottom-box">
        <p
          className="indicator"
          style={{ "--calcPersentage": (count / data.length) * 100 + "%" }}
        >
          {count} of {data.length} tasks done
        </p>
        <button className="delete-completed-btn" onClick={removeList}>
          Remove checked
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
};

export default Todos;
