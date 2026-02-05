import { Box, Button } from '@mui/material';
import AddOutlined from '@mui/icons-material/AddOutlined';
import ArrowForwardOutlined from '@mui/icons-material/ArrowForwardOutlined';
import CardInputRow from './CardInputRow';
import PrimaryButton from './PrimaryButton';
import type { CreditCard } from '../types';

interface CardInputListProps {
  cards: CreditCard[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange: (id: string, field: keyof CreditCard, value: string | number) => void;
  onSubmit: () => void;
  showSubmit: boolean;
  canSubmit: boolean;
}

export default function CardInputList({
  cards,
  onAdd,
  onRemove,
  onChange,
  onSubmit,
  showSubmit,
  canSubmit,
}: CardInputListProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.25,
        mb: 2,
        animation: 'fadeSlideIn 0.4s ease-out 0.2s both',
      }}
    >
      {cards.map((card, i) => (
        <CardInputRow
          key={card.id}
          card={card}
          index={i}
          onChange={onChange}
          onRemove={onRemove}
          canRemove={cards.length > 1}
        />
      ))}

      <Box sx={{ display: 'flex', gap: 1.25, flexWrap: 'wrap' }}>
        <Button
          onClick={onAdd}
          startIcon={<AddOutlined sx={{ fontSize: 14 }} />}
          sx={{
            py: 1.25,
            px: 2.25,
            borderRadius: 1,
            border: '1.5px dashed',
            borderColor: 'custom.accent',
            bgcolor: 'transparent',
            color: 'custom.accent',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "'Work Sans', sans-serif",
            transition: 'all 0.2s',
            '&:hover': {
              bgcolor: 'rgba(91,106,191,0.06)',
              borderColor: 'custom.accent',
            },
          }}
        >
          Add Another Card
        </Button>

        {showSubmit && (
          <PrimaryButton onClick={onSubmit} disabled={!canSubmit}>
            Show My Savings <ArrowForwardOutlined sx={{ fontSize: 16 }} />
          </PrimaryButton>
        )}
      </Box>
    </Box>
  );
}
