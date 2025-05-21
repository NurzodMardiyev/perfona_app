import { Link } from "react-router-dom";
import { Bell, ShoppingBasket } from "lucide-react";
import { useInfiniteQuery } from "react-query";
import { Perfona } from "../queries/queries";
import { useContext, useEffect, useRef, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { Popover, Spin } from "antd";
import { contextPerfona } from "../context/contextApi";

export default function Courses() {
  const limit = 3;
  const { pageNumberId } = useContext(contextPerfona);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: contentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery(
    ["courses", pageNumberId],
    ({ pageParam = 1 }) => {
      if (!pageNumberId)
        return Promise.resolve({ data: { results: [], next: null } });
      return Perfona.coursesData(pageParam, limit, pageNumberId);
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        // Agar next null bo'lsa, unda keyingi sahifa yo'q
        if (lastPage.data.next === null) {
          return undefined;
        }
        // Aks holda keyingi sahifa raqamini qaytar
        return allPages.length + 1;
      },
      enabled: !!pageNumberId,
      onSuccess: (data) => {
        // Oxirgi sahifada next null bo'lsa, hasMore ni false qilamiz
        const lastPage = data.pages[data.pages.length - 1];
        setHasMore(lastPage.data.next !== null);
      },
    }
  );

  const isFetchingRef = useRef(false);

  const handleScroll = async () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (
      scrollY + windowHeight >= documentHeight - 100 &&
      hasNextPage &&
      hasMore &&
      !isFetchingRef.current
    ) {
      isFetchingRef.current = true;
      try {
        await fetchNextPage();
      } catch (err) {
        console.error("Yangi sahifani olishda xatolik:", err.message);
      } finally {
        isFetchingRef.current = false;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, hasMore]);

  const subscribeChannel = (id) => {
    console.log(id);
  };

  console.log(contentData?.pages);

  const handleSubscription = (tariff_Id) => {
    console.log(tariff_Id);
  };

  if (isLoading)
    return <Spin className="w-full flex items-center justify-center mt-6" />;
  if (error && !contentData?.pages?.length) return <p>Error loading courses</p>;

  return (
    <div>
      {contentData?.pages.map((page) =>
        page.data.results.map((item) => (
          <div key={item.id} className="relative mb-4">
            <img
              src={item?.photo}
              alt={item?.name}
              className="rounded-xl w-full h-[217px] object-cover"
              loading="lazy"
            />
            <div className="w-full absolute top-0 left-0 h-full bg-gradient-to-t from-[#1601ff9c] to-[#8d88d500] rounded-xl"></div>
            <div className="flex items-center justify-around px-6 absolute w-full bottom-4">
              {item?.type === "channel" ? (
                <Popover
                  content={
                    <div>
                      {item.tariffs.map((tariff) => (
                        <button
                          className="w-full py-1 border mb-1"
                          key={tariff.id}
                          onClick={() => handleSubscription(tariff.id, item.id)}
                        >
                          {tariff.name}
                        </button>
                      ))}
                    </div>
                  }
                  title="Tariflar"
                  trigger="click"
                >
                  <button
                    onClick={() => subscribeChannel(item.id)}
                    className="py-[8px] px-[8px]  rounded-md bg-[#F4F6F8] text-[#1601ff] w-[140px] flex items-center gap-1  justify-center shadow-xl font- "
                  >
                    {" "}
                    <Bell size={18} />
                    <p className="whitespace-nowrap leading-[15px] mt-0.5">
                      Obuna boʻling
                    </p>
                  </button>
                </Popover>
              ) : (
                <Link
                  to="/purchase"
                  className="py-[8px] px-[16px] rounded-md bg-[#F4F6F8] text-[#1601ff]  w-[140px] flex items-center gap-1 justify-center  shadow-xl font- "
                >
                  <ShoppingBasket size={20} className="inline-block" />
                  <p className="whitespace-nowrap leading-[14px] mt-0.5">
                    Sotib olish
                  </p>
                </Link>
              )}
              <Link
                to={`/detail/${item.id}`}
                className="py-[8px] px-[16px] rounded-md bg-[#F4F6F8] text-[#1601ff]  w-[140px] flex items-center gap-2 justify-center  shadow-xl font- "
              >
                <BiDetail className="inline-block text-[20px]" />
                <p className="whitespace-nowrap leading-[14px] mt-[2px]">
                  Batafsil
                </p>
              </Link>
            </div>
          </div>
        ))
      )}

      {isFetchingNextPage && (
        <Spin className="w-full flex items-center justify-center mt-6" />
      )}

      {!hasMore && !isFetchingNextPage && (
        <p className="text-center py-4 text-gray-500">
          Barcha kurslar yuklandi
        </p>
      )}
    </div>
  );
}
