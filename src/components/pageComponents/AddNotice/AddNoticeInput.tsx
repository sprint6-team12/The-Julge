import { useState } from 'react';
import Button from '@/components/Button/Button';
import FormGroup from '@/components/FormGroup/FormGroup';
import ModalPrimary from '@/components/Modal/ModalPrimary';
import useModal from '@/hooks/useModal';
import FormatUtils from '@/lib/utils/FormatUtils';
import { validateAddNoticeForm } from '@/lib/utils/InputValidation';
import { AddNoticeFormData, AddNoticeFormErrors } from '@/types/FormData';
import noticeAPI from '@/utils/api/noticeAPI';

const initialFormData: AddNoticeFormData = {
  hourlyPay: '',
  startsAt: '',
  workHour: 0,
  description: '',
};

const initialFormErrors: AddNoticeFormErrors = {
  hourlyPay: null,
  startsAt: null,
  workHour: null,
  description: null,
};

const ConfirmModal = ({ ...rest }) => (
  <ModalPrimary
    optionType="confirm"
    content="등록이 완료되었습니다."
    {...rest}
  />
);

export default function AddNoticeInput() {
  const { openModal } = useModal();
  const [data, setData] = useState<AddNoticeFormData>(initialFormData);
  const [errors, setErrors] = useState<AddNoticeFormErrors>(initialFormErrors);

  const handleChangeData = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    setData((prev) => ({
      ...prev,
      [name]:
        name === 'hourlyPay'
          ? FormatUtils.price(Number(value.replace(/,/g, '')))
          : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  const handleOpenConfirmModal = () => {
    openModal('addNoticeConfirmModal', ConfirmModal, {
      // onConfirm: () => //공고상세페이지로 이동
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateAddNoticeForm(data);
    if (Object.values(validationErrors).some((error) => error !== null)) {
      setErrors(validationErrors);
    } else {
      try {
        await noticeAPI.postShopNotice('shopId', {
          hourlyPay: Number(data.hourlyPay.replace(/,/g, '')),
          startsAt: data.startsAt,
          workhour: data.workHour,
          description: data.description,
        });
        alert('등록이 완료되었습니다');
        handleOpenConfirmModal();
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
              <FormGroup.Label htmlFor="workHour">업무 시간*</FormGroup.Label>
              <FormGroup.InputWrapper className="flex input-base">
                <FormGroup.InputField
                  id="workHour"
                  name="workHour"
                  type="number"
                  value={data.workHour}
                  onChange={handleChangeData}
                />
                <span className="w-40px">시간</span>
              </FormGroup.InputWrapper>
              <FormGroup.ErrorMessage errorMessage={errors.workHour} />
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
