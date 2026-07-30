export type CardStyle = 'envelope' | 'tarot' | 'zine' | 'achievement';
export type MessageCard = { readonly id: string; readonly sender: string; readonly text: string; readonly memory?: string; readonly imageUrl?: string; readonly link?: string; readonly style: CardStyle };
export type StoredMessage = { readonly id: string; readonly name: string; readonly message: string; readonly memory: string | null; readonly image_url: string | null; readonly link: string | null; readonly card_style: CardStyle; };
export const mapStoredMessage = (message: StoredMessage): MessageCard => ({ id: message.id, sender: message.name, text: message.message, memory: message.memory ?? undefined, imageUrl: message.image_url ?? undefined, link: message.link ?? undefined, style: message.card_style });
