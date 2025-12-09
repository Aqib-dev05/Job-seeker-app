import React, { useEffect, useState } from 'react';
import { useJobs } from '../contexts/JobsContext';
import { createJob, updateJob, deleteJob } from '../services/api';

const emptyForm = {
  title: '',
  company: '',
  location: '',
  type: 'Full-time',
  field: '',
  description: '',
  deadline: '',
  url: '',
  logo: ''
};

const Manager = () => {
  const { opportunities, loadOpportunities } = useJobs();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOpportunities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      if (editingId) {
        await updateJob(editingId, form);
      } else {
        await createJob(form);
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      await loadOpportunities();
    } catch (err) {
      console.error(err);
      setError('Failed to save job');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job) => {
    setForm({
      title: job.title || '',
      company: job.company || '',
      location: job.location || '',
      type: job.type || 'Full-time',
      field: job.field || '',
      description: job.description || '',
      deadline: job.deadline ? new Date(job.deadline).toISOString().slice(0,10) : '',
      url: job.url || '',
      logo: job.logo || ''
    });
    setEditingId(job._id || job.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this job?')) return;
    try {
      setLoading(true);
      await deleteJob(id);
      await loadOpportunities();
    } catch (err) {
      console.error(err);
      setError('Failed to delete job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Job Manager</h2>
        <button
          onClick={() => { setShowForm(s => !s); setForm(emptyForm); setEditingId(null); }}
          className="px-3 py-1 bg-indigo-600 text-white rounded-md"
        >
          {showForm ? 'Close' : 'Add Job'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-4 rounded-md shadow-sm mb-6">
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" required />
            <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="border p-2 rounded" required />
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded" />
            <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded">
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
            <input name="field" value={form.field} onChange={handleChange} placeholder="Field" className="border p-2 rounded" />
            <input name="deadline" value={form.deadline} onChange={handleChange} type="date" className="border p-2 rounded" />
            <input name="url" value={form.url} onChange={handleChange} placeholder="Apply URL" className="border p-2 rounded col-span-1 sm:col-span-2" />
            <input name="logo" value={form.logo} onChange={handleChange} placeholder="Logo URL" className="border p-2 rounded col-span-1 sm:col-span-2" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded col-span-1 sm:col-span-2" rows={4} />
          </div>

          <div className="mt-4">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded mr-2">{editingId ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); }} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {opportunities && opportunities.length ? opportunities.map(job => (
          <div key={job._id || job.id} className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company} — {job.location}</p>
            <p className="mt-2 text-sm text-gray-700 line-clamp-3">{job.description}</p>
            <div className="mt-3 flex items-center space-x-2">
              <button onClick={() => handleEdit(job)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
              <button onClick={() => handleDelete(job._id || job.id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        )) : (
          <div className="text-gray-600">No jobs available.</div>
        )}
      </div>
    </div>
  );
};

export default Manager;
