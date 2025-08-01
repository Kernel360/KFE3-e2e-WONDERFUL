const AuctionItemCardSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse items-center justify-between gap-2.5">
      <div className="w-26.5 h-26.5 rounded-lg bg-neutral-200" />
      <div className="flex-1 space-y-2.5 [&_div]:rounded [&_div]:bg-neutral-200">
        <div className="h-6 w-3/4" />
        <div className="h-4 w-3/5" />
        <div className="w-15 h-6" />
      </div>
    </div>
  );
};

export default AuctionItemCardSkeleton;
