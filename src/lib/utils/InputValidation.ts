import { ShopNoticeFormErrors } from '@/components/pageComponents/AddNotice/AddNoticeInput';
import { UserInfoFormErrors } from '@/components/pageComponents/MyPage/MyPageInput';
import {
  NOTICE_ERROR_MESSAGES,
  MYPAGE_ERROR_MESSAGES,
} from '@/constants/errorMessage';
import { ShopNoticeData } from '@/lib/api/noticeAPI';
import { UserInfo } from '@/lib/api/userAPI';

// AddNotice 유효성 검사 함수
export const validateAddNoticeForm = (
  data: ShopNoticeData
): ShopNoticeFormErrors => {
  const { hourlyPay, startsAt, workhour } = data;
  const errors: ShopNoticeFormErrors = {
    hourlyPay: null,
    startsAt: null,
    workhour: null,
    description: null,
  };

  if (!hourlyPay || hourlyPay === 0) {
    errors.hourlyPay = NOTICE_ERROR_MESSAGES.HOURLY_PAY_REQUIRED;
  } else if (hourlyPay <= 1000) {
    errors.hourlyPay = NOTICE_ERROR_MESSAGES.HOURLY_PAY_TOO_LOW;
  }
  if (!startsAt) {
    errors.startsAt = NOTICE_ERROR_MESSAGES.STARTS_AT_REQUIRED;
  } else {
    const startsAtDate = new Date(startsAt);
    if (startsAtDate < new Date()) {
      errors.startsAt = NOTICE_ERROR_MESSAGES.STARTS_AT_PAST_DATE;
    }
  }
  if (!workhour || workhour === 0) {
    errors.workhour = NOTICE_ERROR_MESSAGES.WORK_HOUR_REQUIRED;
  } else if (workhour > 24) {
    errors.workhour = NOTICE_ERROR_MESSAGES.WORK_HOUR_EXCEEDS_LIMIT;
  }

  return errors;
};

// MyPage 유효성 검사 함수
export const validateMyPageForm = (data: UserInfo): UserInfoFormErrors => {
  const { name, phone } = data;
  const errors: UserInfoFormErrors = {
    name: null,
    phone: null,
    address: null,
    bio: null,
  };

  if (!name) {
    errors.name = MYPAGE_ERROR_MESSAGES.NAME_REQUIRED;
  }
  if (!phone) {
    errors.phone = MYPAGE_ERROR_MESSAGES.PHONE_REQUIRED;
  }

  return errors;
};
