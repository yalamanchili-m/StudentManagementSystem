import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    Axios.get('/students/' + id)
      .then((response) => {
        const student = response.data;
        setName(student.name);
        setAge(student.age);
        setCourse(student.course);
        setYear(student.year);
      })
      .catch(() => {
        alert('Error fetching student data');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.put('/students/' + id, {
      name,
      age: Number(age),
      course,
      year: Number(year),
    })
      .then(() => {
        alert('Student updated successfully');
        navigate('/students');
      })
      .catch(() => {
        alert('Error updating student');
      });
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br />
        <label>Age:</label><br />
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required /><br />
        <label>Course:</label><br />
        <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} required /><br />
        <label>Year:</label><br />
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required /><br /><br />
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
}

export default EditStudent;
