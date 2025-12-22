'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { exportToCSV } from '@/lib/utils/csv-export';
import type { TravelCardRequest } from '@/lib/types/request';
import { toast } from 'sonner';

interface ExportButtonProps {
  requests: TravelCardRequest[];
}

export function ExportButton({ requests }: ExportButtonProps) {
  const handleExport = () => {
    try {
      exportToCSV(requests);
      toast.success('CSV exported successfully');
    } catch (error) {
      toast.error('Failed to export CSV');
    }
  };

  return (
    <Button onClick={handleExport} variant="outline">
      <Download className="h-4 w-4 mr-2" />
      Export to CSV
    </Button>
  );
}










