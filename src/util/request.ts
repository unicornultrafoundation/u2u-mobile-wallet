export const fetchHTML = async (url: string) => {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const headHtml = (() => {
      const match = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
      return match ? match[1] : html.slice(0, 20000);
    })();

    const pageUrl = new URL(url);

    const baseHref = (() => {
      const m = headHtml.match(/<base[^>]+href=["']([^"']+)["']/i);
      return m ? m[1] : null;
    })();

    const resolveUrl = (href: string | null) => {
      if (!href) return null;
      try {
        if (href.startsWith('//')) {
          return `${pageUrl.protocol}${href}`;
        }
        if (href.startsWith('http://') || href.startsWith('https://')) {
          return href;
        }
        const base = baseHref ? new URL(baseHref, pageUrl.origin) : pageUrl;
        return new URL(href, base).toString();
      } catch {
        return null;
      }
    };

    const extractTitle = () => {
      const t = headHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      if (t && t[1]) return t[1].trim();
      const og = headHtml.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i) || headHtml.match(/<meta[^>]+name=["']og:title["'][^>]+content=["']([^"']+)["']/i);
      if (og && og[1]) return og[1].trim();
      const tw = headHtml.match(/<meta[^>]+name=["']twitter:title["'][^>]+content=["']([^"']+)["']/i);
      if (tw && tw[1]) return tw[1].trim();
      return 'No title';
    };

    const extractDescription = () => {
      const d = headHtml.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
      if (d && d[1]) return d[1].trim();
      const og = headHtml.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i) || headHtml.match(/<meta[^>]+name=["']og:description["'][^>]+content=["']([^"']+)["']/i);
      if (og && og[1]) return og[1].trim();
      const tw = headHtml.match(/<meta[^>]+name=["']twitter:description["'][^>]+content=["']([^"']+)["']/i);
      if (tw && tw[1]) return tw[1].trim();
      return null;
    };

    const extractFavicon = () => {
      const linkTags = headHtml.match(/<link[^>]+>/gi) || [];
      type IconCandidate = { href: string, sizesScore: number, relPriority: number };
      const candidates: IconCandidate[] = [];

      const getRelPriority = (rel: string) => {
        const r = rel.toLowerCase();
        if (r.includes('apple-touch-icon')) return 3;
        if (r.includes('icon')) return 2;
        if (r.includes('mask-icon')) return 1;
        return 0;
      };

      for (const tag of linkTags) {
        const relMatch = tag.match(/rel=["']([^"']+)["']/i);
        if (!relMatch) continue;
        const rel = relMatch[1];
        if (!/icon/i.test(rel)) continue;

        const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
        if (!hrefMatch) continue;
        const href = hrefMatch[1];

        let sizesScore = 0;
        const sizesMatch = tag.match(/sizes=["']([^"']+)["']/i);
        if (sizesMatch) {
          const sizes = sizesMatch[1].split(/\s+/).map(s => {
            const m = s.match(/(\d+)[xX](\d+)/);
            return m ? Math.max(parseInt(m[1], 10), parseInt(m[2], 10)) : 0;
          });
          sizesScore = Math.max(0, ...sizes);
        }

        candidates.push({
          href,
          sizesScore,
          relPriority: getRelPriority(rel),
        });
      }

      if (candidates.length === 0) {
        return resolveUrl('/favicon.ico');
      }

      candidates.sort((a, b) => {
        if (b.relPriority !== a.relPriority) return b.relPriority - a.relPriority;
        return b.sizesScore - a.sizesScore;
      });

      const best = candidates[0];
      return resolveUrl(best.href);
    };

    const result = {
      title: extractTitle(),
      favicon: extractFavicon(),
      description: extractDescription(),
    };

    return result;
  } catch (err) {
    console.error(err);
    return { title: 'No title', favicon: null, description: null };
  }
};