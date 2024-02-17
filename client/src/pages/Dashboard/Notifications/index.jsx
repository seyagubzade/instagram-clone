import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../../../store/notifications/api_actions';

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  return (
    <div>Notifications</div>
  )
}

export default Notifications