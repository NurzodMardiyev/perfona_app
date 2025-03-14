import { MdLibraryAddCheck } from "react-icons/md";
import { Form, Input, notification } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { Perfona } from "../queries/queries.js";
import { useContext } from "react";
import { contextPerfona } from "../context/contextApi.jsx";
import { useState } from "react";
import MaskedInput from "react-text-mask";

export default function AddCard() {
  const queryClient = useQueryClient();
  const { user } = useContext(contextPerfona);
  const [responseData, setResponseData] = useState();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [successData, setSuccessData] = useState({
    transaction_id: "5162",
    chatID: "1234",
    otp: "",
  });

  const addCard = useMutation((fullData) => Perfona.addCard(fullData), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("addCard");
      if (data?.error) {
        openNotificationWithIcon("error");
      } else if (data?.success) {
        openNotificationWithIcon("success");
        setSuccessData((prevState) => ({
          ...prevState,
          transaction_id: data?.transaction_id,
        }));
      }
      setResponseData(data);
    },
    onError: () => {
      openNotificationWithIcon("server");
    },
  });

  const otpCode = useMutation((fullData) => Perfona.otpCode(fullData), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("otpCode");
      console.log(data);
    },
    onError: () => {
      openNotificationWithIcon("server");
    },
  });

  console.log(successData);

  const handleSendValues = async (data) => {
    const card_number = cardNumber;
    const fullData = { ...data, chatID: "1234", card_number, expiry };

    addCard.mutate(fullData);
  };

  const handleInputChangeCardNumber = (e) => {
    const value = e.target.value.replace(/\s/g, ""); // Probellarni olib tashlash
    setCardNumber(value);
  };

  const handleInputChangeExpiry = (e) => {
    const inputValue = e.target.value.replace("/", "");

    let value = inputValue.slice(2) + inputValue.slice(0, 2);

    setExpiry(value);
  };

  const handleChangeSmsValue = (e) => {
    console.log(e);
    setSuccessData((prevState) => ({
      ...prevState,
      otp: e,
    }));
  };

  const openNotificationWithIcon = (type) => {
    api[type]({
      message:
        type === "server"
          ? "Serverda Xatolik"
          : type === "success"
          ? "Ajoyib!"
          : "Xatolik",
      description:
        type === "server"
          ? "Serverda xatolik boʻlishi mumkin. Tez orada hal qilishga harakat qilamiz!. Uzur!"
          : type === "success"
          ? "Karta maʻlumotlaringiz saqlandi. Sms kodni tasdiqlang!"
          : "Karta maʻlumotlaringiz saqlanmadi. Qaytadan urinib ko'ring!",
    });
  };

  const handleSendSmsCode = () => {
    otpCode.mutate(successData);
  };

  return (
    <div>
      <div>
        <Form onFinish={handleSendValues}>
          <Form.Item name="card_number" label="Karta raqami">
            <MaskedInput
              mask={[
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                " ",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                " ",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                " ",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
              placeholder="1234 5678 9012 3456"
              className="rounded-md mt-[-10px] dark:bg-gray-800 dark:text-white cardInput px-2 py-2 w-full border border-gray-600 focus:outline-blue-600 focus-within:outline-blue-400 focus-visible:outline-blue-600"
              guide={false}
              onChange={handleInputChangeCardNumber}
            />
          </Form.Item>
          <div className="flex gap-5">
            <Form.Item name="expiry" label="Muddati">
              <MaskedInput
                mask={[/\d/, /\d/, "/", /\d/, /\d/]}
                placeholder="12/34"
                className="rounded-md mt-[-10px] dark:bg-gray-800 dark:text-white cardInput px-2 py-2 w-full border border-gray-600 focus:outline-blue-600 focus-within:outline-blue-400 focus-visible:outline-blue-600"
                guide={false}
                onChange={handleInputChangeExpiry}
              />
            </Form.Item>
            <Form.Item label="Karta nomi">
              <Input className="rounded-md mt-[-10px] dark:bg-gray-800 dark:text-white cardInput" />
            </Form.Item>
          </div>
          {contextHolder}
          <div className="flex items-center smsInput">
            <Form.Item
              label="Kodni kiriting"
              hasFeedback
              validateStatus="success"
              className="flex items-center"
            >
              <Input.OTP
                className="min-h-[39px] p-0 inline-block"
                onChange={handleChangeSmsValue}
              />
              <button
                type="button"
                className="ms-3 text-blue-500"
                onClick={handleSendSmsCode}
              >
                Yubor..
              </button>
            </Form.Item>
          </div>
          <p>{user?.id}</p>
          <p>{user?.first_name}</p>
          {/* <p>{responseData}</p> */}
          <p>name</p>
          <div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-md text-white bg-gradient-to-tl from-[#003EFF] to-[#0094FF] float-end flex items-center gap-1"
            >
              {/* <FaDownLeftAndUpRightToCenter /> */}
              <MdLibraryAddCheck className="text-[24px] mt-[-1px]" />
              {/* <span className="leading-[18px]">Oʻzgartirish</span> */}
              <span className="leading-[20px]">Kiritish</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
