import { Badge } from '@/components/ui/badge';

interface BidStatusProps {
  status: '경매중' | '경매종료';
}

const BadgeBidStatus = ({ status }: BidStatusProps) => {
  const colorVariant = status === '경매중' ? 'primary' : 'closed';

  return (
    <Badge variant={colorVariant} className={`absolute left-1 top-1 text-xs`}>
      {status}
    </Badge>
  );
};

export default BadgeBidStatus;
