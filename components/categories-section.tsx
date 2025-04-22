"use client";

import { useRouter } from "next/navigation";
import { GraduationCap, Home, Briefcase, Wrench, BookOpen } from "lucide-react";
import { Category } from "@/lib/categories";

interface CategoriesSectionProps {
  categories: Category[];
}

const iconMap = {
  GraduationCap,
  Home,
  Briefcase,
  Wrench,
  BookOpen,
} as const;

type IconName = keyof typeof iconMap;

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  const router = useRouter();

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover skills across various categories to help you learn something new or find the right expert
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon as IconName];
            return (
              <div
                key={category.name}
                className="flex flex-col items-center p-6 border rounded-lg hover:border-primary hover:shadow-md transition-all cursor-pointer"
                onClick={() => router.push(`/explore?category=${category.name}`)}
              >
                {Icon && <Icon className="h-10 w-10 mb-4 text-primary" />}
                <span className="font-medium">{category.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}