import { MdLibraryAddCheck } from "react-icons/md";
import { Form, Input } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Perfona } from "../queries/queries.js";
import { useContext } from "react";
import { contextPerfona } from "../context/contextApi.jsx";

export default function AddCard() {
  const queryClient = useQueryClient();
  const { user } = useContext(contextPerfona);

  const addCard = useMutation((fullData) => Perfona.addCard(fullData), {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      console.log(data);
    },
  });

  const handleSendValues = (data) => {
    const fullData = { ...data, chatID: user?.id };
    console.log(fullData);

    addCard.mutate(fullData);
  };

  const cardNumberChange = (e) => {
    console.log(e.target.value);
    if (e.target.value.length % 4 === 0 && e.target.value.length !== 0) {
      console.log("name");
    }
  };
  return (
    <div>
      <div>
        <Form onFinish={handleSendValues}>
          <Form.Item name="card_number" label="Karta raqami">
            <Input
              className="rounded-md mt-[-10px] dark:bg-gray-800  dark:text-white cardInput"
              placeholder="**** **** **** ****"
              type="number"
              onChange={(e) => cardNumberChange(e)}
            />
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
