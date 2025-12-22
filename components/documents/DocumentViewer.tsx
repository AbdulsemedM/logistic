'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImageGallery } from '@/components/documents/ImageGallery';
import type { Document } from '@/lib/types/request';
import { FileText, CheckCircle2, XCircle } from 'lucide-react';

interface DocumentViewerProps {
  documents: Document[];
}

const documentLabels: Record<string, string> = {
  kyc: 'KYC Document',
  passport: 'Passport',
  visa: 'Visa',
};

export function DocumentViewer({ documents }: DocumentViewerProps) {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  if (documents.length === 0) {
    return <p className="text-sm text-slate-600 dark:text-slate-400">No documents available</p>;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        {documents.map((document) => (
          <Card
            key={document.id}
            className="cursor-pointer transition-shadow hover:shadow-md"
            onClick={() => setSelectedDocument(document)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                  <span className="font-medium text-sm">
                    {documentLabels[document.type] || document.type}
                  </span>
                </div>
                {document.verified ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
              </div>
              <Badge variant={document.verified ? 'default' : 'outline'} className="text-xs">
                {document.verified ? 'Verified' : 'Pending'}
              </Badge>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                {new Date(document.uploadedAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedDocument && (
        <ImageGallery
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
}










