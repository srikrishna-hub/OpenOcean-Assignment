import React, { useState, useEffect } from 'react';
import { getColorDifference, isValidColor } from './Utils';

const ColourFinder = ({ setFilteredColors, data }) => {
  const [colorName, setColorName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (colorName.length === 0) {
      setFilteredColors(data);
    }
  }, [colorName]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setErrorMsg(false);
      if (isValidColor(colorName)) {
        const sortedColors = data.slice().sort((color1, color2) => {
          const diff1 = getColorDifference(colorName, color1.hex);
          const diff2 = getColorDifference(colorName, color2.hex);
          return diff1 - diff2;
        });
        setFilteredColors(sortedColors.slice(0, 100));
      } else {
        setErrorMsg(true);
        setFilteredColors([]);
      }
    }
  };

  return (
    <div className="color-finder">
      <h2>Colour Searcher</h2>
      <label htmlFor="color-input">Colour</label> <br />
      <input
        id="color-input"
        className={`input ${errorMsg && 'error-input'}`}
        value={colorName}
        name="color-input"
        placeholder="Enter Colour"
        onKeyPress={handleSearch}
        onChange={(e) => setColorName(e.target.value)}
      />
      {errorMsg && <p className="error-txt">Please enter valid color</p>}
    </div>
  );
};

export default ColourFinder;
