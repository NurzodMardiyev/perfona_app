import { useEffect } from "react";
import confetti from "canvas-confetti";

const SuccessPage = ({ setOpen, setIsModalOpen }) => {
  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full w-full bg-green-100">
      <h1 className="text-4xl font-bold text-green-600">🎉 Success!</h1>
      <p className="text-lg text-gray-700">Siz muvaffaqiyatli bajarildi.</p>
      <button
        className="text-white px-6 py-3 rounded-md bg-gradient-to-tl from-[#003EFF] to-[#0094FF]"
        onClick={() => {
          setOpen(false);
          setIsModalOpen(false);
        }}
      >
        Orqaga qaytish
      </button>
    </div>
  );
};

export default SuccessPage;
