export const useSEODescription = (description: string) => {
  const SEODescription = description;

  useSeoMeta({
    description: SEODescription,
    ogDescription:SEODescription,
    twitterDescription: SEODescription,
  })

  useServerSeoMeta({
    description: SEODescription,
    ogDescription:SEODescription,
    twitterDescription: SEODescription,
  })
}