import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from './JobCard';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { FaSignOutAlt } from 'react-icons/fa';
import './JobList.css';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date'); // Default sort by date
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Updated mock data with additional jobs
  const mockJobs = [
    {
      id: '1',
      employer_name: 'TCS',
      employer_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/200px-Tata_Consultancy_Services_Logo.svg.png',
      job_title: 'Software Engineer',
      job_city: 'Bangalore',
      job_country: 'India',
      job_required_skills: ['Java', 'Spring Boot', 'React', 'MySQL'],
      estimated_salary: '12 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.tcs.com/careers'
    },
    {
      id: '2',
      employer_name: 'Infosys',
      employer_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/200px-Infosys_logo.svg.png',
      job_title: 'Full Stack Developer',
      job_city: 'Hyderabad',
      job_country: 'India',
      job_required_skills: ['JavaScript', 'Node.js', 'React', 'MongoDB'],
      estimated_salary: '10 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.infosys.com/careers'
    },
    {
      id: '3',
      employer_name: 'Wipro',
      employer_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/200px-Wipro_Primary_Logo_Color_RGB.svg.png',
      job_title: 'Backend Developer',
      job_city: 'Chennai',
      job_country: 'India',
      job_required_skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
      estimated_salary: '11 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.wipro.com/careers'
    },
    {
      id: '4',
      employer_name: 'Accenture',
      employer_logo: 'https://images.jdmagicbox.com/v2/comp/bangalore/48/080p5603748/catalogue/accenture-services-pvt-ltd-bellandur-bangalore-call-centres-ncr7rtt83z.jpg',
      job_title: 'Data Scientist',
      job_city: 'Pune',
      job_country: 'India',
      job_required_skills: ['Python', 'R', 'Machine Learning'],
      estimated_salary: '15 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.accenture.com/in-en/careers'
    },
    {
      id: '5',
      employer_name: 'Cognizant',
      employer_logo: 'https://www.opentext.com/assets/images/partners/cognizant-logo-416x274.png',
      job_title: 'DevOps Engineer',
      job_city: 'Gurgaon',
      job_country: 'India',
      job_required_skills: ['Docker', 'Kubernetes', 'AWS'],
      estimated_salary: '14 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.cognizant.com/careers'
    },
    {
      id: '6',
      employer_name: 'HCL Technologies',
      employer_logo: 'https://www.besanttechnologies.com/wp-content/uploads/2017/11/Untitled-design-14.png',
      job_title: 'UI/UX Designer',
      job_city: 'Noida',
      job_country: 'India',
      job_required_skills: ['Figma', 'Adobe XD', 'Sketch'],
      estimated_salary: '9 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.hcltech.com/careers'
    },
    {
      id: '7',
      employer_name: 'IBM',
      employer_logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/200px-IBM_logo.svg.png',
      job_title: 'Cloud Architect',
      job_city: 'Bangalore',
      job_country: 'India',
      job_required_skills: ['AWS', 'Azure', 'Cloud Computing'],
      estimated_salary: '20 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.ibm.com/careers'
    },
    {
      id: '8',
      employer_name: 'Capgemini',
      employer_logo: 'https://www.capgemini.com/wp-content/uploads/2025/02/default-logo.webp',
      job_title: 'Business Analyst',
      job_city: 'Mumbai',
      job_country: 'India',
      job_required_skills: ['SQL', 'Data Analysis', 'Business Intelligence'],
      estimated_salary: '11 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.capgemini.com/careers'
    },
    {
      id: '9',
      employer_name: 'Tech Mahindra',
      employer_logo: 'https://etimg.etb2bimg.com/photo/111605159.cms',
      job_title: 'Network Engineer',
      job_city: 'Pune',
      job_country: 'India',
      job_required_skills: ['Networking', 'CCNA', 'Troubleshooting'],
      estimated_salary: '8 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://careers.techmahindra.com'
    },
    {
      id: '10',
      employer_name: 'L&T Infotech',
      employer_logo: 'https://content.jdmagicbox.com/v2/comp/bangalore/27/080p4307427/catalogue/larsen-and-toubro-infotech-ltd-whitefield-bangalore-computer-software-developers-adhejnrpfc.jpg',
      job_title: 'Quality Analyst',
      job_city: 'Chennai',
      job_country: 'India',
      job_required_skills: ['Testing', 'Automation', 'Selenium'],
      estimated_salary: '9 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.lntinfotech.com/careers'
    },
    {
      id: '11',
      employer_name: 'Mphasis',
      employer_logo: 'https://static.startuptalky.com/2020/11/Inside-Article-Image-14-.jpg',
      job_title: 'Cyber Security Analyst',
      job_city: 'Bangalore',
      job_country: 'India',
      job_required_skills: ['Cyber Security', 'Risk Management', 'Compliance'],
      estimated_salary: '16 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.mphasis.com/careers'
    },
    {
      id: '12',
      employer_name: 'Zensar Technologies',
      employer_logo: 'https://www.rockstudcap.com/assets/images/blog/185939d656192933d184a04f7264dc98.png',
      job_title: 'SAP Consultant',
      job_city: 'Pune',
      job_country: 'India',
      job_required_skills: ['SAP', 'ERP', 'Consulting'],
      estimated_salary: '14 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.zensar.com/careers'
    },
    {
      id: '13',
      employer_name: 'Oracle',
      employer_logo: 'https://5.imimg.com/data5/SELLER/Default/2023/9/348680278/XY/GU/GW/197867024/oracle-internet-application-server-std-for-windows-linux-per-user-lic-500x500.png',
      job_title: 'Database Administrator',
      job_city: 'Hyderabad',
      job_country: 'India',
      job_required_skills: ['SQL', 'PL/SQL', 'Oracle DB'],
      estimated_salary: '13 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.oracle.com/careers'
    },
    {
      id: '14',
      employer_name: 'Salesforce',
      employer_logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC8tgeDcYtezt1igXtlWcIHvo6hRw_rKYhbQ&s',
      job_title: 'Salesforce Developer',
      job_city: 'Bangalore',
      job_country: 'India',
      job_required_skills: ['Apex', 'Visualforce', 'Lightning'],
      estimated_salary: '18 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.salesforce.com/company/careers'
    },
    {
      id: '15',
      employer_name: 'Dell',
      employer_logo: 'https://images.seeklogo.com/logo-png/3/2/dell-logo-png_seeklogo-39672.png',
      job_title: 'Systems Engineer',
      job_city: 'Chennai',
      job_country: 'India',
      job_required_skills: ['Networking', 'Windows Server', 'Linux'],
      estimated_salary: '11 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.dell.com/en-us/work/solutions/careers'
    },
    {
      id: '16',
      employer_name: 'Zoho',
      employer_logo: 'https://brandlogos.net/wp-content/uploads/2022/07/zoho-logo_brandlogos.net_titlb.png',
      job_title: 'Software Tester',
      job_city: 'Chennai',
      job_country: 'India',
      job_required_skills: ['Testing', 'Automation', 'Selenium'],
      estimated_salary: '8 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.zoho.com/careers'
    },
    {
      id: '17',
      employer_name: 'Paytm',
      employer_logo: 'https://www.logo.wine/a/logo/Paytm/Paytm-Logo.wine.svg',
      job_title: 'Product Manager',
      job_city: 'Noida',
      job_country: 'India',
      job_required_skills: ['Product Management', 'Agile', 'Scrum'],
      estimated_salary: '20 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://paytm.com/careers'
    },
    {
      id: '18',
      employer_name: 'Ola',
      employer_logo: 'https://cdn.olaelectric.com/sites/evdp/pages/news_room/press_kit/branding/branding-featured.webp',
      job_title: 'Mobile App Developer',
      job_city: 'Bangalore',
      job_country: 'India',
      job_required_skills: ['React Native', 'Java', 'Swift'],
      estimated_salary: '15 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://ola.com/careers'
    },
    
    {
      id: '20',
      employer_name: 'Tech Innovators',
      employer_logo: 'https://cdn.dribbble.com/userupload/10246477/file/original-9ee724914b71ad0b217e0f78ab5bfceb.jpg?crop=0x489-2000x1989',
      job_title: 'Product Designer',
      job_city: 'Bangalore',
      job_country: 'India',
      job_required_skills: ['Figma', 'Sketch'],
      estimated_salary: '8 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.techinnovators.com/careers'
    },
    {
      id: '21',
      employer_name: 'NextGen Tech',
      employer_logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQFwBSLo2Kg_eg/company-logo_200_200/company-logo_200_200/0/1687938284398/next_gen_tech_services_logo?e=2147483647&v=beta&t=kK-8dHpSo-oT0JDcRiiI7q-w5aKMUcVYHQH3JqxBr3E',
      job_title: 'Data Analyst',
      job_city: 'Pune',
      job_country: 'India',
      job_required_skills: ['Python', 'SQL'],
      estimated_salary: '7 LPA',
      job_posted_at_timestamp: new Date().toISOString(),
      job_apply_link: 'https://www.nextgentech.com/careers'
    }
  ];

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchJobs = async () => {
      const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
          query: 'Software Engineer in India',
          page: '1',
          num_pages: '1',
          remote_jobs_only: 'false'
        },
        headers: {
          'X-RapidAPI-Key': '87642e8656msh75f1750380c12d7p1bb310jsne0722bd56669',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
          'Content-Type': 'application/json'
        }
      };

      try {
        // Add delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const response = await axios.request(options);
        console.log('API Response:', response.data);

        if (response.data && response.data.data) {
          // Use mock data if API returns empty or rate limited
          const processedJobs = response.data.data.length > 0 
            ? response.data.data.map(job => ({
                id: job.job_id || Math.random().toString(),
                employer_name: job.employer_name || 'Company Name Not Available',
                employer_logo: job.employer_logo || 'https://via.placeholder.com/50', // Fallback logo
                job_title: job.job_title || 'Position Not Specified',
                job_city: job.job_city || 'Location Not Specified',
                job_country: job.job_country || 'India',
                job_required_skills: 
                  (job.job_required_skills && job.job_required_skills.length > 0) 
                    ? job.job_required_skills 
                    : ['Skills not specified'],
                estimated_salary: 
                  job.job_min_salary 
                    ? `${(job.job_min_salary/100000).toFixed(1)} LPA`
                    : job.job_max_salary 
                      ? `${(job.job_max_salary/100000).toFixed(1)} LPA`
                      : 'Not Disclosed',
                job_posted_at_timestamp: job.job_posted_at_timestamp || new Date().toISOString(),
                job_apply_link: job.job_apply_link || '#'
              }))
            : mockJobs;

          setJobs(processedJobs);
          setLoading(false);
        } else {
          // Use mock data if API response is invalid
          setJobs(mockJobs);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error details:', error);
        // Use mock data on error
        setJobs(mockJobs);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [navigate]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filter jobs based on the search term
  const filteredJobs = jobs.filter(job => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      job.job_title.toLowerCase().includes(lowerCaseSearchTerm) ||
      job.employer_name.toLowerCase().includes(lowerCaseSearchTerm) ||
      job.job_city.toLowerCase().includes(lowerCaseSearchTerm) ||
      job.job_country.toLowerCase().includes(lowerCaseSearchTerm) ||
      job.job_required_skills.some(skill => skill.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  // Sort jobs based on the selected option
  const sortedJobs = filteredJobs.sort((a, b) => {
    if (sortOption === 'date') {
      return new Date(b.job_posted_at_timestamp) - new Date(a.job_posted_at_timestamp);
    } else if (sortOption === 'salary') {
      return parseInt(b.estimated_salary) - parseInt(a.estimated_salary);
    }
    return 0;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
        <p>Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <h3>Error Loading Jobs</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="retry-button"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="jobs-header">
        <div className="header-content">
          <h1>Available Jobs</h1>
          <button onClick={handleLogout} className="logout-button">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by Location, Role, or Skills"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={sortOption} onChange={handleSortChange}>
          <option value="date">Sort by Date</option>
          <option value="salary">Sort by Salary</option>
        </select>
      </div>
      <div className="job-list-container">
        <div className="job-list">
          {sortedJobs.length > 0 ? (
            sortedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="no-jobs-message">
              <h3>No Jobs Found</h3>
              <p>No job listings match your search criteria. Please try again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobList; 