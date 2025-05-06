"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Github,
  Users,
  FileAudio,
  Bot,
  ArrowRight,
  Star,
  CreditCard,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const Page = () => {
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
          <Link
            className="text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            href="#faq"
          >
            FAQ
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
                  Trusted by 10,000+ developers
                </motion.div>
                <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl dark:from-indigo-400 dark:to-purple-400">
                  Supercharge Your GitHub with AI-Powered Insights
                </h1>
                <p className="mx-auto max-w-[800px] text-lg text-gray-600 md:text-xl dark:text-gray-300">
                  CodeLens transforms your GitHub workflow with intelligent code
                  analysis, seamless collaboration, and automated meeting
                  insights. Build better, faster.
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
                    Watch Demo
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Pay-as-you-go credits • No subscriptions
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
                src="/dashboard-preview.png"
                alt="CodeLens Dashboard Preview"
                width={1200}
                height={600}
                className="rounded-xl border border-gray-200 shadow-2xl dark:border-gray-700"
                priority
              />
            </motion.div>
          </div>
        </section>

        {/* Logo Cloud Section */}
        <section className="w-full bg-gray-100 py-12 dark:bg-gray-800/50">
          <div className="container mx-auto px-4 md:px-8">
            <p className="mb-8 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              TRUSTED BY THE WORLD&apos;S BEST TEAMS
            </p>
            <div className="grid grid-cols-2 items-center justify-center gap-8 md:grid-cols-4 lg:grid-cols-6">
              {[
                "TechCorp",
                "StartUpX",
                "DevHub",
                "CodeWave",
                "PixelForge",
                "NexusLabs",
              ].map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex justify-center"
                >
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-300">
                    {company}
                  </span>
                </motion.div>
              ))}
            </div>
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
                Why Choose CodeLens?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300">
                Powerful features designed to boost your productivity and
                streamline your development workflow.
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
                  title: "Smart GitHub Integration",
                  description:
                    "Connect your repositories and unlock AI-driven code reviews, automated PR summaries, and real-time analytics.",
                  highlights: [
                    "Automated code reviews",
                    "PR summary generation",
                    "Repository health metrics",
                  ],
                },
                {
                  icon: (
                    <Users className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                  ),
                  title: "Effortless Collaboration",
                  description:
                    "Streamline team workflows with shared dashboards, real-time updates, and integrated communication tools.",
                  highlights: [
                    "Team performance insights",
                    "Real-time notifications",
                    "Integrated chat",
                  ],
                },
                {
                  icon: (
                    <FileAudio className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                  ),
                  title: "AI Meeting Assistant",
                  description:
                    "Upload meeting audio and get instant transcripts, actionable summaries, and timestamped insights.",
                  highlights: [
                    "Automated meeting notes",
                    "Action item tracking",
                    "Discussion analytics",
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

        {/* Stats Section */}
        <section className="w-full bg-indigo-600 py-12 md:py-16 dark:bg-indigo-800">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              className="grid grid-cols-2 gap-8 text-center md:grid-cols-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {[
                { value: "10,000+", label: "Active Users" },
                { value: "50M+", label: "Code Reviews" },
                { value: "95%", label: "Satisfaction Rate" },
                { value: "4.9/5", label: "Average Rating" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="text-white"
                >
                  <h3 className="mb-2 text-3xl font-bold md:text-4xl">
                    {stat.value}
                  </h3>
                  <p className="text-indigo-100">{stat.label}</p>
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
                Simple, Pay-As-You-Go Pricing
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300">
                Only pay for what you use with our affordable credit system.
              </p>
            </motion.div>

            <motion.div
              className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3 lg:gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {[
                {
                  name: "Starter Pack",
                  price: "$10",
                  description: "Perfect for individual developers",
                  features: [
                    "100 analysis credits",
                    "Basic code insights",
                    "Email support",
                    "1 team member",
                  ],
                  cta: "Buy Credits",
                },
                {
                  name: "Team Pack",
                  price: "$50",
                  description: "For growing development teams",
                  features: [
                    "600 analysis credits",
                    "Advanced analytics",
                    "Priority support",
                    "Up to 5 team members",
                    "Shared credit pool",
                  ],
                  cta: "Buy Credits",
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  description: "For large organizations",
                  features: [
                    "Unlimited credits",
                    "Premium support",
                    "Dedicated account manager",
                    "Custom integrations",
                    "Volume discounts",
                  ],
                  cta: "Contact Sales",
                },
              ].map((plan, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card
                    className={`relative h-full border-2 bg-white dark:bg-gray-900 ${plan.popular ? "border-indigo-500 dark:border-indigo-400" : "border-gray-200 dark:border-gray-700"}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                        Most Popular
                      </div>
                    )}
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                        <CardTitle className="text-xl font-semibold">
                          {plan.name}
                        </CardTitle>
                      </div>
                      <div className="mt-2 flex items-end">
                        <span className="text-4xl font-bold">{plan.price}</span>
                      </div>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {plan.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="mb-6 space-y-3">
                        {plan.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center text-gray-600 dark:text-gray-400"
                          >
                            <svg
                              className="mr-2 h-5 w-5 text-indigo-500"
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
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        size="lg"
                        className={`w-full ${plan.popular ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"}`}
                      >
                        {plan.cta}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-12 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900"
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 className="mb-4 text-xl font-semibold">Credit Breakdown</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    action: "Code file analysis",
                    credits: "1 credit per file",
                  },
                  { action: "PR summary", credits: "2 credits per PR" },
                  {
                    action: "Meeting transcript",
                    credits: "5 credits per hour",
                  },
                  { action: "Custom report", credits: "10 credits per report" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border p-4 dark:border-gray-700"
                  >
                    <p className="font-medium">{item.action}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.credits}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Credits never expire. Purchase additional credits anytime.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24">
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
                  question: "How do credits work?",
                  answer:
                    "Credits are used to perform actions in CodeLens. Each analysis, report, or transcript uses a set number of credits. You can purchase credit packs that never expire.",
                },
                {
                  question: "Can I share credits with my team?",
                  answer:
                    "Yes! With Team and Enterprise plans, credits are pooled and can be shared among team members for collaborative workflows.",
                },
                {
                  question: "How secure is my data?",
                  answer:
                    "We use enterprise-grade security with encryption at rest and in transit. We never store your GitHub credentials and only request minimal permissions.",
                },
                {
                  question: "Do you offer volume discounts?",
                  answer:
                    "Yes! We offer significant discounts for large credit purchases. Contact our sales team for custom enterprise pricing.",
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
                Ready to Elevate Your GitHub Workflow?
              </h2>
              <p className="text-lg text-indigo-100">
                Join thousands of developers using CodeLens to build smarter,
                collaborate better, and ship faster.
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
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
                  >
                    Buy Credits
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
          <Link
            className="text-sm transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            href="/blog"
          >
            Blog
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Page;
