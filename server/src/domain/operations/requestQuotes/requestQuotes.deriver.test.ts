import { expect } from 'chai';
import { Order } from '../../entities';
import { deriveRequestQuotesOutcome } from './requestQuotes.deriver';
import {
	generateQuote
  } from "../../../../../api-tests/util";

const mockOrder: Order = {
  id: '123',
  customer: 'Sally Bob',
  items: [
    {
      itemid: 'SHOE-RED-1',
      quantity: 1,
      gramsPerItem: 100,
      price: 20,
    },
  ],
  quotes: [],
  status: 'RECEIVED',
};

describe('requestQuotes.deriver', () => {
  it('returns ORDER NOT FOUND when passed an undefined order', () => {
    const result = deriveRequestQuotesOutcome(undefined, ['UPS']);
    expect(result.outcome).to.eq('ORDER_NOT_FOUND');
  });

  it('returns ORDER ALREADY BOOKED when passed a booked order', () => {
    const result = deriveRequestQuotesOutcome(
      {
        ...mockOrder,
        status: 'BOOKED',
      },
      ['UPS']
    );
    expect(result.outcome).to.eq('ORDER_ALREADY_BOOKED');
  });

  it('generater a quote for a received order', () => {
    const order: Order = {
      ...mockOrder,
    };
    const result = deriveRequestQuotesOutcome(
      {
        ...order,
      },
      ['UPS']
    );
    expect(result).to.deep.eq({
      outcome: 'SUCCESS',
      order: {
        ...order,
        status: 'QUOTED',
        quotes: [
          generateQuote(mockOrder, "UPS")
        ],
      },
    });
  });
});
