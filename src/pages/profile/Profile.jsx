import { MdNotificationsActive } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { ImGift } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";
import { IoStarHalfSharp } from "react-icons/io5";
import { MdOutlineChangeCircle } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Drawer } from "antd";
import { useContext, useState } from "react";
import "../../App.css";
import { contextPerfona } from "../../context/contextApi";

export default function Profile() {
  const [openN, setOpenN] = useState(false);
  const { user } = useContext(contextPerfona);

  const showNotification = () => {
    setOpenN(true);
  };

  const onCloseNotification = () => {
    setOpenN(false);
  };
  return (
    <div>
      <div className="container max-w-sm mx-auto pt-[20px] dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* <div></div> */}
          <div>
            <p className="text-[18px] font-medium leading-[22px]">
              Shaxsiy kabinet
            </p>
          </div>
          <div>
            {/* natification */}
            <button
              className="w-[50px] h-[50px] rounded-full bg-gradient-to-tl from-[#003EFF] to-[#0094FF] flex items-center justify-center"
              onClick={showNotification}
            >
              <MdNotificationsActive className="text-[20px] text-white " />
            </button>
          </div>
        </div>

        {/* natifiactioon Drawer */}
        <Drawer
          title="Xabarlar"
          onClose={onCloseNotification}
          open={openN}
        ></Drawer>

        {/* Account  */}
        <div>
          <div className="relative flex items-center justify-center max-w-[200px] mx-auto">
            <div className="w-[200px] h-[200px] mt-4">
              <img
                src={user?.photo_url}
                alt={user?.first_name}
                className="rounded-full w-full object-cover"
              />
            </div>
            <button className="w-[40px] h-[40px] rounded-full bg-gradient-to-tl from-[#003EFF] to-[#0094FF] flex items-center justify-center absolute bottom-0 right-0 shadow-[10px] cursor-pointer">
              <MdEdit className="text-[20px] text-white" />
            </button>
          </div>
          <div className="flex flex-col mt-4 items-center">
            <h2 className="text-[18px] font-medium">{user?.first_name}</h2>
            <p>nurzodbekmardiyev1306@gmail.com</p>
          </div>
        </div>

        {/* Hepl */}
        <div className="mt-[14px]">
          <h2 className="text-[16px] font-medium">Profil</h2>
          <div className="px-[10px] py-[20px] rounded-xl bg-[#ffffffd0] dark:bg-gray-700">
            <ul className="list-none">
              <li className="w-full">
                <Link
                  to=""
                  className="flex items-center gap-2 mb-4 cursor-pointer w-full "
                >
                  <span className="block w-[30px]">
                    <ImGift className="text-[20px]" />
                  </span>
                  <p className=" ">Doʻstingizni taklif qiling, sovgʻa oling</p>
                </Link>
              </li>
              <li className="w-full">
                <Link
                  to="/settings"
                  className="flex items-center gap-2 mb-4  w-full"
                >
                  <span className="block w-[30px]">
                    <IoSettingsOutline className="text-[20px]" />
                  </span>
                  <p className=" ">Sozlamalar</p>
                </Link>
              </li>
              <li className="w-full">
                <Link to="" className="flex items-center gap-2 mb-4  w-full">
                  <span className="block w-[30px]">
                    <IoStarHalfSharp className="text-[22px]" />
                  </span>
                  <p className=" ">Sizning fikringiz & rayting</p>
                </Link>
              </li>
              <li className="w-full">
                <Link to="" className="flex items-center gap-2  mb-4  w-full">
                  <span className="block w-[30px]">
                    <MdOutlineChangeCircle className="text-[22px]" />
                  </span>
                  <p className=" ">Tilni oʻzgartirish</p>
                </Link>
              </li>
              <li className="flex w-full">
                <Link to="/cards  " className="flex items-center gap-2  w-full">
                  <span className="block w-[30px]">
                    <FaRegCreditCard className="text-[22px]" />
                  </span>
                  <p className=" ">Kartalar</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
