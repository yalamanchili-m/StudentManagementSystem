import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function AddStudent() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/students', {
      name,
      age: Number(age),
      course,
      year: Number(year),
    })
      .then(() => {
        alert('Student added successfully');
        navigate('/students');
      })
      .catch(() => {
        alert('Error adding student');
      });
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br />
        <label>Age:</label><br />
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required /><br />
        <label>Course:</label><br />
        <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} required /><br />
        <label>Year:</label><br />
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required /><br /><br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
