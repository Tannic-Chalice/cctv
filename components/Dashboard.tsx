import React, { useState } from 'react';
import styles from '../styles/Dashboard.module.css';
import { supabase } from '../lib/supabaseClient';

type Employee = {
  Emp_id: number;
  Name: string;
  'Date of Joining': string;
  Email: string;
  Phone: string;
  violations?: string[];
};

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Add Employee
  const [name, setName] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addMessage, setAddMessage] = useState('');

  // View Employees
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [viewLoading, setViewLoading] = useState(false);

  // Delete Employee
  const [empIdToDelete, setEmpIdToDelete] = useState('');
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [viewDeleteError, setViewDeleteError] = useState('');

  // Give Violation
  const [violationEmpId, setViolationEmpId] = useState('');
  const [selectedViolation, setSelectedViolation] = useState('');
  const [violationMessage, setViolationMessage] = useState('');

  // View Violations
  const [violationViewList, setViolationViewList] = useState<Employee[]>([]);

  const toggleSection = (section: string) => {
    setActiveSection(prev => (prev === section ? null : section));
    if (section === 'view') fetchEmployees();
    if (section === 'violations') fetchViolations();
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return `${String(date.getDate()).padStart(2, '0')}/${String(
      date.getMonth() + 1
    ).padStart(2, '0')}/${date.getFullYear()}`;
  };

  // Add Employee
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

  // View Employees
  const fetchEmployees = async () => {
    setViewLoading(true);
    const { data, error } = await supabase
      .from('EMP')
      .select('*')
      .order('Emp_id', { ascending: true });

    if (error) {
      alert('Error fetching employees: ' + error.message);
      setEmployees([]);
    } else {
      setEmployees((data as Employee[]) || []);
    }
    setViewLoading(false);
  };

  // Delete Employee
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

  // Give Violation
  const giveViolation = async () => {
    const empId = Number(violationEmpId);
    if (!empId || !selectedViolation) {
      setViolationMessage('Please provide both employee ID and violation.');
      return;
    }

    const { data: empData, error: empError } = await supabase
      .from('EMP')
      .select('violations')
      .eq('Emp_id', empId)
      .single();

    if (empError || !empData) {
      setViolationMessage('Employee not found.');
      return;
    }

    const existingViolations = empData.violations || [];
    const updatedViolations = [...existingViolations, selectedViolation];

    const { error: updateError } = await supabase
      .from('EMP')
      .update({ violations: updatedViolations })
      .eq('Emp_id', empId);

    if (updateError) {
      setViolationMessage('Failed to assign violation: ' + updateError.message);
    } else {
      setViolationMessage('Violation assigned successfully!');
      setSelectedViolation('');
      setViolationEmpId('');
    }
  };

  // View Violations
  const fetchViolations = async () => {
    const { data, error } = await supabase
      .from('EMP')
      .select('Emp_id, Name, violations')
      .not('violations', 'is', null);

    if (error) {
      alert('Error fetching violations: ' + error.message);
      setViolationViewList([]);
    } else {
      setViolationViewList(data as Employee[]);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2>Employee Dashboard</h2>

      <div className={styles.buttonGroup}>
        <div>
          <button onClick={() => toggleSection('add')}>Add Employee</button>
          {activeSection === 'add' && (
            <div className={styles.section}>
              <form onSubmit={handleAddEmployee}>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="date"
                  placeholder="Date of Joining"
                  value={dateOfJoining}
                  onChange={(e) => setDateOfJoining(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <button type="submit">Add</button>
              </form>
              {addMessage && <p className={styles.message}>{addMessage}</p>}
            </div>
          )}
        </div>

        <div>
          <button onClick={() => toggleSection('view')}>View Employees</button>
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
                      <th>Emp Id</th>
                      <th>Name</th>
                      <th>Date of Joining</th>
                      <th>Email</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp) => (
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
        </div>

        <div>
          <button onClick={() => toggleSection('delete')}>Delete Employee</button>
          {activeSection === 'delete' && (
            <div className={styles.section}>
              <input
                type="number"
                placeholder="Enter Emp_id"
                value={empIdToDelete}
                onChange={(e) => setEmpIdToDelete(e.target.value)}
              />
              <button onClick={handleViewEmployeeToDelete}>View</button>

              {viewDeleteError && <p className={styles.message}>{viewDeleteError}</p>}

              {employeeToDelete && (
                <>
                  <table className={styles.employeeTable}>
                    <thead>
                      <tr>
                        <th>Emp Id</th>
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

        <div>
          <button onClick={() => toggleSection('giveViolation')}>Give Violation</button>
          {activeSection === 'giveViolation' && (
            <div className={styles.section}>
              <input
                type="number"
                placeholder="Enter Emp_id"
                value={violationEmpId}
                onChange={(e) => setViolationEmpId(e.target.value)}
              />
              <select
                value={selectedViolation}
                onChange={(e) => setSelectedViolation(e.target.value)}
              >
                <option value="">Select Violation</option>
                <option value="Not wearing helmet">Not wearing helmet</option>
                <option value="Not wearing glasses">Not wearing glasses</option>
                <option value="Not wearing gloves">Not wearing gloves</option>
                <option value="Not wearing ear protection">Not wearing ear protection</option>
                <option value="Not wearing mask">Not wearing mask</option>
                <option value="Not wearing high visibility clothes">
                  Not wearing high visibility clothes
                </option>
                <option value="Not wearing ankle boots">Not wearing ankle boots</option>
              </select>
              <button onClick={giveViolation}>Assign Violation</button>
              {violationMessage && <p className={styles.message}>{violationMessage}</p>}
            </div>
          )}
        </div>

        <div>
          <button onClick={() => toggleSection('violations')}>View Violations</button>
          {activeSection === 'violations' && (
            <div className={styles.section}>
              {violationViewList.length === 0 ? (
                <p>No violations found.</p>
              ) : (
                <table className={styles.employeeTable}>
                  <thead>
                    <tr>
                      <th>Emp Id</th>
                      <th>Name</th>
                      <th>Violations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {violationViewList.map((emp) => (
                      <tr key={emp.Emp_id}>
                        <td>{emp.Emp_id}</td>
                        <td>{emp.Name}</td>
                        <td>{emp.violations?.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
