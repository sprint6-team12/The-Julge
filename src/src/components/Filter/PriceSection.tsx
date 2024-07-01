export default function PriceSection({
  inputPrice,
  onPriceChange,
}: {
  inputPrice: string;
  onPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-16px">
      <p>금액</p>
      <div className="flex items-center gap-18px">
        <div className="relative">
          <input
            type="text"
            placeholder="입력"
            className="w-180px py-16px px-20px border border-gray300 rounded-6px pr-12"
            value={inputPrice}
            onChange={onPriceChange}
          />
          <span className="absolute transform -translate-y-1/2 right-4 top-1/2">
            원
          </span>
        </div>
        <p>이상부터</p>
      </div>
    </div>
  );
}
