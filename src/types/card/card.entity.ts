export interface CardEntity{
    activation_date: string;
    balance: string;
    card_number: string;
    expiry_date: string;
    id: number;
    pin: string;
}

export interface NewCard extends Omit<CardEntity, 'activation_date' | 'id'> {
    id?: number;
}