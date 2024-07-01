import IconEllipseBlue from '@/../public/images/icon-ellipse-blue.svg';
import IconEllipseGray from '@/../public/images/icon-ellipse-gray.svg';
import IconEllipseOrange from '@/../public/images/icon-ellipse-orange.svg';

export const getResultInfo = (result: string) => {
  switch (result) {
    case 'canceled':
      return {
        icon: <IconEllipseGray />,
        text: <span className="text-gray30">취소</span>,
      };
    case 'rejected':
      return {
        icon: <IconEllipseOrange />,
        text: <span className="text-red20">거절</span>,
      };
    case 'accepted':
      return {
        icon: <IconEllipseBlue />,
        text: <span className="text-blue20">승인</span>,
      };
    default:
      return null;
  }
};
