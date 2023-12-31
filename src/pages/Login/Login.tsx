import { Link, useNavigate } from "react-router-dom";
import Google from "../../components/Logo/Google";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../utils/schema";
import { loginUser } from "../../reducers/users.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
export default function Login() {
  interface FormData {
    email: string;
    password: string;
  }
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((rejectedValueOrSerializedError) => {
        const formErr = rejectedValueOrSerializedError.data;
        if (formErr?.email) {
          setError("email", {
            type: "server",
            message: formErr.email,
          });
        }
        if (formErr?.password) {
          setError("password", {
            type: "server",
            message: formErr.password,
          });
        }
      });
  });
  return (
    <div className="bg-primary">
      <div className="container">
        <div className="grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form
              className="p-10 rounded bg-white shadow-sm"
              onSubmit={onSubmit}
            >
              <div className="text-2xl">Đăng nhập</div>
              <div className="mt-8 ">
                <input
                  type="email"
                  className={`p-3 w-full outline-none border border-gay-300 focus:shadow-md ${
                    errors.email ? "border-red-600 " : ""
                  }`}
                  placeholder="Email"
                  {...register("email")}
                />
                <div className="mt-1 text-red-600 text-xs min-h-[1rem]">
                  {errors.email?.message}
                </div>
              </div>
              <div className="mt-3">
                <input
                  type="password"
                  className={`p-3 w-full outline-none border border-gay-300 focus:shadow-md ${
                    errors.password ? "border-red-600" : ""
                  }`}
                  placeholder="Mật khẩu"
                  autoComplete="on"
                  {...register("password")}
                />
                <div className="mt-1 text-red-600 text-xs min-h-[1rem]">
                  {errors.password?.message}
                </div>
              </div>
              <button
                type="submit"
                className="mt-3 py-4 w-full rounded-sm bg-primary uppercase text-sm text-center px-2 hover:opacity-90 text-white lg:text-md cursor-pointer"
              >
                đăng nhập
              </button>
              <div className="flex justify-between mt-3">
                <Link to="/" className="text-xs lg:text-sm text-blue-600">
                  Quên mật khẩu
                </Link>
                <Link to="/" className="text-xs lg:text-sm text-blue-600">
                  Đăng nhập với SMS
                </Link>
              </div>
              <div className="flex items-center mt-3">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="flex-shrink text-sm text-gray-400 px-4 font-light uppercase">
                  Hoặc
                </span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>
              <div className="flex mt-3">
                <div className="py-2 flex-1 rounded-sm border-gray-400 border text-center mr-2 cursor-pointer hover:bg-gray-50">
                  <i className="fa-brands fa-facebook mr-2 text-xl text-blue-500"></i>
                  Facebook
                </div>
                <div className="py-2 flex-1 rounded-sm border-gray-400 border text-center ml-2 flex-center cursor-pointer hover:bg-gray-50">
                  <div className="flex-center">
                    <Google className="h-6 mr-2" />
                    Google
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400 ">Bạn mới biết đến Shopee?</span>
                <Link className="ml-1 text-red-400" to="/register">
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
