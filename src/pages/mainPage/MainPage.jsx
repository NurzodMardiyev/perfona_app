import { Outlet } from "react-router-dom";
import ButtonMenu from "../../components/ButtonMenu";
import { useContext } from "react";
import { contextPerfona } from "../../context/contextApi";

export default function MainPage() {
  const { isInputFocused } = useContext(contextPerfona);
  return (
    <div className="bg-[#f4f6f8] dark:bg-gray-800 min-h-[100vh]">
      <div>
        <Outlet />
      </div>
      {!isInputFocused && (
        <div className="">
          <ButtonMenu />
        </div>
      )}
    </div>
  );
}
