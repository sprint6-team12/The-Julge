interface NotificationApplication {
  id: string;
  status: string;
}

interface NotificationApplicationData {
  item: NotificationApplication;
  href: string;
}

interface NotificationItem {
  id: string;
  createdAt: string;
  result: string;
  read: boolean;
  application: NotificationApplicationData;
  shop: ShopData;
  notice: NoticeData;
  links: Link[];
}

interface NotificationListResponseData {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: {
    item: NotificationItem;
  }[];
  links: Link[];
}
