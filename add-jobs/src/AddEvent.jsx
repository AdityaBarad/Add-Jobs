
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

export default function AddEvent() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    custom_location: '',
    date: '',
    start_time: '',
    end_time: '',
    organizer_name: '',
    contact_email: '',
    contact_phone: '',
    image_url: '',
    category: '',
    registration_type: '',
    prize_pool: '',
  });
  const [showCustomLocation, setShowCustomLocation] = useState(false);
  const [message, setMessage] = useState('');

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
    const { custom_location, location, registration_type, prize_pool, ...rest } = form;
    const finalLocation = location === 'Other' ? custom_location : location;
    const prizePoolValue = prize_pool === 'true';
    const { error } = await supabase.from('events').insert([
      { ...rest, location: finalLocation, registration_type, prize_pool: prizePoolValue }
    ]);
    setMessage(error ? 'Error adding event.' : 'Event added successfully!');
  };
       

  return (
    <div className="form-container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Event</h2>
  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} aria-label="Event Form">
        <label htmlFor="event-title">Title</label>
        <input id="event-title" className="form-control" name="title" placeholder="Title" value={form.title} onChange={handleChange} required aria-required="true" aria-label="Event Title" />
        <label htmlFor="event-description">Description</label>
        <textarea id="event-description" className="form-control" name="description" placeholder="Description" value={form.description} onChange={handleChange} aria-label="Description" />
        <label htmlFor="event-location">Location</label>
        <select name="location" id="event-location" value={form.location} onChange={handleChange} required aria-label="Location">
          <option value="" disabled>Select City</option>
          {majorIndianCities.map(city => (
            <option key={city.value} value={city.value}>{city.label}</option>
          ))}
          <option value="Other">Other</option>
        </select>
        {showCustomLocation && (
          <input name="custom_location" placeholder="Enter custom location" value={form.custom_location} onChange={handleChange} required aria-label="Custom Location" />
        )}
        <label htmlFor="event-date">Date</label>
        <input id="event-date" className="form-control" name="date" type="date" placeholder="Date" value={form.date} onChange={handleChange} required aria-required="true" aria-label="Date" />
        <label htmlFor="event-start-time">Start Time</label>
        <input id="event-start-time" className="form-control" name="start_time" type="time" placeholder="Start Time" value={form.start_time} onChange={handleChange} aria-label="Start Time" />
        <label htmlFor="event-end-time">End Time</label>
        <input id="event-end-time" className="form-control" name="end_time" type="time" placeholder="End Time" value={form.end_time} onChange={handleChange} aria-label="End Time" />
        <label htmlFor="event-organizer-name">Organizer Name</label>
        <input id="event-organizer-name" className="form-control" name="organizer_name" placeholder="Organizer Name" value={form.organizer_name} onChange={handleChange} aria-label="Organizer Name" />
        <label htmlFor="event-contact-email">Contact Email</label>
        <input id="event-contact-email" className="form-control" name="contact_email" placeholder="Contact Email" value={form.contact_email} onChange={handleChange} aria-label="Contact Email" />
        <label htmlFor="event-contact-phone">Contact Phone</label>
        <input id="event-contact-phone" className="form-control" name="contact_phone" placeholder="Contact Phone" value={form.contact_phone} onChange={handleChange} aria-label="Contact Phone" />
        <label htmlFor="event-image-url">Image URL</label>
        <input id="event-image-url" className="form-control" name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} aria-label="Image URL" />
        <label htmlFor="event-category">Category</label>
        <select id="event-category" className="form-control" name="category" value={form.category} onChange={handleChange} required aria-label="Category">
          <option value="" disabled>Select Category</option>
          <option value="Hackathon">Hackathon</option>
          <option value="AI">AI</option>
          <option value="Tech">Tech</option>
          <option value="Competition">Competition</option>
          <option value="Design">Design</option>
          <option value="Blockchain">Blockchain</option>
          <option value="Startup">Startup</option>
          <option value="Education">Education</option>
          <option value="Robotics">Robotics</option>
          <option value="Cybersecurity">Cybersecurity</option>
        </select>

        <label htmlFor="event-registration-type">Registration Type</label>
        <select id="event-registration-type" className="form-control" name="registration_type" value={form.registration_type} onChange={handleChange} required aria-label="Registration Type">
          <option value="" disabled>Select Registration Type</option>
          <option value="Paid">Paid</option>
          <option value="Free">Free</option>
          <option value="Early Bird">Early Bird</option>
        </select>

        <label htmlFor="event-prize-pool">Prize Pool</label>
        <select id="event-prize-pool" className="form-control" name="prize_pool" value={form.prize_pool} onChange={handleChange} required aria-label="Prize Pool">
          <option value="" disabled>Select Prize Pool Option</option>
          <option value="true">Prize Pool</option>
          <option value="false">No Prize Pool</option>
        </select>

        <label htmlFor="event-registration-type">Registration Type</label>
        <select id="event-registration-type" className="form-control" name="registration_type" value={form.registration_type} onChange={handleChange} required aria-label="Registration Type">
          <option value="" disabled>Select Registration Type</option>
          <option value="Paid">Paid</option>
          <option value="Free">Free</option>
          <option value="Early Bird">Early Bird</option>
        </select> 
        <label htmlFor="event-prize-pool">Prize Pool</label>
        <select id="event-prize-pool" className="form-control" name="prize_pool" value={form.prize_pool} onChange={handleChange} required aria-label="Prize Pool">
          <option value="" disabled>Select Prize Pool Option</option>
          <option value={true}>Prize Pool</option>
          <option value={false}>No Prize Pool</option>
        </select>
        <button className="submit-button" type="submit" aria-label="Add Event">Add Event</button>
      </form>
      {message && <p style={{ textAlign: 'center', marginTop: '15px' }} aria-live="polite">{message}</p>}
    </div>
  );
}
