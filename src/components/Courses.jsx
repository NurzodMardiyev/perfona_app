import { Link } from "react-router-dom";
import courseImg from "../images/course.png";
import { Bell, BellRing, ShoppingBasket } from "lucide-react";
import { FaRegBell } from "react-icons/fa";
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import { Perfona } from "../queries/queries";
import { useEffect } from "react";
import axios from "axios";

export default function Courses() {
  const queryClient = useQueryClient();

  // const coursesData = useMutation(Perfona.coursesData, {
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries();
  //     console.log(data);
  //   },
  //   onError: () => {
  //     console.log("Error Courses Data Mutate");
  //   },
  // });

  const coursesData = async () => {
    const { data } = await axios.get(
      "https://api.perfona.uz/v1/webapp/index.php?key=category"
    );
    return data;
  };

  useEffect(() => {
    if (!queryClient.getQueriesData("coursesData")) {
      queryClient.prefetchQuery("coursesData", coursesData);
    }
  }, [queryClient]);

  const { data, isLoading } = useQuery("coursesData", coursesData, {
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 2,
  });

  console.log(data);

  return (
    <div>
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
            className="py-[8px] px-[8px] italic rounded-md bg-[#C7C6CB] text-[#1601ffde] w-[140px] flex items-center gap-1 text-white justify-center shadow-xl font-semibold "
          >
            <Bell size={18} />
            <p className="whitespace-nowrap leading-[15px] mt-0.5">
              Obuna bo‘ling
            </p>
          </Link>
          <Link
            to="/purchase"
            className="py-[8px] px-[16px] italic rounded-md bg-[#C7C6CB] text-[#1601ffde]  w-[140px] flex items-center gap-1 justify-center text-white shadow-xl font-semibold "
          >
            <ShoppingBasket size={20} className="inline-block" />{" "}
            <p className="whitespace-nowrap leading-[15px] mt-0.5">
              Sotib olish
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
