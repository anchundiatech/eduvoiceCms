//components/ui/testimonial/TestimonialVisitor.tsx
interface TestimonialVisitorProps {
  author: string;
  role?: string;
  media?: {
    type: "image" | "video";
    previewUrl: string;
  };
  testimonial: string;
  rating?: number;
  date: string;
  className?: string;
}

export function TestimonialVisitor({
  author,
  role,
  media,
  testimonial,
  rating = 0,
  date,
  className = "",
}: TestimonialVisitorProps) {
  return (
    <div className={`shadow-md rounded-xl p-4 border border-gray-200 bg-white ${className}`}>

      {media && (
        <div className="mb-3">
          {media.type === "image" && (
            <img
              src={media.previewUrl}
              alt="preview"
              className="w-full h-32 object-cover rounded-lg"
            />
          )}

          {media.type === "video" && (
            <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 text-sm">
              🎬 Video
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-left">
          <div className="text-yellow-500 text-sm">
            {"★".repeat(rating) + "☆".repeat(5 - rating)}
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-xs">{date}</p>
        </div>
      </div>

      <p className="text-sm line-clamp-3 mb-3">
        {testimonial}
      </p>

      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-sm">{author}</p>
          {role && <p className="text-gray-600 text-xs">{role}</p>}
        </div>
      </div>
    </div>
  );
}
