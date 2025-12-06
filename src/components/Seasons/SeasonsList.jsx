import React from 'react';
import { seasonsData } from '../../data/seasonsData';
import SeasonDetail from './SeasonDetail';
import './Seasons.css';

const SeasonsList = () => (
  <div className="Seasons-list">
    {seasonsData.map((season) => (
      <SeasonDetail key={season.id} season={season} />
    ))}
  </div>
);

export default SeasonsList;