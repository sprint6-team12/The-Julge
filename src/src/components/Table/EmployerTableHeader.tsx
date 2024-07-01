function EmployerTableHeader() {
  const baseThStyle = `border-gray20 border-1px bg-red10 text-left h-40px text-12px tablet:text-14px pc:text-14px`;
  const tableHeaders = [
    {
      label: '신청자',
      className: `${baseThStyle} min-w-189px tablet:min-w-[228px] pc:w-228px sticky left-0 p-0 pl-8px`,
    },
    {
      label: '소개',
      className: `${baseThStyle} min-w-162px tablet:min-w-[300px] pc:w-300px pl-8px`,
    },
    {
      label: '전화번호',
      className: `${baseThStyle} min-w-162px pl-8px`,
    },
    {
      label: '상태',
      className: `${baseThStyle} min-w-162px tablet:min-w-[220px] pc:w-236px pl-12px`,
    },
  ];

  return (
    <thead>
      <tr>
        {tableHeaders.map(({ className, label }, index) => (
          <th key={index} className={className}>
            {label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default EmployerTableHeader;
