import { Link, useMatch } from "react-router-dom";
import Logo from "../../Logo/Logo";
export default function RegisterHeader() {
  const matchData = useMatch("/register");
  const isRegister = Boolean(matchData);

  return (
    <header className="py-5 container">
      <nav className="flex items-end">
        <Link to="/">
          <Logo className="logo h-8 lg:h-11 fill-primary" />
        </Link>
        <div className="ml-5 text-xl lg:text-2xl">
          {isRegister ? "Đăng ký" : "Đăng nhập"}
        </div>
      </nav>
    </header>
  );
}
