import { Images } from 'lucide-react';

import serviceStyle from '@/components/chat/input/style';

const InputImage = () => {
  return (
    <div className={serviceStyle().wrapper()}>
      <label className={serviceStyle().label()}>
        <input type="file" className="hidden" />
        <Images size={28} />
      </label>
      <p className={serviceStyle().title()}>사진/동영상</p>
    </div>
  );
};

export default InputImage;
