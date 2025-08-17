import { useNavigate } from "react-router-dom";
import { logIn } from "../services/api";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = formData.email;
    const password = formData.password;

    // mail verification
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail) {
      setError(t("Please enter a valid email address."));
      return;
    }
    try {
      const response = await logIn(email, password);
      console.log("Login successful:", response);
      setSuccess(t("Login successful"));
      setTimeout(() => navigate("/EditPage"), 1500);
    } catch (error) {
      console.error("Login failed:", error);
      setError(t("Login failed. Please check your email and password."));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="bg-cardColor p-6 rounded-xl shadow-md text-center">
        {error && (
          <div className="p-3 mb-3 text-sm text-red-700 bg-red-100 rounded-xl" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 mb-3 text-sm text-green-700 bg-green-100 rounded-xl" role="alert">
            {success}
          </div>
        )}
        <h2 className="text-xl font-bold mb-5">{t("Log In")}</h2>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t("Email")}
            required
            className="border p-3 mb-4 w-full rounded-xl bg-blueCustom hover:bg-darkBlueCustom text-white text-center"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder={t("Password")}
            required
            className="border p-3 mb-4 w-full rounded-xl bg-blueCustom hover:bg-darkBlueCustom cursor-pointer text-white text-center"
          />
        </div>
        <button type="submit" className="w-full max-w-[200px] bg-roseCustom hover:bg-pink-500 text-white font-semibold transition duration-300 py-3 rounded-xl">
          {t("Log In")}
        </button>
      </form>
    </div>
  );
}