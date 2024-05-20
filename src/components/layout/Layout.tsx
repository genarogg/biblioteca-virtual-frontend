import Header from "./Header";
import Footer from "./Footer";

import { ToastContainer } from "react-toastify";

interface LayoutProps {
  children?: React.ReactNode;
  header?: JSX.Element;
  footer?: JSX.Element;
  where?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  header = <Header />,
  footer = <Footer />,
  where = " ",
}) => {
  return (
    <div className={`full-content ${where}`}>
      <ToastContainer />
      {header}
      <main>{children}</main>
      {footer}
    </div>
  );
};

export default Layout;
