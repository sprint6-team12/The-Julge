import {
  FormData,
  FormErrors,
} from '@/components/pageComponents/AddNotice/AddNoticeInput';
import { NOTICE_ERROR_MESSAGES } from '@/constants/errorMessage';

export const AddNoticeValidation = (data: FormData): FormErrors => {
  const { hourlyPay, startsAt, workHour } = data;
  const noticeErrors: FormErrors = {
    hourlyPay: null,
    startsAt: null,
    workHour: null,
  };

  if (!hourlyPay || parseFloat(hourlyPay) === 0) {
    noticeErrors.hourlyPay = NOTICE_ERROR_MESSAGES.HOURLY_PAY_REQUIRED;
  }
  if (!startsAt) {
    noticeErrors.startsAt = NOTICE_ERROR_MESSAGES.STARTS_AT_REQUIRED;
  } else {
    const startsAtDate = new Date(startsAt);

    if (startsAtDate < new Date()) {
      noticeErrors.startsAt = NOTICE_ERROR_MESSAGES.STARTS_AT_PAST_DATE;
    }
  }
  if (!workHour || workHour === 0) {
    noticeErrors.workHour = NOTICE_ERROR_MESSAGES.WORK_HOUR_REQUIRED;
  } else if (workHour > 24) {
    noticeErrors.workHour = NOTICE_ERROR_MESSAGES.WORK_HOUR_EXCEEDS_LIMIT;
  }

  return noticeErrors;
};
