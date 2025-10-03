-- Remove redundant and potentially conflicting policies on contacts table
DROP POLICY IF EXISTS "Block anonymous access to existing contacts" ON public.contacts;
DROP POLICY IF EXISTS "Block non-admin authenticated access to contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admin and staff can view all contacts" ON public.contacts;
DROP POLICY IF EXISTS "Admin and staff can update all contacts" ON public.contacts;

-- Create secure, explicit policies for contacts table
-- Only authenticated admin/staff users can view contacts
CREATE POLICY "Authenticated admin and staff can view contacts" 
ON public.contacts 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND get_current_user_role() IN ('admin', 'staff')
);

-- Only authenticated admin/staff users can update contacts  
CREATE POLICY "Authenticated admin and staff can update contacts"
ON public.contacts 
FOR UPDATE 
USING (
  auth.uid() IS NOT NULL 
  AND get_current_user_role() IN ('admin', 'staff')
)
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND get_current_user_role() IN ('admin', 'staff')
);

-- Ensure the existing secure policies remain
-- (DELETE policy for admins only and INSERT policy with rate limiting are already secure)