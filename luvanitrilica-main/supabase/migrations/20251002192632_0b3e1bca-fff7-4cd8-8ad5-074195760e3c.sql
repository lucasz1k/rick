-- Enable Row Level Security on contact_rate_limits table
ALTER TABLE public.contact_rate_limits ENABLE ROW LEVEL SECURITY;

-- Deny all direct access to contact_rate_limits table
-- This table should only be accessed via the security definer function
CREATE POLICY "contact_rate_limits_deny_all_direct_access"
ON public.contact_rate_limits
FOR ALL
USING (false)
WITH CHECK (false);

-- Add comment explaining the security approach
COMMENT ON TABLE public.contact_rate_limits IS 'Rate limiting table - access only via check_and_update_rate_limit() function. Direct access is blocked by RLS for security.';