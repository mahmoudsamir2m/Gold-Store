import BlogCard from "./Blogcard";
import { cardsData } from "./data/data";
import AnimatedUnderlineTitle from "../../AnimatedUnderlineTitle/AnimatedUnderlineTitle";

export default function BlogSection() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <AnimatedUnderlineTitle title="اكتشف عالم الذهب" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsData.map((card) => (
          <BlogCard key={card.id} {...card} />
        ))}
      </div>
    </section>
  );
}
