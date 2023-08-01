import { Order } from '../../entities';
import { ordersRepo } from '../../../repos/ordersRepo';
import {
  RequestQuotesResult,
  deriveRequestQuotesOutcome,
} from './requestQuotes.deriver';

import {
  Carrier
} from "../../../../../api-tests/util";

export const requestQuotes = async (
  orderId: Order['id'],
  carriers: Carrier[]
): Promise<RequestQuotesResult> => {
  const order = await ordersRepo.getOrder(orderId);

  const result = deriveRequestQuotesOutcome(order, carriers);

  if (result.outcome === 'SUCCESS') {
    await ordersRepo.updateOrder({ ...result.order });
  }
  return result;
};

export { RequestQuotesResult };
