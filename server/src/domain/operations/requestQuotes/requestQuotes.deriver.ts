import { Order } from '../../entities';

import {
  generateQuote,
  ShippingQuote,
  Carrier
} from "../../../../../api-tests/util";

type Success = {
  outcome: 'SUCCESS';
  order: Order;
};
type OrderNotFound = {
  outcome: 'ORDER_NOT_FOUND';
};
type OrderAlreadyBooked = {
  outcome: 'ORDER_ALREADY_BOOKED';
};

export type RequestQuotesResult =
  | Success
  | OrderNotFound
  | OrderAlreadyBooked;

export const deriveRequestQuotesOutcome = (
  order: Order | undefined,
  carriers: Carrier[]
): RequestQuotesResult => {
  if (!order) {
    return {
      outcome: 'ORDER_NOT_FOUND',
    };
  }
  if (order.status === 'BOOKED') {
    return {
      outcome: 'ORDER_ALREADY_BOOKED'
    };
  }

  let quotes: ShippingQuote[] = [];
  for (let i=0; i<carriers.length; i++) {
    quotes.push(generateQuote(order, carriers[i]));
  }

  return {
    outcome: 'SUCCESS',
    order: {
      ...order,
      status: 'QUOTED',
      quotes: quotes
    }
  };
};
