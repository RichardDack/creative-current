// src/components/seo/LocalStructuredData.tsx - Enhanced Schema Component
'use client';

import { SchemaMarkup } from '@/lib/seo/schema';

interface LocalStructuredDataProps {
  schema: SchemaMarkup | SchemaMarkup[] | object;
}

export const LocalStructuredData: React.FC<LocalStructuredDataProps> = ({ schema }) => {
  // Handle both single schema and array of schemas
  const schemaData = Array.isArray(schema) ? schema : [schema];
  
  return (
    <>
      {schemaData.map((schemaItem, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaItem, null, 0)
          }}
        />
      ))}
    </>
  );
};