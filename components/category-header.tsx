interface CategoryHeaderProps {
  title: string;
  description: string;
  total: number;
}

export function CategoryHeader({
  title,
  description,
  total,
}: CategoryHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
      <div className="flex items-center justify-between gap-4">
        <p className="text-lg text-muted-foreground">{description}</p>
        <p className="text-sm text-muted-foreground">
          {total} {total === 1 ? "producto" : "productos"} encontrados
        </p>
      </div>
    </div>
  );
}
