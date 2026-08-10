import { prisma } from "../config/database.js";

export class ChatService {
    /**
     * Create conversation
     * @param {string} userId
     * @param {string} mode
     * @param {string|null} title
     * @returns {Promise<Object>}
     */
    async createConversation(userId, mode = "chat", title = null) {
        return prisma.conversation.create({
            data: {
                userId,
                mode,
                title: title || `New ${mode} conversation`,
            },
        });
    }

    /**
     * Get existing conversation or create a new one
     * @param {string} userId
     * @param {string|null} conversationId
     * @param {string} mode
     * @returns {Promise<Object>}
     */
    async getOrCreateConversation(
        userId,
        conversationId,
        mode = "chat"
    ) {
        if (conversationId) {
            const conversation =
                await prisma.conversation.findFirst({
                    where: {
                        id: conversationId,
                        userId,
                    },
                    include: {
                        messages: {
                            orderBy: {
                                createdAt: "asc",
                            },
                        },
                    },
                });

            if (conversation) {
                return conversation;
            }
        }

        return this.createConversation(userId, mode);
    }

    /**
     * Add a message to a conversation
     * @param {string} conversationId
     * @param {string} role
     * @param {string|object} content
     * @returns {Promise<Object>}
     */
    async addMessage(conversationId, role, content) {
        const contentStr =
            typeof content === "string"
                ? content
                : JSON.stringify(content);

        const message = await prisma.message.create({
            data: {
                conversationId,
                role,
                content: contentStr,
            },
        });

        // Keep conversation activity timestamp updated
        await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                updatedAt: new Date(),
            },
        });

        return message;
    }

    /**
     * Get conversation messages
     * @param {string} conversationId
     * @returns {Promise<Array>}
     */
    async getMessages(conversationId) {
        const messages = await prisma.message.findMany({
            where: {
                conversationId,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return messages.map((msg) => ({
            ...msg,
            content: this.parseContent(msg.content),
        }));
    }

    /**
     * Get all conversations for a user
     * @param {string} userId
     * @returns {Promise<Array>}
     */
    async getUserConversations(userId) {
        return prisma.conversation.findMany({
            where: {
                userId,
            },
            orderBy: {
                updatedAt: "desc",
            },
            include: {
                messages: {
                    take: 1,
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
    }

    /**
     * Parse stored message content
     * @param {string} content
     * @returns {string|object}
     */

    parseContent(content) {
        try {
            return JSON.parse(content);
        } catch {
            return content;
        }
    }

    /**
     * Delete a conversation
     * @param {string} conversationId - Conversation ID
     * @param {string} userId - User ID (for security)
     */

    async deleteConversation(conversationId, userId) {
        return await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userId,
            },
        });
    }

    /**
     * Format messages for AI SDK
     * @param {Array} messages - Database messages
     */

    formatMessagesForAI(messages) {
        return messages.map((msg) => ({
            role: msg.role,
            content:
                typeof msg.content === "string"
                    ? msg.content
                    : JSON.stringify(msg.content),
        }));


    }

    /**
    * Update conversation title
    * @param {string} conversationId - Conversation ID
    * @param {string} title - New conversation title
    * @returns {Promise<Object>}
    */
    async updateTitle(conversationId, title) {
        return await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                title,
            },
        });
    }
}