
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

export default function AddInternship() {
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    custom_location: '',
    salary: '',
    skills: '',
    description: '',
    category: '',
    is_urgent: false,
    batch: '',
    duration: '',
    status: 'Open',
    apply_link: '',
    work_mode: '',
  });
  const [showCustomLocation, setShowCustomLocation] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
      const { skills, custom_location, location, ...rest } = form;
      const skillsArr = skills.split(',').map((s) => s.trim()).filter(Boolean);
      const finalLocation = location === 'Other' ? custom_location : location;
      const { error } = await supabase.from('internships').insert([
        { ...rest, skills: skillsArr, location: finalLocation }
      ]);
      
      if (error) {
        console.error('Supabase error:', error);
        setMessage(`Error adding internship: ${error.message}`);
      } else {
        setMessage('Internship added successfully!');
        // Reset form after successful submission
        setForm({
          title: '',
          company: '',
          location: '',
          custom_location: '',
          salary: '',
          skills: '',
          description: '',
          category: '',
          is_urgent: false,
          batch: '',
          duration: '',
          status: 'Open',
          apply_link: '',
          work_mode: '',
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
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Internship</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} aria-label="Internship Form">
        <label htmlFor="internship-title">Title</label>
        <input id="internship-title" className="form-control" name="title" placeholder="Title" value={form.title} onChange={handleChange} required aria-required="true" aria-label="Internship Title" />
        <label htmlFor="internship-company">Company</label>
        <input id="internship-company" className="form-control" name="company" placeholder="Company" value={form.company} onChange={handleChange} required aria-required="true" aria-label="Company Name" />
        <label htmlFor="internship-location">Location</label>
        <select name="location" id="internship-location" value={form.location} onChange={handleChange} required aria-label="Location">
          <option value="" disabled>Select City</option>
          {majorIndianCities.map(city => (
            <option key={city.value} value={city.value}>{city.label}</option>
          ))}
          <option value="Other">Other</option>
        </select>
        {showCustomLocation && (
          <input name="custom_location" placeholder="Enter custom location" value={form.custom_location} onChange={handleChange} required aria-label="Custom Location" />
        )}
        <label htmlFor="internship-salary">Salary</label>
        <input id="internship-salary" className="form-control" name="salary" placeholder="stipend/month" value={form.salary} onChange={handleChange} aria-label="Salary" />
        <label htmlFor="internship-skills">Skills (['comma', 'separated'])</label>
        <input id="internship-skills" className="form-control" name="skills" placeholder="Skills (comma, separated)" value={form.skills} onChange={handleChange} aria-label="Skills" />
        <label htmlFor="internship-description">Description</label>
        <textarea id="internship-description" className="form-control" name="description" placeholder="Description" value={form.description} onChange={handleChange} aria-label="Description" />
        <label htmlFor="internship-category">Category</label>
        <select id="internship-category" className="form-control" name="category" value={form.category} onChange={handleChange} required aria-label="Category">
          <option value="" disabled>Select Category</option>
          {['IT', 'Finance', 'Marketing', 'HR', 'Design', 'Sales', 'Other'].map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <label htmlFor="internship-batch">Batch</label>
        <input id="internship-batch" className="form-control" name="batch" placeholder="Batch" value={form.batch} onChange={handleChange} required aria-required="true" aria-label="Batch" />
        <label htmlFor="internship-duration">Duration</label>
        <select id="internship-duration" className="form-control" name="duration" value={form.duration} onChange={handleChange} required aria-label="Duration">
          <option value="" disabled>Select Duration</option>
          <option value="2 months">2 months</option>
          <option value="3 months">3 months</option>
          <option value="4 months">4 months</option>
          <option value="5 months">5 months</option>
          <option value="6 months">6 months</option>
        </select>
        <label htmlFor="internship-apply-link">Apply Link</label>
        <input id="internship-apply-link" className="form-control" name="apply_link" placeholder="Apply Link" value={form.apply_link} onChange={handleChange} aria-label="Apply Link" />
        <label htmlFor="internship-work-mode">Work Mode</label>
        <select id="internship-work-mode" className="form-control" name="work_mode" value={form.work_mode} onChange={handleChange} required aria-label="Work Mode">
          <option value="" disabled>Select Work Mode</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="on-site">On-site</option>
        </select>
        <button className="submit-button" type="submit" aria-label="Add Internship">Add Internship</button>
      </form>
      {message && <p style={{ textAlign: 'center', marginTop: '15px' }} aria-live="polite">{message}</p>}
    </div>
  );
}
