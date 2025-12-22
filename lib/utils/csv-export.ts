import type { TravelCardRequest } from '@/lib/types/request';

export function exportToCSV(requests: TravelCardRequest[]) {
  const headers = [
    'ID',
    'Applicant Name',
    'Email',
    'Phone',
    'Destination',
    'Travel Date',
    'Return Date',
    'Status',
    'Submitted At',
    'Approved At',
    'Rejected At',
  ];

  const rows = requests.map((req) => [
    req.id,
    req.applicantName,
    req.applicantEmail,
    req.applicantPhone,
    req.destination,
    req.travelDate,
    req.returnDate,
    req.status,
    req.submittedAt,
    req.approvedAt || '',
    req.rejectedAt || '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `travler-card-requests-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}










