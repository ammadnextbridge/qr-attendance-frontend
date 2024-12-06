import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/data-table";
import {
  Users2,
  UserPlus,
  RefreshCcw,
  UserRoundCheck,
  UserRoundX,
  CircleDashed,
} from "lucide-react";
import { columns } from "../components/columns";
import { userService } from "@/services/user.service";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useBoolean } from "@/hooks/use-boolean";
import UserNewEditForm from "../components/user-new-edit-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeIn,
  slideUp,
  scaleIn,
  containerVariants,
  transitions,
} from "@/animations/variants";
import { UserStatCard, UserStatCardProps } from "../components/user-stat-card";

export default function UserListView() {
  const userForm = useBoolean();
  const {
    data: users,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAllUsers,
  });
  const showSpinner = isLoading || isRefetching || !users;

  const totalUsers = users?.length ?? 0;
  const activeUsers =
    users?.filter((user) => user.status === "approved").length ?? 0;
  const pendingUsers =
    users?.filter((user) => user.status === "pending").length ?? 0;
  const blockedUsers =
    users?.filter((user) => user.status === "rejected").length ?? 0;

  const cards: UserStatCardProps[] = [
    {
      title: "Total Users",
      subText: "registered",
      stat: totalUsers,
      variant: "default",
      icon: <Users2 />,
    },
    {
      title: "Active Users",
      subText: "approved",
      stat: activeUsers,
      statText: "Active",
      total: totalUsers,
      variant: "success",
      icon: <UserRoundCheck className="text-green-600" />,
    },
    {
      title: "Pending Approvals",
      subText: "waiting",
      stat: pendingUsers,
      statText: "Pending",
      total: totalUsers,
      variant: "warning",
      icon: <CircleDashed className="text-yellow-500" />,
    },
    {
      title: "Blocked Users",
      subText: "blocked",
      stat: blockedUsers,
      statText: "Blocked",
      total: totalUsers,
      variant: "destructive",
      icon: <UserRoundX className="text-destructive" />,
    },
  ];
  console.log(users)
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-8"
    >
      {/* Header Section */}
      <motion.div variants={slideUp} className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Users Management
            </h1>
            <p className="text-muted-foreground text-md mt-2">
              View and manage user accounts and their status
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={userForm.onTrue} size="lg" className="h-10">
              <UserPlus className="mr-2 h-5 w-5" />
              Add User
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        className="grid gap-6 md:grid-cols-4"
      >
        {cards.map((card, idx) => (
          <UserStatCard key={idx} {...card} />
        ))}
      </motion.div>

      {/* Main Table Card */}
      <motion.div variants={scaleIn} transition={transitions.slow}>
        <Card className="relative">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Users List</CardTitle>
                <CardDescription>
                  A list of all users in your organization
                </CardDescription>
              </div>
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={transitions.default}
              >
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => refetch()}
                  disabled={isRefetching}
                >
                  <RefreshCcw
                    className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`}
                  />
                </Button>
              </motion.div>
            </div>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {showSpinner ? (
                <motion.div
                  key="spinner"
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex items-center justify-center min-h-[400px]"
                >
                  <LoadingSpinner />
                </motion.div>
              ) : (
                <motion.div
                  key="table"
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <DataTable data={users} columns={columns} />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <UserNewEditForm open={userForm.value} onClose={userForm.onFalse} />
    </motion.div>
  );
}
