import { useQuery } from "react-query";
import AddCard from "../../components/AddCard";
import ToBack from "../../components/ToBack";
import { Perfona } from "../../queries/queries";
import { useContext } from "react";
import { contextPerfona } from "../../context/contextApi";

export default function Cards() {
  const { user } = useContext(contextPerfona);
  const chatId = user?.id;

  const { data } = useQuery(["cards"], () => Perfona.userCards(chatId), {
    staleTime: Infinity, // Ma'lumot hech qachon eski hisoblanmaydi
    cacheTime: Infinity,
  });
  return (
    <div>
      <div className="container max-w-sm mx-auto pt-[20px] dark:text-white ">
        <ToBack link={"/profile"} title={"Kartalar"} />
        <div className="flex overflow-x-scroll w-full space-x-4 scrollbar-hide">
          {data?.data?.map((item) => {
            return (
              <div
                key={item.id}
                className={`${
                  data?.data.length === 1 ? "w-full" : "w-80"
                } flex flex-shrink-0 items-end justify-between py-[20px] px-[10px] rounded-xl text-white bg-gradient-to-tl from-[#003EFF] to-[#0094FF] `}
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

        {/* Change card */}
        <div>
          <h2 className="text-[24px] font-medium mt-[20px]">
            Kartangizni qoʻshing
          </h2>
          <AddCard />
        </div>
      </div>
    </div>
  );
}
