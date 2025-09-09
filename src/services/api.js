// Mock API function - Replace with actual API call
export const fetchJobsAndInternships = async (filters = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock data
    const allOpportunities = [
        {
            id: 1,
            title: "Software Engineer Intern",
            company: "Tech Corp",
            location: "San Francisco, CA",
            type: "Internship",
            field: "Technology",
            deadline: "2025-10-15",
            description: "Join our engineering team to work on cutting-edge web applications using modern technologies.",
            url: "https://example.com/job/1",
            logo: "https://via.placeholder.com/50"
        },
        {
            id: 2,
            title: "Marketing Coordinator",
            company: "Creative Agency",
            location: "New York, NY",
            type: "Full-time",
            field: "Marketing",
            deadline: "2025-09-30",
            description: "Seeking a creative marketing professional to lead our digital campaigns and brand initiatives.",
            url: "https://example.com/job/2",
            logo: "https://via.placeholder.com/50"
        },
        {
            id: 3,
            title: "Data Science Intern",
            company: "Analytics Plus",
            location: "Remote",
            type: "Internship",
            field: "Data Science",
            deadline: "2025-10-20",
            description: "Work with big data and machine learning models to derive actionable insights.",
            url: "https://example.com/job/3",
            logo: "https://via.placeholder.com/50"
        },
        {
            id: 4,
            title: "UX Designer",
            company: "Design Studio",
            location: "Austin, TX",
            type: "Part-time",
            field: "Design",
            deadline: "2025-09-25",
            description: "Create intuitive user experiences for web and mobile applications.",
            url: "https://example.com/job/4",
            logo: "https://via.placeholder.com/50"
        },
        {
            id: 5,
            title: "Finance Analyst Intern",
            company: "Investment Bank",
            location: "Chicago, IL",
            type: "Internship",
            field: "Finance",
            deadline: "2025-11-01",
            description: "Gain hands-on experience in financial modeling and market analysis.",
            url: "https://example.com/job/5",
            logo: "https://via.placeholder.com/50"
        },
        {
            id: 6,
            title: "Content Writer",
            company: "Media House",
            location: "Remote",
            type: "Contract",
            field: "Content",
            deadline: "2025-09-20",
            description: "Create engaging content for various digital platforms and publications.",
            url: "https://example.com/job/6",
            logo: "https://via.placeholder.com/50"
        }
    ];

    // Apply filters
    let filtered = [...allOpportunities];

    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(job =>
            job.title.toLowerCase().includes(searchLower) ||
            job.company.toLowerCase().includes(searchLower) ||
            job.description.toLowerCase().includes(searchLower)
        );
    }

    if (filters.location && filters.location !== 'all') {
        filtered = filtered.filter(job =>
            job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
    }

    if (filters.type && filters.type !== 'all') {
        filtered = filtered.filter(job => job.type === filters.type);
    }

    if (filters.field && filters.field !== 'all') {
        filtered = filtered.filter(job => job.field === filters.field);
    }

    return filtered;
};
