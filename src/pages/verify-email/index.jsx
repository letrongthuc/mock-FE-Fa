import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "@/utils/axios"; // Đường dẫn alias bạn đã cấu hình

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Đang xác minh...");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setMessage("Token không hợp lệ.");
        setSuccess(false);
        return;
      }

      try {
        const response = await axios.get(`/verify-email`, {
          params: { token },
        });
        setMessage(response.data.msg);
        setSuccess(true);
      } catch (error) {
        setMessage(error.response?.data?.detail || "Xác minh thất bại.");
        setSuccess(false);
      }
    };

    verifyToken();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className={`text-2xl font-bold mb-4 ${success ? "text-green-600" : "text-red-600"}`}>
        {message}
      </h1>
      {success && (
        <a href="/user/log-in" className="text-blue-500 underline">
          Đăng nhập ngay
        </a>
      )}
    </div>
  );
};

export default VerifyEmail;
