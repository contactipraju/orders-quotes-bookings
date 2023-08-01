import { withAsyncErrorHandling } from './withAsyncErrorHandling';
import { carrierCodeSchema } from '../domain/entities';
import { z } from 'zod-http-schemas';
import {
  requestQuotes,
  RequestQuotesResult
} from '../domain/operations/requestQuotes';

const requestQuoteRequestSchema = z.object({
  carriers: carrierCodeSchema.array()
});

const urlParamsSchema = z.object({
  id: z.string().nonempty(),
});

export const handlePostRequestQuotes = withAsyncErrorHandling(
  async (req, res) => {
    const bodyParseResult = requestQuoteRequestSchema.safeParse(req.body);
    if (!bodyParseResult.success) {
      res.status(400).json({
        error: 'INVALID_REQUEST_BODY',
        validationError: bodyParseResult.error,
      });
      return;
    }

    const urlParamsParseResult = urlParamsSchema.safeParse(req.params);
    if (!urlParamsParseResult.success) {
      res.status(400).json({
        error: 'INVALID_URL_PARAMETER',
        validationError: urlParamsParseResult.error,
      });
      return;
    }

    const orderId = urlParamsParseResult.data.id;
    const { carriers } = bodyParseResult.data;

    const result = await requestQuotes(orderId, carriers);

    const outcomeStatusCodeMap: Record<RequestQuotesResult['outcome'], number> = {
      SUCCESS: 200,
      ORDER_ALREADY_BOOKED: 400,
      ORDER_NOT_FOUND: 404
    };

    res.status(outcomeStatusCodeMap[result.outcome]).json(result);
  }
);
