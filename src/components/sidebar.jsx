import { useEffect, useState } from "react";
import { TbMenu2, TbX } from "react-icons/tb";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { Layout, LayoutHeader } from "./custom/layout";
import { Button } from "./custom/button";
import Nav from "./nav";
import { cn } from "@/lib/utils";
import { sidelinks } from "@/nav_links/sidelinks";
import { Colors } from "@/lib/colors";

export default function Sidebar2({ className, isCollapsed, setIsCollapsed }) {
  const [navOpened, setNavOpened] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (navOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [navOpened]);

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300 md:bottom-0 md:right-auto md:h-svh ${
          isCollapsed ? "md:w-16" : "md:w-72"
        }`,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overlay para móvil */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-all duration-500 ${
          navOpened ? "h-svh opacity-70 backdrop-blur-sm" : "h-0 opacity-0"
        } w-full bg-gradient-to-br from-[#000B29]/60 to-[#000B29]/40 md:hidden`}
      />

      <Layout>
        {/* Header con colores de la paleta */}
        <LayoutHeader
          className={cn(
            "sticky top-0 justify-between px-4 py-4 transition-all duration-300 md:px-6",
            "bg-white/95 backdrop-blur-xl",
            "border-b border-[#e5e7eb] shadow-sm"
          )}
        >
          <div
            className={cn(
              "flex items-center transition-all duration-300",
              !isCollapsed ? "gap-3" : "gap-0"
            )}
          >
            {/* Logo con colores primarios */}
            <img
              src="/src/assets/logoyachay1.png"
              alt="Logo Yachay Votu"
              className={cn(
                "transition-all duration-300",
                isCollapsed ? "h-8 w-8" : "h-10 w-10"
              )}
            />

            {/* Texto del header */}
            <div
              className={cn(
                "flex flex-col justify-end transition-all duration-300 overflow-hidden",
                isCollapsed
                  ? "invisible w-0 opacity-0 -ml-2"
                  : "visible w-auto opacity-100 ml-0"
              )}
            >
              <span className="font-bold text-lg text-[#000B29]">
                YACHAY VOTU
              </span>
              <span className="text-xs text-[#6b7280] font-medium">
                Dashboard
              </span>
            </div>
          </div>

          {/* Botón menú móvil */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-xl transition-all duration-200 hover:bg-[#F8F5F2] hover:scale-110"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? (
              <TbX className="h-6 w-6 text-[#000B29]" />
            ) : (
              <TbMenu2 className="h-6 w-6 text-[#000B29]" />
            )}
          </Button>
        </LayoutHeader>

        {/* Navegación con fondo pearl */}
        <Nav
          id="sidebar-menu"
          className={cn(
            "h-full flex-1 overflow-auto transition-all duration-500",
            "bg-[#F8F5F2]",
            navOpened
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 md:max-h-screen md:opacity-100"
          )}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sidelinks ? sidelinks : ""}
        />

        {/* Botón colapsar - Con colores secundarios */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="outline"
          className={cn(
            "absolute -right-3 top-8 hidden rounded-2xl md:inline-flex",
            "transition-all duration-300 hover:scale-110 hover:shadow-lg",
            "bg-white border-[#e5e7eb] shadow-md",
            "backdrop-blur-sm"
          )}
        >
          <FaAngleDoubleLeft
            className={cn(
              "h-4 w-4 transition-all duration-500 text-[#000B29]",
              isCollapsed ? "rotate-0" : "rotate-180",
              isHovered && !isCollapsed && "translate-x-0.5"
            )}
          />
        </Button>

        {/* Efecto de borde sutil */}
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#e5e7eb] to-transparent" />
      </Layout>
    </aside>
  );
}
