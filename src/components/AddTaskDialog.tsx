import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

interface AddTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onAddTask: (title: string, description: string) => void;
}

const AddTaskDialog = ({ open, onClose, onAddTask }: AddTaskDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onAddTask(title, description);
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'hsl(var(--card))',
        }
      }}
    >
      <DialogTitle className="text-foreground font-bold text-2xl">
        Add New Task
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task Title"
          type="text"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            marginTop: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'hsl(var(--border))',
              },
              '&:hover fieldset': {
                borderColor: 'hsl(var(--primary))',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'hsl(var(--primary))',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'hsl(var(--muted-foreground))',
              '&.Mui-focused': {
                color: 'hsl(var(--primary))',
              },
            },
            '& .MuiInputBase-input': {
              color: 'hsl(var(--foreground))',
            },
          }}
        />
        <TextField
          margin="dense"
          label="Task Description"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            marginTop: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'hsl(var(--border))',
              },
              '&:hover fieldset': {
                borderColor: 'hsl(var(--primary))',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'hsl(var(--primary))',
              },
            },
            '& .MuiInputLabel-root': {
              color: 'hsl(var(--muted-foreground))',
              '&.Mui-focused': {
                color: 'hsl(var(--primary))',
              },
            },
            '& .MuiInputBase-input': {
              color: 'hsl(var(--foreground))',
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button 
          onClick={onClose}
          sx={{ 
            color: 'hsl(var(--muted-foreground))',
            textTransform: 'none',
            fontSize: '1rem',
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
            color: 'hsl(var(--primary-foreground))',
            textTransform: 'none',
            fontSize: '1rem',
            paddingX: 3,
            paddingY: 1,
            '&:hover': {
              background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)',
              opacity: 0.9,
            },
          }}
        >
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
