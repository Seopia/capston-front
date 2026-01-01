"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, BarChart3, Music, User, Share2, Menu, X, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/contenxts/AuthContext";

export default function Navigation() {
  const isClient = typeof window !== "undefined";
  const [isMobile, setMobile] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);
  const [dark, setDark] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    if (!isClient) return;
    const update = () => {
      const mobile = window.innerWidth <= 640;
      setMobile(mobile);
      // if (!mobile) setIsExpanded(true);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isClient]);

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false);
    }
  }, [pathname, isMobile]);

  const navItems = [
    { href: "/", label: "홈", icon: Home },
    { href: "/emotion-log", label: "감정 기록", icon: BarChart3 },
    { href: "/mind-care", label: "마음 관리", icon: Music },
    { href: "/profile", label: "프로필", icon: User },
    { href: "/community", label: "일기 커뮤니티", icon: Share2 },
  ];

  const controlAuth = () => {
    isLoggedIn ? logout() : router.push("/login");
  };

  const toggleTheme = () => {
    const theme = dark ? "white" : "dark";
    setDark(!dark);
    document.querySelector("html")?.setAttribute("class", theme);
  };

  // 👉 공통으로 쓸 사이드바 내용 (모바일/데스크탑 둘 다 여기)
  const SidebarContent = (
    <>
      {/* Header */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        {isExpanded && (
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Refill
            </h1>
            <p className="text-xs text-muted-foreground mt-1">AI 감정 상담</p>
            <div className="flex gap-2 mt-2 justify-center items-center">
              <div className="text-xs text-muted-foreground">다크모드</div>
              <button
                type="button"
                onClick={toggleTheme}
                className={`relative inline-flex h-4 w-10 items-center rounded-full transition-colors duration-200
                  ${dark ? "bg-primary border-primary" : "bg-muted border-border"} border`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200
                    ${dark ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
        >
          {isExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <li onClick={() => { isMobile && setIsExpanded(false) }} key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isExpanded ? "justify-start" : "justify-center"}
                    ${active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground"
                    }`}
                  title={!isExpanded ? item.label : ""}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isExpanded && <span className="text-sm">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer - 로그인/로그아웃 */}
      <div className="p-4 border-t border-border">
        <button
          onClick={controlAuth}
          className={`w-full px-4 py-2 text-sm rounded-lg transition-colors font-medium flex items-center justify-center gap-2
            ${isLoggedIn
              ? "bg-primary/10 hover:bg-primary/20 text-primary"
              : "bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
            }
            ${!isExpanded ? "p-2" : ""}`}
        >
          {isLoggedIn ? (
            <>
              <LogOut className="w-4 h-4" />
              {isExpanded && "로그아웃"}
            </>
          ) : (
            <>{isExpanded ? "로그인" : "로그"}</>
          )}
        </button>
      </div>
    </>
  );

  // 👉 ① 모바일: layout용 placeholder + fixed drawer
  if (isMobile) {
    return (
      <>
        {/* 이 div가 flex 레이아웃 안에서 "사이드바 자리"를 차지하지만,
            w-0이라 화면은 안 밀림 */}
        <div className="w-0" />

        {/* 햄버거 버튼은 화면 위에 띄우기 */}
        {!isExpanded && (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-card border border-border shadow hover:bg-muted"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* 사이드바 드로어 (화면 위에 겹치는 놈) */}
        <nav
          className={`
            fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border
            flex flex-col shadow-lg
            transition-transform duration-300
            ${isExpanded ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {SidebarContent}
        </nav>

        {/* 오버레이 클릭 시 닫기 (선택사항) */}
        {isExpanded && (
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </>
    );
  }

  // 👉 ② 데스크탑: 기존처럼 왼쪽에 붙은 사이드바
  const desktopWidth = isExpanded ? "w-64" : "w-20";

  return (
    <nav
      className={`
        ${desktopWidth}
        bg-card border-r border-border flex flex-col shadow-sm
        transition-[width] duration-300
      `}
    >
      {SidebarContent}
    </nav>
  );
}
