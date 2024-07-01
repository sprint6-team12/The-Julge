export interface Application {
  id: string;
  status: string;
}

export interface AlertItemProps {
  id: string;
  createdAt: string;
  result: string;
  read: boolean;
  application: {
    item: Application;
    href: string;
  };
  shop: ShopData;
  notice: {
    item: Notice;
    href: string;
  };
  links: Link[];
}

export interface NotificationProps {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: {
    item: AlertItemProps;
  }[];
  links: Link[];
}

export interface NotificationModalProps {
  data: NotificationProps | null;
  onClose: () => void;
}
