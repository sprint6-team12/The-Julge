import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import Button from '@/components/Button/Button';
import FormGroup from '@/components/FormGroup/FormGroup';
import ConfirmModal from '@/components/pageComponents/MyPage/ConfirmModal';
import useModal from '@/hooks/useModal';
import noticeAPI, { ShopNoticeData } from '@/lib/api/noticeAPI';
import {
  clearError,
  hasErrors,
  handleInputChange,
} from '@/lib/utils/FormUtils';
import { validateAddNoticeForm } from '@/lib/utils/InputValidation';
import { userState } from '@/recoil/atoms/AuthAtom';

export interface ShopNoticeFormErrors {
  hourlyPay: string | null;
  startsAt: string | null;
  workhour: string | null;
  description: string | null;
}

const initialFormData: ShopNoticeData = {
  hourlyPay: 0,
  startsAt: '',
  workhour: 0,
  description: '',
};

const initialFormErrors: ShopNoticeFormErrors = {
  hourlyPay: null,
  startsAt: null,
  workhour: null,
  description: null,
};

export default function AddNoticeInput() {
  const { shopId } = useRecoilValue(userState);
  const { openModal } = useModal();
  const [data, setData] = useState<ShopNoticeData>(initialFormData);
  const [errors, setErrors] = useState<ShopNoticeFormErrors>(initialFormErrors);

  const handleChangeData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    handleInputChange(setData, name, value);
    clearError(setErrors, name as keyof ShopNoticeFormErrors);
  };
  const handleOpenConfirmModal = () => {
    openModal('addNoticeConfirmModal', ConfirmModal, {
      // onConfirm: () => // 공고 상세 페이지로 이동
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateAddNoticeForm(data);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
    } else {
      try {
        if (typeof shopId === 'string') {
          await noticeAPI.postShopNotice(shopId, {
            hourlyPay: data.hourlyPay,
            startsAt: data.startsAt,
            workhour: data.workhour,
            description: data.description,
          });
          handleOpenConfirmModal();
        } else {
          throw new Error('유효하지 않은 ID');
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="flex-center">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="tablet:flex tablet:justify-between tablet:gap-20px pc:flex pc:gap-20px">
          <div className="pc:flex pc:justify-between pc:basis-2/3 gap-20px w-full">
            <div className="mb-20px w-full">
              <FormGroup>
                <FormGroup.Label htmlFor="hourlyPay">시급*</FormGroup.Label>
                <FormGroup.InputWrapper className="flex input-base">
                  <FormGroup.InputField
                    name="hourlyPay"
                    type="text"
                    value={data.hourlyPay}
                    onChange={handleChangeData}
                  />
                  <span>원</span>
                </FormGroup.InputWrapper>
                <FormGroup.ErrorMessage errorMessage={errors.hourlyPay} />
              </FormGroup>
            </div>
            <div className="mb-60px h-58px w-full">
              <FormGroup>
                <FormGroup.Label htmlFor="startsAt">시작 일시*</FormGroup.Label>
                <FormGroup.InputField
                  id="startsAt"
                  name="startsAt"
                  type="datetime-local"
                  value={data.startsAt}
                  onChange={handleChangeData}
                  className="input-base"
                />
                <FormGroup.ErrorMessage errorMessage={errors.startsAt} />
              </FormGroup>
            </div>
          </div>
          <div className="mb-20px w-full pc:basis-1/3">
            <FormGroup>
              <FormGroup.Label htmlFor="workhour">업무 시간*</FormGroup.Label>
              <FormGroup.InputWrapper className="flex input-base">
                <FormGroup.InputField
                  id="workhour"
                  name="workhour"
                  type="number"
                  value={data.workhour}
                  onChange={handleChangeData}
                />
                <span className="w-40px">시간</span>
              </FormGroup.InputWrapper>
              <FormGroup.ErrorMessage errorMessage={errors.workhour} />
            </FormGroup>
          </div>
        </div>
        <FormGroup>
          <FormGroup.Label htmlFor="description">공고 설명</FormGroup.Label>
          <FormGroup.InputField.Textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleChangeData}
            placeholder="공고 설명을 입력하세요"
            className="h-153px"
          />
        </FormGroup>

        <div className="mt-24px text-center">
          <Button className="button_large_active" type="submit">
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}
