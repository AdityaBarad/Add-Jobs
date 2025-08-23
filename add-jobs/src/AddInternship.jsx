import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function AddInternship() {
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    skills: '',
    description: '',
    category: '',
    is_urgent: false,
    batch: '',
    duration: '',
    status: '',
    apply_link: '',
    work_mode: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { skills, ...rest } = form;
    const skillsArr = skills.split(',').map((s) => s.trim()).filter(Boolean);
    const { error } = await supabase.from('internships').insert([
      { ...rest, skills: skillsArr }
    ]);
    setMessage(error ? 'Error adding internship.' : 'Internship added successfully!');
  };

  return (
    <div>
      <h2>Add Internship</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} />
        <input name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <label>
          Urgent?
          <input type="checkbox" name="is_urgent" checked={form.is_urgent} onChange={handleChange} />
        </label>
        <input name="batch" placeholder="Batch" value={form.batch} onChange={handleChange} required />
        <input name="duration" placeholder="Duration" value={form.duration} onChange={handleChange} />
        <input name="status" placeholder="Status" value={form.status} onChange={handleChange} />
        <input name="apply_link" placeholder="Apply Link" value={form.apply_link} onChange={handleChange} />
        <input name="work_mode" placeholder="Work Mode" value={form.work_mode} onChange={handleChange} />
        <button type="submit">Add Internship</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
