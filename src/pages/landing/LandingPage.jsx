import { useContext, useEffect, useState } from "react";
// import LoadingPage from "../LoadingPage";
import "./landing.css";
import logo from "../../images/perfona.png";
import darklogo from "../../images/darkperfona.png";
import search_icon from "../../images/search_icon.png";
import search_menu from "../../images/search_menu.png";
import Courses from "../../components/Courses";
import { DarkThemeToggle } from "flowbite-react";
import { Menu, MenuItem, Tooltip } from "@mui/material";
import LoadingPage from "../../components/LoadingPage";
import "../../App.css";
import { useLocation } from "react-router-dom";
import { Perfona } from "../../queries/queries";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { contextPerfona } from "../../context/contextApi";

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorValue, setAnchorValue] = useState("");
  const { user } = useContext(contextPerfona);

  const [typeNameOrg, setTypeNameOrg] = useState("Ingliz tili");
  const { pageNumberId, setPageNumberId, setIsInputFocused } =
    useContext(contextPerfona);

  // const location = useLocation();

  const { data: coursesType } = useQuery(
    ["categoryDatas"],
    () => Perfona.coursesCategory(),
    {
      staleTime: Infinity, // Ma'lumot hech qachon eski hisoblanmaydi
      cacheTime: Infinity,
    }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    // Only set pageNumberId if coursesType data is available
    if (coursesType?.data?.length > 0) {
      setPageNumberId(coursesType.data[0].id);
      setTypeNameOrg(coursesType.data[0].name);
    }
  }, [coursesType?.data]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 7000);
  }, []);

  const open = Boolean(anchorEl);
  const handleDropDown = (e) => {
    e.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    if (typeof value === "string") {
      setAnchorValue(value);
    } else if (anchorValue !== "") {
      setAnchorValue(anchorValue);
    } else {
      setAnchorValue("");
    }
    setAnchorEl(null);
  };

  const handleValueChange = (e) => {
    setAnchorValue(e.target.value);
  };

  return (
    <div>
      {/* Loading Page */}
      {/* {loading && (
        <div className="w-full h-full absolute top-0 left-0 overflow-y-hidden p-0 m-0">
          <LoadingPage />
        </div>
      )} */}

      <div className="container max-w-sm  mx-auto pt-[20px]   px-1">
        <div className="navbar flex justify-between items-center">
          <img src={logo} alt="Perfona" className="h-[34px] dark:hidden" />
          <img
            src={darklogo}
            alt="Perfona"
            className="h-[25px] dark:block hidden"
          />
          <div className="flex items-center gap-3">
            <div>
              <DarkThemeToggle className="rounded-full p-2 ring-0 border-0 outline-none dark:bg-gray-800 dark:hover:bg-gray-800 focus:ring-0" />
            </div>
            <img
              className="w-[40px] h-[40px] rounded-full"
              src={user?.photo_url}
              alt=""
            />
          </div>
        </div>

        {/* search panel */}
        <div className="mt-[16px] mb-[30px]">
          <form action="" className="relative">
            <input
              type="text"
              placeholder="Izlash..."
              value={anchorValue}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onChange={handleValueChange}
              className="border-none outline-none px-[58px] py-[12px] w-full rounded-full custom-placeholder dark:bg-gray-900 dark:text-white"
            />
            <div className="icon_search absolute w-[26px] top-[9px] left-[15px]">
              <img src={search_icon} alt="Search" className="w-full " />
            </div>
            {/* search menu */}
            <div className="absolute top-[5px] right-[5px] ">
              <Tooltip title="Search Menu">
                <button
                  className="w-[39px] h-[39px] rounded-full bg-gradient-to-tl from-[#003EFF] to-[#0094FF] flex justify-center items-center p-[11px]"
                  onClick={handleDropDown}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <img src={search_menu} alt="Search menu" className="w-full" />
                </button>
              </Tooltip>
            </div>
            <div className="">
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                // onClick={handleClose}
                anchorOrigin={{
                  horizontal: "right",
                  vertical: "top",
                }}
                transformOrigin={{
                  horizontal: "right",
                  vertical: "bottom",
                }}
                sx={{
                  position: "absolute", // Tugmachaga nisbatan joylashishini ta'minlaydi
                }}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      mt: 14,
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: "20%",
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)", // Uchburchakni aylantirish
                        zIndex: 0,
                      },
                    },
                  },
                }}
              >
                {coursesType?.data?.map((item) => (
                  <MenuItem
                    key={item.id}
                    className="text-[14px]"
                    onClick={() => handleClose(item.id)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </form>
        </div>
      </div>

      {/* course type */}
      <div className="">
        <ul className="flex  gap-[11px] max-w-sm mx-auto overflow-x-scroll w-full scrollbar-hide">
          {coursesType?.data?.map((item) => (
            <li
              key={item.id}
              className={`px-[23px] py-[8px] rounded-full course_type dark:bg-gray-900 dark:text-white ${
                pageNumberId === item.id ? "active" : ""
              }  whitespace-nowrap cursor-pointer`}
              onClick={() => {
                setPageNumberId(item.id);
                setTypeNameOrg(item.name);
              }}
            >
              {item.name}
            </li>
          ))}

          {/* <li className="px-[23px] py-[8px] rounded-full course_type whitespace-nowrap dark:bg-gray-900 dark:text-white">
            Matematika
          </li>
          <li className="px-[23px] py-[8px] rounded-full course_type whitespace-nowrap dark:bg-gray-900 dark:text-white">
            Informatika
          </li>
          <li className="px-[23px] py-[8px] rounded-full course_type whitespace-nowrap dark:bg-gray-900 dark:text-white">
            Fizika
          </li>
          <li className="px-[23px] py-[8px] rounded-full course_type whitespace-nowrap dark:bg-gray-900 dark:text-white">
            Nemis tili
          </li> */}
        </ul>
      </div>

      {/* Courses */}
      <div className="container max-w-sm  mx-auto mt-[20px] pb-[120px] px-1">
        <h1 className="text-[24px] font-medium dark:text-white">
          {typeNameOrg}
        </h1>
        <div>
          <Courses />
        </div>
      </div>
    </div>
  );
}
