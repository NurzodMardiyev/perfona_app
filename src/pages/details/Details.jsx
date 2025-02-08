import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../../App.css";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Perfona } from "../../queries/queries";

export default function Details() {
  const { id } = useParams();
  const [detailDatas, setDetailDatas] = useState();

  const queryClient = useQueryClient();

  const detailData = useMutation(() => Perfona.courseDetails(id), {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      console.log(data);
      setDetailDatas(data);
    },
  });

  useEffect(() => {
    detailData.mutate();
  }, []);
  return (
    <div className="">
      <div className="container max-w-sm mx-auto pt-[50px] dark:text-white ">
        <div className="">
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper h-[240px] bg-gray-300 rounded-xl"
          >
            <SwiperSlide className="rounded-xl">
              <img
                src={detailDatas?.img}
                alt=""
                className="rounded-xl object-cover w-full h-full"
              />
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
          </Swiper>
        </div>
        {/* tags */}
        <ul className="flex gap-2 mt-3 italic">
          {detailDatas?.tags.map((item, index) => (
            <li key={index}>#{item.name}</li>
          ))}
        </ul>
        {/* name and video */}
        <div className="flex items-start justify-between mt-3">
          <h2 className="text-[24px] font-medium leading-[30px] ">
            {detailDatas?.name}
          </h2>
          {/* <div>
            <iframe
              width="160"
              height="90"
              src="https://www.youtube.com/embed/YOWWze1igj8?si=YBycv-C5e4Hec_fh"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div> */}
        </div>
        <div className="mt-3">
          <p>{detailDatas?.description}</p>
        </div>
        <div className=" inline-block float-right mt-3">
          {detailDatas?.type === "subscription" ? (
            <button className="bg-gradient-to-tl from-[#003EFF] to-[#0094FF] text-white w-[200px] py-2 rounded-md italic font-semibold flex items-center gap-2 justify-center">
              <Bell size={18} /> Obuna boʻling
            </button>
          ) : (
            <button className="bg-gradient-to-tl from-[#003EFF] to-[#0094FF] text-white w-[200px] py-2 rounded-md italic font-semibold flex items-center gap-2 justify-center">
              <Bell size={18} /> Sotib oling
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
