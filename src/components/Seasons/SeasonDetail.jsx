import React from 'react';
import { Link } from 'react-router-dom';

const SeasonDetail = ({ season }) => {
    const detailStyle = {
        backgroundImage: `url('${season.posterUrl}')`,
    };

    return (
      <Link to={`/season/${season.id}`} style={{ textDecoration: 'none' }}>
        <div className="Season-detail" style={detailStyle}>
            <div className="Season-overlay">
                <h3>{season.title} ({season.year})</h3>
                <p>{season.plot.substring(0, 100)}...</p> 
                <div className="Season-links">
                  <div style={{color: '#00bcd4', fontWeight: 'bold'}}>READ MORE</div>
                </div>
            </div>
        </div>
      </Link>
    );
};

export default SeasonDetail;