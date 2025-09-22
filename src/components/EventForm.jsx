import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { toast } from '../hooks/use-toast';

export default function EventForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    start_time: '',
    end_time: '',
    organizer_name: '',
    contact_email: '',
    contact_phone: '',
    category: '',
    registration_link: '',
    max_participants: '',
    is_online: false,
    platform_link: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate dates
      const eventDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (eventDate < today) {
        throw new Error('Event date cannot be in the past');
      }

      if (form.start_time && form.end_time && form.start_time >= form.end_time) {
        throw new Error('End time must be after start time');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.contact_email)) {
        throw new Error('Please enter a valid email address');
      }

      // Prepare event data
      const eventData = {
        ...form,
        max_participants: form.max_participants ? parseInt(form.max_participants) : null,
        posted_on: new Date().toISOString(),
        status: 'active'
      };

      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select();

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Event has been added successfully.",
        variant: "success",
      });
      
      setForm({
        title: '',
        description: '',
        location: '',
        date: '',
        start_time: '',
        end_time: '',
        organizer_name: '',
        contact_email: '',
        contact_phone: '',
        category: '',
        registration_link: '',
        max_participants: '',
        is_online: false,
        platform_link: '',
      });
      
    } catch (error) {
      console.error('Error adding event:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Event</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label htmlFor="title">Event Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Enter event title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="form-control min-h-[100px]"
            rows="4"
            placeholder="Enter event description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="is_online">Event Type</label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_online"
              name="is_online"
              checked={form.is_online}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span>This is an online event</span>
          </div>
        </div>

        {form.is_online ? (
          <div className="form-group">
            <label htmlFor="platform_link">Platform Link *</label>
            <input
              type="url"
              id="platform_link"
              name="platform_link"
              value={form.platform_link}
              onChange={handleChange}
              required={form.is_online}
              className="form-control"
              placeholder="Enter meeting link (Zoom, Teams, etc.)"
            />
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              required={!form.is_online}
              className="form-control"
              placeholder="Enter physical location"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="date">Event Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="form-control"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="">Select Category</option>
              <option value="Hackathon">Hackathon</option>
              <option value="AI">AI</option>
              <option value="Tech">Tech</option>
              <option value="Competition">Competition</option>
              <option value="Design">Design</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Startup">Startup</option>
              <option value="Education">Education</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="start_time">Start Time *</label>
            <input
              type="time"
              id="start_time"
              name="start_time"
              value={form.start_time}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="end_time">End Time *</label>
            <input
              type="time"
              id="end_time"
              name="end_time"
              value={form.end_time}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="registration_link">Registration Link</label>
          <input
            type="url"
            id="registration_link"
            name="registration_link"
            value={form.registration_link}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter registration link (optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="max_participants">Maximum Participants</label>
          <input
            type="number"
            id="max_participants"
            name="max_participants"
            value={form.max_participants}
            onChange={handleChange}
            min="0"
            className="form-control"
            placeholder="Leave empty for unlimited"
          />
        </div>

        <div className="form-group">
          <label htmlFor="organizer_name">Organizer Name *</label>
          <input
            type="text"
            id="organizer_name"
            name="organizer_name"
            value={form.organizer_name}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Enter organizer name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="contact_email">Contact Email *</label>
            <input
              type="email"
              id="contact_email"
              name="contact_email"
              value={form.contact_email}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Enter contact email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact_phone">Contact Phone</label>
            <input
              type="tel"
              id="contact_phone"
              name="contact_phone"
              value={form.contact_phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter contact phone (optional)"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className={`w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding Event...
            </span>
          ) : 'Add Event'}
        </button>
      </form>
    </div>
  );
}