import React, { useState, useEffect } from 'react';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { historyActions } from '../../store/historySlice';
import { historyStateType } from '../../types/stateTypes';

const ManageHistory: React.FC = () => {
  const dispatch = useDispatch();
  const history: historyStateType = useSelector((state: RootStateOrAny) => state.history);
  const [captureHistory, setCaptureHistory] = useState<boolean>(true);

  useEffect(() => setCaptureHistory(history.captureHistory), [history.captureHistory]);

  const toggleCapturingState = () => dispatch(historyActions.toggleCapturingState());
  const removeHistoryItems = () => dispatch(historyActions.removeAllProductsFromHistory());

  return (
    <section className="history__manage">
      <h3 className="history__manage__text">Manage history</h3>
      <button className="btn btn--remove-history history__manage__button" onClick={removeHistoryItems}>Remove all items from view</button>
      <div className="history__toggle">
        <h4 className="history__toggle__text">Turn browsing history on/off</h4>
        <h4 className="history__toggle__state">{history.captureHistory ? 'On' : 'Off'}</h4>
        <span className={`history__toggle__switch ${captureHistory ? 'on' : 'off'}`} onClick={toggleCapturingState}></span>
      </div>
    </section>
  );
};

export default ManageHistory;