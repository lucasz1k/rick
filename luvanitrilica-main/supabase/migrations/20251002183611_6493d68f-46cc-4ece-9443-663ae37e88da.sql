-- Step 1: Drop all existing contacts policies first
DROP POLICY IF EXISTS "contacts_deny_all_by_default" ON public.contacts;
DROP POLICY IF EXISTS "contacts_admin_staff_select" ON public.contacts;
DROP POLICY IF EXISTS "contacts_admin_staff_update" ON public.contacts;
DROP POLICY IF EXISTS "contacts_admin_delete" ON public.contacts;
DROP POLICY IF EXISTS "contacts_anonymous_insert" ON public.contacts;

-- Step 2: Now we can safely drop the duplicate function
DROP FUNCTION IF EXISTS public.check_and_update_rate_limit(inet, integer, integer);

-- Step 3: Create new PERMISSIVE policies with proper security
-- Only authenticated admin/staff can SELECT contacts
CREATE POLICY "contacts_authenticated_admin_staff_select" 
ON public.contacts 
FOR SELECT 
TO authenticated
USING (
  (auth.uid() IS NOT NULL) AND 
  (get_current_user_role() = 'admin' OR get_current_user_role() = 'staff')
);

-- Only authenticated admin/staff can UPDATE contacts
CREATE POLICY "contacts_authenticated_admin_staff_update" 
ON public.contacts 
FOR UPDATE 
TO authenticated
USING (
  (auth.uid() IS NOT NULL) AND 
  (get_current_user_role() = 'admin' OR get_current_user_role() = 'staff')
)
WITH CHECK (
  (auth.uid() IS NOT NULL) AND 
  (get_current_user_role() = 'admin' OR get_current_user_role() = 'staff')
);

-- Only authenticated admins can DELETE contacts
CREATE POLICY "contacts_authenticated_admin_delete" 
ON public.contacts 
FOR DELETE 
TO authenticated
USING (
  (auth.uid() IS NOT NULL) AND 
  (get_current_user_role() = 'admin')
);

-- Anonymous users can only INSERT with rate limiting (using the correct function signature)
CREATE POLICY "contacts_anon_insert_with_rate_limit" 
ON public.contacts 
FOR INSERT 
TO anon
WITH CHECK (
  public.check_and_update_rate_limit(inet_client_addr()) AND 
  (name IS NOT NULL) AND 
  (email IS NOT NULL) AND 
  (phone IS NOT NULL) AND 
  (message IS NOT NULL)
);

-- Step 4: Fix contact_rate_limits table - remove overly permissive policy
DROP POLICY IF EXISTS "System only rate limit access" ON public.contact_rate_limits;

-- The contact_rate_limits table now has NO policies
-- It's only accessible via SECURITY DEFINER functions which bypass RLS