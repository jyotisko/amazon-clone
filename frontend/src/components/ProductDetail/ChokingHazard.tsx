import React from 'react';
import { VscWarning } from 'react-icons/vsc';

interface ChokingHazardProps {
  isChokingHazard: boolean;
  chokingHazardText?: string;
};

const ChokingHazard: React.FC<ChokingHazardProps> = ({ isChokingHazard, chokingHazardText }) => {
  return (
    <React.Fragment>
      {
        isChokingHazard && (
          <section className="section section--hazard">
            <i className="icon icon--hazard"><VscWarning /></i>
            <h2 className="section--hazard__text">
              {chokingHazardText ? chokingHazardText : 'Choking Hazard! Children must be under adult supervision.'}
            </h2>
          </section>
        )
      }
    </React.Fragment>
  );
};

export default ChokingHazard;
