import { LuMoveRight } from "react-icons/lu";
import { RiAddLine } from "react-icons/ri";
import { Drawer } from "antd";
import { useContext, useEffect, useState } from "react";
import "../../App.css";
import AddCard from "../../components/AddCard";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Perfona } from "../../queries/queries";
import { contextPerfona } from "../../context/contextApi";

export default function Payments() {
  const [open, setOpen] = useState(false);
  const { user } = useContext(contextPerfona);
  const chatId = user?.id;

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const { data } = useQuery(["cards"], () => Perfona.userCards(chatId), {
    staleTime: Infinity, // Ma'lumot hech qachon eski hisoblanmaydi
    cacheTime: Infinity,
  });

  return (
    <div>
      <div className="container max-w-sm mx-auto pt-[20px]">
        {/* Header section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 dark:text-white">
            <div className="w-[40px]">
              <img
                src={user?.photo_url}
                alt={user?.first_name}
                className="rounded-full"
              />
            </div>
            <div>
              <h3 className="text-[16px] font-medium leading-[22px]">
                {user?.first_name} {user?.last_name}
              </h3>
              <p className="text-[14px]">Hayirli kun!</p>
            </div>
          </div>
          <div>
            {/* natification */}
            <div
              className="w-[40px] h-[40px] rounded-full bg-gradient-to-tl from-[#003EFF] to-[#0094FF] flex items-center justify-center cursor-pointer"
              onClick={showDrawer}
            >
              <RiAddLine className="text-[28px] text-white font-bold " />
            </div>
          </div>
        </div>
        <Drawer
          className="w-full dark:bg-gray-800 dark:text-white"
          title="Karta qo'shish"
          onClose={onClose}
          open={open}
        >
          <AddCard setOpen={setOpen} />
        </Drawer>

        {/* Card */}
        <div className="flex overflow-x-scroll w-full space-x-4 scrollbar-hide">
          {data?.data?.map((item) => {
            return (
              <div
                key={item.id}
                className={`${
                  data?.data.length === 1 ? "w-full" : "w-80"
                } flex flex-shrink-0 items-end justify-between py-[20px] px-[10px] rounded-xl text-white bg-gradient-to-tl from-[#003EFF] to-[#0094FF] mt-[20px]`}
              >
                <div>
                  <span className="mb-5 inline-block">
                    <h1 className="text-lg font-semibold">
                      {item.card_number}
                    </h1>
                    <p>{item.expiry}</p>
                  </span>
                  <p className="text-[16px] h-[20px] italic"></p>
                </div>
                <div>
                  <span className="text-[18px] font-medium italic">
                    {item.card_holder}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* payment History */}

        <div className="mt-[20px]">
          <div className="mb-4">
            <div>
              <span className="font-medium text-[16px] dark:text-white">
                Kecha
              </span>
            </div>
            <div className="flex items-center justify-between bg-white dark:bg-gray-900 dark:text-white p-[10px]  rounded-xl mb-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center bg-gradient-to-tl from-[#003EFF] to-[#0094FF] w-[35px] h-[35px] rounded-full">
                  <LuMoveRight className="text-[16px] text-white" />
                </div>
                <span>
                  <p className="font-medium text-[16px] italic leading-[20px]">
                    Ingliz tili
                  </p>
                  <p className="text-[14px]">June, 2</p>
                </span>
              </div>
              <div>
                <p>-300 000 soʻm</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div>
              <span className="font-medium text-[16px] dark:text-white">
                16.12.2024
              </span>
            </div>
            <div className="flex items-center justify-between bg-white dark:bg-gray-900 dark:text-white  p-[10px] rounded-xl mb-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center bg-gradient-to-tl from-[#003EFF] to-[#0094FF] w-[35px] h-[35px] rounded-full">
                  <LuMoveRight className="text-[16px] text-white" />
                </div>
                <span>
                  <p className="font-medium text-[16px] italic leading-[20px]">
                    Ingliz tili
                  </p>
                  <p className="text-[14px]">June, 2</p>
                </span>
              </div>
              <div>
                <p>-300 000 soʻm</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-white dark:bg-gray-900 dark:text-white  p-[10px] rounded-xl mb-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center bg-gradient-to-tl from-[#003EFF] to-[#0094FF] w-[35px] h-[35px] rounded-full">
                  <LuMoveRight className="text-[16px] text-white" />
                </div>
                <span>
                  <p className="font-medium text-[16px] italic leading-[20px]">
                    Ingliz tili
                  </p>
                  <p>June, 2</p>
                </span>
              </div>
              <div>
                <p>-300 000 soʻm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
