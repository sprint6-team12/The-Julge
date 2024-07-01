interface ApplicationBase {
  id: string;
  status: ApplicationStatus;
  createdAt: string;
  shop: ShopData;
  notice: NoticeData;
}

interface ApplicationEmployee extends ApplicationBase {}
interface ApplicationEmployer extends ApplicationBase {
  user: UserData;
}

type Application = ApplicationEmployee | ApplicationEmployer;

interface ApplicationItem {
  item: Application;
  links?: Link[];
}

interface ApplicationListResponseData {
  offset: number;
  limit: number;
  count?: number;
  hasNext?: boolean;
  items: ApplicationItem[];
  links?: Link[];
}
