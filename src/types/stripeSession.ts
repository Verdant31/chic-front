interface Session {
  /**
   * Unique identifier for the object. Used to pass to `redirectToCheckout`
   * in Stripe.js.
   */
  id: string;

  /**
   * String representing the object's type. Objects of the same type share the same value.
   */
  object: "checkout.session";

  /**
   * When set, provides configuration for actions to take if this Checkout Session expires.
   */
  after_expiration: Session.AfterExpiration | null;

  /**
   * Enables user redeemable promotion codes.
   */
  allow_promotion_codes: boolean | null;

  /**
   * Total of all items before discounts or taxes are applied.
   */
  amount_subtotal: number | null;

  /**
   * Total of all items after discounts and taxes are applied.
   */
  amount_total: number | null;

  automatic_tax: Session.AutomaticTax;

  /**
   * Describes whether Checkout should collect the customer's billing address.
   */
  billing_address_collection: Session.BillingAddressCollection | null;

  /**
   * If set, Checkout displays a back button and customers will be directed to this URL if they decide to cancel payment and return to your website.
   */
  cancel_url: string | null;

  /**
   * A unique string to reference the Checkout Session. This can be a
   * customer ID, a cart ID, or similar, and can be used to reconcile the
   * Session with your internal systems.
   */
  client_reference_id: string | null;

  /**
   * Results of `consent_collection` for this session.
   */
  consent: Session.Consent | null;

  /**
   * When set, provides configuration for the Checkout Session to gather active consent from customers.
   */
  consent_collection: Session.ConsentCollection | null;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created: number;

  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency: string | null;

  custom_text: Session.CustomText;

  /**
   * The ID of the customer for this Session.
   * For Checkout Sessions in `payment` or `subscription` mode, Checkout
   * will create a new customer object based on information provided
   * during the payment flow unless an existing customer was provided when
   * the Session was created.
   */
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null;

  /**
   * Configure whether a Checkout Session creates a Customer when the Checkout Session completes.
   */
  customer_creation: Session.CustomerCreation | null;

  /**
   * The customer details including the customer's tax exempt status and the customer's tax IDs. Only the customer's email is present on Sessions in `setup` mode.
   */
  customer_details: Session.CustomerDetails | null;

  /**
   * If provided, this value will be used when the Customer object is created.
   * If not provided, customers will be asked to enter their email address.
   * Use this parameter to prefill customer data if you already have an email
   * on file. To access information about the customer once the payment flow is
   * complete, use the `customer` attribute.
   */
  customer_email: string | null;

  /**
   * The timestamp at which the Checkout Session will expire.
   */
  expires_at: number;

  /**
   * ID of the invoice created by the Checkout Session, if it exists.
   */
  invoice: string | Stripe.Invoice | null;

  /**
   * Details on the state of invoice creation for the Checkout Session.
   */
  invoice_creation: Session.InvoiceCreation | null;

  /**
   * The line items purchased by the customer.
   */
  line_items?: ApiList<Stripe.LineItem>;

  /**
   * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
   */
  livemode: boolean;

  /**
   * The IETF language tag of the locale Checkout is displayed in. If blank or `auto`, the browser's locale is used.
   */
  locale: Session.Locale | null;

  /**
   * Set of [key-value pairs](https://stripe.com/docs/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
   */
  metadata: Stripe.Metadata | null;

  /**
   * The mode of the Checkout Session.
   */
  mode: Session.Mode;

  /**
   * The ID of the PaymentIntent for Checkout Sessions in `payment` mode.
   */
  payment_intent: string | Stripe.PaymentIntent | null;

  /**
   * The ID of the Payment Link that created this Session.
   */
  payment_link: string | Stripe.PaymentLink | null;

  /**
   * Configure whether a Checkout Session should collect a payment method.
   */
  payment_method_collection: Session.PaymentMethodCollection | null;

  /**
   * Payment-method-specific configuration for the PaymentIntent or SetupIntent of this CheckoutSession.
   */
  payment_method_options: Session.PaymentMethodOptions | null;

  /**
   * A list of the types of payment methods (e.g. card) this Checkout
   * Session is allowed to accept.
   */
  payment_method_types: Array<string>;

  /**
   * The payment status of the Checkout Session, one of `paid`, `unpaid`, or `no_payment_required`.
   * You can use this value to decide when to fulfill your customer's order.
   */
  payment_status: Session.PaymentStatus;

  phone_number_collection?: Session.PhoneNumberCollection;

  /**
   * The ID of the original expired Checkout Session that triggered the recovery flow.
   */
  recovered_from: string | null;

  /**
   * The ID of the SetupIntent for Checkout Sessions in `setup` mode.
   */
  setup_intent: string | Stripe.SetupIntent | null;

  /**
   * When set, provides configuration for Checkout to collect a shipping address from a customer.
   */
  shipping_address_collection: Session.ShippingAddressCollection | null;

  /**
   * The details of the customer cost of shipping, including the customer chosen ShippingRate.
   */
  shipping_cost: Session.ShippingCost | null;

  /**
   * Shipping information for this Checkout Session.
   */
  shipping_details: Session.ShippingDetails | null;

  /**
   * The shipping rate options applied to this Session.
   */
  shipping_options: Array<Session.ShippingOption>;

  /**
   * The status of the Checkout Session, one of `open`, `complete`, or `expired`.
   */
  status: Session.Status | null;

  /**
   * Describes the type of transaction being performed by Checkout in order to customize
   * relevant text on the page, such as the submit button. `submit_type` can only be
   * specified on Checkout Sessions in `payment` mode, but not Checkout Sessions
   * in `subscription` or `setup` mode.
   */
  submit_type: Session.SubmitType | null;

  /**
   * The ID of the subscription for Checkout Sessions in `subscription` mode.
   */
  subscription: string | Stripe.Subscription | null;

  /**
   * The URL the customer will be directed to after the payment or
   * subscription creation is successful.
   */
  success_url: string;

  tax_id_collection?: Session.TaxIdCollection;

  /**
   * Tax and discount details for the computed total amount.
   */
  total_details: Session.TotalDetails | null;

  /**
   * The URL to the Checkout Session. Redirect customers to this URL to take them to Checkout. If you're using [Custom Domains](https://stripe.com/docs/payments/checkout/custom-domains), the URL will use your subdomain. Otherwise, it'll use `checkout.stripe.com.`
   * This value is only present when the session is active.
   */
  url: string | null;
}
