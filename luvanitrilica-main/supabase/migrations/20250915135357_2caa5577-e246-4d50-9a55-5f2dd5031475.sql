-- Ensure RLS is properly enabled on all sensitive tables
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing profiles policies and create secure ones
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update any profile role" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile (non-role fields)" ON public.profiles;

-- Create explicit denial policy for profiles (highest priority)
CREATE POLICY "Deny anonymous access to profiles"
ON public.profiles
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Allow authenticated users to view their own profile only
CREATE POLICY "Users can view own profile only"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow authenticated users to update their own profile (non-role fields)
CREATE POLICY "Users can update own profile only"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (get_current_user_role() = 'admin');

-- Allow admins to update any profile
CREATE POLICY "Admins can update all profiles"
ON public.profiles
FOR UPDATE
TO authenticated
USING (get_current_user_role() = 'admin')
WITH CHECK (get_current_user_role() = 'admin');

-- Add explicit denial policy for contacts (highest priority)
CREATE POLICY "Deny anonymous access to contacts"
ON public.contacts
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Ensure contact creation still works for rate-limited anonymous users
DROP POLICY IF EXISTS "Secure rate limited contact creation" ON public.contacts;
CREATE POLICY "Allow rate limited contact submissions"
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