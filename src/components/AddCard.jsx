import { MdLibraryAddCheck } from "react-icons/md";
import { Form, Input } from "antd";

export default function AddCard() {
  const handleSendValues = (data) => {
    console.log(data);
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
          <Form.Item name="cardNumber" label="Karta raqami">
            <Input
              className="rounded-md mt-[-10px] dark:bg-gray-800  dark:text-white cardInput"
              placeholder="**** **** **** ****"
              type="number"
              onChange={(e) => cardNumberChange(e)}
            />
          </Form.Item>
          <div className="flex gap-5">
            <Form.Item name="cardDate" label="Muddati">
              <Input
                className="rounded-md mt-[-10px] dark:bg-gray-800 dark:text-white cardInput"
                placeholder="**/**"
              />
            </Form.Item>
            <Form.Item name="cardName" label="Karta nomi">
              <Input className="rounded-md mt-[-10px] dark:bg-gray-800 dark:text-white cardInput" />
            </Form.Item>
          </div>
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
