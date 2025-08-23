import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function EventForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    start_time: '',
    end_time: '',
    organizer_name: '',
    contact_email: '',
    contact_phone: '',
    image_url: '',
    category: ''
  });

  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const categoryOptions = [
    'Conference', 'Workshop', 'Webinar', 'Hackathon', 'Meetup', 
    'Career Fair', 'Competition', 'Seminar', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('events')
        .insert([formData])
        .select();

      if (error) throw error;

      setMessage({
        text: 'Event added successfully!',
        type: 'success'
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        date: '',
        start_time: '',
        end_time: '',
        organizer_name: '',
        contact_email: '',
        contact_phone: '',
        image_url: '',
        category: ''
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
      <h2>Add a New Event</h2>

      {message.text && (
        <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Event Title*</label>
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
          <label htmlFor="date">Event Date*</label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="start_time">Start Time</label>
          <input
            type="time"
            id="start_time"
            name="start_time"
            className="form-control"
            value={formData.start_time}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="end_time">End Time</label>
          <input
            type="time"
            id="end_time"
            name="end_time"
            className="form-control"
            value={formData.end_time}
            onChange={handleChange}
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
          <label htmlFor="organizer_name">Organizer Name</label>
          <input
            type="text"
            id="organizer_name"
            name="organizer_name"
            className="form-control"
            value={formData.organizer_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact_email">Contact Email</label>
          <input
            type="email"
            id="contact_email"
            name="contact_email"
            className="form-control"
            value={formData.contact_email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact_phone">Contact Phone</label>
          <input
            type="tel"
            id="contact_phone"
            name="contact_phone"
            className="form-control"
            value={formData.contact_phone}
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
            <option value="">Select a category</option>
            {categoryOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image_url">Image URL</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            className="form-control"
            value={formData.image_url}
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

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Add Event'}
        </button>
      </form>
    </div>
  );
}

export default EventForm;
