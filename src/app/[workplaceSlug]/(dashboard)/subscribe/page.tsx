'use client';

import React, { useState } from 'react';

interface Todo {
  title: string;
  status: boolean;
}

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoName, setTodoName] = useState('');
  const [status, setStatus] = useState(false); // Changed to boolean type

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTodos([...todos, {
      title:todoName,
      status:status
    }])

  };

  console.log(todos);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          placeholder='Todo name'
        />

        <label htmlFor="status">Todo status</label>
        <select
          name="status"
          id="status"
          value={status.toString()} // Convert boolean status to string for select value
          onChange={(e) => setStatus(e.target.value === 'true')}
        >
          <option value="false">False</option>
          <option value="true">True</option>
        </select>

        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
