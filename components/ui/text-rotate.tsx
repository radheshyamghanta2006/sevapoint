"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react"
import {
  AnimatePresence,
  motion,
  MotionProps,
} from "framer-motion"

import { cn } from "@/lib/utils"

interface TextRotateProps {
  texts: string[]
  rotationInterval?: number
  initial?: MotionProps["initial"]
  animate?: MotionProps["animate"]
  exit?: MotionProps["exit"]
  transition?: any
  loop?: boolean
  auto?: boolean
  mainClassName?: string
  elementLevelClassName?: string
}

export interface TextRotateRef {
  next: () => void
  previous: () => void
  jumpTo: (index: number) => void
  reset: () => void
}

const TextRotate = forwardRef<TextRotateRef, TextRotateProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-100%", opacity: 0 },
      rotationInterval = 3000,
      loop = true,
      auto = true,
      mainClassName,
      elementLevelClassName,
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)

    // Helper function to handle index changes
    const handleIndexChange = useCallback((newIndex: number) => {
      setCurrentTextIndex(newIndex)
    }, [])

    const next = useCallback(() => {
      const nextIndex = currentTextIndex === texts.length - 1
        ? (loop ? 0 : currentTextIndex)
        : currentTextIndex + 1
      
      if (nextIndex !== currentTextIndex) {
        handleIndexChange(nextIndex)
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange])

    const previous = useCallback(() => {
      const prevIndex = currentTextIndex === 0
        ? (loop ? texts.length - 1 : currentTextIndex)
        : currentTextIndex - 1
      
      if (prevIndex !== currentTextIndex) {
        handleIndexChange(prevIndex)
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange])

    const jumpTo = useCallback((index: number) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1))
      if (validIndex !== currentTextIndex) {
        handleIndexChange(validIndex)
      }
    }, [texts.length, currentTextIndex, handleIndexChange])

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) {
        handleIndexChange(0)
      }
    }, [currentTextIndex, handleIndexChange])

    // Expose navigation functions via ref
    useImperativeHandle(ref, () => ({
      next,
      previous,
      jumpTo,
      reset,
    }), [next, previous, jumpTo, reset])

    useEffect(() => {
      if (!auto) return
      const intervalId = setInterval(next, rotationInterval)
      return () => clearInterval(intervalId)
    }, [next, rotationInterval, auto])

    return (
      <motion.span
        className={cn("inline-flex overflow-hidden", mainClassName)}
        layout
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentTextIndex}
            initial={initial}
            animate={animate}
            exit={exit}
            transition={transition}
            className={cn("inline-block", elementLevelClassName)}
          >
            {texts[currentTextIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    )
  }
)

TextRotate.displayName = "TextRotate"

export { TextRotate }