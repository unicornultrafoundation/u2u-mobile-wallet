export interface Conversation {
  id: string;
  users: string[];
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
}

export interface Message {
  conversationID: string;
  from: string;
  content: string;
  readBy: string[];
  createdAt: Date;
}
