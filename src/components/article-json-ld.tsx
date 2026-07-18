import { SITE_URL } from "@/app/site-config";

type ArticleJsonLdProps = {
  title: string;
  description: string;
  path: string;
  image: string;
  modifiedOn: string;
  sectionLabel: string;
  sectionPath: string;
};

export default function ArticleJsonLd({
  title,
  description,
  path,
  image,
  modifiedOn,
  sectionLabel,
  sectionPath,
}: ArticleJsonLdProps) {
  const url = new URL(path, SITE_URL).toString();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      image: new URL(image, SITE_URL).toString(),
      dateModified: modifiedOn,
      mainEntityOfPage: url,
      author: {
        "@type": "Organization",
        name: "Meccha Chameleon Field Manual",
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "Meccha Chameleon Field Manual",
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: sectionLabel,
          item: new URL(sectionPath, SITE_URL).toString(),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: url,
        },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
