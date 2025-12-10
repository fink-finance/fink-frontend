import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'react-bootstrap-icons';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  soon?: React.ReactNode;
  disableScroll?: boolean;
  hasArrow?: boolean;
  arrowHref?: string;
}

export const DashboardCard = ({
  title,
  subtitle,
  children,
  className,
  icon: iconProp,
  onClick,
  soon,
  disableScroll = false,
  hasArrow,
  arrowHref,
}: DashboardCardProps) => {
  // Se o dev não passar um ícone, e pedir seta (hasArrow) ou arrowHref,
  // usamos a seta padrão. Caso contrário, não mostra nada.
  const icon =
    iconProp ??
    (hasArrow || arrowHref ? (
      <ArrowRight className="lg:w-[38px] lg:h-[38px] w-6 h-6" />
    ) : null);

  const isDisabled = !onClick && !arrowHref;

  return (
    <div className="h-full">
      <Card
        className={cn(
          'shadow-sm h-full max-h-[600px] md:max-h-[500px] lg:max-h-none bg-white lg:px-4 lg:py-2 px-2 py-1 flex flex-col',
          className,
        )}
      >
        <CardHeader className={subtitle ? 'pb-2' : ''}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex flex-col md:flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                <CardTitle
                  className={cn(
                    soon && 'opacity-50',
                    'lg:text-2xl text-xl font-bold',
                  )}
                >
                  {title}
                </CardTitle>
                {soon && <div className="lg:self-center">{soon}</div>}
              </div>
              {subtitle && (
                <p className="text-md text-zinc-600 mt-1">{subtitle}</p>
              )}
            </div>

            {icon && (
              <>
                {arrowHref ? (
                  // 👉 quando tiver arrowHref, a seta vira um Link clicável
                  <Link
                    href={arrowHref}
                    className={cn(
                      'flex items-center justify-center rounded-full transition-all duration-300 p-2 hover:bg-primary/10 hover:cursor-pointer',
                    )}
                    aria-label={`Ir para ${title}`}
                  >
                    {icon}
                  </Link>
                ) : (
                  // fallback: comportamento antigo com button + onClick
                  <button
                    onClick={onClick}
                    disabled={isDisabled}
                    className={cn(
                      'flex items-center justify-center rounded-full transition-all duration-300 p-2',
                      isDisabled
                        ? 'cursor-not-allowed'
                        : 'hover:bg-primary/10 hover:cursor-pointer',
                    )}
                    aria-label={`Ir para ${title}`}
                  >
                    {icon}
                  </button>
                )}
              </>
            )}
          </div>
        </CardHeader>

        <CardContent
          className={cn(
            'flex-1 min-h-0',
            disableScroll ? 'overflow-hidden' : 'overflow-auto',
          )}
        >
          {children}
        </CardContent>
      </Card>
    </div>
  );
};
