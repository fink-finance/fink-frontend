import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const DashboardCard = ({
  title,
  subtitle,
  children,
  className,
  icon,
}: DashboardCardProps) => {
  return (
    <div className='h-full'>
      <Card className={cn('shadow-sm h-full', className)}>
        <CardHeader className={subtitle ? 'pb-2' : ''}>
          <div className='flex items-start justify-between'>
            <div>
              <CardTitle className='text-2xl font-bold'>{title}</CardTitle>
              {subtitle && (
                <p className='text-md text-zinc-600 mt-1'>{subtitle}</p>
              )}
            </div>
            {icon && <div>{icon}</div>}
          </div>
        </CardHeader>
        <CardContent className='flex-1'>{children}</CardContent>
      </Card>
    </div>
  );
};
