import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const API_URL = 'https://43.205.133.116/';

function App() {
  const [students, setStudents] = useState([]);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', course: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await fetch(`${API_URL}/update/${currentStudentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch(`${API_URL}/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      fetchStudents();
      resetForm();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const editStudent = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      const student = await response.json();
      setFormData({ name: student.name, email: student.email, course: student.course });
      setCurrentStudentId(id);
      setIsEditing(true);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

  const deleteStudent = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
          fetchStudents();
          Swal.fire(
            'Deleted!',
            'The student record has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting student:', error);
          Swal.fire(
            'Error!',
            'There was an error deleting the student.',
            'error'
          );
        }
      }
    });
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', course: '' });
    setCurrentStudentId(null);
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Student Management System</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">{isEditing ? 'Edit Student' : 'Add Student'}</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="course" className="form-label">Course</label>
                  <input
                    type="text"
                    className="form-control"
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Update Student' : 'Add Student'}
                </button>
                {isEditing && (
                  <button type="button" className="btn btn-secondary ms-2" onClick={resetForm}>
                    Cancel
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Students</div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.course}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => editStudent(student._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteStudent(student._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
