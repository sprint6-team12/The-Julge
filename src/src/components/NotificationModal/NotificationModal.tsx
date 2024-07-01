import AlertItem from '@/components/NotificationModal/AlertItem';
import { IconCloseBlack } from '@/lib/utils/Icons';

interface NotificationModalProps {
  data: NotificationListResponseData;
  onClose: () => void; // onClose 함수
}

export default function NotificationModal({
  data,
  onClose,
}: NotificationModalProps) {
  const items = data?.items || [];
  const filteredItem = items.filter(({ item }) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const itemDate = new Date(item.createdAt);

    return !item.read || (item.read && itemDate > oneWeekAgo);
  });

  return (
    <div className="fixed tablet:relative pc:relative inset-0 flex z-50">
      <div className="relative w-full h-full tablet:right-0 pc:right-0 tablet:top-12px pc:top-12px tablet:absolute pc:absolute tablet:w-350px tablet:h-400px pc:w-350px pc:h-400px bg-red10 border rounded-10px overflow-y-auto">
        <div className="flex flex-col w-full h-full gap-12px py-24px px-20px">
          <div className="flex items-center justify-between">
            <p className="font-bold text-20px">알림 {filteredItem.length}개</p>
            <IconCloseBlack onClick={onClose} className="cursor-pointer" />
          </div>
          <div
            className={`flex flex-col gap-12px ${filteredItem.length > 2 && 'overflow-y-scroll'}`}
          >
            {filteredItem.map(({ item }) => (
              <AlertItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
