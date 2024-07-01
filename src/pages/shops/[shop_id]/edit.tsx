import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import InputComponent from '@/components/AddShopPage/InputComponents';
import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import FormGroup from '@/components/FormGroup/FormGroup';
import { SHOP_LOCATIONS, SHOP_MENU_CATEGORIES } from '@/constants/shopOptions';
import imageAPI from '@/lib/api/imageAPI';
import shopAPI from '@/lib/api/shopAPI';
import { IconCloseBlack } from '@/lib/utils/Icons';
import { validateShopInfo } from '@/lib/utils/validation';
import { userState } from '@/recoil/atoms/AuthAtom';

interface ShopType {
  shopName: string;
  category: string;
  address1: string;
  address2: string;
  hourlyPay: string;
  shopDescription?: string | undefined;
  imageUrl?: string | undefined;
}

function EditShopPage() {
  const router = useRouter();
  const { shop_id } = router.query;
  const { isLogin } = useRecoilValue(userState);

  const [formData, setFormData] = useState<ShopType>({
    shopName: '',
    category: '',
    address1: '',
    address2: '',
    hourlyPay: '',
    shopDescription: '',
    imageUrl: '',
  });
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<Partial<ShopType>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      router.push('/');
      return;
    }

    const getShopData = async () => {
      try {
        const shopData = await shopAPI.getShop(shop_id as string);
        setFormData({
          shopName: shopData.item.name,
          category: shopData.item.category,
          address1: shopData.item.address1,
          address2: shopData.item.address2,
          hourlyPay: shopData.item.originalHourlyPay.toString(),
          shopDescription: shopData.item.description,
          imageUrl: shopData.item.imageUrl,
        });
        setImagePreview(shopData.item.imageUrl);
      } catch (error) {
        alert('가게 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setDisabled(false);
      }
    };

    if (shop_id) {
      getShopData();
    }
  }, [shop_id, isLogin, router]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    const errorMessage = validateShopInfo(id as keyof ShopType, value);
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleDropdownChange = (id: keyof ShopType, value: string) => {
    const errorMessage = validateShopInfo(id, value);
    setErrors((prevErrors) => ({ ...prevErrors, [id]: errorMessage }));
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file === undefined) return;
    const imageUrl = await imageAPI(file);
    setFormData((prevFormData) => ({ ...prevFormData, imageUrl: imageUrl }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleClose = () => {
    router.push('/');
  };

  const handleImageReset = () => {
    setImagePreview(null);
  };

  const handleTotalSubmit = async () => {
    const hourlyPayNumber = Number(formData.hourlyPay);
    try {
      if (
        formData.shopName &&
        formData.category &&
        formData.address1 &&
        formData.address2 &&
        hourlyPayNumber
      ) {
        setDisabled(true);
        const data = await shopAPI.putShop(shop_id as string, {
          name: formData.shopName,
          category: formData.category,
          address1: formData.address1,
          address2: formData.address2,
          description: formData.shopDescription,
          imageUrl: formData.imageUrl,
          originalHourlyPay: hourlyPayNumber,
        });
        if (data) {
          alert('수정이 완료되었습니다');
          router.push('/my-shop');
        }
      } else {
        alert('필수 입력 내용을 입력해주세요.');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex w-full py-24px px-12px flex-col items-start gap-8px bg-gray-50 tablet:px-12 tablet:py-12 pc:px-24 pc:py-16">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-8"
      >
        <div className="flex flex-col items-start gap-6 w-full tablet:gap-8 pc:gap-10">
          <div className="flex w-full justify-between items-center">
            <p className="text-black text-xl font-bold tablet:text-2xl pc:text-3xl">
              가게 정보 수정
            </p>
            <button onClick={handleClose}>
              <IconCloseBlack />
            </button>
          </div>
          <div className="flex flex-col gap-5 w-full tablet:flex-row tablet:flex-wrap tablet:gap-6 pc:gap-8">
            <div className="tablet:flex tablet:w-full tablet:h-92px tablet:gap-20px">
              <div className="flex flex-col gap-2 w-full tablet:w-1/2">
                <InputComponent
                  id="shopName"
                  name="가게 이름*"
                  type="input"
                  placeholder="입력"
                  value={formData.shopName}
                  onChange={handleInputChange}
                  errorMessage={errors.shopName || ''}
                />
              </div>
              <div className="flex flex-col gap-2 w-full tablet:w-1/2">
                <h1 className="mt-8px mb-4px">분류*</h1>
                <Dropdown
                  options={SHOP_MENU_CATEGORIES}
                  onSelect={(value) => handleDropdownChange('category', value)}
                  width="100%"
                  defaultValue={formData.category || '선택'}
                />
                {errors.category && (
                  <p className="text-red-500">{errors.category}</p>
                )}
              </div>
            </div>
            <div className="tablet:flex tablet:w-full tablet:h-92px tablet:gap-20px">
              <div className="flex flex-col gap-8px w-full tablet:w-1/2">
                <h1 className="mt-8px mb-4px">주소*</h1>
                <Dropdown
                  options={SHOP_LOCATIONS}
                  onSelect={(value) => handleDropdownChange('address1', value)}
                  width="100%"
                  defaultValue={formData.address1 || '선택'}
                />
                {errors.address1 && (
                  <p className="text-red-500">{errors.address1}</p>
                )}
              </div>
              <div className="flex flex-col gap-8px w-full tablet:w-1/2">
                <InputComponent
                  id="address2"
                  name="상세 주소*"
                  type="input"
                  placeholder="입력"
                  value={formData.address2}
                  onChange={handleInputChange}
                  errorMessage={errors.address2 || ''}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full pr-10px tablet:w-1/2">
              <InputComponent
                id="hourlyPay"
                name="기본 시급*"
                type="input"
                placeholder="입력"
                value={formData.hourlyPay}
                onChange={handleInputChange}
                errorMessage={errors.hourlyPay || ''}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h1>가게 이미지</h1>
              <div className="inline-block relative">
                <div onClick={handleClick}>
                  {imagePreview ? (
                    <>
                      <button>
                        <IconCloseBlack onClick={handleImageReset} />
                      </button>
                      <Image
                        src={imagePreview}
                        alt="Uploaded Image"
                        layout="responsive"
                        width={483}
                        height={276}
                        className="max-w-[483px] max-h-[276px] rounded-md"
                      />
                    </>
                  ) : (
                    <div className="flex justify-center items-center flex-shrink-0 rounded-[5px] border border-solid border-gray-30 bg-gray-10 h-276px w-483px">
                      <FormGroup.InputField.Image
                        id="imageUrl"
                        name="imageUrl"
                        onChange={handleImageChange}
                        className="border border-gray-300 bg-gray-200 rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full h-187px">
              <InputComponent
                id="shopDescription"
                name="가게 설명"
                type="textarea"
                placeholder="입력"
                value={formData.shopDescription}
                onChangeTextArea={handleInputChange}
                errorMessage=""
              />
            </div>
            <div className="flex justify-center w-full mt-8">
              <Button
                className="button_large"
                type="submit"
                onClick={handleTotalSubmit}
                disabled={disabled}
              >
                수정하기
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditShopPage;
