import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

const StudentForm = ({ student, onSubmit, onCancel }) => {
  const [form, setForm] = useState(student || { name: '', age: '', course: '', year: '' });

  useEffect(() => {
    setForm(student || { name: '', age: '', course: '', year: '' });
  }, [student]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      age: Number(form.age),
      year: Number(form.year)
    });
  };

  return (
    <div>
      <h2>{student ? 'Edit' : 'Add'} Student</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'age', 'course', 'year'].map(field => (
          <div key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label><br />
            <input
              type={field === 'age' || field === 'year' ? 'number' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            /><br />
          </div>
        ))}
        <button type="submit">{student ? 'Update' : 'Add'} Student</button>
        {onCancel && <button type="button" onClick={onCancel}>Back</button>}
      </form>
    </div>
  );
};

const StudentTable = ({ students, onEdit, onDelete }) => (
  <div>
    <h2>Student List</h2>
    <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          {['Name', 'Age', 'Course', 'Year', 'Actions'].map(h => <th key={h}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {students.length > 0 ? (
          students.map(student => (
            <tr key={student._id}>
              {['name', 'age', 'course', 'year'].map(field => <td key={field}>{student[field]}</td>)}
              <td>
                <button onClick={() => onEdit(student._id)}>Edit</button> |{' '}
                <button onClick={() => onDelete(student._id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr><td colSpan="5">No students found.</td></tr>
        )}
      </tbody>
    </table>
  </div>
);

function App() {
  const [view, setView] = useState('list');
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchStudents = () => {
    Axios.get('/students')
      .then(res => setStudents(res.data))
      .catch(() => alert('Error fetching students'));
  };

  useEffect(fetchStudents, []);

  const handleAdd = (data) => {
    Axios.post('/students', data)
      .then(() => {
        alert('Student added successfully');
        fetchStudents();
      })
      .catch(() => alert('Error adding student'));
  };

  const handleUpdate = (data) => {
    Axios.put(`/students/${editId}`, data)
      .then(() => {
        alert('Student updated successfully');
        setView('list');
        fetchStudents();
      })
      .catch(() => alert('Error updating student'));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this student?')) {
      Axios.delete(`/students/${id}`)
        .then((res) => {
          if (res.data.message === 'Deleted') {
            alert('Student deleted successfully');
            fetchStudents();
          } else {
            alert('Error deleting student');
          }
        })
        .catch(() => alert('Error deleting student'));
    }
  };

  return (
    <div className="App">
      <h1>Student Management</h1>
      {view === 'list' && (
        <>
          <StudentForm onSubmit={handleAdd} />
          <StudentTable
            students={students}
            onEdit={(id) => { setEditId(id); setView('edit'); }}
            onDelete={handleDelete}
          />
        </>
      )}
      {view === 'edit' && (
        <StudentForm
          student={students.find(s => s._id === editId)}
          onSubmit={handleUpdate}
          onCancel={() => setView('list')}
        />
      )}
    </div>
  );
}

export default App;
