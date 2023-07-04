import * as yup from "yup";
export const registerSchema = yup
  .object({
    email: yup
      .string()
      .required("Bạn chưa nhập email")
      .max(255, "Độ dài email không được quá 255 ký tự")
      .matches(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
        "Email không đúng"
      ),
    password: yup
      .string()
      .required("Bạn chưa nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 kí tự"),
    confirmPassword: yup
      .string()
      .required("Bạn chưa nhập lại mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
  })
  .required();
export const loginSchema = registerSchema.omit(["confirmPassword"]);
export const filterPriceSchema = yup
  .object({
    price_min: yup
      .string()
      .matches(/^\d+$/, "Vui lòng nhập khoảng giá chính xác"),

    price_max: yup
      .string()
      .matches(/^\d+$/, "Vui lòng nhập khoảng giá chính xác")
      .test(
        "area_compare",
        `Vui lòng nhập khoảng giá chính xác`,
        function (price_max: string | undefined): boolean {
          return price_max
            ? Number(price_max) > Number(this.parent.price_min)
            : true;
        }
      ),
    //.matches(/^\d+$/, "Vui lòng nhập khoảng giá chính xác"),
  })
  .required();
export const searchSchema = yup.object({
  product_name: yup.string().trim().required("Vui lòng nhập tên sản phẩm"),
});
export const ratingSchema = yup
  .object({
    email: yup
      .string()
      .required("Vui lòng nhập email của bạn")
      .max(255, "Độ dài email không được quá 255 ký tự")
      .matches(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
        "Email không đúng"
      ),
    name: yup.string().required("Vui lòng nhập tên của bạn"),
    phone_number: yup.string().required("Vui lòng nhập số điện thoại của bạn"),
  })
  .required();
// export const loginSchema = yup
//   .object({
//     email: yup
//       .string()
//       .max(255, "Độ dài email không được quá 255 ký tự")
//       .matches(
//         /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
//         "Email không đúng"
//       ),
//     password: yup
//       .string()
//       .required("Bạn chưa nhập mật khẩu")
//       .min(8, "Mật khẩu phải có ít nhất 8 kí tự"),
//   })
//   .required();
