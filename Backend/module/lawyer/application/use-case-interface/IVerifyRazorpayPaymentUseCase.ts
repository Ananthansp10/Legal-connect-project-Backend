export interface IRazorpayPaymentData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface IVerifyRazorpayPaymentUseCase {
  execute(data: IRazorpayPaymentData): Promise<void>;
}
