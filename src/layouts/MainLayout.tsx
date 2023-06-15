import Footer from "../components/Footer/Footer";
import MainHeader from "../components/Header/MainHeader/MainHeader";

interface Props {
  children?: React.ReactNode;
}
export default function MainLayout({ children }: Props) {
  return (
    <div>
      <MainHeader />
      {children}
      <Footer />
    </div>
  );
}
