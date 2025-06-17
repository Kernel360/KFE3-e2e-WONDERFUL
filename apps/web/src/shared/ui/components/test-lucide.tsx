import { Heart, Plus, Search, Settings, User } from 'lucide-react';

const TestLucide = () => {
  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-semibold">Lucide React 아이콘 테스트</h3>
      <div className="flex gap-4">
        <Heart className="h-6 w-6 text-red-500" />
        <User className="h-6 w-6 text-blue-500" />
        <Search className="h-6 w-6 text-green-500" />
        <Plus className="h-6 w-6 text-purple-500" />
        <Settings className="h-6 w-6 text-gray-500" />
      </div>
    </div>
  );
};

export default TestLucide;
