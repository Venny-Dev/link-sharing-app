import { Link, NavLink } from "react-router-dom";
// import { CSSTransition, TransitionGroup } from "react-transition-group";

function AppNav() {
  return (
    <nav className="flex items-center justify-around md:justify-between p-[16px]  bg-white w-full max-w-[720px] m-auto md:rounded-[8px] min-[1440px]:max-w-[1392px]">
      <div className="ml-[8px] flex items-center gap-[6px]">
        <img src="/Vector.png" alt="logo" />
        <p className="font-bold text-4xl text-[#383737] hidden md:block">
          devlinks
        </p>
      </div>

      <div className="flex items-center justify-between gap-[27px]">
        <NavLink
          to="links"
          className={({ isActive }) =>
            isActive
              ? "nav-link-active transition-colors duration-300 ease-in-out"
              : ""
          }
        >
          {({ isActive }) => (
            <div className="flex items-center gap-2">
              <img
                src={isActive ? "/link-icon.png" : "/linkblack-icon.png"}
                alt="logo"
              />
              <span
                className={`hidden md:inline-flex font-semibold text-[16px] leading-[24px] ${isActive ? "text-[#633CFF]" : "text-[#737373]"}`}
              >
                Links
              </span>
            </div>
          )}
        </NavLink>

        <NavLink
          to="profile"
          className={({ isActive }) =>
            isActive
              ? "nav-link-active transition-colors duration-300 ease-in-out"
              : ""
          }
        >
          {({ isActive }) => (
            <div className="flex items-center gap-2 ">
              <img
                src={isActive ? "/profileactive-icon.png" : "/profile-icon.png"}
                alt="profile"
              />
              <span
                className={`hidden md:inline-flex font-semibold text-[16px] leading-[24px] ${isActive ? "text-[#633CFF]" : "text-[#737373]"}`}
              >
                Profile details
              </span>
            </div>
          )}
        </NavLink>
      </div>

      <div className="border-[#633CFF] border rounded-[8px] py-[11px] px-[16px]  hover:bg-[#EFEBFF] transition-colors duration-300 ease-in-out">
        <Link to="/preview">
          <img src="/preview-icon.png" alt="logo" className="md:hidden" />
          <p className="text-[#633CFF] text-[16px] font-semibold leading-[24px] hidden md:block">
            Preview
          </p>
        </Link>
      </div>
    </nav>
  );
}

export default AppNav;
