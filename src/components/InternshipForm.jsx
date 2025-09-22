import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function InternshipForm() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    skills: [],
    description: '',
    category: '',
    is_urgent: false,
    batch: '',
    duration: '',
    status: 'active',
    apply_link: '',
    work_mode: 'on-site'
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const categoryOptions = [
    'Engineering', 'Design', 'Product', 'Marketing', 'Sales', 
    'Customer Support', 'HR', 'Finance', 'Operations', 'Other'
  ];

  const statusOptions = ['active', 'closed', 'draft'];
  const workModeOptions = ['on-site', 'remote', 'hybrid'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' && currentSkill.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(currentSkill.trim())) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, currentSkill.trim()]
        }));
      }
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('internships')
        .insert([formData])
        .select();

      if (error) throw error;

      setMessage({
        text: 'Internship added successfully!',
        type: 'success'
      });

      // Reset form
      setFormData({
        title: '',
        company: '',
        location: '',
        salary: '',
        skills: [],
        description: '',
        category: '',
        is_urgent: false,
        batch: '',
        duration: '',
        status: 'active',
        apply_link: '',
        work_mode: 'on-site'
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
      <h2>Add a New Internship</h2>

      {message.text && (
        <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Internship Title*</label>
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
          <label htmlFor="company">Company Name*</label>
          <input
            type="text"
            id="company"
            name="company"
            className="form-control"
            value={formData.company}
            onChange={handleChange}
            required
          />
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
          <label htmlFor="salary">Stipend/Salary</label>
          <input
            type="text"
            id="salary"
            name="salary"
            className="form-control"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Skills Required</label>
          <div className="tags-input">
            {formData.skills.map((skill, index) => (
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
          <label htmlFor="batch">Batch*</label>
          <input
            type="text"
            id="batch"
            name="batch"
            className="form-control"
            value={formData.batch}
            onChange={handleChange}
            required
            placeholder="e.g., Summer 2023"
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
            placeholder="e.g., 3 months"
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
            <option value="">Select a category</option>
            {categoryOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
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

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="is_urgent"
              checked={formData.is_urgent}
              onChange={handleChange}
            />
            Mark as Urgent
          </label>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Add Internship'}
        </button>
      </form>
    </div>
  );
}

export default InternshipForm;
