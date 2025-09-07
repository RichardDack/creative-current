// src/components/seo/SchemaMarkup.tsx - Component for injecting structured data
import Script from 'next/script';

interface SchemaMarkupProps {
  schema: object | object[];
}

export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  const schemaArray = Array.isArray(schema) ? schema : [schema];
  
  return (
    <>
      {schemaArray.map((schemaItem, index) => (
        <Script
          key={index}
          id={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaItem, null, 0)
          }}
        />
      ))}
    </>
  );
}