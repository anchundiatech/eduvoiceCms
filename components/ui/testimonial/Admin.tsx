//components/ui/testimonial/TestimonialAdmin.tsx
// 2 variantes: mini / full

import { Card } from "../card"

interface AdminTestimonialProps {
  author: string
  email?: string
  role?: string
  media?: {
    type: "image" | "video";
    previewUrl: string;
  };
  testimonial: string
  rating?: number
  date: string
  tags?: string[]
  status?: "pending" | "approved"
  history?: {
    user: string
    message: string
    time: string
  }[]
  variant?: "mini" | "full"
  className?: string
}

export function AdminTestimonial({
  author,
  role,
  email,
  media,
  testimonial,
  rating = 0,
  date,
  tags,
  status = "pending",
  history = [],
  variant = "mini",
  className = ""
}: AdminTestimonialProps) {
  if (variant === "mini") {
    return (
      <Card className={`bg-white ${className} `}>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 text-xs">
              {tags.map((tag) => (
                <span key={tag} className="px-2 py-1 border rounded-lg text-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          )}

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

          <p className="text-sm line-clamp-3 mb-3">
            {testimonial}
          </p>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-sm">{author}</p>
              {role && <p className="text-gray-600 text-xs">{role}</p>}
              {email && <p className="text-gray-600 text-xs">{email}</p>}
            </div>
          </div>

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
      </Card>
    );

  }

  return (
    <Card className={`bg-white ${className} `}>
      <div className="flex justify-between mb-4">
        <div>
          <p className="font-bold">{author}</p>
          {role && <p className="text-sm text-gray-600">{role}</p>}
          {email && <p className="text-sm text-gray-600">{email}</p>}
        </div>
        <div className="text-right">
          <button className={`text - xs px - 2 py - 1 rounded border ${status === "approved" ? "border-green-500 text-green-600" : "border-yellow-500 text-yellow-600"
            } `}>
            {status === "approved" ? "Aprobado" : "Pendiente"}
          </button>
          <p className="text-xs text-gray-500 mt-1">{date}</p>
        </div>
      </div>



      <div className="flex gap-4 mb-4">

        <div className="flex-1">
          <div className="text-yellow-500 text-sm mb-2">
            {"★".repeat(rating) + "☆".repeat(5 - rating)}
          </div>
          <p>{testimonial}</p>
        </div>

        {media && (
          <div className="w-1/3">
            {media.type === "image" && (
              <img
                src={media.previewUrl}
                className="w-full h-32 object-cover rounded"
              />
            )}
            {media.type === "video" && (
              <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center text-gray-600">
                🎬 Video
              </div>
            )}
          </div>
        )}
      </div>


      {
        tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 text-xs">
            {tags.map(tag => (
              <span key={tag} className="px-2 py-1 border rounded-lg text-gray-600">
                {tag}
              </span>
            ))}
            <button className="text-blue-600 text-xs underline">
              + Añadir etiqueta
            </button>
          </div>
        )
      }


      <div className="flex gap-2 mb-4">
        <button className="text-xs border px-2 py-1 rounded">Aprobar</button>
        <button className="text-xs border px-2 py-1 rounded">Rechazar</button>
        <button className="text-xs border px-2 py-1 rounded">Archivar</button>
        <button className="text-xs border px-2 py-1 rounded">Spam</button>
        <button className="text-xs border px-2 py-1 rounded">Compartir</button>
      </div>


      <h3 className="font-semibold mb-2">Historial de revisiones</h3>
      {
        history.length === 0 && (
          <p className="text-xs text-gray-500">Sin cambios registrados</p>
        )
      }

      {
        history.map((item, i) => (
          <div key={i} className="text-sm mb-2 border-b pb-1">
            <strong>{item.user}</strong> {item.message}
            <p className="text-xs text-gray-500">{item.time}</p>
          </div>
        ))
      }
    </Card >


  )
}
