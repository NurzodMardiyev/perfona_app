import clock from "../images/clock.png";
import profile from "../images/profile.png";
import { RiChatHistoryFill } from "react-icons/ri";
import calendar from "../images/calendar.png";
import { MdAccountCircle } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import "../App.css";
import { Link } from "react-router-dom";

export default function ButtonMenu() {
  return (
    <div>
      <div className=" bg-gradient-to-t from-[#0230C7] to-[#0097FF] fixed w-full bottom-0">
        <div className="container max-w-sm mx-auto flex justify-between items-center text-white  p-1">
          <Link
            to="/payments"
            className=" flex justify-center items-center rounded-full gap-1  flex-col"
          >
            <RiChatHistoryFill className=" text-[28px]" />
            <p className="whitespace-nowrap">To‘lovlar</p>
          </Link>
          <Link
            to="/"
            className=" flex  justify-center items-center rounded-full w-[64px] h-[64px] gap-1 flex-col"
          >
            <IoIosHome className=" text-[28px]" />
            <p className="whitespace-nowrap">Bosh sahifa</p>
          </Link>
          <Link
            to="/profile"
            className=" flex justify-center items-center rounded-full w-[64px] h-[64px] gap-1 flex-col"
          >
            <MdAccountCircle className=" text-[28px]" />
            <p className="whitespace-nowrap">Kabinet</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
