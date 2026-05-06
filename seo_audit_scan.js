const fs = require('fs');
const path = require('path');
const base = 'd:/vedisha marketing projects/vedisha_marketing';

const files = [
  'index.html','services.html','work.html','contact.html',
  'meta-google-ads-management.html','static-website-seo-launch.html',
  'ai-visibility-boost.html','ai-content-structuring.html',
  'marketing-strategy-roadmap.html','brand-identity-kit.html',
  'social-media-marketing.html','blog-post-bundles.html',
  'keyword-research-spreadsheet.html','seo-audit-reports.html',
  'local-lead-combo.html','gmb.html','real-estate-marketing.html',
  'industrial-seo-waluj-midc.html','b2b-lead-gen-shendra-midc.html',
  'healthcare-marketing-csn.html',
  'digital-marketing-in-waluj-midc.html','web-development-in-waluj-midc.html',
  'seo-services-in-waluj-midc.html','digital-marketing-in-shendra-midc.html',
  'web-development-in-shendra-midc.html','seo-services-in-shendra-midc.html',
  'digital-marketing-in-cidco.html','web-development-in-cidco.html',
  'seo-services-in-cidco.html','digital-marketing-in-chikalthana.html',
  'web-development-in-chikalthana.html','seo-services-in-chikalthana.html'
];

const results = [];
for(const f of files){
  const fp = path.join(base, f);
  if(!fs.existsSync(fp)){
    results.push({f, missing: true});
    continue;
  }
  const c = fs.readFileSync(fp, 'utf8');
  
  const titleM = c.match(/<title>([^<]+)<\/title>/i);
  const title = titleM ? titleM[1].trim() : 'MISSING';
  
  const metaM1 = c.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i);
  const metaM2 = c.match(/<meta[^>]+name='description'[^>]+content='([^']+)'/i);
  const metaM3 = c.match(/<meta[^>]+content="([^"]+)"[^>]+name="description"/i);
  const metaM = metaM1 || metaM2 || metaM3;
  const meta = metaM ? metaM[1].trim() : 'MISSING';
  
  const canonical = /rel="canonical"/.test(c) ? 'YES' : 'NO';
  const h1 = (c.match(/<h1[\s>]/gi) || []).length;
  const jsonld = c.includes('application/ld+json') ? 'YES' : 'NO';
  
  const imgs = c.match(/<img[^>]*>/gi) || [];
  const imgNoAlt = imgs.filter(i => !/\balt\s*=/.test(i)).length;
  const imgNoW = imgs.filter(i => !/\bwidth\s*=/.test(i)).length;
  
  // Extract actual title and meta for display
  results.push({
    f,
    titleStr: title,
    titleLen: title.length,
    metaLen: meta === 'MISSING' ? 0 : meta.length,
    metaStatus: meta === 'MISSING' ? 'MISSING' : `OK(${meta.length})`,
    canonical,
    h1,
    jsonld,
    imgNoAlt,
    imgNoW
  });
}

console.log('\nSEO AUDIT RESULTS');
console.log('='.repeat(120));
console.log('FILE'.padEnd(48) + 'TITLE_LEN META_LEN CANONICAL H1  JSON-LD  ISSUES');
console.log('-'.repeat(120));

const missingCanon = [];
const missingJsonld = [];
const badH1 = [];
const missingMeta = [];
const badTitle = [];
const badMeta = [];
const imgAltIssues = [];
const imgSizeIssues = [];

results.forEach(r => {
  if(r.missing){ console.log(r.f + ' | NOT FOUND'); return; }
  const flags = [];
  if(r.titleLen < 30 || r.titleLen > 70){ flags.push('TITLE-LEN:'+r.titleLen); badTitle.push(r.f); }
  if(r.metaLen === 0){ flags.push('META-MISSING'); missingMeta.push(r.f); }
  else if(r.metaLen < 120 || r.metaLen > 165){ flags.push('META-LEN:'+r.metaLen); badMeta.push(r.f); }
  if(r.canonical === 'NO'){ flags.push('NO-CANON'); missingCanon.push(r.f); }
  if(r.h1 !== 1){ flags.push('H1='+r.h1); badH1.push(r.f); }
  if(r.jsonld === 'NO'){ flags.push('NO-LD'); missingJsonld.push(r.f); }
  if(r.imgNoAlt > 0){ flags.push('ALT:'+r.imgNoAlt); imgAltIssues.push(r.f); }
  if(r.imgNoW > 0){ flags.push('W:'+r.imgNoW); imgSizeIssues.push(r.f); }
  
  const status = flags.length === 0 ? '✓ OK' : '✗ ' + flags.join(' | ');
  console.log(
    r.f.padEnd(48) +
    String(r.titleLen).padStart(9) + ' ' +
    String(r.metaLen).padStart(8) + '  ' +
    r.canonical.padEnd(10) +
    String(r.h1).padStart(3) + '  ' +
    r.jsonld.padEnd(8) +
    status
  );
});

console.log('\n=== ISSUE SUMMARY ===');
console.log(`Missing canonical (${missingCanon.length}):`, missingCanon.join(', '));
console.log(`Missing JSON-LD (${missingJsonld.length}):`, missingJsonld.join(', '));
console.log(`H1 count != 1 (${badH1.length}):`, badH1.join(', '));
console.log(`Missing meta desc (${missingMeta.length}):`, missingMeta.join(', '));
console.log(`Title length issues (${badTitle.length}):`, badTitle.join(', '));
console.log(`Meta length issues (${badMeta.length}):`, badMeta.join(', '));
console.log(`Images missing alt (${imgAltIssues.length}):`, imgAltIssues.join(', '));
console.log(`Images missing width (${imgSizeIssues.length}):`, imgSizeIssues.join(', '));
