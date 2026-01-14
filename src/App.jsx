import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Github,
  Linkedin,
  Mail,
  Sun,
  Moon,
  Layers,
  Cpu,
  Gamepad2,
  ChevronDown,
  Flame,
  Languages,
  Instagram,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILITY: Helper to merge Tailwind classes efficiently ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- DATA: USER CONFIGURATION (EDIT THIS) ---
const USER_CONFIG = {
  githubUsername: "https://github.com/Saran-1307", // Change this to generate your real chart
  duolingo: {
    language: "Japanese",
    streak: 1000,
    xp: 27507,
    league: "Diamond",
  },
};

// --- DATA: SPIDER GRAPH STATS ---
const skillData = [
  { subject: "React/Web", A: 90, fullMark: 100 },
  { subject: "Linux", A: 75, fullMark: 100 },
  { subject: "AI & ML", A: 45, fullMark: 100 },
  { subject: "Python", A: 75, fullMark: 100 },
  { subject: "Unity", A: 35, fullMark: 100 },
  { subject: "UI/UX", A: 80, fullMark: 100 },
];

// --- DATA: PROJECTS ---
const projects = [
  {
    title: "AI Hackathon Platform",
    category: "Web & ML",
    description:
      "Web app integrating Machine Learning models for real-time data processing.",
    tech: ["React", "FastAPI", "TensorFlow"],
    icon: <Cpu className="w-8 h-8" />,
  },
  {
    title: "Rotaract Club Portal",
    category: "Community",
    description:
      "Official aptitude and skill-building platform for the Jerusalem College Rotaract Club.",
    tech: ["MERN", "Tailwind", "Docker"],
    icon: <Layers className="w-8 h-8" />,
  },
  {
    title: "2D Game Asset Pack",
    category: "Digital Art",
    description:
      "Animated 2D characters and environment tilesets for indie game developers.",
    tech: ["Aseprite", "Unity", "Animation"],
    icon: <Gamepad2 className="w-8 h-8" />,
  },
];

// --- COMPONENT: SKELETON LOADER ---
// Displays a pulsing gray box while content loads
const Skeleton = ({ className }) => (
  <div
    className={cn(
      "animate-pulse bg-slate-800/50 dark:bg-slate-800/50 rounded-lg",
      className
    )}
  />
);

// --- COMPONENT: 3D TILT CARD ---
// Creates the "Zenless" style 3D hover effect using mouse position
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics makes the tilt smooth, not jerky
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }} // Reset on leave
      className={cn("relative transition-all duration-200 ease-out", className)}
    >
      {children}
    </motion.div>
  );
};

