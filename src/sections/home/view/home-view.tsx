import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAttendance } from "@/services/attendance.service";
import { Users, UserCheck, Clock, Mail, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cardVariants, containerVariants } from "@/animations/variants";
import { motion } from "framer-motion";
import { useGetActiveUsers } from "@/services/user.service";

export default function HomeView() {
  const { records, meta, isLoading } = useGetAttendance();

  const { activeUsers } = useGetActiveUsers();

  const totalPresent = meta?.total ?? 0;
  const totalExpected = activeUsers.length;
  const attendanceRate = totalPresent
    ? ((totalPresent / totalExpected) * 100).toFixed(1)
    : 0;

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Header Section */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground text-md">
          Welcome back! Here's today's attendance overview.
        </p>
      </div>

      {/* Stats Cards */}
      <motion.div
        variants={containerVariants}
        className="grid gap-6 md:grid-cols-3"
      >
        <motion.div variants={cardVariants} whileHover="hover">
          <Card className="relative overflow-hidden h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Present
              </CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold">{totalPresent}</span>
                      <span className="text-sm text-muted-foreground">
                        users
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Present today
                    </p>
                  </>
                )}
              </div>
            </CardContent>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500/20">
              <div
                className="h-full bg-green-500"
                style={{ width: `${attendanceRate}%` }}
              />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants} whileHover="hover">
          <Card className="relative overflow-hidden h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Expected
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">{totalExpected}</span>
                <span className="text-sm text-muted-foreground">users</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Registered users
              </p>
            </CardContent>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500/20">
              <div className="h-full bg-blue-500 w-full" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants} whileHover="hover">
          <Card className="relative overflow-hidden h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Attendance Rate
              </CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold">
                      {attendanceRate}%
                    </span>
                  </div>
                  <Progress value={Number(attendanceRate)} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {totalPresent} out of {totalExpected} users present
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Recent Records Table */}
      <Card className="relative overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">
                Recent Attendance Records
              </CardTitle>
              <CardDescription>Today's attendance activity</CardDescription>
            </div>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Name</span>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>Email</span>
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Time</span>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records?.map((record) => (
                    <TableRow key={record.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {record.user.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {record.user.email}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(record.markedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
