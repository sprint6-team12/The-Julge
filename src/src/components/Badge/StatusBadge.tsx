const STATUS_MAP = {
  pending: {
    backgroundColor: 'bg-green10',
    textColor: 'text-green20',
    text: '대기중',
  },
  accepted: {
    backgroundColor: 'bg-blue10',
    textColor: 'text-blue20',
    text: '승인 완료',
  },
  rejected: {
    backgroundColor: 'bg-red10',
    textColor: 'text-red40',
    text: '거절',
  },
  canceled: {
    backgroundColor: 'bg-gray10',
    textColor: 'text-gray40',
    text: '취소',
  },
};

interface StatusBadgeProps {
  status: ApplicationStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const { backgroundColor, textColor, text } = STATUS_MAP[status];

  return (
    <span
      className={`px-10px py-6px rounded-20px tablet:font-bold pc:font-bold text-12px tablet:text-14px pc:text-14px inline-flex justify-center items-center ${backgroundColor} ${textColor}`}
    >
      {text}
    </span>
  );
}

export default StatusBadge;
