import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../../App.css";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Perfona } from "../../queries/queries";
import ToBack from "../../components/ToBack";
import DOMPurify from "dompurify";

export default function Details() {
  const { id } = useParams();
  const [detailDatas, setDetailDatas] = useState();

  const queryClient = useQueryClient();

  const detailData = useMutation(() => Perfona.courseDetails(id), {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      console.log(data);
      setDetailDatas(data.data);
    },
  });

  const cleanHTML = DOMPurify.sanitize(detailDatas?.description);

  useEffect(() => {
    detailData.mutate();
  }, []);
  return (
    <div className="">
      <div className="container max-w-sm mx-auto pt-[20px] dark:text-white ">
        <ToBack link={"/"} title={"Batafsil"} />
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
                src={detailDatas?.photo}
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
          <li>Turi: {detailDatas?.type}</li>
        </ul>
        {/* name and video */}
        <div className="flex items-start justify-between mt-3">
          <h2 className="text-[22px] font-medium leading-[30px] ">
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
          <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
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
