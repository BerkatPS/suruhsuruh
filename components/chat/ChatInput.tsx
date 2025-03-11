// src/components/chat/ChatInput.tsx
import { useState, useRef } from 'react';
import { Paperclip, Send, X, FileText, Image, FileArchive } from 'lucide-react';

interface ChatInputProps {
    onSendMessage: (text: string, attachments: File[]) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
    const [message, setMessage] = useState('');
    const [attachments, setAttachments] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle message input
    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    // Handle file input
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setAttachments([...attachments, ...newFiles]);
        }
    };

    // Remove attachment
    const removeAttachment = (index: number) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    // Open file input
    const openFileInput = () => {
        fileInputRef.current?.click();
    };

    // Send message
    const sendMessage = () => {
        if (message.trim() || attachments.length > 0) {
            onSendMessage(message.trim(), attachments);
            setMessage('');
            setAttachments([]);
        }
    };

    // Handle enter key
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Get file icon based on file type
    const getFileIcon = (file: File) => {
        const type = file.type.split('/')[0];
        const extension = file.name.split('.').pop()?.toLowerCase();

        if (type === 'image') {
            return <Image className="h-4 w-4 text-purple-400" />;
        } else if (
            extension === 'pdf' ||
            extension === 'doc' ||
            extension === 'docx' ||
            extension === 'txt'
        ) {
            return <FileText className="h-4 w-4 text-blue-400" />;
        } else if (
            extension === 'zip' ||
            extension === 'rar' ||
            extension === '7z'
        ) {
            return <FileArchive className="h-4 w-4 text-amber-400" />;
        }

        return <FileText className="h-4 w-4 text-dark-card" />;
    };

    return (
        <div className="relative">
            {/* Attachments previews */}
            {attachments.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                    {attachments.map((file, index) => (
                        <div
                            key={index}
                            className="bg-dark-bg border border-dark-border/50 rounded-lg px-3 py-1.5 flex items-center gap-2"
                        >
                            {getFileIcon(file)}
                            <span className="text-sm text-dark-text">{file.name}</span>
                            <button
                                onClick={() => removeAttachment(index)}
                                className="text-dark-textSecondary hover:text-dark-text"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Message input */}
            <div className="flex items-end gap-2">
                <div className="flex-1 relative">
          <textarea
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border/50 rounded-lg text-dark-text placeholder:text-dark-textSecondary resize-none focus:outline-none focus:ring-1 focus:ring-primary"
              rows={1}
              style={{ minHeight: '2.5rem', maxHeight: '8rem' }}
          />

                    {/* Attachment button */}
                    <button
                        onClick={openFileInput}
                        className="absolute bottom-2 right-2 p-2 text-dark-textSecondary hover:text-dark-text rounded-full hover:bg-dark-border/30"
                    >
                        <Paperclip className="h-5 w-5" />
                    </button>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                    />
                </div>

                {/* Send button */}
                <button
                    onClick={sendMessage}
                    disabled={!message.trim() && attachments.length === 0}
                    className={`p-3 rounded-full ${
                        message.trim() || attachments.length > 0
                            ? 'bg-primary text-white hover:bg-primary-dark'
                            : 'bg-dark-bg border border-dark-border/50 text-dark-textSecondary cursor-not-allowed'
                    } transition-colors`}
                >
                    <Send className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}