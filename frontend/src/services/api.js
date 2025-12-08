// Real API function
export const fetchJobsAndInternships = async (filters = {}) => {
  try {
    // Replace this URL with your actual API endpoint
    const response = await fetch("https://your-api-endpoint.com/jobs");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const allOpportunities = await response.json();

    // Apply filters (keeping the same filtering logic)
    let filtered = [...allOpportunities];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.location && filters.location !== "all") {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter((job) => job.type === filters.type);
    }

    if (filters.field && filters.field !== "all") {
      filtered = filtered.filter((job) => job.field === filters.field);
    }

    return filtered;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

/* location: "San Francisco, CA",
            type: "Internship",
            field: "Technology",
            deadline: "2025-10-15",
            description: "Join our engineering team to work on cutting-edge web applications using modern technologies.",
            url: "https://example.com/job/1",
            logo: "https://via.placeholder.com/50" */
