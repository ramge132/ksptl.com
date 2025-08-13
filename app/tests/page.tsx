import { Suspense } from 'react';
import TestsComponent from './TestsComponent';
import { Loader2 } from 'lucide-react';

function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50/50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">페이지를 불러오는 중...</p>
      </div>
    </div>
  );
}

export default function TestsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <TestsComponent />
    </Suspense>
  );
}
