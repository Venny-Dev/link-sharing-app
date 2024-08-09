import { useRef } from "react";
import AppNav from "../components/AppNav";

import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DesktopViewSummary from "../components/AppLinks/DesktopViewSummary";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";

function AppLayout() {
  const location = useLocation();
  const nodeRef = useRef(null);
  const { isLoading } = useAuth();
  return (
    <div className="bg-slate-100 h-full pb-[16px]  md:pt-[24px] min-[1440px]:flex  min-[1440px]:flex-col  min-[1440px]:items-center relative">
      <AppNav />
      <div className="min-[1440px]:grid w-full  min-[1440px]:max-w-[1392px] min-[1440px]:gap-6 grid-cols-5 relative">
        <DesktopViewSummary />
        <TransitionGroup className="content col-span-3  w-full">
          <CSSTransition
            key={location.key}
            nodeRef={nodeRef}
            classNames="fade"
            timeout={300}
          >
            <div className="page-content" ref={nodeRef}>
              <Outlet />
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
      {isLoading && (
        <>
          <Loader />
          <div className="absolute inset-0 bg-gray-800 opacity-40 w-full h-full"></div>
        </>
      )}
    </div>
  );
}

export default AppLayout;
