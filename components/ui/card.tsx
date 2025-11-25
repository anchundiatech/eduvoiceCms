//components/ui/Card.tsx
interface CardProps {
  title?: React.ReactNode; // Opcional
  className?: string; // Estilo personalizable
  children: React.ReactNode;
}

export function Card({ title, className="", children }: CardProps) {
  return (
    <div className={`shadow-md rounded-xl p-6 border border-brand-gray ${className}`}>
      {title && <h3 className="text-xl font-nunito font-bold mb-4">{title}</h3>}
      {children}
    </div>
  );
}

