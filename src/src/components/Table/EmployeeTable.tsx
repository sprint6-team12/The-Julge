import StatusBadge from '@/components/Badge/StatusBadge';
import FormatUtils from '@/lib/utils/FormatUtils';

interface EmployeeTableProps {
  data: ApplicationListResponseData;
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
            const { name } = shop.item;
            const { hourlyPay, workhour, startsAt } = notice.item;
            const price = FormatUtils.price(hourlyPay);
            const { formattedSchedule } = FormatUtils.workSchedule(
              startsAt,
              workhour
            );

            return (
              <tr key={id}>
                <td
                  className={`${baseTdStyle} min-w-189px tablet:min-w-[228px] pc:w-228px sticky left-0px pl-8px`}
                >
                  {name}
                </td>
                <td
                  className={`${baseTdStyle} min-w-162px tablet:min-w-[300px] pl-8px`}
                >
                  {formattedSchedule}
                </td>
                <td className={`${baseTdStyle} min-w-162px pl-8px`}>
                  {price}원
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
