// src/components/chat/ChatMessage.tsx
interface Attachment {
    name: string;
    url: string;
    size: string;
}

interface MessageProps {
    message: {
        id: number;
        sender: string;
        text: string;
        timestamp: string;
        read: boolean;
        attachments?: Attachment[];
    };
    formatDate: (dateString: string) => string;
    isUser: boolean;
}

export default function ChatMessage({ message, formatDate, isUser }: MessageProps) {
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${isUser ? 'order-1' : 'order-2'}`}>
                <div
                    className={`px-4 py-3 rounded-lg ${
                        isUser
                            ? 'bg-primary text-white'
                            : 'bg-dark-card text-dark-text border border-dark-border'
                    }`}
                >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>

                    {/* Attachments if any */}
                    {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-2">
                            {message.attachments.map((attachment, idx) => (
                                <a
                                    key={idx}
                                    href={attachment.url}
                                    className={`flex items-center p-2 rounded ${
                                        isUser ? 'bg-primary-dark' : 'bg-dark-bg'
                                    }`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-5 w-5 ${isUser ? 'text-white' : 'text-red-500'}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <div className="ml-2 flex-1">
                                        <p className={`text-xs font-medium ${isUser ? 'text-white' : 'text-gray-400'}`}>
                                            {attachment.name}
                                        </p>
                                        <p className={`text-xs ${isUser ? 'text-white' : 'text-gray-400'}`}>
                                            {attachment.size}
                                        </p>
                                    </div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-5 w-5 ${isUser ? 'text-white' : 'text-gray-500'}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                        />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
                <div
                    className={`mt-1 text-xs text-gray-400 flex items-center ${
                        isUser ? 'justify-end' : 'justify-start'
                    }`}
                >
                    {formatDate(message.timestamp)}
                    {isUser && (
                        <span className="ml-2">
              {message.read ? (
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                  >
                      <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                      />
                  </svg>
              ) : (
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                  >
                      <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                      />
                  </svg>
              )}
            </span>
                    )}
                </div>
            </div>
        </div>
    );
}