// ================= MAIN COMPONENT =================
const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true); // Default: Black Theme
  const [loading, setLoading] = useState(true); // Default: Skeleton State

  // Simulate Asset Loading (2.5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Handle CSS Class for Dark Mode
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // Parallax Scroll Hooks
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans selection:bg-cyan-500 selection:text-white
      ${darkMode ? "bg-black text-white" : "bg-gray-100 text-slate-900"}`}
    >
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-sm">
        <div className="font-bold text-xl tracking-tighter mix-blend-difference text-white">
          DEV.LOG
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-3 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition-all backdrop-blur-md"
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-slate-800" />
          )}
        </button>
      </nav>

      {/* --- HERO SECTION --- */}
      <section
        ref={targetRef}
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <motion.div
          style={{ y: heroY }}
          className="z-10 text-center px-4 max-w-5xl"
        >
          {loading ? (
            // SKELETON: Hero
            <div className="flex flex-col items-center gap-6">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-32 w-full md:w-[700px]" />
              <Skeleton className="h-8 w-3/4" />
            </div>
          ) : (
            // CONTENT: Hero
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-4 py-1 mb-6 border rounded-full border-cyan-500/30 bg-cyan-500/10 text-cyan-500 text-sm font-mono tracking-widest"
              >
                SYSTEM ONLINE
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: 1 }}
                className="text-7xl md:text-9xl font-black tracking-tighter mb-4 leading-[0.9]"
              >
                CREATIVE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                  ENGINEER
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl opacity-60 max-w-2xl mx-auto mt-6"
              >
                Scalable Apps. Intelligent Design. <br />
              </motion.p>
            </>
          )}
        </motion.div>

        {/* Scroll Arrow */}
        {!loading && (
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 opacity-50"
          >
            <ChevronDown size={32} />
          </motion.div>
        )}
      </section>

      {/* --- STATS DASHBOARD (Spider + GitHub + Duolingo) --- */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 flex items-center gap-3">
          <Cpu className="text-cyan-500" /> System Stats
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 1. SPIDER GRAPH (Tech Skills) */}
          <TiltCard className="col-span-1 lg:col-span-1 h-[400px]">
            <div className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
              <h3 className="font-mono text-sm text-slate-500 mb-4">
                SKILL_MATRIX_V2
              </h3>
              {loading ? (
                <Skeleton className="w-full h-[300px] rounded-full" />
              ) : (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="70%"
                      data={skillData}
                    >
                      <PolarGrid stroke={darkMode ? "#334155" : "#cbd5e1"} />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{
                          fill: darkMode ? "#94a3b8" : "#475569",
                          fontSize: 10,
                        }}
                      />
                      <Radar
                        name="Stats"
                        dataKey="A"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        fill="#06b6d4"
                        fillOpacity={0.4}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </TiltCard>

          {/* 2. GITHUB STREAK (Live Image) */}
          <TiltCard className="col-span-1 lg:col-span-2 h-full min-h-[400px]">
            <div className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl flex flex-col justify-center items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
              <div className="w-full flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <Github /> Open Source Activity
                </h3>
                <span className="text-xs font-mono px-2 py-1 rounded bg-green-500/10 text-green-500">
                  LIVE DATA
                </span>
              </div>

              {loading ? (
                <div className="w-full space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ) : (
                <div className="w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                  {/* Using standard open source GitHub Readme Stats API */}
                  <img
                    src="https://streak-stats.demolab.com/?user=Saran-1307&theme=dark&hide_border=true&date_format=M%20j%5B%2C%20Y%5D"
                    alt="GitHub Streak"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>
          </TiltCard>

          {/* 3. DUOLINGO CARD (Custom Design) */}
          <TiltCard className="col-span-1 h-[250px]">
            <div className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between group">
              {/* Green Glow */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-green-500/20 blur-[50px] group-hover:bg-green-500/30 transition-all" />

              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start z-10">
                    <div>
                      <h3 className="text-sm font-mono text-slate-500">
                        LANGUAGE
                      </h3>
                      <div className="text-2xl font-bold flex items-center gap-2">
                        <Languages className="text-green-500" />{" "}
                        {USER_CONFIG.duolingo.language}
                      </div>
                    </div>
                    <img src="/duo.png" alt="Duo" className="w-10 opacity-80" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 z-10">
                    <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800">
                      <div className="text-xs text-slate-500 mb-1">STREAK</div>
                      <div className="text-xl font-black flex items-center gap-1 text-orange-500">
                        <Flame size={18} fill="currentColor" />{" "}
                        {USER_CONFIG.duolingo.streak}
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800">
                      <div className="text-xs text-slate-500 mb-1">
                        TOTAL XP
                      </div>
                      <div className="text-xl font-black text-yellow-500">
                        {USER_CONFIG.duolingo.xp}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </TiltCard>

          {/* 4. Placeholder / Other Stat */}
          <TiltCard className="col-span-1 md:col-span-2 h-[250px]">
            <div className="h-full bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex items-center justify-center text-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Open to New Roles</h3>
                <p className="opacity-60 mb-4">
                  Ready to deploy on new missions.
                </p>
                <button
                  onClick={() =>
                    window.open(
                      "https://mail.google.com/mail/?view=cm&fs=1&to=saranoff2005@gmail.com&su=Hiring%20Inquiry&body=Hello%20I%20would%20like%20to%20connect",
                      "_blank"
                    )
                  }
                  className="px-6 py-2 bg-white text-black font-bold rounded-full
             hover:scale-105 transition-transform
             hover:text-cyan-500"
                >
                  Contact me
                </button>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section className="py-24 bg-slate-100 dark:bg-[#050505] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-16 text-center"
          >
            Mission Logs (Projects)
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading
              ? [1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-96 w-full" />
                ))
              : projects.map((project, index) => (
                  <TiltCard key={index} className="h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col group shadow-lg hover:shadow-cyan-500/10 transition-shadow"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      {/* Floating Icon */}
                      <div
                        className="mb-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit text-cyan-500 group-hover:scale-110 transition-transform"
                        style={{ transform: "translateZ(40px)" }}
                      >
                        {project.icon}
                      </div>

                      <div style={{ transform: "translateZ(30px)" }}>
                        <span className="text-xs font-bold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
                          {project.category}
                        </span>
                        <h3 className="text-2xl font-bold mt-2 mb-4 group-hover:text-cyan-500 transition-colors">
                          {project.title}
                        </h3>
                        <p className="opacity-60 text-sm leading-relaxed mb-6">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 font-mono opacity-70"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </TiltCard>
                ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center">
        <div className="flex justify-center gap-8 mb-8">
          <a
            href="https://github.com/Saran-1307"
            className="opacity-50 hover:opacity-100 hover:text-cyan-500 transition-all"
          >
            <Github />
          </a>
          <a
            href="www.linkedin.com/in/saranoff"
            className="opacity-50 hover:opacity-100 hover:text-cyan-500 transition-all"
          >
            <Linkedin />
          </a>
          <a
            href="https://www.instagram.com/saranoff2005/"
            className="opacity-50 hover:opacity-100 hover:text-cyan-500 transition-all"
          >
            <Instagram />
          </a>
        </div>
        <p className="opacity-40 text-sm">
          © 2026. Built with React & Framer Motion.
        </p>
      </footer>
    </div>
  );
};

export default Portfolio;
