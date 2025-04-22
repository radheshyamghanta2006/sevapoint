"use client"

import * as React from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { SkillCard } from "@/components/skill-card"
import CategoriesSection from "@/components/categories-section"
import Link from "next/link"
import { ArrowRight, Sparkles, Star, Zap } from "lucide-react"
import categories from "@/lib/categories"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { TextRotate } from "@/components/ui/text-rotate"
import { useEffect, useState } from "react"
import SevapointLogo from "@/components/sevapoint-logo-particles"

// Mock data - in a real app, this would come from the database
const featuredSkills = [
  {
    id: "1",
    title: "Math Tutoring",
    category: "Education",
    providerName: "John Doe",
    providerImage: "/placeholder.svg",
    location: "Mumbai",
    rating: 4.8,
    intent: "teach" as const,
  },
  {
    id: "2",
    title: "Cooking Classes",
    category: "Food",
    providerName: "Jane Smith",
    providerImage: "/placeholder.svg",
    location: "Delhi",
    rating: 4.5,
    intent: "teach" as const,
  },
  {
    id: "3",
    title: "Home Repairs",
    category: "Home Services",
    providerName: "Mike Johnson",
    providerImage: "/placeholder.svg",
    location: "Bangalore",
    rating: 4.9,
    intent: "teach" as const,
  },
  {
    id: "4",
    title: "Guitar Lessons",
    category: "Music",
    providerName: "Sarah Williams",
    providerImage: "/placeholder.svg",
    location: "Chennai",
    rating: 4.7,
    intent: "teach" as const,
  },
]

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <Aura className="opacity-50" />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/10" />
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/0 to-background" />
          </div>

          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  <span>Connect • Learn • Grow</span>
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                  <span className="block text-foreground mb-2">Share Skills,</span>
                  <span className="block">
                    Build{" "}
                    <TextRotate
                      texts={[
                        "Community",
                        "Future 🚀",
                        "Together",
                        "Knowledge",
                        "Success ⭐",
                      ]}
                      mainClassName="text-primary"
                      rotationInterval={3000}
                    />
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-xl">
                  Connect with local experts or share your expertise. Join our vibrant community of learners and teachers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="text-lg h-12"
                    asChild
                  >
                    <Link href="/explore" className="group">
                      Start Learning
                      <Zap className="ml-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg h-12"
                    asChild
                  >
                    <Link href="/profile" className="group">
                      Share Your Skills
                      <Star className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden"
                      >
                        <img
                          src={`/placeholder.svg`}
                          alt={`User ${i}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    Join <span className="text-foreground font-medium">2,000+</span> members
                    <br />
                    already learning together
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative aspect-square w-full max-w-xl mx-auto lg:mx-0"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-primary-foreground/20 blur-3xl" />
                <div className="relative h-full w-full rounded-3xl border bg-muted/50 p-4 backdrop-blur-sm">
                  <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
                    {[
                      { color: "from-rose-500", delay: 0.2 },
                      { color: "from-blue-500", delay: 0.3 },
                      { color: "from-green-500", delay: 0.4 },
                      { color: "from-purple-500", delay: 0.5 },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: item.delay }}
                        className={cn(
                          "group relative overflow-hidden rounded-2xl bg-gradient-to-b",
                          item.color,
                          "to-background/50"
                        )}
                      >
                        <div className="absolute inset-0 bg-background opacity-[0.97] transition-opacity group-hover:opacity-[0.95]" />
                        <div className="relative h-full p-4">
                          <img
                            src="/placeholder.svg"
                            alt="Skill preview"
                            className="h-full w-full object-cover rounded-lg transition-transform group-hover:scale-105"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Animated gradient orbs */}
          <div className="absolute top-[50%] left-[50%] -z-10">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="h-[500px] w-[500px] rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"
            />
          </div>
        </section>

        {/* Categories Section with animations */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 px-4"
        >
          <CategoriesSection categories={categories} />
        </motion.section>

        {/* Featured Skills Section with animations */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 px-4 bg-muted/30"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Featured Skills</h2>
              <Button variant="ghost" asChild>
                <Link href="/explore" className="group flex items-center gap-2">
                  View All
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredSkills.map((skill, i) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <SkillCard
                    id={skill.id}
                    title={skill.title}
                    category={skill.category}
                    providerName={skill.providerName}
                    providerImage={skill.providerImage}
                    location={skill.location}
                    rating={skill.rating}
                    intent={skill.intent}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* How It Works Section with animations */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 px-4"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How SkillLink Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Our platform makes it easy to connect with skilled individuals in your community
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  title: "Create Your Profile",
                  description: "Sign up and create your profile, specifying whether you want to learn or teach skills",
                  icon: "1",
                  color: "from-blue-500",
                },
                {
                  title: "Connect & Book",
                  description: "Browse available skills, connect with providers, and book sessions that fit your schedule",
                  icon: "2",
                  color: "from-green-500",
                },
                {
                  title: "Learn & Share",
                  description: "Meet up, exchange knowledge, and leave reviews to help others in the community",
                  icon: "3",
                  color: "from-purple-500",
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
                    style={{
                      background: `radial-gradient(circle at center, ${step.color.split("-")[1]} 0%, transparent 70%)`,
                    }}
                  />
                  <div className="text-center p-8">
                    <div className={cn(
                      "bg-primary/10 h-20 w-20 rounded-2xl flex items-center justify-center mx-auto mb-6",
                      "transition-transform duration-500 group-hover:scale-110"
                    )}>
                      <span className="text-3xl font-bold text-primary">{step.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      


      {/* Footer with subtle animation */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t py-12 px-4"
      >
       <SevapointLogo />
      </motion.footer>
    </div>
  )
}

interface AuraProps {
  className?: string;
}

function Aura({ className }: AuraProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const [sparkles, setSparkles] = React.useState<Array<{ id: number; x: number; y: number }>>([]);
  const sparkleTimeout = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Create sparkles on mouse movement
      if (sparkleTimeout.current) clearTimeout(sparkleTimeout.current);
      
      sparkleTimeout.current = setTimeout(() => {
        const newSparkle = {
          id: Date.now(),
          x: e.clientX + (Math.random() * 40 - 20),
          y: e.clientY + (Math.random() * 40 - 20),
        };
        
        setSparkles(prev => [...prev.slice(-15), newSparkle]);
      }, 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (sparkleTimeout.current) clearTimeout(sparkleTimeout.current);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className={cn(
          "pointer-events-none fixed inset-0 z-30 opacity-50",
          className
        )}
        style={{
          background: "radial-gradient(600px circle at 0px 0px, rgba(29, 78, 216, 0.15), transparent 80%)",
          left: mouseXSpring,
          top: mouseYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="pointer-events-none fixed z-30 h-1 w-1 rounded-full bg-blue-300"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
