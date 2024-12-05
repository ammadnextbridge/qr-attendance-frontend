import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";
import { Skeleton } from "@/components/ui/skeleton";
import { qrService } from "@/services/qr.service";
import { Loader2, RefreshCw, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/auth/hooks";
import { ROLES } from "@/utils/constant";
import { motion, AnimatePresence } from "framer-motion";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useState } from "react";

const centers = ["Lahore", "Islamabad", "Karachi", "Peshawar"];

export default function QRCodeView() {
  const handleFullScreen = useFullScreenHandle();
  const { user } = useAuthContext();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [selectedCenter, setSelectedCenter] = useState(centers[0]);

  const { data: qrData, isLoading } = useQuery({
    queryKey: ["currentQR", selectedCenter],
    queryFn: () => qrService.getCurrentQR(selectedCenter), // Pass the center to the service
  });

  const generateMutation = useMutation({
    mutationFn: () => qrService.generateNewQR(selectedCenter), // Pass the center to the service
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentQR"] });
      toast({
        title: "Success",
        description: "New QR code generated successfully",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate new QR code",
      });
    },
  });

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
      <FullScreen
        handle={handleFullScreen}
        className="min-h-[calc(100vh-16rem)] flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
           {/* Center Selector */}
              <div className="mt-4 mb-2">
              <select
                  className="w-full p-2 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                  value={selectedCenter}
                  onChange={(e) => setSelectedCenter(e.target.value)}
                >
                  {centers.map((center) => (
                    <option key={center} value={center}>
                      {center}
                    </option>
                  ))}
                </select>
              </div>
          <Card className="border-2">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-bold text-center">
                Scan QR Code for Attendance
              </CardTitle>
             
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {isLoading || generateMutation.isPending ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <Skeleton className="h-64 w-64 mx-auto" />
                    <div className="flex justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  </motion.div>
                ) : qrData?.token ? (
                  <motion.div
                    key="qr-code"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex flex-col items-center"
                  >
                    <div className="p-4 bg-white rounded-xl shadow-lg">
                      <QRCode
                        value={qrData.token}
                        size={256}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                      />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="w-full mt-6"
                    >
                      {handleFullScreen.active ? (
                        <Button
                          onClick={handleFullScreen.exit}
                          className="w-full"
                        >
                          Exit Full Screen
                        </Button>
                      ) : (
                        <Button
                          onClick={handleFullScreen.enter}
                          className="w-full"
                        >
                          Enter Full Screen
                        </Button>
                      )}
                    </motion.div>
                    {user?.role === ROLES.ADMIN && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full mt-6"
                      >
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => generateMutation.mutate()}
                          disabled={generateMutation.isPending}
                          className="w-full group relative overflow-hidden"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                            Generate New QR
                          </div>
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8"
                  >
                    <div className="bg-muted/50 rounded-lg p-8 space-y-4">
                      <p className="text-muted-foreground">
                        No QR code available for {selectedCenter} today
                      </p>
                      {user?.role === ROLES.ADMIN && (
                        <Button
                          size="lg"
                          onClick={() => generateMutation.mutate()}
                          disabled={generateMutation.isPending}
                          className="w-full max-w-xs"
                        >
                          {generateMutation.isPending ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Generating...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <QrCode className="h-4 w-4" />
                              Generate QR Code
                            </div>
                          )}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </FullScreen>
    </div>
  );
}
