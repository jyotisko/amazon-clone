import React from 'react';
import { GrDown } from 'react-icons/gr';

interface HeaderHistoryProps {
  onToggleManageHistory: Function;
  showState: boolean;
}

const HeaderHistory: React.FC<HeaderHistoryProps> = ({ onToggleManageHistory, showState }) => {
  return (
    <section className="history__header">
      <h1 className="history__header__text">Browsing history</h1>
      <h1 className="history__header__manage-text" onClick={() => onToggleManageHistory((prevState: boolean) => !prevState)}>
        Manage history <GrDown className={showState ? 'open' : ''} />
      </h1>
    </section>
  );
};

export default HeaderHistory;