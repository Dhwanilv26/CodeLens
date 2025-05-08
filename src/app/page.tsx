"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Github,
  Bot,
  ArrowRight,
  Star,
  GitCommit,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Mic,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md lg:px-8 dark:border-gray-700 dark:bg-gray-900/80">
        <Link className="flex items-center justify-center" href="/">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="ml-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent dark:from-indigo-400 dark:to-purple-400">
            CodeLens
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden items-center gap-6 md:flex">
          <div className="group relative">
            <button className="flex items-center text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
              Features{" "}
              <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-0 mt-2 w-56 origin-top-right scale-95 rounded-lg bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 dark:bg-gray-900">
              <Link
                href="#features"
                className="block rounded-md px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Overview
              </Link>
              <Link
                href="#how-it-works"
                className="block rounded-md px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                className="block rounded-md px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Pricing
              </Link>
            </div>
          </div>
          <Link
            className="text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            href="#faq"
          >
            FAQ
          </Link>
          <Link href="/sign-up">
            <Button
              variant="ghost"
              className="text-indigo-600 dark:text-indigo-400"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
              Get Started
            </Button>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="ml-auto md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b bg-white md:hidden dark:bg-gray-900"
          >
            <div className="space-y-2 px-4 py-3">
              <Link
                href="#features"
                className="block rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="block rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                className="block rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className="block rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/login"
                className="block rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative w-full overflow-hidden py-16 md:py-28 lg:py-40 xl:py-56">
          <div className="animate-gradient-bg absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950"></div>
          <style>{`
    @keyframes gradient-bg {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient-bg {
      background-size: 200% 200%;
      animation: gradient-bg 15s ease infinite;
    }
    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(99, 102, 241, 0.3);
      border-radius: 50%;
      animation: float 10s infinite ease-in-out;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); opacity: 0.5; }
      50% { transform: translateY(-20px); opacity: 1; }
    }
  `}</style>
          {/* Particle Effects */}
          <div className="particle top-10 left-20"></div>
          <div className="particle top-40 right-40 delay-1000"></div>
          <div className="particle bottom-20 left-60 delay-2000"></div>
          <div className="particle top-60 right-10 delay-3000"></div>

          <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16">
            <motion.div
              className="flex flex-col items-center space-y-10 text-center"
              initial="initial"
              animate="animate"
              variants={{
                initial: { opacity: 0, y: 30 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:shadow-xl hover:shadow-indigo-500/30 dark:shadow-purple-500/20"
                >
                  <Star className="mr-2 h-5 w-5 text-white" />
                  Trusted by 1,000+ developers
                </motion.div>
                <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl dark:from-indigo-400 dark:to-purple-400">
                  AI-Powered GitHub & Meeting Analysis
                </h1>
                <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 md:text-2xl dark:text-gray-300">
                  Upload your GitHub repository for intelligent code summaries
                  or your meeting audio files for key insights and summaries
                  with timestamps—all powered by our custom AI assistant.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:shadow-indigo-500/30"
                  >
                    Get Started <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="https://github.com/dhwanilv26/codelens">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-indigo-600 px-8 py-4 text-lg font-semibold text-indigo-600 transition-all hover:bg-indigo-50 hover:shadow-lg dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-800"
                  >
                    See Demo
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                150 free credits • 1 credit per file analyzed
              </p>
            </motion.div>
            <motion.div
              className="relative mx-auto mt-16 max-w-5xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.4,
                duration: 1,
                type: "spring",
                stiffness: 80,
              }}
            >
              <div className="absolute inset-0 -z-10 scale-105 transform rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur-3xl transition-transform duration-500 hover:scale-110"></div>
              <Image
                src="/demo.png"
                alt="CodeLens Repository & Meeting Analysis Preview"
                width={1200}
                height={600}
                className="hover:shadow-3xl rounded-xl border border-gray-200 shadow-2xl transition-transform duration-500 hover:scale-105 dark:border-gray-700"
                priority
              />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full bg-gray-50 py-12 md:py-24 lg:py-32 dark:bg-gray-800/50"
        >
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              className="mb-16 text-center"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Powerful Features for Developers & Teams
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300">
                Everything you need to understand your codebase and meetings
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: (
                    <Github className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                  ),
                  title: "Repository Analysis",
                  description:
                    "Get a comprehensive breakdown of your entire codebase with just a repository URL.",
                  highlights: [
                    "File structure visualization",
                    "Language distribution",
                    "Dependency analysis",
                  ],
                },
                {
                  icon: (
                    <GitCommit className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                  ),
                  title: "Commit Insights",
                  description:
                    "Understand your project's evolution with detailed commit history analysis.",
                  highlights: [
                    "Contributor activity",
                    "Change frequency",
                    "Code evolution trends",
                  ],
                },
                {
                  icon: (
                    <MessageSquare className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                  ),
                  title: "AI-Powered Q&A",
                  description:
                    "Ask natural language questions about your code and get precise answers.",
                  highlights: [
                    "Code explanations",
                    "Bug detection",
                    "Optimization suggestions",
                  ],
                },
                {
                  icon: (
                    <Mic className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                  ),
                  title: "Meeting Audio Analysis",
                  description:
                    "Upload your meeting audio and get summaries, key issues, and timestamps instantly.",
                  highlights: [
                    "Key issue identification",
                    "Detailed summaries",
                    "Timestamped insights",
                  ],
                },
              ].map((feature, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="h-full border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-900">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/30">
                          {feature.icon}
                        </div>
                        <CardTitle className="text-xl font-semibold">
                          {feature.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                          >
                            <svg
                              className="mr-2 h-4 w-4 text-indigo-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="w-full bg-gradient-to-br from-gray-50 to-indigo-50 py-20 md:py-32 lg:py-40 dark:from-gray-900 dark:to-indigo-950"
        >
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            {/* Header */}
            <motion.div
              className="mb-24 text-center"
              variants={{
                initial: { opacity: 0, y: 50 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, ease: "easeOut" },
                },
              }}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="mb-6 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl dark:from-indigo-400 dark:to-purple-400">
                How CodeLens Works
              </h2>
              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-700 dark:text-gray-200">
                Gain insights from your GitHub repositories and meeting audio
                files in four simple steps
              </p>
            </motion.div>

            {/* Steps */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-0 left-1/2 hidden h-full w-2 -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 opacity-80 md:block"></div>

              <div className="space-y-16 md:space-y-24">
                {[
                  {
                    step: "01",
                    title: "Connect Your Repository",
                    description:
                      "Securely link your GitHub repository by providing the URL or connecting your account. Supports public and private repos with full encryption.",
                    icon: <Github className="h-12 w-12 text-black" />,
                    fillColor: "bg-indigo-700",
                    gradient: "from-indigo-600 to-indigo-400",
                    textColor: "text-white",
                  },
                  {
                    step: "02",
                    title: "Upload Meeting Audio",
                    description:
                      "Simply upload your meeting audio file, and our AI will process it to extract key insights.",
                    icon: <Mic className="h-12 w-12 text-black" />,
                    fillColor: "bg-indigo-600",
                    gradient: "from-indigo-500 to-indigo-300",
                    textColor: "text-white",
                  },
                  {
                    step: "03",
                    title: "Automated Analysis",
                    description:
                      "Our AI analyzes your codebase and audio files, examining code structures, commits, and meeting discussions in real-time.",
                    icon: <Bot className="h-12 w-12 text-black" />,
                    fillColor: "bg-purple-700",
                    gradient: "from-purple-600 to-purple-400",
                    textColor: "text-white",
                  },
                  {
                    step: "04",
                    title: "Actionable Insights",
                    description:
                      "Explore detailed code reports, ask questions about your code, and get meeting summaries with timestamps and key issues highlighted.",
                    icon: <MessageSquare className="h-12 w-12 text-black" />,
                    fillColor: "bg-pink-700",
                    gradient: "from-pink-600 to-pink-400",
                    textColor: "text-white",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex flex-col items-center md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                    variants={{
                      initial: { opacity: 0, y: 50 },
                      animate: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.8, delay: index * 0.3 },
                      },
                    }}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    {/* Step Circle */}
                    <div
                      className={`relative mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl font-black ${item.textColor} ${item.fillColor} shadow-2xl transition-transform hover:scale-105 md:absolute md:left-1/2 md:mb-0 md:-translate-x-1/2 md:transform md:border-4 md:border-gray-300 md:shadow-2xl dark:md:border-gray-700`}
                      style={{
                        boxShadow:
                          "0 4px 15px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {item.step}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col items-center text-center md:w-5/12 md:items-start md:px-10 md:text-left">
                      <div
                        className="bg-opacity-20 relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl backdrop-blur-sm"
                        style={{
                          background: `linear-gradient(135deg, ${item.gradient})`,
                        }}
                      >
                        {item.icon}
                      </div>
                      <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {item.title}
                      </h3>
                      <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>

                    {/* Spacer for Timeline */}
                    <div className="hidden md:block md:w-5/12"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full bg-gradient-to-br from-gray-50 to-indigo-50 py-20 md:py-32 lg:py-40 dark:from-gray-900 dark:to-indigo-950"
        >
          <div className="container mx-auto px-6 md:px-12 lg:px-16">
            <motion.div
              className="mb-24 text-center"
              variants={{
                initial: { opacity: 0, y: 50 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, ease: "easeOut" },
                },
              }}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="mb-6 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl dark:from-indigo-400 dark:to-purple-400">
                Simple, Transparent Pricing
              </h2>
              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-700 dark:text-gray-200">
                Get started with 150 free credits. Buy more credits as
                needed—pay only for what you use.
              </p>
            </motion.div>

            <motion.div
              className="mx-auto max-w-4xl"
              variants={{
                initial: { opacity: 0, scale: 0.95 },
                animate: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.8, type: "spring" },
                },
              }}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl md:p-12 dark:bg-gray-800">
                <div className="space-y-10">
                  {/* Free Tier */}
                  <motion.div
                    className="rounded-lg bg-indigo-50 p-8 dark:bg-indigo-900/20"
                    variants={{
                      initial: { opacity: 0, y: 20 },
                      animate: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6 },
                      },
                    }}
                  >
                    <h3 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      Free Tier
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Every new account receives{" "}
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        150 free credits
                      </span>{" "}
                      to explore CodeLens.
                    </p>
                  </motion.div>

                  {/* Pricing Details */}
                  <motion.div
                    variants={{
                      initial: { opacity: 0, y: 20 },
                      animate: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, delay: 0.2 },
                      },
                    }}
                  >
                    <h3 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      Pricing Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
                        <span className="text-lg text-gray-600 dark:text-gray-400">
                          File analysis (Code)
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          1 credit per file
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
                        <span className="text-lg text-gray-600 dark:text-gray-400">
                          Repository analysis
                        </span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          Total files × 1 credit
                        </span>
                      </div>
                      <div className="flex items-center justify-between"></div>
                    </div>
                  </motion.div>

                  {/* Buy Credits Slider */}
                  <motion.div
                    variants={{
                      initial: { opacity: 0, y: 20 },
                      animate: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, delay: 0.4 },
                      },
                    }}
                  >
                    <h3 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      Buy More Credits
                    </h3>
                    <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                      Choose the exact number of credits you need. 1 credit =
                      ₹2.5. No subscriptions, no commitments.
                    </p>
                    <div className="rounded-lg bg-indigo-50 p-6 dark:bg-indigo-900/20">
                      <input
                        type="range"
                        min="100"
                        max="1000"
                        step="50"
                        defaultValue="100"
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-indigo-200 accent-indigo-600 dark:bg-indigo-900"
                        onChange={(e) => {
                          const credits = parseInt(e.target.value);
                          const price = (credits * 2.5).toFixed(2);
                          const creditsDisplay =
                            document.getElementById("credits-display");
                          if (creditsDisplay) {
                            creditsDisplay.innerText = credits.toString();
                          }
                          const priceDisplay =
                            document.getElementById("price-display");
                          if (priceDisplay) {
                            priceDisplay.innerText = `₹${price}`;
                          }
                        }}
                      />
                      <div className="mt-6 flex justify-between">
                        <div className="text-center">
                          <p
                            className="text-3xl font-bold text-indigo-600 dark:text-indigo-400"
                            id="credits-display"
                          >
                            100
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            Credits
                          </p>
                        </div>
                        <div className="text-center">
                          <p
                            className="text-3xl font-bold text-indigo-600 dark:text-indigo-400"
                            id="price-display"
                          >
                            ₹250.00
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            Total Cost
                          </p>
                        </div>
                      </div>
                      <button className="mt-8 w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700">
                        <Link href="/billing">Purchase Credits</Link>
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className="w-full bg-white py-12 md:py-24 dark:bg-gray-900"
        >
          <div className="container mx-auto max-w-4xl px-4 md:px-8">
            <motion.div
              className="mb-16 text-center"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300">
                Everything you need to know about CodeLens.
              </p>
            </motion.div>

            <motion.div
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {[
                {
                  question: "How do I analyze a GitHub repository?",
                  answer:
                    "Simply sign up, provide your GitHub repository URL, and we'll automatically analyze the codebase. You'll get summaries and be able to ask questions about the code. Each file in the repository costs 1 credit to analyze.",
                },
                {
                  question: "How do I analyze a meeting audio file?",
                  answer:
                    "After signing up, upload your meeting audio file through our dashboard. Our AI will process the file and provide a detailed summary with key issues and timestamps.",
                },
                {
                  question: "What happens to my data?",
                  answer:
                    "Your code and audio files are processed securely and never stored permanently. We only keep the analysis results to display in your dashboard. For private repositories, we use GitHub's secure authentication, and audio files are encrypted during processing.",
                },
                {
                  question: "How are credits calculated?",
                  answer:
                    "Each code file in your repository costs 1 credit to analyze. A repository with 150 files would cost 150 credits. You start with 150 free credits when you sign up.",
                },
                {
                  question: "Can I analyze private repositories?",
                  answer:
                    "Yes! You can analyze private repositories by providing your GitHub Token. Your GitHub Token is safe and secure. We only access what we need for analysis and never store your code permanently.",
                },
                {
                  question: "What if I run out of credits?",
                  answer:
                    "You can purchase additional credits at any time. Unused credits never expire.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <button
                    className="flex w-full items-center justify-between p-6 text-left"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    {openFaqIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaqIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-gray-600 dark:text-gray-400">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 py-12 md:py-24 lg:py-32 dark:from-indigo-800 dark:to-purple-800">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              className="mx-auto flex max-w-3xl flex-col items-center justify-center space-y-8 text-center"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                Ready to Analyze Your Code & Meetings?
              </h2>
              <p className="text-lg text-indigo-100">
                Get started with 150 free credits. No credit card required.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="bg-white px-6 py-3 font-semibold text-indigo-600 shadow-lg hover:bg-gray-100"
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://github.com/dhwanilv26/codelens">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
                  >
                    See Demo
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-indigo-200">
                1 credit per code file • 5 credits per audio file • No
                subscriptions
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex w-full shrink-0 flex-col items-center gap-4 border-t bg-white px-4 py-8 sm:flex-row md:px-8 dark:bg-gray-900">
        <div className="flex items-center">
          <Bot className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span className="ml-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent dark:from-indigo-400 dark:to-purple-400">
            CodeLens
          </span>
        </div>
        <p className="text-sm text-gray-500 sm:ml-4 dark:text-gray-400">
          © {new Date().getFullYear()} CodeLens. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link
            className="text-sm transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            href="/contact"
          >
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;
