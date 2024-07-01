import EmployerBody from './EmployerTableBody';
import EmployerHeader from './EmployerTableHeader';

interface EmployerTableProps {
  data: ApplicationListResponseData;
}

function EmployerTable({ data }: EmployerTableProps) {
  return (
    <div className="border-1px border-gray20 rounded-tr-10px rounded-tl-10px overflow-x-auto m-auto w-351px tablet:min-w-[680px] pc:min-w-[964px]">
      <table className="table-auto min-w-full">
        <EmployerHeader />
        <EmployerBody items={data.items} />
      </table>
    </div>
  );
}

export default EmployerTable;
