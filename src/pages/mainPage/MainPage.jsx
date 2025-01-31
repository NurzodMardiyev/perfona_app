import { Outlet } from "react-router-dom";
import ButtonMenu from "../../components/ButtonMenu";

export default function MainPage() {
  return (
    <div className="bg-[#f4f6f8] dark:bg-gray-800 min-h-[100vh]">
      <div>
        <Outlet />
      </div>
      <div className="">
        <ButtonMenu />
      </div>
    </div>
  );
}
