import { Link, useNavigate } from "react-router-dom";
import Google from "../../components/Logo/Google";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../utils/schema";
import { omit } from "lodash";
import { useDispatch } from "react-redux";
import { registerUser } from "../../reducers/users.slice";
import { AppDispatch } from "../../store";

export default function Register() {
  interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
  }
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    dispatch(registerUser(omit(data, ["confirmPassword"])))
      .unwrap()
      .then((res) => {
        alert(res.message);
        navigate("/login");
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
              noValidate
              onSubmit={onSubmit}
            >
              <div className="text-2xl">Đăng ký</div>
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
              <div className="mt-2">
                <input
                  type="password"
                  className={`p-3 w-full outline-none border border-gay-300 focus:shadow-md ${
                    errors.password ? "border-red-600 " : ""
                  }`}
                  placeholder="Mật khẩu"
                  autoComplete="on"
                  {...register("password")}
                />
                <div className="mt-1 text-red-600 text-xs min-h-[1rem]">
                  {errors.password?.message}
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  className={`p-3 w-full outline-none border border-gay-300 focus:shadow-md ${
                    errors.confirmPassword ? "border-red-600 " : ""
                  }`}
                  placeholder="Nhập lại mật khẩu"
                  autoComplete="on"
                  {...register("confirmPassword")}
                />
                <div className="mt-1 text-red-600 text-xs min-h-[1rem]">
                  {errors.confirmPassword?.message}
                </div>
              </div>
              <button
                type="submit"
                className="mt-3 py-4 w-full rounded-sm bg-primary uppercase text-sm text-center px-2 hover:opacity-90 text-white lg:text-md cursor-pointer"
              >
                đăng ký
              </button>

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
              <div className="mt-3 text-center text-xs">
                Bằng việc đăng ký, bạn đã đồng ý với Shopee về
                <Link to="/" className="text-primary">
                  {" "}
                  Điều khoản dịch vụ{" "}
                </Link>
                &
                <Link to="/" className="text-primary">
                  {" "}
                  Chính sách bảo mật
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400 ">Bạn đã có tài khoản?</span>
                <Link className="ml-1 text-red-400" to="/login">
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
