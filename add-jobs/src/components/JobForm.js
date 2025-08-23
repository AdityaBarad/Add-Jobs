import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function JobForm() {
  const [formData, setFormData] = useState({
    title: '',
    company_name: '',
    company_website: '',
    category: 'Other',
    skills_required: [],
    experience_level: 'fresher',
    employment_type: 'full-time',
    location: '',
    work_mode: 'on-site',
    stipend_salary: '',
    duration: '',
    application_deadline: '',
    apply_link: '',
    description: '',
    requirements: '',
    status: 'active',
    source: '',
    company_logo: '',
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const categoryOptions = [
    'Engineering', 'Design', 'Product', 'Marketing', 'Sales', 
    'Customer Support', 'HR', 'Finance', 'Operations', 'Other'
  ];
  
  const experienceOptions = ['fresher', 'junior', 'mid-level', 'senior', 'executive'];
  const employmentOptions = ['full-time', 'part-time', 'contract', 'internship'];
  const workModeOptions = ['on-site', 'remote', 'hybrid'];
  const statusOptions = ['active', 'closed', 'draft'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' && currentSkill.trim()) {
      e.preventDefault();
      if (!formData.skills_required.includes(currentSkill.trim())) {
        setFormData(prev => ({
          ...prev,
          skills_required: [...prev.skills_required, currentSkill.trim()]
        }));
      }
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills_required: prev.skills_required.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Format the data for Supabase
      const jobData = {
        ...formData,
        skills_required: formData.skills_required.length ? JSON.stringify(formData.skills_required) : null,
        posted_on: new Date().toISOString().split('T')[0]
      };
      
      const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select();
      
      if (error) throw error;
      
      setMessage({
        text: 'Job added successfully!',
        type: 'success'
      });
      
      // Reset form
      setFormData({
        title: '',
        company_name: '',
        company_website: '',
        category: 'Other',
        skills_required: [],
        experience_level: 'fresher',
        employment_type: 'full-time',
        location: '',
        work_mode: 'on-site',
        stipend_salary: '',
        duration: '',
        application_deadline: '',
        apply_link: '',
        description: '',
        requirements: '',
        status: 'active',
        source: '',
        company_logo: '',
      });
    } catch (error) {
      setMessage({
        text: `Error: ${error.message}`,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add a New Job</h2>
      
      {message.text && (
        <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Job Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company_name">Company Name*</label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            className="form-control"
            value={formData.company_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company_website">Company Website</label>
          <input
            type="url"
            id="company_website"
            name="company_website"
            className="form-control"
            value={formData.company_website}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
          >
            {categoryOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Skills Required</label>
          <div className="tags-input">
            {formData.skills_required.map((skill, index) => (
              <div key={index} className="tag">
                <span>{skill}</span>
                <span className="tag-remove" onClick={() => removeSkill(skill)}>×</span>
              </div>
            ))}
            <input
              type="text"
              value={currentSkill}
              onChange={e => setCurrentSkill(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Type and press Enter"
              className="tag-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="experience_level">Experience Level</label>
          <select
            id="experience_level"
            name="experience_level"
            className="form-control"
            value={formData.experience_level}
            onChange={handleChange}
          >
            {experienceOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="employment_type">Employment Type</label>
          <select
            id="employment_type"
            name="employment_type"
            className="form-control"
            value={formData.employment_type}
            onChange={handleChange}
          >
            {employmentOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="work_mode">Work Mode</label>
          <select
            id="work_mode"
            name="work_mode"
            className="form-control"
            value={formData.work_mode}
            onChange={handleChange}
          >
            {workModeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="stipend_salary">Stipend/Salary</label>
          <input
            type="text"
            id="stipend_salary"
            name="stipend_salary"
            className="form-control"
            value={formData.stipend_salary}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            className="form-control"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="application_deadline">Application Deadline</label>
          <input
            type="date"
            id="application_deadline"
            name="application_deadline"
            className="form-control"
            value={formData.application_deadline}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="apply_link">Application Link</label>
          <input
            type="url"
            id="apply_link"
            name="apply_link"
            className="form-control"
            value={formData.apply_link}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="requirements">Requirements</label>
          <textarea
            id="requirements"
            name="requirements"
            className="form-control"
            value={formData.requirements}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="company_logo">Company Logo URL</label>
          <input
            type="url"
            id="company_logo"
            name="company_logo"
            className="form-control"
            value={formData.company_logo}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="source">Source</label>
          <input
            type="text"
            id="source"
            name="source"
            className="form-control"
            value={formData.source}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Add Job'}
        </button>
      </form>
    </div>
  );
}

export default JobForm;
