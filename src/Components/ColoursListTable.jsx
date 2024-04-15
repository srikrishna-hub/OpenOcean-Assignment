import React from 'react';
import { hexToHsl, hexToRgba } from '../Components/Utils';

const ColoursListTable = ({ colours }) => {
  return (
    <div className="colours-table">
      <h5>All Colours</h5>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Hex</th>
            <th>RGB</th>
            <th>HSL</th>
          </tr>
        </thead>
        <tbody>
          {colours.map((item, index) => (
            <tr key={`${index}-${item.color}`}>
              <td className="color-name">
                <input type="color" className="color-input" value={item.hex} readOnly />
                {item.color}
              </td>
              <td>{item.hex}</td>
              <td>{hexToRgba(item.hex)}</td>
              <td>{hexToHsl(item.hex)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ColoursListTable;
