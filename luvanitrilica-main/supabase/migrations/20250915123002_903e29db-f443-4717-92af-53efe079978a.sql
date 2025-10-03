-- Drop the overly permissive RLS policies on contact_rate_limits table
DROP POLICY IF EXISTS "Function controlled rate limiting" ON public.contact_rate_limits;
DROP POLICY IF EXISTS "Secure rate limiting access" ON public.contact_rate_limits;

-- Create a secure policy that only allows access through security definer functions
-- This prevents direct access to IP addresses and rate limit data
CREATE POLICY "System only rate limit access" 
ON public.contact_rate_limits 
FOR ALL 
TO postgres
USING (true)
WITH CHECK (true);

-- Additional security: Revoke direct access from public and anon users
REVOKE ALL ON public.contact_rate_limits FROM public;
REVOKE ALL ON public.contact_rate_limits FROM anon;
REVOKE ALL ON public.contact_rate_limits FROM authenticated;

-- Grant access only to postgres role (for system functions)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_rate_limits TO postgres;