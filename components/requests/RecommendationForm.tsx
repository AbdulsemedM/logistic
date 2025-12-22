'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import type { Recommendation } from '@/lib/types/request';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

interface RecommendationFormProps {
  requestId: string;
  existingRecommendations: Recommendation[];
}

export function RecommendationForm({ requestId, existingRecommendations }: RecommendationFormProps) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(existingRecommendations);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!comment.trim()) {
      toast.error('Please enter a recommendation');
      return;
    }

    setLoading(true);
    try {
      // In a real app, this would call an API
      const newRecommendation: Recommendation = {
        id: `rec-${Date.now()}`,
        userId: 'current-user', // Would come from auth context
        userName: 'Current User',
        comment: comment.trim(),
        createdAt: new Date().toISOString(),
      };

      setRecommendations([...recommendations, newRecommendation]);
      setComment('');
      toast.success('Recommendation added successfully');
    } catch (error) {
      toast.error('Failed to add recommendation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Enter your recommendation or comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />
        <Button type="submit" disabled={loading || !comment.trim()}>
          <Send className="h-4 w-4 mr-2" />
          {loading ? 'Adding...' : 'Add Recommendation'}
        </Button>
      </form>

      {recommendations.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold">Previous Recommendations</h4>
          {recommendations.map((rec) => (
            <Card key={rec.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{rec.userName}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{rec.comment}</p>
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(rec.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}










