import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function AddEvent() {
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
    image_url: '',
    category: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('events').insert([
      { ...form }
    ]);
    setMessage(error ? 'Error adding event.' : 'Event added successfully!');
  };

  return (
    <div>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <input name="date" type="date" placeholder="Date" value={form.date} onChange={handleChange} required />
        <input name="start_time" type="time" placeholder="Start Time" value={form.start_time} onChange={handleChange} />
        <input name="end_time" type="time" placeholder="End Time" value={form.end_time} onChange={handleChange} />
        <input name="organizer_name" placeholder="Organizer Name" value={form.organizer_name} onChange={handleChange} />
        <input name="contact_email" placeholder="Contact Email" value={form.contact_email} onChange={handleChange} />
        <input name="contact_phone" placeholder="Contact Phone" value={form.contact_phone} onChange={handleChange} />
        <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <button type="submit">Add Event</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
