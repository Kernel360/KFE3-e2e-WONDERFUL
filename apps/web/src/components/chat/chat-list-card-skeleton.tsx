const ChatListCardSkeleton = () => {
  return (
    <div className="flex-1">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="flex h-fit w-full items-center justify-between gap-2.5"
        >
          <div className="flex w-full shrink items-center gap-2.5 py-1">
            {/* Thumbnail skeleton */}
            <div className="w-15 h-15 shrink-0 animate-pulse rounded-lg bg-gray-200" />

            <div className="flex w-full shrink flex-col">
              <div>
                <p className="flex items-center gap-2">
                  {/* Nickname skeleton */}
                  <span className="h-5 w-20 animate-pulse rounded bg-gray-200" />
                </p>
              </div>
              {/* Message content skeleton */}
              <div className="text-min mt-1 h-6 w-2/3 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatListCardSkeleton;
