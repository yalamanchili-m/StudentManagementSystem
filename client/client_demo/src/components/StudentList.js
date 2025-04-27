import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    Axios.get('/students')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        alert('Error fetching students');
      });
  };

  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      Axios.delete(`/students/${id}`)
        .then(() => {
          alert('Student deleted successfully');
          fetchStudents();
        })
        .catch(() => {
          alert('Error deleting student');
        });
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.course}</td>
              <td>{student.year}</td>
              <td>
                <Link to={`/edit-student/${student._id}`}>Edit</Link> |{' '}
                <button onClick={() => deleteStudent(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="5">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
