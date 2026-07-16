/** JSON-LD builders — keep shapes stable for rich results */

export function organizationLd(site) {
  const ld = {
    '@type': 'Organization',
    name: site.name,
    email: site.email,
    url: site.url,
    logo: site.logo,
  };
  if (site.organizationDescription) ld.description = site.organizationDescription;
  return ld;
}

export function webSiteLd(site, { includeSearch = true, description } = {}) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    inLanguage: 'pt-BR',
  };
  if (description) ld.description = description;
  ld.publisher = organizationLd(site);
  if (includeSearch) {
    ld.potentialAction = {
      '@type': 'SearchAction',
      target: `${site.url}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    };
  }
  return ld;
}

export function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };
}

export function faqPageLd(faqs) {
  if (!faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function webApplicationLd({ name, url, description, dateModified, site }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    description,
    inLanguage: 'pt-BR',
    dateModified,
    publisher: { '@type': 'Organization', name: site.org, url: 'https://ivalice.com.br' },
  };
}

export function articleLd({ headline, description, dateModified, datePublished, url, site }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    dateModified,
    ...(datePublished ? { datePublished } : {}),
    inLanguage: 'pt-BR',
    author: { '@type': 'Organization', name: site.org },
    publisher: { '@type': 'Organization', name: site.org, logo: site.logo },
    mainEntityOfPage: url,
  };
}

export function webPageLd({ name, url, dateModified, description }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
  };
  if (dateModified) ld.dateModified = dateModified;
  ld.url = url;
  if (description) ld.description = description;
  return ld;
}

export function collectionPageLd({ name, url, description, items }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    url,
    description,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        url: it.url,
      })),
    },
  };
}
