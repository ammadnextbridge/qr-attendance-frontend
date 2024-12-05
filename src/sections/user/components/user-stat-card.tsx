import { cardVariants, fadeIn, transitions } from "@/animations/variants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export type UserStatCardProps = {
  title: string;
  subText: string;
  icon: React.ReactNode;
  variant: "default" | "success" | "warning" | "destructive";
  stat: number;
  statText?: string;
  total?: number;
};

export function UserStatCard({
  title,
  icon,
  subText,
  stat,
  statText,
  total,
  variant,
}: UserStatCardProps) {
  return (
    <motion.div variants={cardVariants} whileHover="hover">
      <Card className="h-full ">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="h-4 2-4">{icon}</div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitions.bounce}
            className="flex items-baseline space-x-2"
          >
            <span className="text-3xl font-bold">{stat}</span>
            <span className="text-sm text-muted-foreground">{subText}</span>
          </motion.div>
          {total && (
            <motion.div
              variants={fadeIn}
              transition={transitions.default}
              className="mt-1"
            >
              <Badge variant={variant} className="text-xs">
                {((stat / total) * 100).toFixed(1)}% {statText && statText}
              </Badge>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
