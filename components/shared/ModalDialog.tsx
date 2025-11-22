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
      <DialogContent className={className}>
        <DialogHeader className='border-b py-4 mb-4 -mx-4 px-4'>
          <DialogTitle className='font-bold text-2xl'>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
