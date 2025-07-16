import React from 'react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';

const BidderAvatar = ({ isAuthor }: { isAuthor: boolean }) => {
  return (
    <>
      {!isAuthor ? (
        <span className="flex size-8 items-center justify-center">
          <i className="bg-primary-100 size-5 rounded-full"></i>
        </span>
      ) : (
        <Avatar className="border-primary-500 shadow-primary-200 size-8 border-2 bg-white shadow-md">
          <AvatarImage
            src={
              'https://autkdwezfwdduoqiadsc.supabase.co/storage/v1/object/public/auction-images/f610194f-1750-4dc5-82ef-fe836cd9bf79/1751453508404_8wxxr2.png'
            }
            alt="user1234 프로필"
          />
        </Avatar>
      )}
    </>
  );
};

export default BidderAvatar;
