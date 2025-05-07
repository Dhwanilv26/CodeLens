"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Github,
  Bot,
  ArrowRight,
  Star,
  FileText,
  GitCommit,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const LandingPage = () => {
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

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md lg:px-8 dark:border-gray-700 dark:bg-gray-900/80">
        <Link className="flex items-center justify-center" href="/">
          <Bot className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="ml-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent dark:from-indigo-400 dark:to-purple-400">
            CodeLens
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            href="#pricing"
          >
            Pricing
          </Link>
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-indigo-600 dark:text-indigo-400"
            >
              Sign In
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              className="flex flex-col items-center space-y-8 text-center"
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4 inline-flex items-center rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                >
                  <Star className="mr-2 h-4 w-4" />
                  Trusted by 1,000+ developers
                </motion.div>
                <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl dark:from-indigo-400 dark:to-purple-400">
                  AI-Powered GitHub Repository Analysis
                </h1>
                <p className="mx-auto max-w-[800px] text-lg text-gray-600 md:text-xl dark:text-gray-300">
                  Upload any GitHub repository and get intelligent code
                  summaries, commit analysis, and ask questions about your
                  codebase using our custom RAG-powered AI assistant.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-indigo-500/20"
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-800"
                  >
                    See Demo
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                500 free credits • Pay only for what you use
              </p>
            </motion.div>
            <motion.div
              className="relative mx-auto mt-12 max-w-5xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            >
              <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10 blur-xl"></div>
              <Image
                src="/repo-analysis-preview.png"
                alt="CodeLens Repository Analysis Preview"
                width={1200}
                height={600}
                className="rounded-xl border border-gray-200 shadow-2xl dark:border-gray-700"
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
                How CodeLens Works
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300">
                Simple yet powerful GitHub repository analysis powered by AI
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 lg:grid-cols-3 lg:gap-12"
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
                  title: "Repository Upload",
                  description:
                    "Simply provide your GitHub repository URL. We'll securely analyze the codebase and its commit history.",
                  highlights: [
                    "Public and private repos",
                    "No code leaves your environment",
                    "Fast processing",
                  ],
                },
                {
                  icon: (
                    <GitCommit className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                  ),
                  title: "Commit Analysis",
                  description:
                    "Get detailed insights into your commit history with diffs and summaries for each change.",
                  highlights: [
                    "Visual diff highlighting",
                    "Commit message analysis",
                    "Change impact assessment",
                  ],
                },
                {
                  icon: (
                    <MessageSquare className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                  ),
                  title: "AI Code Q&A",
                  description:
                    "Ask any question about your codebase and get accurate answers powered by our custom RAG model.",
                  highlights: [
                    "Natural language queries",
                    "Context-aware responses",
                    "Code examples",
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

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full bg-gray-100 py-12 md:py-24 lg:py-32 dark:bg-gray-800/50"
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
                Simple Pay-Per-Use Pricing
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300">
                Get started with 500 free credits. Only pay for what you
                analyze.
              </p>
            </motion.div>

            <motion.div
              className="mx-auto max-w-3xl"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <Card className="border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-2xl">Credit System</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-lg bg-indigo-50 p-6 dark:bg-indigo-900/20">
                      <h3 className="mb-4 text-lg font-semibold">Free Tier</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Every new account receives{" "}
                        <span className="font-bold">500 free credits</span> to
                        explore CodeLens.
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-4 text-lg font-semibold">Pricing</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400">
                            File analysis
                          </span>
                          <span className="font-medium">1 credit per file</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400">
                            Commit analysis
                          </span>
                          <span className="font-medium">
                            2 credits per commit
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            AI question
                          </span>
                          <span className="font-medium">
                            3 credits per question
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-semibold">
                        Buy More Credits
                      </h3>
                      <p className="mb-4 text-gray-600 dark:text-gray-300">
                        Purchase additional credits as you need them. No
                        subscriptions, no commitments.
                      </p>
                      <div className="grid gap-4 md:grid-cols-3">
                        {[
                          { credits: "1,000", price: "₹100" },
                          { credits: "5,000", price: "₹450" },
                          { credits: "10,000", price: "₹800" },
                        ].map((option, index) => (
                          <Card
                            key={index}
                            className="border border-gray-200 dark:border-gray-700"
                          >
                            <CardContent className="p-4">
                              <div className="text-center">
                                <p className="text-2xl font-bold">
                                  {option.credits}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                  credits
                                </p>
                                <p className="mt-2 text-lg font-semibold">
                                  {option.price}
                                </p>
                                <Button className="mt-4 w-full">
                                  Purchase
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24">
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
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {[
                {
                  question: "How do I analyze a GitHub repository?",
                  answer:
                    "Simply sign up, provide your GitHub repository URL, and we'll automatically analyze the codebase and commit history. You'll get summaries and be able to ask questions about the code.",
                },
                {
                  question: "What happens to my code?",
                  answer:
                    "Your code is processed securely and never stored permanently. We only keep the analysis results to display in your dashboard.",
                },
                {
                  question: "How are credits calculated?",
                  answer:
                    "Each file analysis costs 1 credit, commit analysis costs 2 credits, and each AI question costs 3 credits. You start with 500 free credits.",
                },
                {
                  question: "Can I analyze private repositories?",
                  answer:
                    "Yes! You can analyze private repositories by granting read-only access to our GitHub app. We only access what we need for analysis.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="border-b border-gray-200 pb-6 dark:border-gray-700"
                >
                  <h3 className="mb-2 text-lg font-semibold">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
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
                Ready to Analyze Your Codebase?
              </h2>
              <p className="text-lg text-indigo-100">
                Get started with 500 free credits. No credit card required.
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
                <Link href="/demo">
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
                Pay only for what you use • No subscriptions
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
            href="/terms"
          >
            Terms
          </Link>
          <Link
            className="text-sm transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            href="/privacy"
          >
            Privacy
          </Link>
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
