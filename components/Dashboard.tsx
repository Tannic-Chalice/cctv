import React, { useState } from 'react';
import styles from '../styles/Dashboard.module.css';
import { supabase } from '../lib/supabaseClient';

type Employee = {
  Emp_id: number;
  Name: string;
  'Date of Joining': string;
  Email: string;
  Phone: string;
};

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Add Employee state
  const [name, setName] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addMessage, setAddMessage] = useState('');

  // View Employee state
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [viewLoading, setViewLoading] = useState(false);

  // Delete Employee state
  const [empIdToDelete, setEmpIdToDelete] = useState('');
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [viewDeleteError, setViewDeleteError] = useState('');

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
      if (section === 'view') fetchEmployees();
    }
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Add Employee handler
  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddMessage('');

    if (!name || !dateOfJoining || !email || !phone) {
      setAddMessage('Please fill in all fields.');
      return;
    }

    const { error } = await supabase.from('EMP').insert([
      {
        Name: name,
        'Date of Joining': dateOfJoining,
        Email: email,
        Phone: phone,
      },
    ]);

    if (error) {
      setAddMessage('Error adding employee: ' + error.message);
    } else {
      setAddMessage('Employee added successfully!');
      setName('');
      setDateOfJoining('');
      setEmail('');
      setPhone('');
    }
  };

  const fetchEmployees = async () => {
    setViewLoading(true);
    const { data, error } = await supabase.from('EMP').select('*').order('Emp_id', { ascending: true });

    if (error) {
      alert('Error fetching employees: ' + error.message);
      setEmployees([]);
    } else {
      setEmployees((data as Employee[]) || []);
    }
    setViewLoading(false);
  };

  const handleViewEmployeeToDelete = async () => {
    setViewDeleteError('');
    setDeleteMessage('');
    setEmployeeToDelete(null);

    const empIdNumber = Number(empIdToDelete);
    if (isNaN(empIdNumber)) {
      setViewDeleteError('Emp_id must be a number.');
      return;
    }

    const { data, error } = await supabase
      .from('EMP')
      .select('*')
      .eq('Emp_id', empIdNumber)
      .single();

    if (error || !data) {
      setViewDeleteError('Employee not found.');
    } else {
      setEmployeeToDelete(data as Employee);
    }
  };

  const handleDeleteEmployee = async () => {
    if (!employeeToDelete) return;

    const { error } = await supabase
      .from('EMP')
      .delete()
      .eq('Emp_id', employeeToDelete.Emp_id);

    if (error) {
      setDeleteMessage('Error deleting employee: ' + error.message);
    } else {
      setDeleteMessage('Employee deleted successfully!');
      setEmployeeToDelete(null);
      setEmpIdToDelete('');
      if (activeSection === 'view') fetchEmployees();
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2>Employee Dashboard</h2>

      <div className={styles.buttonGroup}>
        <button onClick={() => toggleSection('add')}>Add Employee</button>
        <button onClick={() => toggleSection('view')}>View Employees</button>
        <button onClick={() => toggleSection('delete')}>Delete Employee</button>
      </div>

      {activeSection === 'add' && (
        <div className={styles.section}>
          <form onSubmit={handleAddEmployee}>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
            <input type="date" placeholder="Date of Joining" value={dateOfJoining} onChange={e => setDateOfJoining(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
            <button type="submit">Add</button>
          </form>
          {addMessage && <p className={styles.message}>{addMessage}</p>}
        </div>
      )}

      {activeSection === 'view' && (
        <div className={styles.section}>
          {viewLoading ? (
            <p>Loading employees...</p>
          ) : employees.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            <table className={styles.employeeTable}>
              <thead>
                <tr>
                  <th>Emp_id</th>
                  <th>Name</th>
                  <th>Date of Joining</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.Emp_id}>
                    <td>{emp.Emp_id}</td>
                    <td>{emp.Name}</td>
                    <td>{formatDate(emp['Date of Joining'])}</td>
                    <td>{emp.Email}</td>
                    <td>{emp.Phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeSection === 'delete' && (
        <div className={styles.section}>
          <input
            type="number"
            placeholder="Enter Emp_id"
            value={empIdToDelete}
            onChange={e => setEmpIdToDelete(e.target.value)}
          />
          <button onClick={handleViewEmployeeToDelete}>View</button>

          {viewDeleteError && <p className={styles.message}>{viewDeleteError}</p>}

          {employeeToDelete && (
            <>
              <table className={styles.employeeTable}>
                <thead>
                  <tr>
                    <th>Emp_id</th>
                    <th>Name</th>
                    <th>Date of Joining</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{employeeToDelete.Emp_id}</td>
                    <td>{employeeToDelete.Name}</td>
                    <td>{formatDate(employeeToDelete['Date of Joining'])}</td>
                    <td>{employeeToDelete.Email}</td>
                    <td>{employeeToDelete.Phone}</td>
                  </tr>
                </tbody>
              </table>
              <button onClick={handleDeleteEmployee}>Delete</button>
            </>
          )}
          {deleteMessage && <p className={styles.message}>{deleteMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
