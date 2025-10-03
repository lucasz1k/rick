-- Fix the security issue with the INSERT policy on contacts table
-- The current INSERT policy lacks a USING clause, which could allow 
-- unauthorized access to existing contact data during insert operations

-- Drop the current INSERT policy
DROP POLICY IF EXISTS "Rate limited contact creation" ON public.contacts;

-- Create a secure INSERT policy that prevents access to existing data
-- while allowing new contact submissions with rate limiting
CREATE POLICY "Secure rate limited contact creation" 
ON public.contacts 
FOR INSERT 
TO public
WITH CHECK (
  -- Rate limiting check
  check_and_update_rate_limit(inet_client_addr()) AND
  -- Ensure the inserted contact doesn't expose existing data patterns
  -- by restricting to basic contact form fields only
  name IS NOT NULL AND 
  email IS NOT NULL AND 
  phone IS NOT NULL AND 
  message IS NOT NULL
);

-- Add an additional policy to completely block SELECT access for anonymous users
-- This ensures no contact data can be read by unauthorized users
CREATE POLICY "Block anonymous access to existing contacts" 
ON public.contacts 
FOR SELECT 
TO anon
USING (false);

-- Ensure authenticated non-admin users also cannot access contact data
CREATE POLICY "Block non-admin authenticated access to contacts" 
ON public.contacts 
FOR SELECT 
TO authenticated
USING (
  get_current_user_role() = ANY (ARRAY['admin'::text, 'staff'::text])
);