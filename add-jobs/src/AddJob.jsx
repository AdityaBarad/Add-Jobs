import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function AddJob() {
  const [form, setForm] = useState({
    title: '',
    company_name: '',
    company_website: '',
    category: 'IT', // Default value
    skills_required: '',
    experience_level: 'fresher', // Default value
    employment_type: 'full-time', // Default value
    location: '',
    work_mode: 'on-site', // Default value
    stipend_salary: '',
    duration: '',
    application_deadline: '',
    apply_link: '',
    description: '',
    requirements: '',
    source: '',
    company_logo: '',
    status: 'active', // Added status field with default value
  });
  const [message, setMessage] = useState('');

  // Enum options based on database definition
  const categoryOptions = ['IT', 'Finance', 'Marketing', 'HR', 'Design', 'Sales', 'Other'];
  const experienceLevelOptions = ['fresher', '0-1 years', '1-3 years', '3-5 years', '5+ years'];
  const employmentTypeOptions = ['full-time', 'part-time', 'contract'];
  const workModeOptions = ['remote', 'on-site', 'hybrid'];
  const statusOptions = ['active', 'expired'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { skills_required, ...rest } = form;
    const skills = skills_required.split(',').map((s) => s.trim()).filter(Boolean);
    const { error } = await supabase.from('jobs').insert([
      { ...rest, skills_required: skills }
    ]);
    setMessage(error ? 'Error adding job.' : 'Job added successfully!');
  };

  return (
    <div>
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="company_name" placeholder="Company Name" value={form.company_name} onChange={handleChange} required />
        <input name="company_website" placeholder="Company Website" value={form.company_website} onChange={handleChange} />
        
        {/* Dropdown for Category */}
        <select name="category" value={form.category} onChange={handleChange} required>
          <option value="" disabled>Select Category</option>
          {categoryOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      
        
        <input name="skills_required" placeholder="Skills (comma separated)" value={form.skills_required} onChange={handleChange} />
        
        {/* Dropdown for Experience Level */}
        <select name="experience_level" value={form.experience_level} onChange={handleChange} required>
          <option value="" disabled>Select Experience Level</option>
          {experienceLevelOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
        {/* Dropdown for Employment Type */}
        <select name="employment_type" value={form.employment_type} onChange={handleChange} required>
          <option value="" disabled>Select Employment Type</option>
          {employmentTypeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        
        {/* Dropdown for Work Mode */}
        <select name="work_mode" value={form.work_mode} onChange={handleChange} required>
          <option value="" disabled>Select Work Mode</option>
          {workModeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
        <input name="stipend_salary" placeholder="Stipend/Salary" value={form.stipend_salary} onChange={handleChange} />
        <input name="duration" placeholder="Duration" value={form.duration} onChange={handleChange} />
        <input name="application_deadline" type="date" placeholder="Application Deadline" value={form.application_deadline} onChange={handleChange} />
        <input name="apply_link" placeholder="Apply Link" value={form.apply_link} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <textarea name="requirements" placeholder="Requirements" value={form.requirements} onChange={handleChange} />
        <input name="source" placeholder="Source" value={form.source} onChange={handleChange} />
        <input name="company_logo" placeholder="Company Logo URL" value={form.company_logo} onChange={handleChange} />
        
        {/* Dropdown for Status */}
        <select name="status" value={form.status} onChange={handleChange} required>
          <option value="" disabled>Select Status</option>
          {statusOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        
        <button type="submit">Add Job</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
