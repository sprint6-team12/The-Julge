import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import NotificationModal from '@/components/NotificationModal/NotificationModal';
import alertAPI from '@/lib/api/alertAPI';
import { IconStatusActive, IconStatusInactive } from '@/lib/utils/Icons';
import { userState } from '@/recoil/atoms/AuthAtom';
const initialNotificationData: NotificationListResponseData = {
  items: [],
  offset: 0,
  limit: 10,
  count: 0,
  hasNext: false,
  links: [],
};

export default function NotificationButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationData, setNotificationData] =
    useState<NotificationListResponseData>(initialNotificationData);
  const [unreadCount, setUnreadCount] = useState(0);
  const user = useRecoilValue(userState);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (isModalOpen && user?.userId) {
        try {
          const data: NotificationListResponseData = await alertAPI.getAlerts({
            user_id: user.userId,
          });
          setNotificationData(data);
          setUnreadCount(data.items.filter(({ item }) => !item.read).length);
        } catch (error) {
          error;
        }
      }
    };
    fetchNotifications();
  }, [isModalOpen, user?.userId]);

  const handleClickNotification = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="relative w-5 h-5">
      <button type="button" onClick={handleClickNotification}>
        {unreadCount > 0 ? (
          <IconStatusActive aria-label="알림 활성화" />
        ) : (
          <IconStatusInactive aria-label="알림 비활성화" />
        )}
      </button>
      {isModalOpen && (
        <div className="absolute top-full right-0 mt-2">
          <NotificationModal
            data={notificationData}
            onClose={handleClickNotification}
          />
        </div>
      )}
    </div>
  );
}
