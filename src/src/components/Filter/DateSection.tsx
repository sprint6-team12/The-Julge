import DatePicker from 'react-datepicker';

export default function DateSection({
  startDate,
  setStartDate,
}: {
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
}) {
  return (
    <div className="flex flex-col pb-18px gap-16px">
      <p>시작일</p>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy년 MM월 dd일 (eee)"
        locale="ko"
        customInput={
          <input
            type="text"
            className="w-full px-4 border border-gray30 rounded-lg cursor-pointer py-16px"
            readOnly
          />
        }
      />
    </div>
  );
}
