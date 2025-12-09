const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchJobsAndInternships = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.search) params.append("q", filters.search);
  if (filters.location && filters.location !== "all") {
    params.append("location", filters.location);
  }
  if (filters.type && filters.type !== "all") params.append("type", filters.type);
  if (filters.field && filters.field !== "all") params.append("field", filters.field);

  const url = `${API_BASE}/jobs?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchJobById = async (id) => {
  const url = `${API_BASE}/jobs/${id}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch job');
  return response.json();
};

export const createJob = async (job) => {
  const response = await fetch(`${API_BASE}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job)
  });
  if (!response.ok) throw new Error('Failed to create job');
  return response.json();
};

export const updateJob = async (id, job) => {
  const response = await fetch(`${API_BASE}/jobs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job)
  });
  if (!response.ok) throw new Error('Failed to update job');
  return response.json();
};

export const deleteJob = async (id) => {
  const response = await fetch(`${API_BASE}/jobs/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete job');
  return response.json();
};

/* location: "San Francisco, CA",
            type: "Internship",
            field: "Technology",
            deadline: "2025-10-15",
            description: "Join our engineering team to work on cutting-edge web applications using modern technologies.",
            url: "https://example.com/job/1",
            logo: "https://via.placeholder.com/50" */
