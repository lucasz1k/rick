-- Complete security lockdown and rebuild for contacts table
-- Drop ALL existing policies first
DROP POLICY IF EXISTS "Authenticated admin and staff can view contacts" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated admin and staff can update contacts" ON public.contacts;
DROP POLICY IF EXISTS "Only admins can delete contacts" ON public.contacts;
DROP POLICY IF EXISTS "Allow rate limited contact submissions" ON public.contacts;
DROP POLICY IF EXISTS "Deny anonymous access to contacts" ON public.contacts;

-- Disable and re-enable RLS to ensure clean state
ALTER TABLE public.contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create absolute denial policy (applies to all roles including authenticated)
CREATE POLICY "contacts_deny_all_by_default"
ON public.contacts
FOR ALL
USING (false)
WITH CHECK (false);

-- Create specific exception for admin/staff SELECT (higher specificity)
CREATE POLICY "contacts_admin_staff_select"
ON public.contacts
FOR SELECT
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND (
    get_current_user_role() = 'admin' 
    OR get_current_user_role() = 'staff'
  )
);

-- Create specific exception for admin/staff UPDATE
CREATE POLICY "contacts_admin_staff_update"
ON public.contacts
FOR UPDATE
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND (
    get_current_user_role() = 'admin' 
    OR get_current_user_role() = 'staff'
  )
)
WITH CHECK (
  auth.uid() IS NOT NULL 
  AND (
    get_current_user_role() = 'admin' 
    OR get_current_user_role() = 'staff'
  )
);

-- Create specific exception for admin DELETE
CREATE POLICY "contacts_admin_delete"
ON public.contacts
FOR DELETE
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND get_current_user_role() = 'admin'
);

-- Create specific exception for anonymous INSERT (contact form)
CREATE POLICY "contacts_anonymous_insert"
ON public.contacts
FOR INSERT
TO anon
WITH CHECK (
  check_and_update_rate_limit(inet_client_addr()) 
  AND name IS NOT NULL 
  AND email IS NOT NULL 
  AND phone IS NOT NULL 
  AND message IS NOT NULL
);

-- Same approach for profiles table
DROP POLICY IF EXISTS "Deny anonymous access to profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile only" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile only" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;

-- Disable and re-enable RLS for profiles
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Absolute denial for profiles
CREATE POLICY "profiles_deny_all_by_default"
ON public.profiles
FOR ALL
USING (false)
WITH CHECK (false);

-- Specific exceptions for profiles
CREATE POLICY "profiles_user_own_select"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "profiles_user_own_update"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id)
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "profiles_user_own_insert"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "profiles_admin_all_select"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL AND get_current_user_role() = 'admin');

CREATE POLICY "profiles_admin_all_update"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL AND get_current_user_role() = 'admin')
WITH CHECK (auth.uid() IS NOT NULL AND get_current_user_role() = 'admin');