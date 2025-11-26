import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type ModalDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  title: string;
  children: React.ReactNode;
};

export const ModalDialog = ({
  open,
  onOpenChange,
  className,
  title,
  children,
}: ModalDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`flex flex-col ${className}`}>
        <DialogHeader className='border-b py-4 mb-4 -mx-4 px-4 flex-shrink-0'>
          <DialogTitle className='font-bold text-2xl'>{title}</DialogTitle>
        </DialogHeader>
        <div className='flex-1 flex flex-col overflow-y-auto'>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
