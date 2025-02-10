import { Link } from "react-router-dom";
import courseImg from "../images/course.png";
import { Bell, ShoppingBasket } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { Perfona } from "../queries/queries";
import { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { Spin } from "antd";

export default function Courses({ type }) {
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [courseData, setCourseData] = useState({
    data: [],
    category: "",
    page: 1,
  });
  const limit = 3;
  const category = type;

  const coursesData = useMutation(
    (page) => Perfona.coursesData(page, limit, category),
    {
      onSuccess: (response) => {
        setCourseData((prevData) => ({
          data: [...prevData.data, ...response.data],
          category: response.category,
          page: response.page,
        }));

        console.log(response);

        if (response.data.length < limit) {
          setHasMore(false);
        }

        setIsFetching(false);
      },
      onError: () => {
        setIsFetching(false);
        console.log("Error Courses Data Mutate");
      },
    }
  );

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (
      scrollY + windowHeight >= documentHeight - 100 &&
      hasMore &&
      !isFetching
    ) {
      setIsFetching(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setIsFetching(true);
    coursesData.mutate(page); // Birinchi sahifani yuklash
  }, []);

  useEffect(() => {
    const debouncedHandleScroll = () => {
      setTimeout(handleScroll, 100); // 100ms kechikish
    };

    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [isFetching, hasMore]);

  useEffect(() => {
    if (page > 1 && isFetching && hasMore) {
      coursesData.mutate(page);
    }
  }, [page]);

  useEffect(() => {
    setIsFetching(false);
    setPage(1); // Sahifani 1 ga qaytarish
    setHasMore(true); // Yangi kategoriya uchun hasMore ni true qilish
    setCourseData({ data: [], category: "", page: 1 }); // Eski ma'lumotlarni tozalash
    coursesData.mutate(1); // Birinchi sahifani yuklash
  }, [category]);

  return (
    <div>
      {courseData?.data?.map((item, index) => (
        <div key={index} className="relative mb-4">
          <img
            src={item?.img}
            alt={item?.name}
            className="rounded-xl w-full h-[217px] object-cover"
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
                <ShoppingBasket size={20} className="inline-block" />{" "}
                <p className="whitespace-nowrap leading-[14px] mt-0.5">
                  Sotish olish
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
      ))}

      {(coursesData.isLoading || isFetching) && (
        <div className="w-full flex items-center justify-center mt-6">
          <Spin />
        </div>
      )}
    </div>
  );
}
