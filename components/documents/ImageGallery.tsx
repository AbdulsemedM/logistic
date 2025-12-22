'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Document } from '@/lib/types/request';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

interface ImageGalleryProps {
  document: Document;
  onClose: () => void;
}

export function ImageGallery({ document, onClose }: ImageGalleryProps) {
  const [zoom, setZoom] = useState(100);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{document.type.toUpperCase()} Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden">
            <div className="flex items-center justify-center p-4" style={{ minHeight: '500px' }}>
              <img
                src={document.url}
                alt={`${document.type} document`}
                className="max-w-full h-auto"
                style={{ transform: `scale(${zoom / 100})` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(Math.max(50, zoom - 25))}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm">{zoom}%</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setZoom(Math.min(200, zoom + 25))}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

