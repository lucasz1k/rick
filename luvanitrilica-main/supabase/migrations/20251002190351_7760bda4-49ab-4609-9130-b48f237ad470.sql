-- Add restrictive default deny policy to contacts table as a safety net
-- This ensures that ANY access not explicitly allowed by other policies is blocked
CREATE POLICY "contacts_deny_all_by_default" 
ON public.contacts 
AS RESTRICTIVE
FOR ALL 
USING (false)
WITH CHECK (false);

-- This policy works alongside the existing specific policies:
-- - contacts_authenticated_admin_staff_select (allows admin/staff to read)
-- - contacts_authenticated_admin_staff_update (allows admin/staff to update)
-- - contacts_authenticated_admin_delete (allows admin to delete)
-- - contacts_anon_insert_with_rate_limit (allows anon to insert with rate limit)
--
-- The RESTRICTIVE type means this policy is ANDed with other policies,
-- ensuring that ONLY the explicitly allowed operations can proceed.
-- Any operation not covered by a permissive policy will be blocked.