import FormularioBuilderPage from "../[slug]/builder/page";

type NewFormularioPageProps = {
  searchParams?: Promise<{
    categoriaId?: string;
  }>;
};

export default function NewFormularioPage({ searchParams }: NewFormularioPageProps) {
  return <FormularioBuilderPage params={Promise.resolve({ slug: 'nuevo' })} searchParams={searchParams} />;
}
