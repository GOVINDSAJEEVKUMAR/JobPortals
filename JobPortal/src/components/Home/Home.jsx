import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../Navbar/Nav';
import axios from 'axios';

const DataFetchingComponent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Filter states
  const [titleFilter, setTitleFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8020/employee/getallJob');
      setData(response.data);
      setFilteredData(response.data);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter data
  const filterData = () => {
    const filtered = data.filter(item => (
      (titleFilter === '' || item.title.toLowerCase().includes(titleFilter.toLowerCase())) &&
      (companyFilter === '' || item.company.toLowerCase().includes(companyFilter.toLowerCase())) &&
      (locationFilter === '' || item.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
      (typeFilter === '' || item.type.toLowerCase().includes(typeFilter.toLowerCase()))
    ));
    setFilteredData(filtered);
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setTitleFilter(value);
    if (name === 'company') setCompanyFilter(value);
    if (name === 'location') setLocationFilter(value);
    if (name === 'type') setTypeFilter(value);
  };

  useEffect(() => {
    filterData();
  }, [titleFilter, companyFilter, locationFilter, typeFilter]);

  const handleApplyClick = (job) => {
    console.log('Applying for job:', job);
    
    navigate(`/application/${job._id}`, { state: { job } });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 flex">
        <div className="w-1/4 p-6 border-r border-gray-300 bg-gray-50">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">Filters</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Filter by title"
              value={titleFilter}
              onChange={handleFilterChange}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              name="company"
              placeholder="Filter by company"
              value={companyFilter}
              onChange={handleFilterChange}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              name="location"
              placeholder="Filter by location"
              value={locationFilter}
              onChange={handleFilterChange}
              className="border p-3 rounded-lg w-full"
            />
            <select
              name="type"
              value={typeFilter}
              onChange={handleFilterChange}
              className="border p-3 rounded-lg w-full"
            >
              <option value="">All Types</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
        </div>
        <div className="w-3/4 p-6">
          {loading && <p className="text-lg">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {filteredData.length > 0 ? (
            <ul className="space-y-4">
              {filteredData.map((item) => (
                <li key={item._id} className="border p-4 rounded-lg shadow-md bg-white">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-700">Company: {item.company}</p>
                  <p className="text-gray-700">Location: {item.location}</p>
                  <p className="text-gray-700">Type: {item.type}</p>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                  <button
                    onClick={() => handleApplyClick(item)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Apply
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p className="text-lg">No data available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DataFetchingComponent;
