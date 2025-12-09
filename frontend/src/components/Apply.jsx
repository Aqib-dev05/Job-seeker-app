import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchJobById } from '../services/api';

const Apply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', linkedin: '', resume: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await fetchJobById(id);
        setJob(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    setForm(prev => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    // No backend endpoint for applications; simulate submit
    try {
      // You could send FormData to a backend here if available
      console.log('Submitting application', { jobId: id, ...form });
      alert('Application submitted successfully');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Failed to submit application');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-6 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Apply {job ? `— ${job.title} @ ${job.company}` : ''}</h2>
        {loading && <div>Loading job...</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && <div className="text-red-600">{error}</div>}
          <div>
            <label className="block text-sm font-medium">Full name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input name="email" value={form.email} onChange={handleChange} type="email" required className="mt-1 block w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} type="tel" required className="mt-1 block w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">LinkedIn profile</label>
            <input name="linkedin" value={form.linkedin} onChange={handleChange} className="mt-1 block w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Resume (PDF or DOC)</label>
            <input name="resume" onChange={handleFile} type="file" accept=".pdf,.doc,.docx" className="mt-1 block w-full" />
            {form.resume && <p className="text-sm text-gray-600">Selected: {form.resume.name}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Submit Application</button>
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded">Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Apply;
