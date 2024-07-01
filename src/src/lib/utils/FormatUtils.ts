import { formatDistanceToNow, format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

class FormatUtils {
  // 가격 포맷: 00,000
  static price(price: number): string {
    return price.toLocaleString('ko-KR');
  }

  // 핸드폰 번호 포맷: 000-0000-0000
  static phoneNumber(phoneNumber: string): string {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  }

  // 주어진 날짜와 현재 시간 사이의 시간 간격을 한국어로 표시합니다
  // ex. "1일 전"
  static distanceToNow(dateString: string) {
    return formatDistanceToNow(parseISO(dateString), {
      addSuffix: true,
      locale: ko,
    });
  }

  // 시작 시간과 근무 시간을 기반으로 포맷된 근무 일정 문자열을 반환합니다
  // ex. formattedSchedule: "2024-07-23 12:00 ~ 15:00 (3시간)"
  static workSchedule(startTime: string, workHour: number) {
    const startDateTime = parseISO(startTime);
    const endDateTime = new Date(
      startDateTime.getTime() + workHour * 60 * 60 * 1000
    );

    const formattedStartDate = format(startDateTime, 'yyyy-MM-dd', {
      locale: ko,
    });
    const formattedStartTime = format(startDateTime, 'HH:mm', {
      locale: ko,
    });
    const formattedEndDate = format(endDateTime, 'yyyy-MM-dd', { locale: ko });
    const formattedEndTime = format(endDateTime, 'HH:mm', { locale: ko });

    const durationHours = workHour;
    const formattedSchedule = `${formattedStartDate} ${formattedStartTime} ~ ${formattedEndTime} (${durationHours}시간)`;

    return {
      formattedStartDate,
      formattedStartTime,
      formattedEndDate,
      formattedEndTime,
      durationHours,
      formattedSchedule,
    };
  }

  // 현재 시급과 원래 시급을 전달받아 몇 프로 증가했는지 백분율로 반환합니다
  // ex. "50"
  static payIncreasePercent(hourlyPay: number, originalHourlyPay: number) {
    if (originalHourlyPay <= 0) {
      throw new Error('originalHourlyPay should be greater than zero');
    }

    // percentage
    const percentage =
      ((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100;
    // 10단위로 표시
    const roundedPercentage = Math.round(percentage / 10) * 10;

    return { percentage, roundedPercentage };
  }

  /**
   * 주어진 URL에서 shopId, noticeId, applicantsId를 추출하고 형식화된 URL을 반환합니다.
   *
   * @param {string} url - 파싱할 URL  /api/6-12/the-julge/shops/[shop_id]/notices/[notice_id]/applicants/[applicant_id]
   * @returns {{ formattedUrl: string, shopId: string, noticeId: string, applicantsId: string }} - 추출된 ID 객체와 형식화된 URL
   */
  static parseIDAndFormatUrl(url: string) {
    const urlParts = url.split('/');

    const shopId = urlParts[5];
    const noticeId = urlParts[7];
    const applicantsId = urlParts[9];

    const formattedUrl =
      `/shops/${shopId}` +
      (noticeId ? `/notices/${noticeId}` : '') +
      (applicantsId ? `/applicants/${applicantsId}` : '');

    return {
      formattedUrl,
      shopId,
      noticeId,
      applicantsId,
    };
  }
}

export default FormatUtils;
