import { tv } from 'tailwind-variants';

const skeletonStyle = tv({
  slots: {
    wrapper: 'flex w-full items-center justify-between gap-2.5 animate-pulse',
    imageContainer: 'relative',
    statusBadge: 'absolute top-0 left-0 h-5 w-12 bg-neutral-200 rounded-full',
    thumbnail: 'w-26.5 h-26.5 bg-neutral-200 rounded-lg',
    contentContainer: 'w-full shrink',
    title: 'mb-1.5 h-5 bg-neutral-200 rounded w-3/4',
    priceSection: 'flex justify-between',
    leftSection: 'w-full flex flex-col justify-evenly gap-2',
    originalPrice: 'h-4 bg-neutral-200 rounded w-24',
    timeBadge: 'h-6 bg-neutral-200 rounded w-20',
    rightSection: 'w-full flex shrink flex-col justify-end gap-2 text-right',
    currentPriceLabel: 'h-4 bg-neutral-200 rounded w-16 ml-auto',
    currentPrice: 'h-6 bg-neutral-200 rounded w-20 ml-auto',
  },
});

const AuctionItemCardSkeleton = () => {
  const styles = skeletonStyle();

  return (
    <div className={styles.wrapper()}>
      <div className={styles.imageContainer()}>
        <div className={styles.statusBadge()} />
        <div className={styles.thumbnail()} />
      </div>
      <div className={styles.contentContainer()}>
        <div className={styles.title()} />
        <div className={styles.priceSection()}>
          <div className={styles.leftSection()}>
            <div className={styles.originalPrice()} />
            <div className={styles.timeBadge()} />
          </div>
          <div className={styles.rightSection()}>
            <div className={styles.currentPriceLabel()} />
            <div className={styles.currentPrice()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionItemCardSkeleton;
