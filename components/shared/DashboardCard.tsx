import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  height?: 'sm' | 'md' | 'lg';
  colSpan?: number;
}

const heightMap = {
  sm: 'h-[200px]',
  md: 'h-[280px]',
  lg: 'h-[350px]',
};

export const DashboardCard = ({
  title,
  children,
  className,
  height = 'md',
  colSpan = 4,
}: DashboardCardProps) => {
  return (
    <div className={cn(`lg:col-span-${colSpan}`, className)}>
      <Card className={cn('shadow-sm', heightMap[height])}>
        <CardHeader>
          <CardTitle className='text-lg'>{title}</CardTitle>
        </CardHeader>
        <CardContent className='flex-1'>{children}</CardContent>
      </Card>
    </div>
  );
};
