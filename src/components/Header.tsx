import { Outlet, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const handlerGoHome = () => navigate("/");
  return (
    <>
      <header className="header">
        <div className="header__wrapper">
          <a className="gohome__link" onClick={handlerGoHome}>
            To Home page
          </a>
        </div>
      </header>
      <Outlet />
    </>
  );
};
