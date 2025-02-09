import { MdNotificationsActive } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { ImGift } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";
import { IoStarHalfSharp } from "react-icons/io5";
import { MdOutlineChangeCircle } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div>
      <div className="container max-w-sm mx-auto pt-[50px] dark:text-white">
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
            <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-tl from-[#003EFF] to-[#0094FF] flex items-center justify-center">
              <MdNotificationsActive className="text-[20px] text-white " />
            </div>
          </div>
        </div>

        {/* Account  */}
        <div>
          <div className="relative flex items-center justify-center max-w-[200px] mx-auto">
            <div className="w-[200px] h-[200px] mt-4">
              <img
                src="data:image/jpeg;base64,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"
                alt="User Name"
                className="rounded-full w-full object-cover"
              />
            </div>
            <button className="w-[40px] h-[40px] rounded-full bg-gradient-to-tl from-[#003EFF] to-[#0094FF] flex items-center justify-center absolute bottom-0 right-0 shadow-[10px] cursor-pointer">
              <MdEdit className="text-[20px] text-white" />
            </button>
          </div>
          <div className="flex flex-col mt-4 items-center">
            <h2 className="text-[18px] font-medium">Nurzod Mardiyev</h2>
            <p>nurzodbekmardiyev1306@gmail.com</p>
          </div>
        </div>

        {/* Hepl */}
        <div className="mt-[14px]">
          <h2 className="text-[16px] font-medium">Profil</h2>
          <div className="px-[10px] py-[20px] rounded-xl bg-[#ffffffd0] dark:bg-gray-700">
            <ul className="list-none">
              <li className="">
                <Link
                  to=""
                  className="flex items-center gap-2 mb-4 cursor-pointer "
                >
                  <span className="block w-[30px]">
                    <ImGift className="text-[20px]" />
                  </span>
                  <p className=" ">Doʻstingizni taklif qiling, sovgʻa oling</p>
                </Link>
              </li>
              <li className="">
                <Link to="" className="flex items-center gap-2 mb-4 ">
                  <span className="block w-[30px]">
                    <IoSettingsOutline className="text-[20px]" />
                  </span>
                  <p className=" ">Sozlamalar</p>
                </Link>
              </li>
              <li className="">
                <Link to="" className="flex items-center gap-2 mb-4 ">
                  <span className="block w-[30px]">
                    <IoStarHalfSharp className="text-[22px]" />
                  </span>
                  <p className=" ">Sizning fikringiz & rayting</p>
                </Link>
              </li>
              <li className="">
                <Link to="" className="flex items-center gap-2  mb-4 ">
                  <span className="block w-[30px]">
                    <MdOutlineChangeCircle className="text-[22px]" />
                  </span>
                  <p className=" ">Tilni oʻzgartirish</p>
                </Link>
              </li>
              <li className="flex w-full">
                <Link to="/cards  " className="flex items-center gap-2 ">
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
