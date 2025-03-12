import { MdLibraryAddCheck } from "react-icons/md";
import { Form, Input } from "antd";
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

  const addCard = useMutation((fullData) => Perfona.addCard(fullData), {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      console.log(data);
      setResponseData(data);
    },
  });

  const handleSendValues = (data) => {
    const card_number = cardNumber;
    const fullData = { ...data, chatID: "2052844797", card_number };

    console.log(fullData);

    addCard.mutate(fullData);
  };

  const handleInputChangeCardNumber = (e) => {
    const value = e.target.value.replace(/\s/g, ""); // Probellarni olib tashlash
    setCardNumber(value);
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
                // placeholder="1234 5678 9012 3456"
                className="rounded-md mt-[-10px] dark:bg-gray-800 dark:text-white cardInput px-2 py-2 w-full border border-gray-600 focus:outline-blue-600 focus-within:outline-blue-400 focus-visible:outline-blue-600"
                guide={false}
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
