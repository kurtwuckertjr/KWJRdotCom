import { BlogPost, Category } from './types';
import { GLOSSARY_TERMS, GlossaryTerm } from './glossaryData';

const SITE_URL = 'https://kurtwuckertjr.com';
const AUTHOR_IMAGE = 'https://kurtwuckertjr.com/kurt-wuckert-jr-authoritative-portrait.webp';

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const WORD_COUNTS: Record<string, number> = {
  "adjustable-dumbbells-full-body-plan": 592,
  "bitcoin-glossary": 6433,
  "bitcoin-privacy-vs-anonymity": 240,
  "bitcoin-vs-ethereum": 297,
  "how-do-bitcoin-transactions-work": 298,
  "how-to-get-bitcoin": 273,
  "on-chain-vs-off-chain-bitcoin": 257,
  "what-are-bitcoin-fees": 248,
  "what-is-a-bitcoin-wallet-guide": 369,
  "what-is-bitcoin-beginners-guide": 198,
  "what-is-bitcoin-address": 216,
  "what-is-bitcoin-blockchain": 241,
  "what-is-bitcoin-fork": 254,
  "what-is-bitcoin-halving": 238,
  "what-is-bitcoin-mining": 231,
  "what-is-bitcoin-node": 232,
  "what-is-bitcoin-script": 182,
  "what-is-private-key-bitcoin-guide": 223,
  "what-is-proof-of-work": 253,
  "what-is-satoshi": 776,
  "what-is-seed-phrase-bitcoin": 240,
  "what-is-self-custody-bitcoin": 253,
  "what-is-utxo-bitcoin": 256,
  "why-man-wear-mechanical-watch": 1888,
};

function categoryToSection(category: Category): string {
  switch (category) {
    case Category.BITCOIN: return 'Bitcoin';
    case Category.FITNESS: return 'Fitness';
    case Category.POLITICS: return 'Politics & Culture';
    case Category.RELIGION: return 'Religion';
    case Category.BUSINESS: return 'Business';
    default: return 'General';
  }
}

function postUrl(post: BlogPost): string {
  return `${SITE_URL}/post/${post.id}`;
}

function isQuestionTitle(title: string): boolean {
  return /^(What|How|Why|Is|Are|Do|Does|Can|Should|Where|When|Which)\b/i.test(title)
    || title.includes('?');
}

function buildWebSiteEntity(): object {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    "name": "Kurt Wuckert Jr.",
    "url": SITE_URL,
    "publisher": { "@id": PERSON_ID },
    "inLanguage": "en-US"
  };
}

export function buildBlogPostingGraph(post: BlogPost, authorTitle: string): object {
  const url = postUrl(post);
  const wordCount = WORD_COUNTS[post.id] || 0;

  const blogPosting: Record<string, unknown> = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.date,
    "dateModified": post.date,
    "articleSection": categoryToSection(post.category),
    "keywords": post.tag,
    "inLanguage": "en-US",
    "wordCount": wordCount,
    "isPartOf": { "@id": WEBSITE_ID },
    "author": {
      "@type": "Person",
      "@id": PERSON_ID,
      "name": "Kurt Wuckert Jr.",
      "jobTitle": authorTitle,
      "url": SITE_URL,
      "image": AUTHOR_IMAGE
    },
    "publisher": { "@id": PERSON_ID },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["[itemprop='headline']", "[itemprop='description']"]
    }
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebSiteEntity(),
      blogPosting
    ]
  };
}

export function buildBreadcrumbList(post: BlogPost): object {
  const section = categoryToSection(post.category);
  const catSlug = post.category === Category.ALL ? 'all' : post.category;

  return {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Archive",
        "item": `${SITE_URL}/archive/all`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": section,
        "item": `${SITE_URL}/archive/${catSlug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post.title
      }
    ]
  };
}

export function buildGlossarySchemas(terms: GlossaryTerm[]): { faqPage: object; definedTermSet: object } {
  const faqPage = {
    "@type": "FAQPage",
    "mainEntity": terms.map(t => ({
      "@type": "Question",
      "name": `What is ${t.term} in Bitcoin and blockchain?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t.definition
      }
    }))
  };

  const definedTermSet = {
    "@type": "DefinedTermSet",
    "name": "Bitcoin Glossary: Essential Terms for Understanding Crypto",
    "description": "A comprehensive glossary of Bitcoin and blockchain terminology.",
    "url": `${SITE_URL}/post/bitcoin-glossary`,
    "inLanguage": "en-US",
    "hasDefinedTerm": terms.map(t => ({
      "@type": "DefinedTerm",
      "name": t.term,
      "description": t.definition,
      "inDefinedTermSet": `${SITE_URL}/post/bitcoin-glossary`
    }))
  };

  return { faqPage, definedTermSet };
}

export function buildQuestionArticleFAQ(post: BlogPost): object | null {
  if (!isQuestionTitle(post.title)) return null;
  return {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": post.title,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": post.excerpt
        }
      }
    ]
  };
}

export function buildArchiveItemList(posts: BlogPost[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Kurt Wuckert Jr. Article Archive",
    "numberOfItems": posts.length,
    "itemListElement": posts.map((post, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": postUrl(post),
      "name": post.title
    }))
  };
}

export function buildPostSchemaGraph(post: BlogPost, authorTitle: string): object {
  const url = postUrl(post);
  const wordCount = WORD_COUNTS[post.id] || 0;
  const isGlossary = post.id === 'bitcoin-glossary';
  const questionFAQ = buildQuestionArticleFAQ(post);

  const blogPosting: Record<string, unknown> = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.date,
    "dateModified": post.date,
    "articleSection": categoryToSection(post.category),
    "keywords": post.tag,
    "inLanguage": "en-US",
    "wordCount": wordCount,
    "isPartOf": { "@id": WEBSITE_ID },
    "author": {
      "@type": "Person",
      "@id": PERSON_ID,
      "name": "Kurt Wuckert Jr.",
      "jobTitle": authorTitle,
      "url": SITE_URL,
      "image": AUTHOR_IMAGE
    },
    "publisher": { "@id": PERSON_ID },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["[itemprop='headline']", "[itemprop='description']"]
    }
  };

  const graph: object[] = [
    buildWebSiteEntity(),
    blogPosting,
    buildBreadcrumbList(post)
  ];

  if (isGlossary) {
    const { faqPage, definedTermSet } = buildGlossarySchemas(GLOSSARY_TERMS);
    graph.push(faqPage, definedTermSet);
  } else if (questionFAQ) {
    graph.push(questionFAQ);
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}
