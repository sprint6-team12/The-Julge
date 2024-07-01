import LinkButton from '@/components/Button/LinkButton';

export default function NoData({
  title,
  text,
  href,
  onClick,
}: {
  title: string;
  text: string;
  href?: string;
  onClick?: () => void;
}) {
  const RenderButton = () => {
    if (href) {
      return (
        <LinkButton className="button_large_active" href={href}>
          {text}
        </LinkButton>
      );
    } else if (onClick) {
      return (
        <button className="button_large_active" onClick={onClick}>
          {text}
        </button>
      );
    }
  };

  return (
    <div className="flex-col w-full border border-solid flex-center py-60px border-gray20 rounded-12px gap-24px">
      <p>{title}</p>
      {RenderButton()}
    </div>
  );
}
