import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface SplashScreenProps {
  onGetStarted: () => void;
}

export default function SplashScreen({
  onGetStarted,
}: SplashScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Animated gradient circles */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-orange-300/20 to-amber-400/20 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-amber-300/20 to-orange-400/20 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Logo with animation ring */}
      <motion.div
        className="relative mb-8 z-10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-orange-400/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="relative bg-gradient-to-br from-orange-500 to-amber-600 w-24 h-24 rounded-full flex items-center justify-center shadow-xl">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
      </motion.div>

      {/* App Name */}
      <motion.h1
        className="text-5xl mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Swastik
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="text-gray-600 mb-12 text-center max-w-sm z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Your One-Stop Event Planner
      </motion.p>

      {/* Feature Pills */}
      <motion.div
        className="flex gap-4 mb-16 z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        {["Plan", "Book", "Celebrate"].map((text, index) => (
          <motion.div
            key={text}
            className="px-6 py-2 bg-white rounded-full shadow-md border border-orange-100"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
          >
            <span className="text-sm text-gray-700">
              {text}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Get Started Button */}
      <motion.div
        className="z-10 relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <Button
          onClick={onGetStarted}
          className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-12 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          Get Started
        </Button>
      </motion.div>
    </div>
  );
}