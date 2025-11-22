import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2,
          minWidth: '320px',
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'hsl(var(--muted-foreground))' }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button 
          onClick={onCancel}
          sx={{
            color: 'hsl(var(--muted-foreground))',
            '&:hover': {
              backgroundColor: 'hsl(var(--muted))',
            },
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: 'hsl(var(--destructive))',
            color: 'white',
            '&:hover': {
              backgroundColor: 'hsl(var(--destructive) / 0.9)',
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
