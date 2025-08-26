// src/components/seo/LocalStructuredData.tsx - Schema Component
'use client';

interface LocalStructuredDataProps {
  schema: object;
}

export const LocalStructuredData: React.FC<LocalStructuredDataProps> = ({ schema }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
};