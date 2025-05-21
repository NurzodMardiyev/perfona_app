import { MdLibraryAddCheck } from "react-icons/md";
import { Form, Input, Modal, notification } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { Perfona } from "../queries/queries.js";
import { useContext } from "react";
import { contextPerfona } from "../context/contextApi.jsx";
import { useState } from "react";
import MaskedInput from "react-text-mask";
import { FaExclamation } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import "../App.css";

export default function AddCard({ setOpen }) {
  const queryClient = useQueryClient();
  const { user } = useContext(contextPerfona);
  const [responseData, setResponseData] = useState();
  const [cardNumber, setCardNumber] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [test, setTest] = useState(true);
  const [transaction_Id, setTransaction_Id] = useState();

  const addCard = useMutation((fullData) => Perfona.addCard(fullData), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("addCard");
      console.log(data);
      if (data?.data.error) {
        openNotificationWithIcon("error");
      } else if (data?.data.success) {
        openNotificationWithIcon("success");
        setTest(false);
        setTransaction_Id(data?.data.transaction_id);
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
      showModal();
      console.log(data);
    },
    onError: () => {
      openNotificationWithIcon("server");
    },
  });

  const handleSendValues = async (data) => {
    const card_number = cardNumber;

    const fullData = { ...data, telegram_chat_id: user?.id, card_number };
    console.log(fullData);
    setTest(true);
    addCard.mutate(fullData);
  };

  const handleInputChangeCardNumber = (e) => {
    const value = e.target.value.replace(/\s/g, ""); // Probellarni olib tashlash
    setCardNumber(value);
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

  const handleSendSmsCode = (value) => {
    console.log(value);
    const otpValues = {
      ...value,
      transaction_id: transaction_Id,
      telegram_chat_id: user?.id,
    };
    otpCode.mutate(otpValues);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOK = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>
        {test ? (
          <Form onFinish={handleSendValues}>
            <div>
              <div className="font-medium mb-4 flex  gap-1 items-start">
                <div className="text-blue-500 text-[20px] py-1">
                  <FaExclamation className="  " />
                </div>
                <p className="flex">
                  Karta raqam qoʻshish orqali siz toʻlovlarni amalga oshira
                  olasiz. Keyingi toʻlovlarni toʻlashingizda sizga habar
                  beramiz, kutilmagan holat boʻlmaydi!{" "}
                </p>
              </div>
            </div>
            <div>
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
                  className=" mt-[-10px] dark:bg-gray-800 dark:text-white cardInput px-2 py-2 w-full border-x-none border-t-none border-b border-[#c6c6c6] focus:border-x-none focus:border-b focus:border-t-none focus:outline-none"
                  guide={false}
                  onChange={handleInputChangeCardNumber}
                />
              </Form.Item>
            </div>
            <div className="">
              <Form.Item name="expiry" label="Muddati">
                <MaskedInput
                  mask={[/\d/, /\d/, "/", /\d/, /\d/]}
                  placeholder="12/34"
                  className=" mt-[-10px] dark:bg-gray-800 dark:text-white cardInput px-2 py-2 w-full border-x-none border-t-none border-b border-[#c6c6c6] focus:border-x-none focus:border-b focus:border-t-none focus:outline-none"
                  guide={false}
                  // onChange={handleInputChangeExpiry}
                />
              </Form.Item>
            </div>
            <div className="">
              <Form.Item name="card_holder" label="Nomi">
                <input
                  placeholder=""
                  className=" mt-[-10px] dark:bg-gray-800 dark:text-white cardInput px-2 py-2 w-full border-x-none border-t-none border-b border-[#c6c6c6] focus:border-x-none focus:border-b focus:border-t-none focus:outline-none"
                />
              </Form.Item>
            </div>
            {contextHolder}
            <p>{user?.id}</p>
            <p>{user?.first_name}</p>
            <div>
              <button
                type="submit"
                className="px-6 py-2.5 w-full justify-center rounded-md text-white bg-gradient-to-tl from-[#003EFF] to-[#0094FF] float-end flex items-center gap-1"
              >
                <MdLibraryAddCheck className="text-[24px] mt-[-1px]" />
                <span className="leading-[20px]">Kiritish</span>
              </button>
            </div>
          </Form>
        ) : (
          <Form onFinish={handleSendSmsCode}>
            <div>
              <div className="font-medium mb-4 flex  gap-1 items-start">
                <div className="text-blue-500 text-[20px] py-1">
                  <FaExclamation className="  " />
                </div>
                <p className="flex">
                  Sizning kiritgan +998883921383 raqamingizga tasdiqlash kodini
                  yubordik!
                </p>
              </div>
            </div>
            <div className="flex w-full items-center smsInput">
              <Form.Item
                label="Kodni kiriting"
                hasFeedback
                validateStatus="success"
                className="flex items-center w-full "
                name="otp"
              >
                <Input.OTP
                  className="min-h-[39px] w-full p-0 inline-block"
                  // onChange={handleChangeSmsValue}
                />
              </Form.Item>
            </div>
            <div>
              <button
                type="submit"
                className="px-6 py-2.5 w-full  justify-center rounded-md text-white bg-gradient-to-tl from-[#003EFF] to-[#0094FF] float-end flex items-center gap-1"
              >
                <MdLibraryAddCheck className="text-[24px] mt-[-1px]" />

                <span className="leading-[20px]">Tasdiqlash</span>
              </button>
            </div>
          </Form>
        )}

        <Modal
          className="succus_modal"
          closable={false}
          open={isModalOpen}
          width="300px"
          footer={false}
        >
          <div className="flex flex-col justify-center items-center h-full m-0 gap-3">
            <div className="anime_circle w-[50px] h-[50px] border rounded-full flex justify-center items-center border-green-500 text-green-500">
              <FaCheck />
            </div>
            <div>
              <p>Muvaffaqiyatli?</p>
            </div>
            <div>
              <button
                className=" bg-gradient-to-tl from-[#003EFF] to-[#0094FF] px-[20px] py-[5px] rounded-[6px] text-white"
                onClick={handleOK}
              >
                Ok
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
