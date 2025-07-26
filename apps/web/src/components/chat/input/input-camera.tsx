import { Camera } from 'lucide-react';

import serviceStyle from '@/components/chat/input/style';

const InputCamera = () => {
  return (
    <div className={serviceStyle().wrapper()}>
      <label className={serviceStyle().label()}>
        <input type="file" className="hidden" accept="image/*" capture="environment" />
        <Camera size={28} />
      </label>
      <p className={serviceStyle().title()}>카메라</p>
    </div>
  );
};

export default InputCamera;
