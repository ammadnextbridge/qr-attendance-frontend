import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User, Power, Menu, Bell } from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuthContext } from "@/auth/hooks";
import { paths } from "@/routes/paths";
import { navData } from "./config-nav";
import { STORAGE_KEY } from "@/auth/context/jwt";
import { useRouter } from "@/routes/hooks";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ROLES } from "@/utils/constant";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props): JSX.Element {
  const router = useRouter();
  const { user } = useAuthContext();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md"
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Left section with logo and navigation */}
            <div className="flex items-center gap-6">
              <Link to={paths.dashboard.root} className="relative group">
                <motion.img
                  src={logo}
                  alt="AttendanceQR Logo"
                  className="h-8 w-auto"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden sm:flex items-center gap-1 relative">
                {user?.role === ROLES.ADMIN &&
                  navData.map((item) => (
                    <motion.div
                      key={item.path}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative"
                    >
                      <Link
                        to={item.path}
                        className={cn(
                          "relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                          "hover:text-primary",
                          isActive(item.path)
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {item.title}
                      </Link>
                      {isActive(item.path) && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-[1.30rem] left-0 right-0 h-1 bg-primary rounded-full"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.div>
                  ))}
              </nav>
            </div>

            {/* Right section with mobile menu and user actions */}
            <div className="flex items-center gap-4">
              {/* Mobile Navigation */}
              <div className="sm:hidden">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="h-10">
                        <Menu className="h-4 w-4" />
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-48 p-2">
                          {user?.role === ROLES.ADMIN &&
                            navData.map((item) => (
                              <Link
                                to={item.path}
                                key={item.path}
                                className={cn(
                                  "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                                  "hover:bg-primary/10 hover:text-primary",
                                  isActive(item.path) &&
                                    "bg-primary/10 text-primary"
                                )}
                              >
                                <User className="h-4 w-4" />
                                <span>{item.title}</span>
                              </Link>
                            ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <Bell className="text-primary" />

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9 border-2 border-primary">
                      <AvatarImage src={user?.imageUrl} alt={user?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:bg-destructive/5 focus:text-destructive"
                    onClick={handleLogout}
                  >
                    <Power className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © 2024 AttendanceQR. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
