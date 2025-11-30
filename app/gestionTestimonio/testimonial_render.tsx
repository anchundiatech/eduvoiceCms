// components/testimonial_render.tsx
import { AdminTestimonial } from "@/components/ui/testimonial/Admin";

export function TestimonialRender_admin({ testimonials }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
      {testimonials.map((item, i) => (
        <AdminTestimonial
          key={i}
          author={item.author}
          role={item.role}
          testimonial={item.testimonial}
          variant="mini"
        />
      ))}
    </div>
  );
}