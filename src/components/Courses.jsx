import { Link } from "react-router-dom";
import { Bell, ShoppingBasket } from "lucide-react";
import { useInfiniteQuery } from "react-query";
import { Perfona } from "../queries/queries";
import { useEffect, useRef } from "react";
import { BiDetail } from "react-icons/bi";
import { Spin } from "antd";

export default function Courses({ type }) {
  const limit = 3;
  const category = type;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery(
    ["courses", category],
    ({ pageParam = 1 }) => Perfona.coursesData(pageParam, limit, category),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.data.length < limit ? undefined : allPages.length + 1;
      },
    }
  );

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (
      scrollY + windowHeight >= documentHeight - 100 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  if (isLoading)
    return <Spin className="w-full flex items-center justify-center mt-6" />;
  if (error) return <p>Error loading courses</p>;

  return (
    <div>
      {data?.pages?.flatMap((page) =>
        page.data.map((item) => (
          <div key={item.course_id} className="relative mb-4">
            <img
              src={item?.img}
              alt={item?.name}
              className="rounded-xl w-full h-[217px] object-cover"
              loading="lazy"
            />
            <div className="w-full absolute top-0 left-0 h-full bg-gradient-to-t from-[#1601ffbd] to-[#8d88d537] rounded-xl"></div>
            <div className="flex items-center justify-around px-6 absolute w-full bottom-4">
              {item.type === "subscription" ? (
                <Link
                  to="/subscribe"
                  className="py-[8px] px-[8px] italic rounded-md bg-[#C7C6CB] text-[#1601ffde] w-[140px] flex items-center gap-1  justify-center shadow-xl font-semibold "
                >
                  <Bell size={18} />
                  <p className="whitespace-nowrap leading-[15px] mt-0.5">
                    Obuna bo‘ling
                  </p>
                </Link>
              ) : (
                <Link
                  to="/purchase"
                  className="py-[8px] px-[16px] italic rounded-md bg-[#C7C6CB] text-[#1601ffde]  w-[140px] flex items-center gap-1 justify-center  shadow-xl font-semibold "
                >
                  <ShoppingBasket size={20} className="inline-block" />
                  <p className="whitespace-nowrap leading-[14px] mt-0.5">
                    Sotib olish
                  </p>
                </Link>
              )}
              <Link
                to={`/detail/${item.course_id}`}
                className="py-[8px] px-[16px] italic rounded-md bg-[#C7C6CB] text-[#1601ffde]  w-[140px] flex items-center gap-1 justify-center  shadow-xl font-semibold "
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
    </div>
  );
}
