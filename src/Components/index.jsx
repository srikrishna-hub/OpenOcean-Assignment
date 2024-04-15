import React, { useEffect, useState } from 'react';
import ColoursListTable from '../Components/ColoursListTable';
import ColourFinder from '../Components/ColourFinder';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Colour = () => {
  const [data, setData] = useState(null);
  const [filteredColors, setFilteredColors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json`
      );
      const jsonData = await response.json();
      setData(jsonData?.colors.slice(0,50));
      setFilteredColors(jsonData?.colors.slice(0,50));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Retry again by reloading the page');
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <div className="container">
      <ColourFinder
        data={data}
        setFilteredColors={setFilteredColors}
      />
      {loading && <FontAwesomeIcon icon={faSpinner} spin className='loader' />}
      {!loading && filteredColors?.length > 0 && (
        <ColoursListTable colours={filteredColors} />
      )}
    </div>
  );
};

export default Colour;
