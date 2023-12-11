import React, { useState } from 'react';
import '../src/App.css';

const citiesAndStates = {
  Karnataka: ['Mangaluru', 'Bengaluru', 'Kolar'],
  Maharashtra: ['Pune', 'Mumbai', 'Thane'],
};

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    state: '',
  });

  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Update existing user
      const updatedUsers = [...users];
      updatedUsers[editIndex] = formData;
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      // Add new user
      setUsers((prevUsers) => [...prevUsers, formData]);
    }

    // Clear form data
    setFormData({ name: '', mobile: '', city: '', state: '' });
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>Good Evening!</h1>
    <div class = "container1">
      <h1>User Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Mobile Number:
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
        </label>
        <br />
        <label>
          State:
          <select name="state" value={formData.state} onChange={handleChange} required>
            <option value="" disabled>Select State</option>
            {Object.keys(citiesAndStates).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          City:
          <select name="city" value={formData.city} onChange={handleChange} required>
            <option value="" disabled>Select City</option>
            {formData.state &&
              citiesAndStates[formData.state].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </label>
        <br />
        <button type="submit">{editIndex !== null ? 'Update' : 'Submit'}</button>
      </form>

      <h2 class='reg-user-heading'>Registered Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>State</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.mobile}</td>
              <td>{user.state}</td>
              <td>{user.city}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default App;
