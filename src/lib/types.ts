export type SubscriptionStatus = "inactive" | "active" | "past_due" | "canceled";

export type Company = {
  id: string;
  owner_id: string;
  name: string;
  website_url: string | null;
  subscription_status: SubscriptionStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
};

export type KnowledgeBase = {
  company_id: string;
  faq: string;
  product_info: string;
  return_policy: string;
  shipping_policy: string;
  updated_at: string;
};

export type Conversation = {
  id: string;
  company_id: string;
  session_id: string;
  customer_message: string;
  ai_response: string;
  escalated: boolean;
  created_at: string;
};
