interface NoticeBase {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
}

interface currentUserApplication {
  id: string; // application.id
  status: ApplicationStatus; // application.status
  createdAt: string; // application.createdAt
}

interface NoticeEmployee extends NoticeBase {
  shop: ShopData;
  currentUserApplication?: { item: currentUserApplication };
}

interface NoticeEmployer extends NoticeBase {}

type Notice = NoticeEmployee | NoticeEmployer;

interface NoticeData {
  item: Notice;
  href?: string;
}

interface NoticeItem {
  item: Notice;
  links: Link[];
}
interface NoticeListResponseData {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  address: string[];
  keyword?: string;
  items: NoticeItem[];
  links?: Link[];
}

interface NoticeListResponse {
  data: NoticeListResponseData;
}
