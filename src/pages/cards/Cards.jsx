import AddCard from "../../components/AddCard";
import ToBack from "../../components/ToBack";

export default function Cards() {
  return (
    <div>
      <div className="container max-w-sm mx-auto pt-[20px] dark:text-white ">
        <ToBack link={"/profile"} />
        <div className="flex items-end justify-between py-[20px] px-[10px] rounded-xl text-white bg-gradient-to-tl from-[#003EFF] to-[#0094FF] ">
          <div>
            <span className="mb-5 inline-block">
              <p className="text-[24px] font-semibold">9860 **** **** 5195</p>
              <p>03/25</p>
            </span>
            <p className="text-[16px] italic">Nurzod Mardiyev</p>
          </div>
          <div>
            <span className="text-[18px] font-medium">Humo</span>
          </div>
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
