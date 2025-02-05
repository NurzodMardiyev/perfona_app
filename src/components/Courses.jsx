import { Link } from "react-router-dom";
import courseImg from "../images/course.png";
import { Bell, ShoppingBasket } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { Perfona } from "../queries/queries";
import { useEffect, useState } from "react";

export default function Courses() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [courseData, setCourseData] = useState({
    data: [],
    category: "",
    page: 1,
  });

  const limit = 3;

  const coursesData = useMutation((page) => Perfona.coursesData(page, limit), {
    onSuccess: (response) => {
      setCourseData((prevData) => ({
        data: [...prevData.data, ...response.data],
        category: response.category,
        page: response.page,
      }));

      if (response.data.length < limit) {
        setHasMore(false);
      }

      setIsFetching(false);
      console.log(response);
    },
    onError: () => {
      setIsFetching(false);
      console.log("Error Courses Data Mutate");
    },
  });

  console.log(courseData);

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

  // Dastlabki ma'lumotlarni yuklash
  useEffect(() => {
    console.log("Fetching initial data...");
    setIsFetching(false);
    coursesData.mutate(page); // Birinchi sahifani yuklash
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, hasMore]);

  useEffect(() => {
    if (page > 1 && isFetching && hasMore) {
      // Faqat skroll tugaganda ishlaydi
      console.log("Fetching page:", page);
      coursesData.mutate(page);
    }
  }, [page]); // page o'zgarganda ishlaydi

  // const coursesData = async () => {
  //   const { data } = await axios.get(
  //     "https://api.perfona.uz/v1/webapp/index.php?key=category"
  //   );
  //   return data;
  // };

  // console.log(courseData.data[1].img);

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
            <Link
              to="/subscribe"
              className="py-[8px] px-[8px] italic rounded-md bg-[#C7C6CB] text-[#1601ffde] w-[140px] flex items-center gap-1  justify-center shadow-xl font-semibold "
            >
              <Bell size={18} />
              <p className="whitespace-nowrap leading-[15px] mt-0.5">
                Obuna bo‘mang
              </p>
            </Link>
            <Link
              to="/purchase"
              className="py-[8px] px-[16px] italic rounded-md bg-[#C7C6CB] text-[#1601ffde]  w-[140px] flex items-center gap-1 justify-center  shadow-xl font-semibold "
            >
              <ShoppingBasket size={20} className="inline-block" />{" "}
              <p className="whitespace-nowrap leading-[15px] mt-0.5">
                Sotib olish
              </p>
            </Link>
          </div>
        </div>
      ))}

      {/* <div className="relative mb-4">
        <img
          src={courseImg}
          alt="Course name"
          className="rounded-xl w-full h-[217px] object-cover"
        />
        <div className="w-full absolute top-0 left-0 h-full bg-gradient-to-t from-[#1601ffbd] to-[#8d88d537] rounded-xl"></div>
        <div className="flex items-center justify-around px-6 absolute w-full bottom-4">
          <Link
            to="/subscribe"
            className="py-[8px] px-[8px] italic rounded-md bg-[#C7C6CB] text-[#1601ffde] w-[140px] flex items-center gap-1  justify-center shadow-xl font-semibold "
          >
            <Bell size={18} />
            <p className="whitespace-nowrap leading-[15px] mt-0.5">
              Obuna bo‘ling
            </p>
          </Link>
          <Link
            to="/purchase"
            className="py-[8px] px-[16px] italic rounded-md bg-[#C7C6CB] text-[#1601ffde]  w-[140px] flex items-center gap-1 justify-center  shadow-xl font-semibold "
          >
            <ShoppingBasket size={20} className="inline-block" />{" "}
            <p className="whitespace-nowrap leading-[15px] mt-0.5">
              Sotib olish
            </p>
          </Link>
        </div>
      </div>
      <div className="relative mb-4">
        <img
          src={courseImg}
          alt="Course name"
          className="rounded-xl w-full h-[217px] object-cover"
        />
        <div className="w-full absolute top-0 left-0 h-full bg-gradient-to-t from-[#1601ffbd] to-[#8d88d537] rounded-xl"></div>
        <div className="flex items-center justify-around px-6 absolute w-full bottom-4">
          <Link
            to="/subscribe"
            className="py-[8px] px-[8px] italic rounded-md bg-[#C7C6CB] text-[#1601ffde] w-[140px] flex items-center gap-1  justify-center shadow-xl font-semibold "
          >
            <Bell size={18} />
            <p className="whitespace-nowrap leading-[15px] mt-0.5">
              Obuna bo‘ling
            </p>
          </Link>
          <Link
            to="/purchase"
            className="py-[8px] px-[16px] italic rounded-md bg-[#C7C6CB] text-[#1601ffde]  w-[140px] flex items-center gap-1 justify-center  shadow-xl font-semibold "
          >
            <ShoppingBasket size={20} className="inline-block" />{" "}
            <p className="whitespace-nowrap leading-[15px] mt-0.5">
              Sotib olish
            </p>
          </Link>
        </div>
      </div>
      <div className="relative mb-4">
        <img
          src={courseImg}
          alt="Course name"
          className="rounded-xl w-full h-[217px] object-cover"
        />
        <div className="w-full absolute top-0 left-0 h-full bg-gradient-to-t from-[#1601ffbd] to-[#8d88d537] rounded-xl"></div>
        <div className="flex items-center justify-around px-6 absolute w-full bottom-4">
          <Link
            to="/subscribe"
            className="py-[8px] px-[8px] italic rounded-md bg-[#C7C6CB] text-[#1601ffde] w-[140px] flex items-center gap-1  justify-center shadow-xl font-semibold "
          >
            <Bell size={18} />
            <p className="whitespace-nowrap leading-[15px] mt-0.5">
              Obuna bo‘ling
            </p>
          </Link>
          <Link
            to="/purchase"
            className="py-[8px] px-[16px] italic rounded-md bg-[#C7C6CB] text-[#1601ffde]  w-[140px] flex items-center gap-1 justify-center  shadow-xl font-semibold "
          >
            <ShoppingBasket size={20} className="inline-block" />{" "}
            <p className="whitespace-nowrap leading-[15px] mt-0.5">
              Sotib olish
            </p>
          </Link>
        </div>
      </div> */}
    </div>
  );
}
