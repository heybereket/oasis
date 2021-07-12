import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  defaultItems: any[];
  fetch: (limit: number, offset: number) => Promise<any>;
  amountPerFetch: number;
  renderComponent: (data: any, index: number) => JSX.Element;
}
export const InfiniteScrollWrapper: React.FC<Props> = ({
  fetch,
  amountPerFetch,
  defaultItems,
  renderComponent,
}) => {
  const [items, setItems] = useState<any>(defaultItems);
  const limit = amountPerFetch;
  const [offset, setOffset] = useState<number>(defaultItems.length);
  const [hasMore, setHasMore] = useState(true);

  // If default items arent set on first render
  useEffect(() => {
    setItems(defaultItems);
    setOffset(defaultItems.length);
  }, [defaultItems]);

  return (
    <>
      <InfiniteScroll
        dataLength={items.length}
        next={async () => {
          const newData = await fetch(limit, offset);
          if (newData.length === 0) {
            setHasMore(false);
          } else {
            setItems([...items, ...newData]);
            setOffset(offset + limit);
          }
        }}
        hasMore={hasMore}
        loader={null}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((data: any, index: number) => renderComponent(data, index))}
      </InfiniteScroll>
    </>
  );
};
