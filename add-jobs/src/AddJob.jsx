
import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const majorIndianCities = [
  { value: "Agra", label: "Agra" },
  { value: "Ahmedabad", label: "Ahmedabad" },
  { value: "Ajmer", label: "Ajmer" },
  { value: "Akola", label: "Akola" },
  { value: "Aligarh", label: "Aligarh" },
  { value: "Allahabad", label: "Allahabad" },
  { value: "Ambattur", label: "Ambattur" },
  { value: "Amravati", label: "Amravati" },
  { value: "Amritsar", label: "Amritsar" },
  { value: "Asansol", label: "Asansol" },
  { value: "Aurangabad", label: "Aurangabad" },
  { value: "Bangalore", label: "Bangalore" },
  { value: "Bareilly", label: "Bareilly" },
  { value: "Belgaum", label: "Belgaum" },
  { value: "Bengaluru", label: "Bengaluru" },
  { value: "Bhavnagar", label: "Bhavnagar" },
  { value: "Bhilai Nagar", label: "Bhilai Nagar" },
  { value: "Bhiwandi", label: "Bhiwandi" },
  { value: "Bhopal", label: "Bhopal" },
  { value: "Bhubaneswar", label: "Bhubaneswar" },
  { value: "Bikaner", label: "Bikaner" },
  { value: "Chandigarh", label: "Chandigarh" },
  { value: "Chennai", label: "Chennai" },
  { value: "Coimbatore", label: "Coimbatore" },
  { value: "Cuttack", label: "Cuttack" },
  { value: "Dehradun", label: "Dehradun" },
  { value: "Delhi", label: "Delhi" },
  { value: "Dhanbad", label: "Dhanbad" },
  { value: "Durgapur", label: "Durgapur" },
  { value: "Erode", label: "Erode" },
  { value: "Faridabad", label: "Faridabad" },
  { value: "Firozabad", label: "Firozabad" },
  { value: "Gaya", label: "Gaya" },
  { value: "Ghaziabad", label: "Ghaziabad" },
  { value: "Gulbarga", label: "Gulbarga" },
  { value: "Guntur", label: "Guntur" },
  { value: "Gurgaon", label: "Gurgaon" },
  { value: "Gurugram", label: "Gurugram" },
  { value: "Guwahati", label: "Guwahati" },
  { value: "Gwalior", label: "Gwalior" },
  { value: "Howrah", label: "Howrah" },
  { value: "Hubli-Dharwad", label: "Hubli-Dharwad" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Indore", label: "Indore" },
  { value: "Jabalpur", label: "Jabalpur" },
  { value: "Jaipur", label: "Jaipur" },
  { value: "Jalgaon", label: "Jalgaon" },
  { value: "Jalandhar", label: "Jalandhar" },
  { value: "Jamnagar", label: "Jamnagar" },
  { value: "Jamshedpur", label: "Jamshedpur" },
  { value: "Jammu", label: "Jammu" },
  { value: "Jhansi", label: "Jhansi" },
  { value: "Jodhpur", label: "Jodhpur" },
  { value: "Kalyan-Dombivali", label: "Kalyan-Dombivali" },
  { value: "Kanpur", label: "Kanpur" },
  { value: "Kochi", label: "Kochi" },
  { value: "Kolhapur", label: "Kolhapur" },
  { value: "Kolkata", label: "Kolkata" },
  { value: "Kota", label: "Kota" },
  { value: "Lucknow", label: "Lucknow" },
  { value: "Ludhiana", label: "Ludhiana" },
  { value: "Loni", label: "Loni" },
  { value: "Madurai", label: "Madurai" },
  { value: "Maheshtala", label: "Maheshtala" },
  { value: "Malegaon", label: "Malegaon" },
  { value: "Mangalore", label: "Mangalore" },
  { value: "Meerut", label: "Meerut" },
  { value: "Mira-Bhayandar", label: "Mira-Bhayandar" },
  { value: "Moradabad", label: "Moradabad" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Mysore", label: "Mysore" },
  { value: "Nagpur", label: "Nagpur" },
  { value: "Nanded-Waghala", label: "Nanded-Waghala" },
  { value: "Nashik", label: "Nashik" },
  { value: "Navi Mumbai", label: "Navi Mumbai" },
  { value: "Noida", label: "Noida" },
  { value: "Online", label: "Online" },
  { value: "Patna", label: "Patna" },
  { value: "Pimpri-Chinchwad", label: "Pimpri-Chinchwad" },
  { value: "Pune", label: "Pune" },
  { value: "Raipur", label: "Raipur" },
  { value: "Rajkot", label: "Rajkot" },
  { value: "Ranchi", label: "Ranchi" },
  { value: "Remote", label: "Remote" },
  { value: "Saharanpur", label: "Saharanpur" },
  { value: "Salem", label: "Salem" },
  { value: "Sangli-Miraj & Kupwad", label: "Sangli-Miraj & Kupwad" },
  { value: "Siliguri", label: "Siliguri" },
  { value: "Solapur", label: "Solapur" },
  { value: "Srinagar", label: "Srinagar" },
  { value: "Surat", label: "Surat" },
  { value: "Thane", label: "Thane" },
  { value: "Thiruvananthapuram", label: "Thiruvananthapuram" },
  { value: "Tiruchirappalli", label: "Tiruchirappalli" },
  { value: "Tirunelveli", label: "Tirunelveli" },
  { value: "Udaipur", label: "Udaipur" },
  { value: "Ujjain", label: "Ujjain" },
  { value: "Ulhasnagar", label: "Ulhasnagar" },
  { value: "Vadodara", label: "Vadodara" },
  { value: "Varanasi", label: "Varanasi" },
  { value: "Vasai-Virar", label: "Vasai-Virar" },
  { value: "Vijayawada", label: "Vijayawada" },
  { value: "Visakhapatnam", label: "Visakhapatnam" },
  { value: "Warangal", label: "Warangal" },
  { value: "Work From Home", label: "Work From Home" }
];

export default function AddJob() {
  const [form, setForm] = useState({
    title: '',
    company_name: '',
    company_website: '',
    category: '',
    skills_required: '',
    experience_level: '',
    employment_type: '',
    location: '',
    custom_location: '',
    work_mode: '',
    stipend_salary: '',
    duration: '',
    application_deadline: '',
    apply_link: '',
    description: '',
    requirements: '',
    source: '',
    company_logo: '',
    status: 'active',
  });
  const [showCustomLocation, setShowCustomLocation] = useState(false);
  const [message, setMessage] = useState('');

  const categoryOptions = ['IT', 'Finance', 'Marketing', 'HR', 'Design', 'Sales', 'Other'];
  const experienceLevelOptions = ['fresher', '0-1 years', '1-3 years', '3-5 years', '5+ years'];
  const employmentTypeOptions = ['full-time', 'part-time', 'contract'];
  const workModeOptions = ['remote', 'on-site', 'hybrid'];
  const statusOptions = ['active', 'expired'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'location') {
      setShowCustomLocation(value === 'Other');
      if (value !== 'Other') {
        setForm((prev) => ({ ...prev, custom_location: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { skills_required, custom_location, location, ...rest } = form;
      const skills = skills_required.split(',').map((s) => s.trim()).filter(Boolean);
      const finalLocation = location === 'Other' ? custom_location : location;
      
      // Prepare data with correct field mappings
      const jobData = {
        ...rest,
        skills_required: skills,
        location: finalLocation,
      };
      
      // Remove empty string values that might cause issues
      Object.keys(jobData).forEach(key => {
        if (jobData[key] === '') {
          delete jobData[key];
        }
      });
      
      console.log('Submitting job data:', jobData); // Debug log
      const { error } = await supabase.from('jobs').insert([jobData]);
      
      if (error) {
        console.error('Supabase error:', error);
        setMessage(`Error adding job: ${error.message}`);
      } else {
        setMessage('Job added successfully!');
        // Reset form after successful submission
        setForm({
          title: '',
          company_name: '',
          company_website: '',
          category: '',
          skills_required: '',
          experience_level: '',
          employment_type: '',
          location: '',
          custom_location: '',
          work_mode: '',
          stipend_salary: '',
          duration: '',
          application_deadline: '',
          apply_link: '',
          description: '',
          requirements: '',
          source: '',
          company_logo: '',
          status: 'active',
        });
        setShowCustomLocation(false);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Job</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} aria-label="Job Form">
        <label htmlFor="job-title">Title</label>
        <input id="job-title" className="form-control" name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required aria-required="true" aria-label="Job Title" />
        
        <label htmlFor="company-name">Company Name</label>
        <input id="company-name" className="form-control" name="company_name" placeholder="Company Name" value={form.company_name} onChange={handleChange} required aria-required="true" aria-label="Company Name" />
        
        <label htmlFor="company-website">Company Website</label>
        <input id="company-website" className="form-control" name="company_website" placeholder="Company Website" value={form.company_website} onChange={handleChange} aria-label="Company Website" />

        <label htmlFor="job-category">Category</label>
        <select id="job-category" className="form-control" name="category" value={form.category} onChange={handleChange} required aria-label="Category">
          <option value="" disabled>Select Category</option>
          {categoryOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <label htmlFor="skills-required">Skills Required</label>
        <input id="skills-required" className="form-control" name="skills_required" placeholder="Skills (separated by commas, e.g., skill1, skill2)" value={form.skills_required} onChange={handleChange} aria-label="Skills Required" />

        <label htmlFor="experience-level">Experience Level</label>
        <select id="experience-level" className="form-control" name="experience_level" value={form.experience_level} onChange={handleChange} required aria-label="Experience Level">
          <option value="" disabled>Select Experience Level</option>
          {experienceLevelOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <label htmlFor="employment-type">Employment Type</label>
        <select id="employment-type" className="form-control" name="employment_type" value={form.employment_type} onChange={handleChange} required aria-label="Employment Type">
          <option value="" disabled>Select Employment Type</option>
          {employmentTypeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <label htmlFor="job-location">Location</label>
        <select className="form-control" name="location" id="job-location" value={form.location} onChange={handleChange} required aria-label="Location">
          <option value="" disabled>Select City</option>
          {majorIndianCities.map(city => (
            <option key={city.value} value={city.value}>{city.label}</option>
          ))}
          <option value="Other">Other</option>
        </select>
        {showCustomLocation && (
          <input className="form-control" name="custom_location" placeholder="Enter custom location" value={form.custom_location} onChange={handleChange} required aria-label="Custom Location" />
        )}

        <label htmlFor="work-mode">Work Mode</label>
        <select id="work-mode" className="form-control" name="work_mode" value={form.work_mode} onChange={handleChange} required aria-label="Work Mode">
          <option value="" disabled>Select Work Mode</option>
          {workModeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <label htmlFor="stipend-salary">Salary</label>
        <input id="stipend-salary" className="form-control" name="stipend_salary" placeholder="Salary (without ₹, if range use higher salary)" value={form.stipend_salary} onChange={handleChange} aria-label="Salary" />
        
        <label htmlFor="job-duration">Duration</label>
        <input id="job-duration" className="form-control" name="duration" placeholder="permanent or temporary" value={form.duration} onChange={handleChange} aria-label="Duration" />
        
        <label htmlFor="application-deadline">Application Deadline</label>
        <input id="application-deadline" className="form-control" name="application_deadline" type="date" value={form.application_deadline} onChange={handleChange} aria-label="Application Deadline" />
        
        <label htmlFor="apply-link">Apply Link</label>
        <input id="apply-link" className="form-control" name="apply_link" placeholder="Apply Link" value={form.apply_link} onChange={handleChange} aria-label="Apply Link" />
        
        <label htmlFor="job-description">Description</label>
        <textarea id="job-description" className="form-control" name="description" placeholder="Job Description" value={form.description} onChange={handleChange} aria-label="Description" />
        
        <label htmlFor="job-requirements">Requirements</label>
        <textarea id="job-requirements" className="form-control" name="requirements" placeholder="Requirements (e.g., Strong knowledge of React)" value={form.requirements} onChange={handleChange} aria-label="Requirements" />
        
        <label htmlFor="job-source">Source</label>
        <input id="job-source" className="form-control" name="source" placeholder="Source (e.g., LinkedIn)" value={form.source} onChange={handleChange} aria-label="Source" />
        
        <label htmlFor="company-logo">Company Logo URL</label>
        <input id="company-logo" className="form-control" name="company_logo" placeholder="Company Logo URL" value={form.company_logo} onChange={handleChange} aria-label="Company Logo" />

        <label htmlFor="job-status">Status</label>
        <select id="job-status" className="form-control" name="status" value={form.status} onChange={handleChange} required aria-label="Status">
          <option value="" disabled>Select Status</option>
          {statusOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <button className="submit-button" type="submit" aria-label="Add Job">Add Job</button>
      </form>
      {message && <p style={{ textAlign: 'center', marginTop: '15px' }} aria-live="polite">{message}</p>}
    </div>
  );
}
