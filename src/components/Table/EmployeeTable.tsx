import StatusBadge from '../Badge/StatusBadge';

export interface EmployeeTableData {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: EmployeeTableItem[];
  links: EmployeeTableLink[];
}

interface EmployeeTableItem {
  item: EmployeeTableApplication;
  links: EmployeeTableLink[];
}

interface EmployeeTableLink {
  description: string;
  href: string;
  method: string;
  rel: string;
}

interface EmployeeTableNoticeBase {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
}

interface EmployeeTableNoticeDetailItem {
  item: EmployeeTableNoticeDetail;
  href: string;
}

interface EmployeeTableNoticeDetail extends EmployeeTableNoticeBase {}

interface EmployeeTableShopData {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}

interface EmployeeTableApplication {
  id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'canceled';
  createdAt: string;
  shop: EmployeeTableShop;
  notice: EmployeeTableNoticeDetailItem;
}

interface EmployeeTableShop {
  item: EmployeeTableShopData;
  href: string;
}
interface EmployeeTableProps {
  data: EmployeeTableData;
}

function EmployeeTable({ data }: EmployeeTableProps) {
  const baseThStyle =
    'border-gray20 border-1px bg-red10 text-left h-40px text-12px tablet:text-14px pc:text-14px';
  const baseTdStyle =
    'border-gray20 border-1px bg-white h-46px tablet:h-69px pc:h-69px text-14px tablet:text-16px pc:text-16px';

  const tableHeaders = [
    {
      label: '가게',
      className: `${baseThStyle} min-w-189px tablet:min-w-[228px] pc:w-228px sticky left-0 p-0 pl-8px`,
    },
    {
      label: '일자',
      className: `${baseThStyle} min-w-162px tablet:min-w-[300px] pc:w-300px pl-8px`,
    },
    {
      label: '시급',
      className: `${baseThStyle} min-w-162px pl-8px`,
    },
    {
      label: '상태',
      className: `${baseThStyle} min-w-162px tablet:min-w-[220px] pc:w-236px pl-12px`,
    },
  ];

  return (
    <div className="border-1px border-gray20 rounded-tr-10px rounded-tl-10px overflow-x-auto m-auto w-351px tablet:min-w-[680px] pc:min-w-[964px]">
      <table className="table-auto min-w-full">
        <thead>
          <tr>
            {tableHeaders.map(({ className, label }, index) => (
              <th key={index} className={className}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.items.map(({ item }) => {
            const { id, shop, notice, status } = item;

            return (
              <tr key={id}>
                <td
                  className={`${baseTdStyle} min-w-189px tablet:min-w-[228px] pc:w-228px sticky left-0px pl-8px`}
                >
                  {shop.item.name}
                </td>
                <td
                  className={`${baseTdStyle} min-w-162px tablet:min-w-[300px] pl-8px`}
                >
                  {notice.item.startsAt} ({notice.item.workhour})
                </td>
                <td className={`${baseTdStyle} min-w-162px pl-8px`}>
                  {notice.item.hourlyPay}
                </td>
                <td
                  className={`${baseTdStyle} min-w-162px tablet:min-w-[220px] pc:w-236px pl-12px`}
                >
                  <StatusBadge status={status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
