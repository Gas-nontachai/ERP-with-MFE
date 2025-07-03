export default function NoPermission() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="alert alert-error shadow-lg max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
          />
        </svg>
        <span className="text-lg font-semibold">
          คุณไม่มีสิทธิ์เข้าถึงหน้านี้
        </span>
      </div>
      <p className="mt-4 text-gray-500">
        กรุณาติดต่อผู้ดูแลระบบหากคิดว่านี่เป็นข้อผิดพลาด
      </p>
    </div>
  );
}
