import { Form, Input } from "antd";
import ToBack from "../../components/ToBack";
import { Link } from "react-router-dom";
import "../../App.css";
import { FiUser } from "react-icons/fi";
import { FaAngleRight } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";

export default function Settings() {
  const onFinish = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="container max-w-sm mx-auto pt-[20px] dark:text-white">
        <ToBack link={"/profile"} title={"Sozlamalar"} />

        {/* Setting page  */}
        <Form onFinish={onFinish}>
          <Form.Item name="searchSitting">
            <Input
              className="rounded-md dark:bg-gray-800 dark:text-white "
              placeholder="Izlash..."
            />
          </Form.Item>
        </Form>

        {/* Sitting sections */}
        <ul>
          <li>
            <Link
              to="account"
              className=" flex items-center justify-between w-full border-b py-3"
            >
              <span className="flex items-center gap-2">
                <FiUser className="text-[22px]" />
                <span>Account</span>
              </span>
              <span className="inline-block">
                <FaAngleRight />
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="account"
              className=" flex items-center justify-between w-full border-b py-3"
            >
              <span className="flex items-center gap-2">
                <IoMdNotificationsOutline className="text-[22px]" />
                <span>Notifications</span>
              </span>
              <span className="inline-block">
                <FaAngleRight />
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="account"
              className=" flex items-center justify-between w-full border-b py-3 text-red-600"
            >
              <span className="flex items-center gap-2">
                <MdLogout className="text-[22px]" />
                <span>Log out</span>
              </span>
              <span className="inline-block"></span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
