type MessageType = 'notice' | 'common' | 'image';
type MessageId = string;

namespace Message {
  interface Base {
    id: MessageId;
    type: MessageType;
    content: string;
    sent_at: string;
  }

  interface Image extends Base {
    type: 'image';
    sender_id: string;
  }

  interface Notice extends Base {
    type: 'notice';
    target_id: string;
  }

  interface Common extends Base {
    sender_id: string;
  }
}

type Message = Message.Notice | Message.Common;
