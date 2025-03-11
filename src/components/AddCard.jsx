import { MdLibraryAddCheck } from "react-icons/md";
import { Form, Input } from "antd";
import { useMutation, useQueryClient } from "react-query";
import { Perfona } from "../queries/queries.js";
import { useContext } from "react";
import { contextPerfona } from "../context/contextApi.jsx";
import { useState } from "react";
import InputMask from "react-input-mask";

export default function AddCard() {
  const queryClient = useQueryClient();
  const { user } = useContext(contextPerfona);
  const [responseData, setResponseData] = useState();

  const addCard = useMutation((fullData) => Perfona.addCard(fullData), {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      console.log(data);
      setResponseData(data);
    },
  });

  const handleSendValues = (data) => {
    const fullData = { ...data, chatID: "2052844797" };
    console.log(fullData);

    addCard.mutate(fullData);
  };

  const [cardNumber, setCardNumber] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\s/g, ""); // Probellarni olib tashlash
    setCardNumber(value); // Toza raqamlar bilan state-ni yangilash
    console.log("Karta raqami:", value); // Backendga yuborish uchun tayyor
  };

  const handleKeyDown = (e) => {
    // Orqadan probelni o'chirishni to'g'ri boshqarish
    if (e.key === "Backspace") {
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = e.target.value.length;
      }, 0);
    }
  };
  console.log(cardNumber);
  return (
    <div>
      <div>
        <Form onFinish={handleSendValues}>
          <Form.Item name="card_number" label="Karta raqami">
            <InputMask
              mask="9999 9999 9999 9999" // Har 4 ta raqamdan keyin probel qo'yamiz
              alwaysShowMask={false}
              maskChar={null} // Bo'sh joylarda hech narsa ko'rinmasin
              value={cardNumber} // Input qiymati statedan olinadi
              onChange={handleInputChange} // Input o'zgarganda handleInputChange ishlaydi
              placeholder="Enter card number"
              onKeyDown={handleKeyDown}
            >
              {(inputProps) => (
                <Input
                  className="rounded-md mt-[-10px] dark:bg-gray-800 dark:text-white cardInput"
                  {...inputProps}
                  type="text"
                  maxLength={19}
                />
              )}
              {/* Input elementini yaratamiz */}
            </InputMask>
          </Form.Item>
          <div className="flex gap-5">
            <Form.Item name="expiry" label="Muddati">
              <Input
                className="rounded-md mt-[-10px] dark:bg-gray-800 dark:text-white cardInput"
                placeholder="**/**"
              />
            </Form.Item>
            <Form.Item label="Karta nomi">
              <Input className="rounded-md mt-[-10px] dark:bg-gray-800 dark:text-white cardInput" />
            </Form.Item>
          </div>
          <p>{user?.id}</p>
          <p>{user?.first_name}</p>
          <p>{responseData}</p>
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
