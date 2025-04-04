import { MdLibraryAddCheck } from "react-icons/md";
import { Form, Input, Modal, notification } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { Perfona } from "../queries/queries.js";
import { useContext } from "react";
import { contextPerfona } from "../context/contextApi.jsx";
import { useState } from "react";
import MaskedInput from "react-text-mask";
import { FaExclamation } from "react-icons/fa";
import "../App.css";
import SuccessPage from "./Success.jsx";

export default function AddCard({ setOpen }) {
  const queryClient = useQueryClient();
  const { user } = useContext(contextPerfona);
  const [responseData, setResponseData] = useState();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const [test, setTest] = useState(true);
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

    setTest(false);
    // addCard.mutate(fullData);
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
    showModal();
    console.log(value);
    // otpCode.mutate(successData);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
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
                  beramiz!{" "}
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
                  onChange={handleInputChangeExpiry}
                />
              </Form.Item>
            </div>
            {contextHolder}
            <p>{user?.id}</p>
            <p>{user?.first_name}</p>
            <div>
              <button
                type="submit"
                className="px-6 py-2.5 w-full flex justify-center rounded-md text-white bg-gradient-to-tl from-[#003EFF] to-[#0094FF] float-end flex items-center gap-1"
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
                name="opt"
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
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <SuccessPage setOpen={setOpen} setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
}
