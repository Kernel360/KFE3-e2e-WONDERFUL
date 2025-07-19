import React from 'react';

// export default function EditLayout({
const EditLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  // params: { id: string };
  params: Promise<{ id: string }>; //Promise로 변경
}) => {
  const { id } = await params;
  // console.log('EditLayout params:', id); // 디버깅용 로그
  return (
    <>
      {children}
      <div>Edit Layout for Auction ID: {id}</div>
    </>
  );
};

export default EditLayout;
