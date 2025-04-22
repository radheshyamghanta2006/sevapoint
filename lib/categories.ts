export interface Category {
  name: string;
  icon: string;
}

const categories: Category[] = [
  { name: "Education", icon: "GraduationCap" },
  { name: "Home Services", icon: "Home" },
  { name: "Professional", icon: "Briefcase" },
  { name: "Crafts", icon: "Wrench" },
  { name: "Tutoring", icon: "BookOpen" },
];

export default categories;